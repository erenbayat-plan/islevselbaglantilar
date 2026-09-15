import React, { useState, useMemo, useEffect } from 'react';
import { 
  Check, 
  X,
  Plus,
  Trash2,
  Pencil,
  Search
} from 'lucide-react';
import { STATUS_LABEL } from '../data';

interface SpatialHazardInventoryProps {
  activeGroup: string;
  data: Record<string, any>;
  workStatus: Record<string, any>;
  rowOverrides: Record<string, any>;
  customRows: Record<string, any>;
  onUpdateWorkStatus: (id: string, updates: any) => void;
  onUpdateRowOverride: (id: string, updates: any) => void;
  onAddCustomRow: (group: string, secCode: string, name: string, compCode?: string) => void;
  onDeleteRow: (id: string) => void;
  activeChapterNum?: string;
  onSelectChapter?: (num: string) => void;
}

// Map hazard chapters that require spatial/risk matrix with clean, architectural definitions
export const SPATIAL_CHAPTERS = [
  {
    num: '4',
    code: '4',
    title: 'Doğa Kaynaklı Afetler',
    fullTitle: 'DOĞA KAYNAKLI AFETLERİN ETKİLERİ',
    desc: 'Deprem, Sel ve Taşkın, Heyelan ve Tsunami tehlikelerinin kritik altyapı bileşenleri üzerindeki mekânsal hasar, kapanma ve işlev kaybı analizleri.'
  },
  {
    num: '5',
    code: '5',
    title: 'İnsan ve Teknoloji Kaynaklı Afetler',
    fullTitle: 'İNSAN VE TEKNOLOJİ KAYNAKLI AFETLERİN ETKİLERİ',
    desc: 'Pandemi, Yangın, Endüstriyel Kazalar/Patlamalar ve Güvenlik risklerinin kritik altyapı bileşenleri ile mekânsal kesişim ve etki analizleri.'
  },
  {
    num: '6',
    code: '6',
    title: 'İklim Krizi Etkileri',
    fullTitle: 'İKLİM KRİZİ ETKİLERİ VE RİSKLERİ',
    desc: 'Aşırı Sıcaklıklar, Deniz Seviyesinin Yükselmesi, Fırtına/Aşırı Hava ve Kıtlık/Kaynak Stresinin kritik altyapı üzerindeki kırılganlık ve maruziyet analizleri.'
  },
  {
    num: '8',
    code: '8',
    title: 'Çoklu Risk Değerlendirmesi',
    fullTitle: 'ÇOKLU RİSK DEĞERLENDİRMESİ VE SENTEZ',
    desc: 'Tüm afet ve iklim tehlikelerinin kümülatif etkisi, kritiklik-kırılganlık matrisi ve öncelikli müdahale koridorlarının mekânsal sentezi.'
  }
];

