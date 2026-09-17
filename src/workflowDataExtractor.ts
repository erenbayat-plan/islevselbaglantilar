import { DATA } from './data';
import { ANALYSIS_METHODS } from './workflowTypes';

export interface PaletteItem {
  id: string;
  type: 'hazard' | 'critical_component' | 'analysis_method' | 'intermediate_output' | 'integrated_assessment';
  title: string;
  chapterNum: string;
  workingGroup: string;
  componentGroup?: string;
  relatedHazard?: string;
  dataFormat?: string;
  geometryType?: string;
  fieldsToUse?: string;
  analysisMethod?: string;
  description?: string;
  dataSource?: string;
  dataYear?: string;
  isCustom?: boolean;
  notes?: string;
}

export function extractPaletteData(): {
  hazards: PaletteItem[];
  components: PaletteItem[];
  methods: PaletteItem[];
  outputs: PaletteItem[];
} {
  const hazards: PaletteItem[] = [];
  const components: PaletteItem[] = [];
  const methods: PaletteItem[] = [];
  const outputs: PaletteItem[] = [];

  // 1. Standard GIS Analysis Methods
  ANALYSIS_METHODS.forEach((method, idx) => {
    methods.push({
      id: `method-std-${idx}`,
      type: 'analysis_method',
      title: method,
      chapterNum: 'genel',
      workingGroup: 'hepsi',
      analysisMethod: method,
      description: `${method} yöntemi ile mekânsal katmanlar ve öznitelik tabloları işlenir.`
    });
  });

  // Extract from DATA for each group (ulasim, teknikaltyapi, lojistik)
  const groups = ['ulasim', 'teknikaltyapi', 'lojistik'];

  groups.forEach(groupKey => {
    const groupData = DATA[groupKey];
    if (!groupData) return;

    const sections = groupData.sections || [];

    sections.forEach((sec: any) => {
      const cNum = sec.chapterNum;

      // Chapter 3: Critical Components
      if (cNum === '3' || sec.code.startsWith('3.')) {
        (sec.entries || []).forEach((entry: any, eIdx: number) => {
          (entry.veri || []).forEach((item: any, vIdx: number) => {
            const rawName = item.n;
            const geom = 
              rawName.toLowerCase().includes('hat') || rawName.toLowerCase().includes('yol') || rawName.toLowerCase().includes('arter')
                ? 'Çizgi'
                : rawName.toLowerCase().includes('alan') || rawName.toLowerCase().includes('havza') || rawName.toLowerCase().includes('bolge')
                ? 'Poligon'
                : rawName.toLowerCase().includes('istasyon') || rawName.toLowerCase().includes('nokta') || rawName.toLowerCase().includes('kuyu') || rawName.toLowerCase().includes('tesis')
                ? 'Nokta'
                : 'Vektör';

            components.push({
              id: `comp-${groupKey}-${sec.code}-${eIdx}-${vIdx}`,
              type: 'critical_component',
              title: rawName,
              chapterNum: '3',
              workingGroup: groupKey,
              componentGroup: `${sec.code} ${sec.title}`,
              dataFormat: `Vektör (${geom})`,
              geometryType: geom,
              description: entry.sartname || entry.analiz || '',
              dataSource: groupKey === 'teknikaltyapi' ? 'İSKİ / İGDAŞ / TEİAŞ' : groupKey === 'lojistik' ? 'TCDD / Limanlar / Gümrük' : 'İBB / UGM / KGM',
              dataYear: '2025'
            });
          });
        });
      }

      // Chapters 4, 5, 6: Hazards & Hazard Scenarios
      if (['4', '5', '6'].includes(cNum)) {
        (sec.entries || []).forEach((entry: any, eIdx: number) => {
          // Add specific analysis entry as predefined analysis method if present
          if (entry.analiz) {
            methods.push({
              id: `method-entry-${groupKey}-${sec.code}-${eIdx}`,
              type: 'analysis_method',
              title: `${entry.analiz}`,
              chapterNum: cNum,
              workingGroup: groupKey,
              relatedHazard: `${sec.code} ${sec.title}`,
              analysisMethod: 'Mekânsal çakışma analizi',
              description: entry.sartname || `${sec.title} kapsamında öngörülen maruziyet ve kırılganlık analizi.`
            });

            // Output corresponding to this analysis
            outputs.push({
              id: `output-${groupKey}-${sec.code}-${eIdx}`,
              type: 'intermediate_output',
              title: `${sec.title} Etki ve Maruziyet Katmanı (${DATA[groupKey]?.label})`,
              chapterNum: cNum,
              workingGroup: groupKey,
              relatedHazard: `${sec.code} ${sec.title}`,
              dataFormat: 'Vektör / Raster Harita',
              geometryType: 'Poligon',
              description: `${entry.analiz} sonucunda üretilen mekânsal analiz çıktısı ve risk göstergesi.`
            });
          }

          // Veri listesi in hazard chapters contains hazard data & hazard models
          (entry.veri || []).forEach((item: any, vIdx: number) => {
            const rawName = item.n;
            const isGeneralHazard = 
              rawName.toLowerCase().includes('dezim') ||
              rawName.toLowerCase().includes('deprem') ||
              rawName.toLowerCase().includes('taşkın') ||
              rawName.toLowerCase().includes('heyelan') ||
              rawName.toLowerCase().includes('tsunami') ||
              rawName.toLowerCase().includes('fırtına') ||
              rawName.toLowerCase().includes('sıcaklık') ||
              rawName.toLowerCase().includes('yangın') ||
              rawName.toLowerCase().includes('kaza') ||
              rawName.toLowerCase().includes('senaryo') ||
              rawName.toLowerCase().includes('tehlike');

            if (isGeneralHazard) {
              hazards.push({
                id: `hazard-${groupKey}-${sec.code}-${eIdx}-${vIdx}`,
                type: 'hazard',
                title: rawName,
                chapterNum: cNum,
                workingGroup: groupKey,
                relatedHazard: `${sec.code} ${sec.title}`,
                dataFormat: rawName.toLowerCase().includes('pga') || rawName.toLowerCase().includes('grid') ? 'Raster' : 'Vektör',
                geometryType: 'Poligon',
                description: entry.sartname || `${sec.title} girdi tehlike verisi.`,
                dataSource: 'İBB Deprem ve Zemin İnceleme Şube Müdürlüğü (DEZİM)',
                dataYear: '2025'
              });
            }
          });
        });
      }

      // Chapter 8: Multi-Risk & Synthesis
      if (cNum === '8') {
        (sec.entries || []).forEach((entry: any, eIdx: number) => {
          if (entry.analiz) {
            methods.push({
              id: `method-c8-${groupKey}-${sec.code}-${eIdx}`,
              type: 'analysis_method',
              title: `${entry.analiz}`,
              chapterNum: '8',
              workingGroup: groupKey,
              analysisMethod: 'Çoklu risk değerlendirmesi',
              description: entry.sartname || 'Çoklu tehlike ve risk değerlendirmesi sentez analizi.'
            });
          }

          outputs.push({
            id: `output-c8-${groupKey}-${sec.code}-${eIdx}`,
            type: 'integrated_assessment',
            title: `${sec.title} Sentez Haritası ve Dayanıklılık Endeksi (${DATA[groupKey]?.label})`,
            chapterNum: '8',
            workingGroup: groupKey,
            dataFormat: 'Çok Kriterli Sentez Modeli (CBS Katmanı)',
            geometryType: 'Poligon',
            description: entry.sartname || 'Tüm afet ve iklim tehlikelerinin kümülatif etkisi, kritiklik-kırılganlık matrisi ve öncelikli müdahale koridorlarının mekânsal sentezi.'
          });
        });
      }
    });
  });

  return { hazards, components, methods, outputs };
}
