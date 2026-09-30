export type DiagramNodeType = 'data' | 'process' | 'decision' | 'result';
export type PortPosition = 'top' | 'right' | 'bottom' | 'left';

export interface DiagramNode {
  id: string;
  type: DiagramNodeType;
  title: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string; // 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'slate' | 'cyan'
}

export interface DiagramEdge {
  id: string;
  sourceId: string;
  sourcePort: PortPosition;
  targetId: string;
  targetPort: PortPosition;
  label?: string; // e.g. "Evet", "Hayır"
}

export interface DiagramData {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export const NODE_COLORS: Record<string, {
  name: string;
  bg: string;
  border: string;
  text: string;
  headerBg: string;
  badgeBg: string;
  badgeText: string;
  accent: string;
}> = {
  blue: {
    name: 'Mavi (Veri)',
    bg: '#F0F7FF',
    border: '#93C5FD',
    text: '#1E3A8A',
    headerBg: '#DBEAFE',
    badgeBg: '#2563EB',
    badgeText: '#FFFFFF',
    accent: '#3B82F6'
  },
  emerald: {
    name: 'Yeşil (İşlem)',
    bg: '#F0FDF4',
    border: '#86EFAC',
    text: '#14532D',
    headerBg: '#DCFCE7',
    badgeBg: '#16A34A',
    badgeText: '#FFFFFF',
    accent: '#10B981'
  },
  amber: {
    name: 'Kehribar (Karar)',
    bg: '#FFFBEB',
    border: '#FCD34D',
    text: '#78350F',
    headerBg: '#FEF3C7',
    badgeBg: '#D97706',
    badgeText: '#FFFFFF',
    accent: '#F59E0B'
  },
  purple: {
    name: 'Mor (Analiz)',
    bg: '#FAF5FF',
    border: '#D8B4FE',
    text: '#581C87',
    headerBg: '#F3E8FF',
    badgeBg: '#9333EA',
    badgeText: '#FFFFFF',
    accent: '#8B5CF6'
  },
  rose: {
    name: 'Gül / Kırmızı (Sonuç)',
    bg: '#FFF1F2',
    border: '#FDA4AF',
    text: '#881337',
    headerBg: '#FFE4E6',
    badgeBg: '#E11D48',
    badgeText: '#FFFFFF',
    accent: '#F43F5E'
  },
  slate: {
    name: 'Gri / Nötr',
    bg: '#F8FAFC',
    border: '#CBD5E1',
    text: '#1E293B',
    headerBg: '#E2E8F0',
    badgeBg: '#475569',
    badgeText: '#FFFFFF',
    accent: '#64748B'
  },
  cyan: {
    name: 'Turkuaz',
    bg: '#ECFEFF',
    border: '#67E8F9',
    text: '#164E63',
    headerBg: '#CFFAFE',
    badgeBg: '#0891B2',
    badgeText: '#FFFFFF',
    accent: '#06B6D4'
  }
};

export const NODE_TYPE_INFO: Record<DiagramNodeType, {
  label: string;
  iconName: string;
  defaultColor: string;
  desc: string;
}> = {
  data: {
    label: 'Veri',
    iconName: 'Database',
    defaultColor: 'blue',
    desc: 'Girdi ve kaynak veri katmanları'
  },
  process: {
    label: 'İşlem',
    iconName: 'Cpu',
    defaultColor: 'emerald',
    desc: 'Geoprocessing / CBS analiz adımı'
  },
  decision: {
    label: 'Karar',
    iconName: 'HelpCircle',
    defaultColor: 'amber',
    desc: 'Koşullu karar ve dallanma noktası'
  },
  result: {
    label: 'Sonuç',
    iconName: 'Flag',
    defaultColor: 'rose',
    desc: 'Ara veya nihai sentez çıktısı'
  }
};

export function getInitialDiagramForGroup(groupKey: string): DiagramData {
  const groupLabel = groupKey === 'ulasim' 
    ? 'Ulaşım Grubu' 
    : groupKey === 'teknik' 
    ? 'Teknik Altyapı Grubu' 
    : 'Lojistik Grubu';

  return {
    nodes: [
      {
        id: 'node-crit-data',
        type: 'data',
        title: 'Kritik bileşen verisi',
        description: `${groupLabel} varlık ve şebeke envanteri katmanı`,
        x: 80,
        y: 190,
        width: 220,
        height: 100,
        color: 'blue'
      },
      {
        id: 'node-decision',
        type: 'decision',
        title: 'Yapıyla ilişkili nokta mı?',
        description: 'Bina/tesis veya çizgi/alan ayrımı',
        x: 390,
        y: 155,
        width: 200,
        height: 170,
        color: 'amber'
      },
      {
        id: 'node-yes-select',
        type: 'process',
        title: 'MAKS’taki ilgili yapıları seç — Select Layer By Location',
        description: 'Mekânsal Adres Kayıt Sistemi yapı eşleştirmesi',
        x: 720,
        y: 60,
        width: 270,
        height: 95,
        color: 'emerald'
      },
      {
        id: 'node-yes-copy',
        type: 'process',
        title: 'Copy Features',
        description: 'Öznitelik ve geometri katmanını çoğaltma',
        x: 1070,
        y: 60,
        width: 200,
        height: 95,
        color: 'emerald'
      },
      {
        id: 'node-yes-score',
        type: 'result',
        title: 'Hazır 1–5 maruziyet puanlarını kullan',
        description: 'Yapı bazlı doğrulanmış puan ölçeği',
        x: 1350,
        y: 60,
        width: 240,
        height: 95,
        color: 'purple'
      },
      {
        id: 'node-hazard-poly',
        type: 'data',
        title: 'Sel/taşkın, heyelan veya tsunami tehlike poligonları',
        description: 'İBB DEZİM & AFAD senaryo tehlike haritaları',
        x: 390,
        y: 410,
        width: 270,
        height: 105,
        color: 'blue'
      },
      {
        id: 'node-no-join',
        type: 'process',
        title: 'Intersect veya Spatial Join',
        description: 'Çakışan alan ve maruziyet tespiti',
        x: 760,
        y: 290,
        width: 230,
        height: 95,
        color: 'emerald'
      },
      {
        id: 'node-no-result',
        type: 'result',
        title: 'Maruziyet sonucunu üret',
        description: 'Metre/alan bazlı hasar görebilirlik çıktısı',
        x: 1070,
        y: 290,
        width: 220,
        height: 95,
        color: 'purple'
      },
      {
        id: 'node-group-save',
        type: 'result',
        title: 'Grubun sonuçlarını kaydet',
        description: `${groupLabel} çoklu risk sentezi ve rapor tablosu`,
        x: 1440,
        y: 230,
        width: 250,
        height: 110,
        color: 'rose'
      },
      {
        id: 'node-hazturk',
        type: 'data',
        title: 'Deprem: HAZTURK yapı bazlı hasar tahminleri',
        description: 'Olası İstanbul depreminde bina yıkılma ve hasar olasılıkları',
        x: 80,
        y: 380,
        width: 260,
        height: 105,
        color: 'slate'
      }
    ],
    edges: [
      {
        id: 'edge-1',
        sourceId: 'node-crit-data',
        sourcePort: 'right',
        targetId: 'node-decision',
        targetPort: 'left'
      },
      {
        id: 'edge-yes-1',
        sourceId: 'node-decision',
        sourcePort: 'top',
        targetId: 'node-yes-select',
        targetPort: 'left',
        label: 'Evet'
      },
      {
        id: 'edge-yes-2',
        sourceId: 'node-yes-select',
        sourcePort: 'right',
        targetId: 'node-yes-copy',
        targetPort: 'left'
      },
      {
        id: 'edge-yes-3',
        sourceId: 'node-yes-copy',
        sourcePort: 'right',
        targetId: 'node-yes-score',
        targetPort: 'left'
      },
      {
        id: 'edge-yes-merge',
        sourceId: 'node-yes-score',
        sourcePort: 'right',
        targetId: 'node-group-save',
        targetPort: 'top'
      },
      {
        id: 'edge-no-1',
        sourceId: 'node-decision',
        sourcePort: 'bottom',
        targetId: 'node-no-join',
        targetPort: 'left',
        label: 'Hayır'
      },
      {
        id: 'edge-hazard-join',
        sourceId: 'node-hazard-poly',
        sourcePort: 'right',
        targetId: 'node-no-join',
        targetPort: 'bottom'
      },
      {
        id: 'edge-no-res',
        sourceId: 'node-no-join',
        sourcePort: 'right',
        targetId: 'node-no-result',
        targetPort: 'left'
      },
      {
        id: 'edge-no-merge',
        sourceId: 'node-no-result',
        sourcePort: 'right',
        targetId: 'node-group-save',
        targetPort: 'left'
      }
    ]
  };
}