// Helper to check if a data item belongs to a critical component
function matchesComponent(itemText: string, compCode: string, group: string): boolean {
  const text = itemText.toLowerCase();

  if (group === 'ulasim') {
    if (compCode === '3.1') {
      // Karayolu Ağları
      return (
        text.includes('karayolu') ||
        text.includes('road') ||
        text.includes('otoyol') ||
        text.includes('devlet yolu') ||
        text.includes('devletyol') ||
        text.includes('ula_mb_otoyol') ||
        text.includes('ula_mb_devletyol') ||
        text.includes('ula_yol_agi') ||
        text.includes('ula_yogt') ||
        text.includes('ula_yolustu') ||
        text.includes('ula_yoldisi') ||
        text.includes('ula_pd_') ||
        text.includes('ula_yaya') ||
        text.includes('ula_mikromobilite') ||
        text.includes('ula_bisiklet') ||
        text.includes('ula_mevcut') ||
        text.includes('ula_insaat') ||
        text.includes('ula_utk') ||
        text.includes('ula_zon') ||
        text.includes('ula_top_arzu') ||
        text.includes('ula_tt_arzu') ||
        text.includes('ula_oo_arzu') ||
        text.includes('otopark') ||
        text.includes('yaya') ||
        text.includes('bisiklet') ||
        text.includes('mikromobilite') ||
        text.includes('arzu') ||
        text.includes('zon') ||
        text.includes('acil ulaşım') ||
        text.includes('auy') ||
        text.includes('köprü') ||
        text.includes('viyadük') ||
        text.includes('tünel') ||
        text.includes('yol') ||
        text.includes('pga') ||
        text.includes('dezim') ||
        text.includes('bina hasar') ||
        text.includes('jma') ||
        text.includes('jmc') ||
        text.includes('yfb') ||
        text.includes('tehlike') ||
        text.includes('duyarlılık') ||
        text.includes('rüzgâr') ||
        text.includes('fırtına') ||
        text.includes('asfalt') ||
        text.includes('sıcaklık') ||
        text.includes('kıyı') ||
        text.includes('çevre')
      );
    }
    if (compCode === '3.2') {
      // Ulaşım Odakları (Aktarma Merkezleri, İstasyonlar, İskeleler, Terminaller)
      return (
        text.includes('odak') ||
        text.includes('aktarma') ||
        text.includes('istasyon') ||
        text.includes('iskele') ||
        text.includes('terminal') ||
        text.includes('otogar') ||
        text.includes('durak') ||
        text.includes('erişim') ||
        text.includes('erisilebilirlik') ||
        text.includes('kruvaziyer') ||
        text.includes('havalimanı') ||
        text.includes('ula_rayli_sistem_istasyonlari') ||
        text.includes('ula_mb_demiryolu_istasyonlari') ||
        text.includes('ula_denizyolu_iskeleler') ||
        text.includes('ula_mb_iskele') ||
        text.includes('ula_mb_otogarlar') ||
        text.includes('ula_metrobus_duraklari') ||
        text.includes('ula_iett_duraklar') ||
        text.includes('ula_taksi_dolmus_durak') ||
        text.includes('ula_mb_kruvaziyer') ||
        text.includes('ula_mb_havalimanlari') ||
        text.includes('ula_metrobus_erisilebilirlik') ||
        text.includes('ula_raylisistem_erisilebilirlik') ||
        text.includes('ula_pl_rayli_erisilebilirlik') ||
        text.includes('şehiriçi') ||
        text.includes('dezim') ||
        text.includes('tsunami') ||
        text.includes('deniz') ||
        text.includes('bina hasar') ||
        text.includes('su basma')
      );
    }
    if (compCode === '3.3') {
      // Toplu Taşıma Sistemi (Lastik Tekerlekli, Raylı Sistem vb.)
      return (
        text.includes('toplu taşıma') ||
        text.includes('otobüs') ||
        text.includes('metrobüs') ||
        text.includes('minibüs') ||
        text.includes('bus') ||
        text.includes('raylı') ||
        text.includes('metro') ||
        text.includes('tramvay') ||
        text.includes('marmaray') ||
        text.includes('füniküler') ||
        text.includes('teleferik') ||
        text.includes('yht') ||
        text.includes('konvansiyonel') ||
        text.includes('hat') ||
        text.includes('sefer') ||
        text.includes('yolcu') ||
        text.includes('kapasite') ||
        text.includes('araç') ||
        text.includes('filo') ||
        text.includes('depo') ||
        text.includes('garaj') ||
        text.includes('ula_rayli_sistem_hatlari') ||
        text.includes('ula_mb_yht_hatti') ||
        text.includes('ula_mb_pl_yht_hatti') ||
        text.includes('ula_mb_konvansiyonel_hat') ||
        text.includes('ula_iett_anaguzergahlar') ||
        text.includes('ula_iett_garaj') ||
        text.includes('ula_minibus_hatlari') ||
        text.includes('ula_denizyolu_hatlari') ||
        text.includes('ula_mb_dy_guzergah')
      );
    }
  }

  if (group === 'altyapi' || group === 'teknikaltyapi') {
    if (compCode === '3.1') {
      // Enerji Altyapıları (BOTAŞ, İGDAŞ, TEİAŞ, BEDAŞ, AYEDAŞ, RES, Şarj vb.)
      return (
        text.includes('enerji') ||
        text.includes('elektrik') ||
        text.includes('doğalgaz') ||
        text.includes('doğal gaz') ||
        text.includes('botaş') ||
        text.includes('igdaş') ||
        text.includes('trafo') ||
        text.includes('şebeke') ||
        text.includes('boru') ||
        text.includes('rms') ||
        text.includes('hat') ||
        text.includes('kesinti') ||
        text.includes('res') ||
        text.includes('türbin') ||
        text.includes('şarj') ||
        text.includes('petrol') ||
        text.includes('lpg') ||
        text.includes('tay_botas_') ||
        text.includes('tay_dgaz_') ||
        text.includes('tay_dogalgaz') ||
        text.includes('tay_elek_') ||
        text.includes('tay_petrol_') ||
        text.includes('tay_lpg_') ||
        text.includes('tay_res_') ||
        text.includes('tay_mrmr_') ||
        text.includes('tay_ulusal_')
      );
    }
    if (compCode === '3.2') {
      // Su ve Kanalizasyon (İSKİ, Barajlar, Göletler, İsale, Depolar, Terfi)
      return (
        text.includes('su') ||
        text.includes('iski') ||
        text.includes('baraj') ||
        text.includes('gölet') ||
        text.includes('kuyu') ||
        text.includes('dere') ||
        text.includes('isale') ||
        text.includes('içmesuyu') ||
        text.includes('temizsu') ||
        text.includes('arıtma') ||
        text.includes('terfi') ||
        text.includes('depo') ||
        text.includes('kolektor') ||
        text.includes('numune') ||
        text.includes('sulama') ||
        text.includes('havza') ||
        text.includes('kuraklık') ||
        text.includes('tay_barajlar') ||
        text.includes('tay_goletler') ||
        text.includes('tay_kuyu') ||
        text.includes('tay_dereler') ||
        text.includes('tay_icmesuyu_') ||
        text.includes('tay_iski_') ||
        text.includes('tay_havzalardayapi')
      );
    }
    if (compCode === '3.3') {
      // Atık ve Drenaj Altyapıları (AAT, Deşarj, Yağmursuyu, Dere Bantları, Katı Atık, Hafriyat)
      return (
        text.includes('atık') ||
        text.includes('çöp') ||
        text.includes('katı atık') ||
        text.includes('atıksu') ||
        text.includes('aat') ||
        text.includes('deşarj') ||
        text.includes('drenaj') ||
        text.includes('yağmur') ||
        text.includes('yağmursuyu') ||
        text.includes('taşkın') ||
        text.includes('dere işletme') ||
        text.includes('kanal') ||
        text.includes('hafriyat') ||
        text.includes('istaç') ||
        text.includes('tehlikeli') ||
        text.includes('aeee') ||
        text.includes('geri kazanım') ||
        text.includes('çevre') ||
        text.includes('tay_atiksu_') ||
        text.includes('tay_aat_') ||
        text.includes('tay_pln_aat_') ||
        text.includes('tay_desarj_') ||
        text.includes('tay_yagmurs_') ||
        text.includes('tay_yagmur_') ||
        text.includes('tay_ygmr_') ||
        text.includes('tay_avr_dere_') ||
        text.includes('tay_and_dere_') ||
        text.includes('tay_dere_taskin') ||
        text.includes('tay_gerikazanim') ||
        text.includes('tay_katiatik_') ||
        text.includes('tay_atik_') ||
        text.includes('tay_tehlikeliatk_') ||
        text.includes('tay_aeee_') ||
        text.includes('tay_aktf_hafriyat') ||
        text.includes('tay_psf_hafriyat') ||
        text.includes('tay_hafriyatyntm')
      );
    }
    if (compCode === '3.4') {
      // Bilgi, İletişim ve Acil Durum Altyapıları
      return (
        text.includes('haberleşme') ||
        text.includes('iletişim') ||
        text.includes('baz') ||
        text.includes('fiber') ||
        text.includes('santral') ||
        text.includes('veri') ||
        text.includes('data center') ||
        text.includes('telekom') ||
        text.includes('sağlık') ||
        text.includes('hastane') ||
        text.includes('telsiz') ||
        text.includes('tay_veri_merkezleri') ||
        text.includes('tay_sagliktesis_')
      );
    }
  }

  if (group === 'lojistik') {
    if (compCode === '3.1') {
      // Kritik Lojistik Ulaşım Ağları (Karayolu, Demiryolu, Havayolu, Denizyolu)
      return (
        text.includes('yük') ||
        text.includes('kargo') ||
        text.includes('koridor') ||
        text.includes('tır') ||
        text.includes('kamyon') ||
        text.includes('havalimanı') ||
        text.includes('gros ton') ||
        text.includes('gemi') ||
        text.includes('elleçleme') ||
        text.includes('ro-ro') ||
        text.includes('liman') ||
        text.includes('rıhtım') ||
        text.includes('konteyner') ||
        text.includes('tcdd') ||
        text.includes('karayolu') ||
        text.includes('demiryolu') ||
        text.includes('loj_tcdd_yuk_') ||
        text.includes('loj_havalimanı_yuk') ||
        text.includes('loj_gros_ton') ||
        text.includes('loj_gemi_sayisi') ||
        text.includes('loj_konteyner_yuk') ||
        text.includes('loj_yuk_ellecleme') ||
        text.includes('loj_ro-ro') ||
        text.includes('loj_marmara_bolgesi_liman') ||
        text.includes('lojistik_limanlar') ||
        text.includes('marmara_havalimanlari')
      );
    }
    if (compCode === '3.2') {
      // Kritik Lojistik Odakları (OSB, Sanayi, Gebze, Haller, Serbest Bölgeler, Nakliye Firmaları)
      return (
        text.includes('lojistik') ||
        text.includes('osb') ||
        text.includes('organize sanayi') ||
        text.includes('sanayi') ||
        text.includes('gebze') ||
        text.includes('hal') ||
        text.includes('haller') ||
        text.includes('kuru gıda') ||
        text.includes('sebze') ||
        text.includes('meyve') ||
        text.includes('su ürünleri') ||
        text.includes('serbest bölge') ||
        text.includes('nakliye') ||
        text.includes('çdp') ||
        text.includes('haller_2025') ||
        text.includes('marmara_osb_') ||
        text.includes('sanayi_alan_') ||
        text.includes('kocaeli_gebze_sanayi') ||
        text.includes('loj_anadolu_yakası_osb') ||
        text.includes('loj_kimya_osb') ||
        text.includes('loj_deri_osb') ||
        text.includes('loj_tuzla_osb') ||
        text.includes('loj_birlik_osb') ||
        text.includes('loj_dudullu_osb') ||
        text.includes('loj_beylikdüzü_osb') ||
        text.includes('loj_ikitelli_osb') ||
        text.includes('marmara_serbest_bolgeler') ||
        text.includes('cdp_2009_alan') ||
        text.includes('nakliye_firma')
      );
    }
    if (compCode === '3.3') {
      // Kritik Lojistik Terminaller & Gümrük Merkezleri
      return (
        text.includes('terminal') ||
        text.includes('yük terminali') ||
        text.includes('gümrük') ||
        text.includes('gumruk') ||
        text.includes('antrepo') ||
        text.includes('ithalat') ||
        text.includes('ihracat') ||
        text.includes('parlayıcı') ||
        text.includes('yanıcı') ||
        text.includes('patlayıcı') ||
        text.includes('depo') ||
        text.includes('ambar') ||
        text.includes('soğuk hava') ||
        text.includes('stok') ||
        text.includes('dolum') ||
        text.includes('tır parkı') ||
        text.includes('yuk_terminalleri_2025') ||
        text.includes('gumruk_mudurlukleri_2025') ||
        text.includes('loj_istanbul_gumruk_') ||
        text.includes('loj_istanbul_parlayıcı_depolar') ||
        text.includes('yanici_patlayici_depo_2025')
      );
    }
  }

  return true;
}

