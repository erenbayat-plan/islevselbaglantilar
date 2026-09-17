export type WorkflowNodeType = 
  | 'hazard'                 // 1. Afet ve İklim Tehlikeleri
  | 'critical_component'     // 2. Kritik Bileşenler
  | 'analysis_method'        // 3. Analiz Yöntemi
  | 'intermediate_output'    // 4. Ara Çıktı
  | 'integrated_assessment'; // 5. Bütünleşik Değerlendirme

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  title: string;
  chapterNum: string;        // '4' | '5' | '6' | '8' | '3' | 'genel'
  workingGroup: string;      // 'ulasim' | 'teknikaltyapi' | 'lojistik' | 'hepsi'
  componentGroup?: string;   // e.g. '3.1 Karayolu Ulaşım Ağı'
  relatedHazard?: string;    // e.g. '4.1 Deprem Riski'
  dataFormat?: string;       // e.g. 'Vektör (Çizgi)', 'Raster', 'Tablo'
  geometryType?: string;     // 'Poligon' | 'Çizgi' | 'Nokta' | 'Raster' | 'Tablo'
  fieldsToUse?: string;      // e.g. 'KAPASITE, HIZ, SERIT_SAYISI'
  classificationInfo?: string; // e.g. 'Düşük / Orta / Yüksek / Çok Yüksek (Natural Breaks)'
  analysisMethod?: string;   // e.g. 'Mekânsal çakışma analizi'
  analysisOrder?: number;    // e.g. 1, 2, 3
  inputLayers?: string;      // Girdi katmanları
  outputName?: string;       // Üretilecek çıktı adı
  description?: string;      // Açıklama ve metodoloji notu
  dataSource?: string;       // e.g. 'İBB DEZİM', 'İSKİ'
  dataYear?: string;         // e.g. '2025'
  status?: 'not_started' | 'data_ready' | 'in_progress' | 'completed';
  gapNote?: string;          // Eksik veri veya yöntem notu
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface WorkflowEdge {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
  description?: string;
}

export interface Workflow {
  id: string;
  name: string;
  chapterNum: string;        // '4' | '5' | '6' | '8' | 'hepsi'
  workingGroup: string;      // 'ulasim' | 'teknikaltyapi' | 'lojistik' | 'hepsi'
  purpose: string;
  componentGroup: string;
  expectedOutput: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: number;
  updatedAt: number;
}

export interface WorkflowValidationError {
  id: string;
  type: 
    | 'no_input'
    | 'unconnected_component'
    | 'unassigned_dataset'
    | 'missing_output'
    | 'orphan_node'
    | 'missing_fields'
    | 'unused_output';
  nodeId?: string;
  edgeId?: string;
  message: string;
  severity: 'warning' | 'error' | 'info';
}

export const ANALYSIS_METHODS = [
  'Spatial Join',
  'Intersect',
  'Clip',
  'Buffer ve yakınlık analizi',
  'Overlay',
  'Weighted Overlay',
  'Zonal Statistics',
  'Yoğunluk analizi',
  'Kernel Density',
  'Ağ analizi',
  'Erişilebilirlik analizi',
  'Service Area analizi',
  'Maruziyet sayısı ve oranı',
  'Mekânsal çakışma analizi',
  'Sınıflandırma',
  'Normalizasyon',
  'Ağırlıklandırma',
  'Çoklu tehlike sentezi',
  'Çoklu risk değerlendirmesi',
  'İstatistiksel özetleme',
  'İlçe veya analiz bölgesi bazında toplulaştırma'
] as const;

export const NODE_TYPE_META: Record<WorkflowNodeType, {
  label: string;
  badge: string;
  desc: string;
  color: string;
  borderColor: string;
  bgColor: string;
  iconName: string;
}> = {
  hazard: {
    label: 'Afet ve İklim Tehlikeleri',
    badge: 'Tehlike',
    desc: 'Deprem, taşkın, heyelan, tsunami, iklim tehlikeleri ve senaryoları',
    color: '#DC2626',
    borderColor: '#FECACA',
    bgColor: '#FEF2F2',
    iconName: 'AlertTriangle'
  },
  critical_component: {
    label: 'Kritik Bileşenler',
    badge: 'Bileşen',
    desc: 'Ulaşım ağları, enerji, su, atık, haberleşme ve lojistik varlıkları',
    color: '#2563EB',
    borderColor: '#BFDBFE',
    bgColor: '#EFF6FF',
    iconName: 'Layers'
  },
  analysis_method: {
    label: 'Analiz Yöntemi',
    badge: 'Analiz',
    desc: 'Spatial Join, Buffer, Intersect, Overlay, Ağ Analizi vb.',
    color: '#D97706',
    borderColor: '#FDE68A',
    bgColor: '#FFFBEB',
    iconName: 'Cpu'
  },
  intermediate_output: {
    label: 'Ara Çıktı',
    badge: 'Ara Çıktı',
    desc: 'Hasar/maruziyet haritaları, kayıp tahminleri ve etki katmanları',
    color: '#059669',
    borderColor: '#A7F3D0',
    bgColor: '#ECFDF5',
    iconName: 'FileCheck'
  },
  integrated_assessment: {
    label: 'Bütünleşik Değerlendirme',
    badge: 'Bütünleşik',
    desc: '8. Bölüm çoklu risk sentezi, dayanıklılık indeksi ve öncelik koridorları',
    color: '#7C3AED',
    borderColor: '#DDD6FE',
    bgColor: '#F5F3FF',
    iconName: 'Boxes'
  }
};
