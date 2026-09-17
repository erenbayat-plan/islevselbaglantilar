import React, { useState, useEffect } from 'react';
import { PaletteItem } from '../../workflowDataExtractor';
import { WorkflowNodeType, NODE_TYPE_META, ANALYSIS_METHODS } from '../../workflowTypes';
import { 
  X, 
  Check, 
  Plus, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  FileCheck, 
  Boxes,
  Trash2,
  Sparkles
} from 'lucide-react';

interface PaletteItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  item: PaletteItem | null;
  defaultType?: WorkflowNodeType;
  activeGroup?: string;
  onSave: (savedItem: PaletteItem, andAddToCanvas?: boolean) => void;
  onDelete?: (itemId: string) => void;
}

export const PaletteItemModal: React.FC<PaletteItemModalProps> = ({
  isOpen,
  onClose,
  mode,
  item,
  defaultType = 'hazard',
  activeGroup = 'ulasim',
  onSave,
  onDelete
}) => {
  const [type, setType] = useState<WorkflowNodeType>(defaultType);
  const [title, setTitle] = useState('');
  const [chapterNum, setChapterNum] = useState('4');
  const [workingGroup, setWorkingGroup] = useState(activeGroup === 'hepsi' ? 'ulasim' : activeGroup);
  const [dataFormat, setDataFormat] = useState('Vektör (Poligon)');
  const [geometryType, setGeometryType] = useState('Poligon');
  const [dataSource, setDataSource] = useState('');
  const [dataYear, setDataYear] = useState('2025');
  const [analysisMethod, setAnalysisMethod] = useState('');
  const [componentGroup, setComponentGroup] = useState('');
  const [relatedHazard, setRelatedHazard] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && item) {
        setType(item.type);
        setTitle(item.title || '');
        setChapterNum(item.chapterNum || '4');
        setWorkingGroup(item.workingGroup || (activeGroup === 'hepsi' ? 'ulasim' : activeGroup));
        setDataFormat(item.dataFormat || 'Vektör (Poligon)');
        setGeometryType(item.geometryType || 'Poligon');
        setDataSource(item.dataSource || '');
        setDataYear(item.dataYear || '2025');
        setAnalysisMethod(item.analysisMethod || '');
        setComponentGroup(item.componentGroup || '');
        setRelatedHazard(item.relatedHazard || '');
        setDescription(item.description || '');
      } else {
        // Create mode
        const initialType = defaultType || 'hazard';
        setType(initialType);
        setTitle('');
        setChapterNum(
          initialType === 'critical_component' ? '3' :
          initialType === 'integrated_assessment' ? '8' :
          initialType === 'analysis_method' ? 'genel' : '4'
        );
        setWorkingGroup(activeGroup === 'hepsi' ? 'ulasim' : activeGroup);
        setDataFormat(
          initialType === 'analysis_method' ? 'CBS Yöntemi / Araç' :
          initialType === 'hazard' ? 'Vektör (Poligon)' :
          initialType === 'critical_component' ? 'Vektör (Çizgi)' : 'Vektör / Raster Harita'
        );
        setGeometryType(
          initialType === 'analysis_method' ? 'Yok' :
          initialType === 'critical_component' ? 'Çizgi' : 'Poligon'
        );
        setDataSource(
          initialType === 'hazard' ? 'İBB Deprem ve Zemin İnceleme Şube Müdürlüğü (DEZİM)' :
          initialType === 'critical_component' ? 'İBB Ulaşım Dairesi / İSKİ / TEİAŞ' : ''
        );
        setDataYear('2025');
        setAnalysisMethod(initialType === 'analysis_method' ? 'Mekânsal çakışma analizi' : '');
        setComponentGroup('');
        setRelatedHazard('');
        setDescription('');
      }
      setError(null);
    }
  }, [isOpen, mode, item, defaultType, activeGroup]);

  if (!isOpen) return null;

  const handleTypeChange = (newType: WorkflowNodeType) => {
    setType(newType);
    if (newType === 'critical_component') {
      setChapterNum('3');
      setDataFormat('Vektör (Çizgi)');
      setGeometryType('Çizgi');
    } else if (newType === 'integrated_assessment') {
      setChapterNum('8');
      setDataFormat('Çok Kriterli Sentez Modeli');
      setGeometryType('Poligon');
    } else if (newType === 'analysis_method') {
      setChapterNum('genel');
      setDataFormat('CBS Yöntemi / Araç');
      setGeometryType('Yok');
    } else if (newType === 'hazard') {
      if (chapterNum === '3' || chapterNum === '8') setChapterNum('4');
      setDataFormat('Vektör (Poligon)');
      setGeometryType('Poligon');
    }
  };

  const handleSubmit = (andAddToCanvas = false) => {
    if (!title.trim()) {
      setError('Lütfen bir başlık / ad giriniz.');
      return;
    }

    const idToUse = mode === 'edit' && item 
      ? item.id 
      : `custom-${type}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

    const savedItem: PaletteItem = {
      id: idToUse,
      type,
      title: title.trim(),
      chapterNum,
      workingGroup,
      dataFormat,
      geometryType,
      dataSource: dataSource.trim() || undefined,
      dataYear: dataYear.trim() || undefined,
      analysisMethod: type === 'analysis_method' ? (analysisMethod.trim() || undefined) : undefined,
      componentGroup: componentGroup.trim() || undefined,
      relatedHazard: relatedHazard.trim() || undefined,
      description: description.trim() || undefined,
      isCustom: true
    };

    onSave(savedItem, andAddToCanvas);
    onClose();
  };

  const meta = NODE_TYPE_META[type] || NODE_TYPE_META.hazard;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: meta.bgColor,
                color: meta.color,
                border: `1px solid ${meta.borderColor}`,
                textTransform: 'uppercase'
              }}
            >
              {meta.badge}
            </span>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
              {mode === 'create' ? `Yeni ${meta.badge} Öğesi Ekle` : `${meta.badge} Öğesini Düzenle`}
            </div>
          </div>

          <button
            type="button"
            title="Kapat"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Form Body */}
        <div style={{ padding: '18px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {error && (
            <div style={{ padding: '8px 12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', fontSize: '11px', color: '#B91C1C' }}>
              {error}
            </div>
          )}

          {/* Type Selector Tabs */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
              Öğe Türü / Kategorisi:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {[
                { id: 'hazard', label: 'Tehlike', icon: AlertTriangle, color: '#DC2626', bg: '#FEF2F2' },
                { id: 'critical_component', label: 'Bileşen', icon: Layers, color: '#2563EB', bg: '#EFF6FF' },
                { id: 'analysis_method', label: 'Analiz', icon: Cpu, color: '#D97706', bg: '#FFFBEB' },
                { id: 'intermediate_output', label: 'Çıktı', icon: FileCheck, color: '#059669', bg: '#ECFDF5' }
              ].map(t => {
                const IconComponent = t.icon;
                const isSel = type === t.id || (t.id === 'intermediate_output' && type === 'integrated_assessment');
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTypeChange(t.id as WorkflowNodeType)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      padding: '8px 4px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSel ? `2px solid ${t.color}` : '1px solid #E2E8F0',
                      background: isSel ? t.bg : '#F8FAFC',
                      color: isSel ? t.color : '#64748B',
                      transition: 'all 120ms ease'
                    }}
                  >
                    <IconComponent size={13} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
              Katman / Yöntem / Çıktı Adı: <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={title}
              placeholder={
                type === 'hazard' ? 'örn. 4.1.2 Zemin Büyütmesi Haritası (Vs30)' :
                type === 'critical_component' ? 'örn. 3.1.4 Metro Hatları ve İstasyonları' :
                type === 'analysis_method' ? 'örn. Çok Kriterli Mekânsal Kırılganlık Örtüşmesi' :
                'örn. Taşkın Riski Altındaki Kritik Tesisler Sentez Haritası'
              }
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#0F172A',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Working Group and Chapter in Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Çalışma Grubu:
              </label>
              <select
                value={workingGroup}
                onChange={(e) => setWorkingGroup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#0F172A',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="ulasim">Ulaşım</option>
                <option value="teknikaltyapi">Teknik Altyapı</option>
                <option value="lojistik">Lojistik</option>
                <option value="hepsi">Tüm Gruplar (Bütünleşik)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Rapor Bölümü:
              </label>
              <select
                value={chapterNum}
                onChange={(e) => setChapterNum(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#0F172A',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="3">3. Bölüm (Kritik Bileşenler)</option>
                <option value="4">4. Bölüm (Doğa Kaynaklı Afetler)</option>
                <option value="5">5. Bölüm (İnsan ve Teknoloji)</option>
                <option value="6">6. Bölüm (İklim Değişikliği)</option>
                <option value="8">8. Bölüm (Çoklu Risk Sentezi)</option>
                <option value="genel">Genel / Diğer</option>
              </select>
            </div>
          </div>

          {/* Data Format & Geometry (For data layers and outputs) */}
          {type !== 'analysis_method' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Veri Formatı:
                </label>
                <input
                  type="text"
                  value={dataFormat}
                  placeholder="örn. Vektör (Poligon), Raster PGA"
                  onChange={(e) => setDataFormat(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 9px',
                    fontSize: '11px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Geometri Tipi:
                </label>
                <select
                  value={geometryType}
                  onChange={(e) => setGeometryType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 9px',
                    fontSize: '11px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Poligon">Poligon (Alan)</option>
                  <option value="Çizgi">Çizgi (Hat / Yol / Şebeke)</option>
                  <option value="Nokta">Nokta (Tesis / İstasyon)</option>
                  <option value="Raster">Raster (Grid / Piksel)</option>
                  <option value="Tablo">Tablo / Excel</option>
                </select>
              </div>
            </div>
          )}

          {/* Analysis Method Tool Selector (if analysis_method) */}
          {type === 'analysis_method' && (
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', display: 'block', marginBottom: '4px' }}>
                CBS Analiz Aracı / Yöntemi:
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <select
                  value={analysisMethod}
                  onChange={(e) => setAnalysisMethod(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '7px 9px',
                    fontSize: '11px',
                    fontWeight: 600,
                    border: '1px solid #FDE68A',
                    borderRadius: '6px',
                    backgroundColor: '#FFFBEB',
                    color: '#92400E'
                  }}
                >
                  <option value="">-- Standart CBS Aracı Seçin --</option>
                  {ANALYSIS_METHODS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="veya özel araç yazın..."
                  value={analysisMethod}
                  onChange={(e) => setAnalysisMethod(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '7px 9px',
                    fontSize: '11px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}

          {/* Data Source & Year (for data layers) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Veri Kaynağı / Kurum:
              </label>
              <input
                type="text"
                value={dataSource}
                placeholder="örn. İBB DEZİM, AKOM, İSKİ, TEİAŞ"
                onChange={(e) => setDataSource(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontSize: '11px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Veri Yılı / Güncellik:
              </label>
              <input
                type="text"
                value={dataYear}
                placeholder="2024 / 2025"
                onChange={(e) => setDataYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontSize: '11px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              Açıklama / Şartname Notu / Metodoloji:
            </label>
            <textarea
              rows={2}
              value={description}
              placeholder="Verinin kapsamı, öznitelik gereksinimleri veya analiz mantığı..."
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 9px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: '12px 18px',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          <div>
            {mode === 'edit' && onDelete && item && (
              <button
                type="button"
                onClick={() => {
                  onDelete(item.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #FCA5A5',
                  background: '#FEF2F2',
                  color: '#DC2626',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={13} />
                <span>Sil</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#475569',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Vazgeç
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(false)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#0F172A',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Kütüphaneye Kaydet
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid #2563EB',
                background: '#2563EB',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)'
              }}
            >
              <Plus size={13} />
              <span>Kaydet & Şemaya Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