export const SpatialHazardInventory: React.FC<SpatialHazardInventoryProps> = ({
  activeGroup,
  data,
  workStatus,
  rowOverrides,
  customRows,
  onUpdateWorkStatus,
  onUpdateRowOverride,
  onAddCustomRow,
  onDeleteRow,
  activeChapterNum = '4',
  onSelectChapter
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>(activeChapterNum);
  const [selectedCompCode, setSelectedCompCode] = useState<string>('3.1');
  const [selectedHazardCode, setSelectedHazardCode] = useState<string>('4.1');
  
  // Custom layer adding state
  const [newCustomLayerName, setNewCustomLayerName] = useState<string>('');
  
  // Table search & filter state
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [onlyGapsFilter, setOnlyGapsFilter] = useState<boolean>(false);
  
  // Inline editing state
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const groupData = data[activeGroup] || { label: 'Sektör', sections: [], chapters: [] };
  const sections = groupData.sections || [];

  // Extract Critical Components (Chapter 3 sections)
  const criticalComponents = useMemo(() => {
    return sections.filter((s: any) => s.code.startsWith('3.'));
  }, [sections]);

  // Ensure selectedCompCode is valid
  useEffect(() => {
    if (criticalComponents.length > 0) {
      const exists = criticalComponents.some((c: any) => c.code === selectedCompCode);
      if (!exists) {
        setSelectedCompCode(criticalComponents[0].code);
      }
    }
  }, [criticalComponents, selectedCompCode]);

  // Extract Hazards for currently selected chapter (4, 5, 6, or 8)
  const currentHazards = useMemo(() => {
    return sections.filter((s: any) => s.code.startsWith(`${selectedChapter}.`));
  }, [sections, selectedChapter]);

  // Ensure selectedHazardCode is valid
  useEffect(() => {
    if (currentHazards.length > 0) {
      const exists = currentHazards.some((h: any) => h.code === selectedHazardCode);
      if (!exists) {
        setSelectedHazardCode(currentHazards[0].code);
      }
    }
  }, [currentHazards, selectedHazardCode]);

  const activeChapterMeta = useMemo(() => {
    return SPATIAL_CHAPTERS.find(c => c.num === selectedChapter) || SPATIAL_CHAPTERS[0];
  }, [selectedChapter]);

  const activeComp = useMemo(() => {
    return criticalComponents.find((c: any) => c.code === selectedCompCode) || criticalComponents[0];
  }, [criticalComponents, selectedCompCode]);

  const activeHazard = useMemo(() => {
    return currentHazards.find((h: any) => h.code === selectedHazardCode) || currentHazards[0];
  }, [currentHazards, selectedHazardCode]);

  // Compute stats and items for a specific (Component x Hazard) cell
  const getCellData = (compCode: string, hazardCode: string) => {
    const hazardSec = sections.find((s: any) => s.code === hazardCode);
    const compSec = sections.find((s: any) => s.code === compCode);
    if (!hazardSec && !compSec) return { items: [], total: 0, available: 0, gaps: 0, done: 0 };

    const items: any[] = [];
    let total = 0;
    let available = 0;
    let gaps = 0;
    let done = 0;

    // 1. Primary: All official Geographic Database (GIS) Layers belonging to this Critical Component
    if (compSec) {
      (compSec.entries || []).forEach((e: any, eIdx: number) => {
        (e.veri || []).forEach((v: any, vIdx: number) => {
          const id = `${activeGroup}|comp_gis|${compCode}|${hazardCode}|${eIdx}|${vIdx}`;
          const override = rowOverrides[id];
          if (override?.deleted) return;

          const name = override?.n !== undefined ? override.n : v.n;
          const hasData = override?.v !== undefined ? override.v : v.v;
          const st = workStatus[id]?.status || 'todo';
          const priority = workStatus[id]?.priority || 'normal';
          const note = workStatus[id]?.note || '';

          total++;
          if (hasData) available++;
          else gaps++;

          if (st === 'done') done++;

          items.push({
            id,
            name,
            hasData,
            status: st,
            priority,
            note,
            isCustom: false,
            layerType: 'gis',
            analiz: `${hazardSec?.title || 'Afet'} Maruziyet ve Hasar Analizi`,
            sartname: `${compSec.code} ${compSec.title}`,
            compCode
          });
        });
      });
    }

    // 2. Secondary: Hazard Scenario, Damage & Overlay layers from the Hazard Section
    if (hazardSec) {
      (hazardSec.entries || []).forEach((e: any, eIdx: number) => {
        (e.veri || []).forEach((v: any, vIdx: number) => {
          // Avoid duplicate display if name already exists
          if (items.some(it => it.name.trim().toLowerCase() === v.n.trim().toLowerCase())) return;

          const isMatched = matchesComponent(v.n, compCode, activeGroup);
          const isGeneralHazard = 
            v.n.toLowerCase().includes('dezim') || 
            v.n.toLowerCase().includes('senaryo') || 
            v.n.toLowerCase().includes('olasılıksal') || 
            v.n.toLowerCase().includes('deterministik') ||
            v.n.toLowerCase().includes('pga') ||
            v.n.toLowerCase().includes('tehlike sentezi') ||
            v.n.toLowerCase().includes('duyarlılık') ||
            v.n.toLowerCase().includes('taşkın') ||
            v.n.toLowerCase().includes('tsunami') ||
            v.n.toLowerCase().includes('heyelan') ||
            v.n.toLowerCase().includes('yangın') ||
            v.n.toLowerCase().includes('sıcaklık');

          if (!isMatched && !isGeneralHazard) return;

          const id = `${activeGroup}|hazard_ovl|${hazardCode}|${compCode}|${eIdx}|${vIdx}`;
          const override = rowOverrides[id];
          if (override?.deleted) return;

          const name = override?.n !== undefined ? override.n : v.n;
          const hasData = override?.v !== undefined ? override.v : v.v;
          const st = workStatus[id]?.status || 'todo';
          const priority = workStatus[id]?.priority || 'normal';
          const note = workStatus[id]?.note || '';

          total++;
          if (hasData) available++;
          else gaps++;

          if (st === 'done') done++;

          items.push({
            id,
            name,
            hasData,
            status: st,
            priority,
            note,
            isCustom: false,
            layerType: 'hazard',
            analiz: e.analiz || e.sartname || `${hazardSec.title} Analiz Modeli`,
            sartname: e.sartname || hazardSec.title,
            compCode
          });
        });
      });
    }

    // 3. User Defined Custom Layers for this intersection
    const customKey1 = `${activeGroup}::${hazardCode}`;
    const customKey2 = `${activeGroup}::${hazardCode}::${compCode}`;
    const rawCustom = [...(customRows[customKey1] || []), ...(customRows[customKey2] || [])];

    rawCustom.forEach((c: any) => {
      const id = `custom|${activeGroup}|${hazardCode}|${compCode}|${c.id}`;
      const override = rowOverrides[id];
      if (override?.deleted) return;

      const name = override?.n !== undefined ? override.n : c.name;
      const hasData = override?.v !== undefined ? override.v : (c.v !== undefined ? c.v : true);
      const st = workStatus[id]?.status || 'todo';
      const priority = workStatus[id]?.priority || 'normal';
      const note = workStatus[id]?.note || '';

      total++;
      if (hasData) available++;
      else gaps++;

      if (st === 'done') done++;

      items.push({
        id,
        name,
        hasData,
        status: st,
        priority,
        note,
        isCustom: true,
        layerType: 'custom',
        analiz: 'Özel Veri Katmanı',
        sartname: 'Kullanıcı Tanımlı Veri',
        compCode
      });
    });

    return { items, total, available, gaps, done };
  };

  // Active cell data
  const currentCellData = useMemo(() => {
    return getCellData(selectedCompCode, selectedHazardCode);
  }, [selectedCompCode, selectedHazardCode, sections, rowOverrides, workStatus, customRows, activeGroup]);

  // Filtered active cell items
  const displayedItems = useMemo(() => {
    return currentCellData.items.filter(item => {
      if (onlyGapsFilter && item.hasData) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.analiz.toLowerCase().includes(q) || item.note.toLowerCase().includes(q);
      }
      return true;
    });
  }, [currentCellData.items, onlyGapsFilter, searchFilter]);

  const handleAddNewLayer = () => {
    if (!newCustomLayerName.trim()) return;
    onAddCustomRow(activeGroup, selectedHazardCode, newCustomLayerName.trim(), selectedCompCode);
    setNewCustomLayerName('');
  };

  const handleSaveEdit = (id: string) => {
    if (!editingText.trim()) return;
    onUpdateRowOverride(id, { n: editingText.trim() });
    setEditingRowId(null);
    setEditingText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. TOP CHAPTER BAR: Clean Architectural Selector */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '6px',
        padding: '12px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: '#0F172A',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.03em'
            }}>
              {groupData.label.toLocaleUpperCase('tr-TR')}
            </span>
            <h2 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#0F172A' }}>
              Mekânsal Veri Envanteri & Afet Risk Matrisi
            </h2>
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>
            Mekânsal analiz bölümleri: 4, 5, 6 ve 8
          </span>
        </div>

        {/* 4 Chapter Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px'
        }}>
          {SPATIAL_CHAPTERS.map(ch => {
            const isSelected = selectedChapter === ch.num;

            // calculate chapter summary
            let chTotal = 0;
            let chAvailable = 0;
            let chGaps = 0;

            const chHazards = sections.filter((s: any) => s.code.startsWith(`${ch.num}.`));
            criticalComponents.forEach((c: any) => {
              chHazards.forEach((h: any) => {
                const stat = getCellData(c.code, h.code);
                chTotal += stat.total;
                chAvailable += stat.available;
                chGaps += stat.gaps;
              });
            });

            return (
              <button
                key={ch.num}
                type="button"
                onClick={() => {
                  setSelectedChapter(ch.num);
                  if (onSelectChapter) onSelectChapter(ch.num);
                  const firstH = sections.find((s: any) => s.code.startsWith(`${ch.num}.`));
                  if (firstH) setSelectedHazardCode(firstH.code);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '9px 12px',
                  borderRadius: '5px',
                  border: isSelected ? '1px solid #0F172A' : '1px solid #E2E8F0',
                  background: isSelected ? '#0F172A' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#0F172A',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.12s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    fontFamily: 'monospace',
                    color: isSelected ? '#94A3B8' : '#64748B' 
                  }}>
                    {ch.num}. BÖLÜM
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: isSelected ? '#E2E8F0' : '#475569'
                  }}>
                    {chTotal} katman
                  </span>
                </div>

                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: isSelected ? '#FFFFFF' : '#0F172A',
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {ch.title}
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  fontSize: '10px', 
                  color: isSelected ? '#94A3B8' : '#64748B',
                  marginTop: '1px'
                }}>
                  <span>{chAvailable} var · {chGaps} eksik</span>
                  <span style={{ fontWeight: 600, color: isSelected ? '#34D399' : '#059669' }}>
                    %{chTotal > 0 ? Math.round((chAvailable / chTotal) * 100) : 0}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN 2D MATRIX CONTAINER */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        {/* Matrix Header Title */}
        <div style={{
          padding: '10px 16px',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              fontFamily: 'monospace',
              fontSize: '11px',
              fontWeight: 700,
              background: '#E2E8F0',
              padding: '2px 6px',
              borderRadius: '3px',
              color: '#334155'
            }}>
              {activeChapterMeta.num}. BÖLÜM
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
              {activeChapterMeta.title} Matrisi
            </span>
          </div>

          <div style={{ fontSize: '11px', color: '#64748B' }}>
            Hücreye tıklayarak veri katmanlarını altta listeleyin.
          </div>
        </div>

        {/* The Matrix Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #CBD5E1' }}>
                {/* Top Left: Critical Components Title */}
                <th style={{
                  padding: '10px 14px',
                  width: '260px',
                  minWidth: '240px',
                  borderRight: '1px solid #CBD5E1',
                  verticalAlign: 'bottom',
                  background: '#F1F5F9',
                  color: '#0F172A',
                  fontWeight: 700
                }}>
                  <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '2px', fontWeight: 600 }}>
                    3. BÖLÜM BİLEŞENLERİ
                  </div>
                  <div style={{ fontSize: '12px', color: '#0F172A' }}>
                    Kritik Altyapı Bileşeni
                  </div>
                </th>

                {/* Column Headers: Hazard Topics of Selected Chapter */}
                {currentHazards.map((h: any) => {
                  const isColActive = selectedHazardCode === h.code;
                  return (
                    <th
                      key={h.code}
                      style={{
                        padding: '10px 12px',
                        minWidth: '150px',
                        borderRight: '1px solid #E2E8F0',
                        borderBottom: isColActive ? '2px solid #0F172A' : '1px solid #CBD5E1',
                        background: isColActive ? '#F1F5F9' : '#F8FAFC',
                        verticalAlign: 'top',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedHazardCode(h.code)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span className="mono" style={{ fontWeight: 700, fontSize: '11px', color: isColActive ? '#0F172A' : '#64748B' }}>
                          {h.code}
                        </span>
                        {isColActive && (
                          <span style={{ fontSize: '9px', fontWeight: 700, background: '#0F172A', color: '#FFFFFF', padding: '1px 4px', borderRadius: '2px' }}>
                            Aktif
                          </span>
                        )}
                      </div>
                      <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '11px', lineHeight: 1.3 }}>
                        {h.title}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {criticalComponents.map((comp: any, rIdx: number) => {
                const isRowActive = selectedCompCode === comp.code;

                return (
                  <tr
                    key={comp.code}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background: isRowActive ? '#F8FAFC' : rIdx % 2 === 0 ? '#FFFFFF' : '#FAFAFA'
                    }}
                  >
                    {/* Row Header: Critical Component Info */}
                    <td
                      style={{
                        padding: '10px 14px',
                        borderRight: '1px solid #CBD5E1',
                        verticalAlign: 'middle',
                        background: isRowActive ? '#F1F5F9' : '#FFFFFF',
                        borderLeft: isRowActive ? '3px solid #0F172A' : '3px solid transparent',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedCompCode(comp.code)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                        <span className="mono" style={{ fontWeight: 700, fontSize: '11px', color: '#0F172A' }}>
                          {comp.code}
                        </span>
                      </div>
                      <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '11px', lineHeight: 1.3 }}>
                        {comp.title}
                      </div>
                    </td>

                    {/* Matrix Cells */}
                    {currentHazards.map((hazard: any) => {
                      const isCellActive = selectedCompCode === comp.code && selectedHazardCode === hazard.code;
                      const stats = getCellData(comp.code, hazard.code);

                      return (
                        <td
                          key={`${comp.code}_${hazard.code}`}
                          style={{
                            padding: '8px',
                            borderRight: '1px solid #E2E8F0',
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            background: isCellActive ? '#F1F5F9' : 'transparent',
                            transition: 'background 0.1s ease'
                          }}
                          onClick={() => {
                            setSelectedCompCode(comp.code);
                            setSelectedHazardCode(hazard.code);
                          }}
                        >
                          <div style={{
                            padding: '8px 10px',
                            borderRadius: '4px',
                            border: isCellActive ? '1px solid #0F172A' : '1px solid #E2E8F0',
                            background: '#FFFFFF',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                          }}>
                            {/* Top row of cell */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                              <span style={{ fontSize: '11px', fontWeight: 600, color: '#0F172A' }}>
                                {stats.total} Katman
                              </span>
                              {stats.gaps === 0 && stats.total > 0 ? (
                                <span style={{ color: '#059669', fontSize: '10px', fontWeight: 600 }}>
                                  Tam
                                </span>
                              ) : stats.gaps > 0 ? (
                                <span style={{ color: '#DC2626', fontSize: '10px', fontWeight: 600 }}>
                                  {stats.gaps} eksik
                                </span>
                              ) : (
                                <span style={{ color: '#94A3B8', fontSize: '10px' }}>0</span>
                              )}
                            </div>

                            {/* Minimal Neutral Progress bar */}
                            <div style={{
                              width: '100%',
                              height: '4px',
                              background: '#F1F5F9',
                              borderRadius: '2px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                width: `${stats.total > 0 ? (stats.available / stats.total) * 100 : 0}%`,
                                height: '100%',
                                background: stats.gaps === 0 ? '#059669' : '#0F172A',
                                borderRadius: '2px'
                              }} />
                            </div>

                            {/* Progress details */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: '#64748B' }}>
                              <span>{stats.available} var</span>
                              <span>{stats.done}/{stats.total} iş</span>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. DEDICATED DATA SHEET: Selected Component x Hazard Intersection */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        {/* Detail Header & Action Toolbar */}
        <div style={{
          padding: '12px 16px',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{
                background: '#0F172A',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '3px'
              }}>
                KESİŞİM DETAYI
              </span>
              <span style={{ fontSize: '11px', color: '#475569' }}>
                {activeComp?.code} {activeComp?.title} × {activeHazard?.code} {activeHazard?.title}
              </span>
            </div>

            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {currentCellData.available}/{currentCellData.total} veri mevcut · {currentCellData.gaps} eksik · {currentCellData.done} tamamlandı
            </div>
          </div>

          {/* Quick Filters and Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: '8px', top: '7px', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Filtrele..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                style={{
                  padding: '4px 8px 4px 26px',
                  fontSize: '11px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '4px',
                  width: '140px'
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => setOnlyGapsFilter(prev => !prev)}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '4px',
                border: '1px solid',
                borderColor: onlyGapsFilter ? '#DC2626' : '#CBD5E1',
                background: onlyGapsFilter ? '#FEF2F2' : '#FFFFFF',
                color: onlyGapsFilter ? '#991B1B' : '#475569',
                cursor: 'pointer'
              }}
            >
              {onlyGapsFilter ? 'Tümünü Göster' : `Sadece Eksikler (${currentCellData.gaps})`}
            </button>
          </div>
        </div>

        {/* Add Custom Layer Bar */}
        <div style={{
          padding: '8px 16px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>
            Yeni Katman Ekle:
          </span>
          <div style={{ display: 'flex', gap: '6px', flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              placeholder={`Örn: ${activeComp?.title} için CBS/hasar katmanı…`}
              value={newCustomLayerName}
              onChange={e => setNewCustomLayerName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleAddNewLayer();
              }}
              style={{
                flex: 1,
                padding: '4px 8px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '4px'
              }}
            />
            <button
              type="button"
              onClick={handleAddNewLayer}
              style={{
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 600,
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Ekle
            </button>
          </div>
        </div>

        {/* Data Items Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '8px 12px', width: '40px', color: '#64748B', fontWeight: 600, fontSize: '11px' }}>#</th>
                <th style={{ padding: '8px 12px', color: '#0F172A', fontWeight: 700, fontSize: '11px' }}>Veri Katmanı / Analiz Sonucu</th>
                <th style={{ padding: '8px 12px', width: '90px', textAlign: 'center', color: '#0F172A', fontWeight: 700, fontSize: '11px' }}>Kaynak</th>
                <th style={{ padding: '8px 12px', width: '130px', color: '#0F172A', fontWeight: 700, fontSize: '11px' }}>İş Durumu</th>
                <th style={{ padding: '8px 12px', width: '90px', color: '#0F172A', fontWeight: 700, fontSize: '11px' }}>Öncelik</th>
                <th style={{ padding: '8px 12px', minWidth: '160px', color: '#0F172A', fontWeight: 700, fontSize: '11px' }}>Not / Açıklama</th>
                <th style={{ padding: '8px 12px', width: '60px', textAlign: 'center', color: '#64748B', fontWeight: 600, fontSize: '11px' }}>İşlem</th>
              </tr>
            </thead>

            <tbody>
              {displayedItems.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: '#64748B', fontSize: '12px' }}>
                    Bu kesişim için eşleşen veri katmanı bulunamadı. Yukarıdaki alandan yeni katman ekleyebilirsiniz.
                  </td>
                </tr>
              ) : (
                displayedItems.map((item, idx) => {
                  const isEditing = editingRowId === item.id;

                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid #E2E8F0',
                        background: !item.hasData ? '#FFFBFB' : idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA'
                      }}
                    >
                      {/* Row Index */}
                      <td style={{ padding: '8px 12px', color: '#94A3B8', fontSize: '11px', verticalAlign: 'middle' }}>
                        {idx + 1}
                      </td>

                      {/* Layer / Analysis Name */}
                      <td style={{ padding: '8px 12px', verticalAlign: 'middle' }}>
                        {isEditing ? (
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={editingText}
                              onChange={e => setEditingText(e.target.value)}
                              style={{
                                flex: 1,
                                padding: '3px 6px',
                                fontSize: '11px',
                                border: '1px solid #0F172A',
                                borderRadius: '3px'
                              }}
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(item.id)}
                              style={{ padding: '3px 6px', background: '#0F172A', color: '#FFF', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                            >
                              <Check size={11} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingRowId(null)}
                              style={{ padding: '3px 6px', background: '#E2E8F0', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                              {item.layerType === 'gis' ? (
                                <span style={{
                                  fontSize: '9px',
                                  fontWeight: 700,
                                  background: '#F1F5F9',
                                  color: '#334155',
                                  padding: '1px 5px',
                                  borderRadius: '3px',
                                  border: '1px solid #E2E8F0',
                                  fontFamily: 'monospace'
                                }}>
                                  CBS Katmanı
                                </span>
                              ) : item.layerType === 'hazard' ? (
                                <span style={{
                                  fontSize: '9px',
                                  fontWeight: 600,
                                  background: '#F8FAFC',
                                  color: '#64748B',
                                  padding: '1px 5px',
                                  borderRadius: '3px',
                                  border: '1px solid #E2E8F0'
                                }}>
                                  Tehlike Modeli
                                </span>
                              ) : null}

                              <span style={{ 
                                fontWeight: 600, 
                                color: '#0F172A', 
                                fontSize: '11px', 
                                lineHeight: 1.35,
                                fontFamily: item.name.includes('_') ? 'monospace, sans-serif' : 'inherit'
                              }}>
                                {item.name}
                              </span>
                            </div>
                            {item.analiz && item.analiz !== 'Özel Veri Katmanı' && (
                              <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', paddingLeft: '2px' }}>
                                {item.analiz}
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Var / Yok Toggle */}
                      <td style={{ padding: '8px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <button
                          type="button"
                          onClick={() => onUpdateRowOverride(item.id, { v: !item.hasData })}
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '3px',
                            fontSize: '10px',
                            fontWeight: 700,
                            border: '1px solid',
                            cursor: 'pointer',
                            background: item.hasData ? '#ECFDF5' : '#FEF2F2',
                            borderColor: item.hasData ? '#A7F3D0' : '#FECDD3',
                            color: item.hasData ? '#065F46' : '#991B1B'
                          }}
                        >
                          {item.hasData ? 'Var' : 'Yok'}
                        </button>
                      </td>

                      {/* Work Status Dropdown */}
                      <td style={{ padding: '8px 12px', verticalAlign: 'middle' }}>
                        <select
                          value={item.status}
                          onChange={e => onUpdateWorkStatus(item.id, { status: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '3px 6px',
                            fontSize: '11px',
                            fontWeight: 500,
                            borderRadius: '3px',
                            border: '1px solid #CBD5E1',
                            background: item.status === 'done' ? '#F0FDF4' : '#FFFFFF',
                            color: item.status === 'done' ? '#065F46' : '#1E293B',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="todo">Başlanmadı</option>
                          <option value="progress">İnceleniyor</option>
                          <option value="gis">CBS Analizi</option>
                          <option value="done">Tamamlandı</option>
                        </select>
                      </td>

                      {/* Priority Dropdown */}
                      <td style={{ padding: '8px 12px', verticalAlign: 'middle' }}>
                        <select
                          value={item.priority}
                          onChange={e => onUpdateWorkStatus(item.id, { priority: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '3px 4px',
                            fontSize: '10px',
                            borderRadius: '3px',
                            border: '1px solid #E2E8F0',
                            background: '#FFFFFF',
                            color: item.priority === 'urgent' || item.priority === 'high' ? '#DC2626' : '#475569'
                          }}
                        >
                          <option value="low">Düşük</option>
                          <option value="normal">Normal</option>
                          <option value="high">Yüksek</option>
                          <option value="urgent">Kritik</option>
                        </select>
                      </td>

                      {/* Notes input */}
                      <td style={{ padding: '8px 12px', verticalAlign: 'middle' }}>
                        <input
                          type="text"
                          placeholder="Not..."
                          value={item.note}
                          onChange={e => onUpdateWorkStatus(item.id, { note: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '3px 6px',
                            fontSize: '11px',
                            border: '1px solid #E2E8F0',
                            borderRadius: '3px',
                            background: item.note ? '#FEFCE8' : '#FFFFFF'
                          }}
                        />
                      </td>

                      {/* Action buttons */}
                      <td style={{ padding: '8px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
                          <button
                            type="button"
                            title="Düzenle"
                            onClick={() => {
                              setEditingRowId(item.id);
                              setEditingText(item.name);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748B',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            type="button"
                            title="Sil"
                            onClick={() => onDeleteRow(item.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#94A3B8',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
