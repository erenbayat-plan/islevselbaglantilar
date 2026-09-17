import React from 'react';
import { WorkflowNode, WorkflowEdge, ANALYSIS_METHODS, NODE_TYPE_META } from '../../workflowTypes';
import { 
  X, 
  Trash2, 
  Copy, 
  FileEdit, 
  Link2, 
  CheckCircle2, 
  Clock, 
  Circle,
  Database,
  Info
} from 'lucide-react';

interface WorkflowDetailPanelProps {
  selectedNode: WorkflowNode | null;
  selectedEdge: WorkflowEdge | null;
  allNodes: WorkflowNode[];
  onUpdateNode: (updated: WorkflowNode) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
  onUpdateEdge: (updated: WorkflowEdge) => void;
  onDeleteEdge: (edgeId: string) => void;
  onClose: () => void;
}

export const WorkflowDetailPanel: React.FC<WorkflowDetailPanelProps> = ({
  selectedNode,
  selectedEdge,
  allNodes,
  onUpdateNode,
  onDeleteNode,
  onDuplicateNode,
  onUpdateEdge,
  onDeleteEdge,
  onClose
}) => {
  if (!selectedNode && !selectedEdge) return null;

  // Render edge inspection
  if (selectedEdge) {
    const sourceNode = allNodes.find(n => n.id === selectedEdge.sourceId);
    const targetNode = allNodes.find(n => n.id === selectedEdge.targetId);

    return (
      <div
        style={{
          width: '340px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 35,
          boxShadow: '-2px 0 6px rgba(0,0,0,0.03)'
        }}
      >
        <div
          style={{
            padding: '12px 14px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link2 size={15} style={{ color: '#2563EB' }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Bağlantı Detayı</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              title="Bağlantıyı Sil"
              onClick={() => onDeleteEdge(selectedEdge.id)}
              style={{
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #FCA5A5',
                background: '#FEF2F2',
                color: '#DC2626',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={13} />
            </button>
            <button
              type="button"
              title="Kapat"
              onClick={onClose}
              style={{
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, overflowY: 'auto' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '4px' }}>
              Kaynak Kutu (Girdi):
            </label>
            <div style={{ padding: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '5px', fontSize: '11px', fontWeight: 600, color: '#0F172A' }}>
              {sourceNode ? sourceNode.title : selectedEdge.sourceId}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '4px' }}>
              Hedef Kutu (Çıktı / İşlem):
            </label>
            <div style={{ padding: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '5px', fontSize: '11px', fontWeight: 600, color: '#0F172A' }}>
              {targetNode ? targetNode.title : selectedEdge.targetId}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              İlişki Etiketi:
            </label>
            <input
              type="text"
              value={selectedEdge.label || ''}
              placeholder="Örn: Katman Girdisi, Maruziyet Kriteri..."
              onChange={(e) => onUpdateEdge({ ...selectedEdge, label: e.target.value })}
              style={{
                width: '100%',
                padding: '7px 9px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              İlişki Açıklaması / Metodolojik Not:
            </label>
            <textarea
              rows={3}
              value={selectedEdge.description || ''}
              placeholder="Bu veri setinin ilgili analize aktarım şekli veya filtreleme kriterleri..."
              onChange={(e) => onUpdateEdge({ ...selectedEdge, description: e.target.value })}
              style={{
                width: '100%',
                padding: '7px 9px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Render node inspection
  const node = selectedNode!;
  const meta = NODE_TYPE_META[node.type] || NODE_TYPE_META.analysis_method;

  const handleChange = (field: keyof WorkflowNode, value: any) => {
    onUpdateNode({
      ...node,
      [field]: value
    });
  };

  return (
    <div
      style={{
        width: '360px',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 35,
        boxShadow: '-2px 0 6px rgba(0,0,0,0.03)'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 14px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '3px',
              backgroundColor: meta.bgColor,
              color: meta.color,
              border: `1px solid ${meta.borderColor}`,
              textTransform: 'uppercase'
            }}
          >
            {meta.badge}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Kutu Detayı</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            title="Kutuyu Çoğalt"
            onClick={() => onDuplicateNode(node.id)}
            style={{
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <Copy size={13} />
          </button>
          <button
            type="button"
            title="Kutuyu Sil"
            onClick={() => onDeleteNode(node.id)}
            style={{
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #FCA5A5',
              background: '#FEF2F2',
              color: '#DC2626',
              cursor: 'pointer'
            }}
          >
            <Trash2 size={13} />
          </button>
          <button
            type="button"
            title="Kapat"
            onClick={onClose}
            style={{
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
        {/* Title */}
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
            Kutu Adı (Katman / Yöntem):
          </label>
          <input
            type="text"
            value={node.title}
            onChange={(e) => handleChange('title', e.target.value)}
            style={{
              width: '100%',
              padding: '7px 9px',
              fontSize: '11px',
              fontWeight: 600,
              border: '1px solid #CBD5E1',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Chapter and Working Group */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
              Bağlı Olduğu Bölüm:
            </label>
            <select
              value={node.chapterNum || 'genel'}
              onChange={(e) => handleChange('chapterNum', e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="3">3. Bölüm (Kritik Bileşenler)</option>
              <option value="4">4. Bölüm (Doğa Afetleri)</option>
              <option value="5">5. Bölüm (İnsan/Teknoloji)</option>
              <option value="6">6. Bölüm (İklim Krizi)</option>
              <option value="8">8. Bölüm (Çoklu Risk)</option>
              <option value="genel">Genel / Bütünleşik</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
              Çalışma Grubu:
            </label>
            <select
              value={node.workingGroup || 'hepsi'}
              onChange={(e) => handleChange('workingGroup', e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="ulasim">Ulaşım</option>
              <option value="teknikaltyapi">Teknik Altyapı</option>
              <option value="lojistik">Lojistik</option>
              <option value="hepsi">Bütünleşik (Hepsi)</option>
            </select>
          </div>
        </div>

        {/* Specific context for Analysis Method */}
        {node.type === 'analysis_method' && (
          <>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', display: 'block', marginBottom: '4px' }}>
                Analiz Yöntemi:
              </label>
              <select
                value={node.analysisMethod || ''}
                onChange={(e) => handleChange('analysisMethod', e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: '1px solid #FDE68A',
                  borderRadius: '5px',
                  backgroundColor: '#FFFBEB'
                }}
              >
                <option value="">-- Yöntem Seçiniz --</option>
                {ANALYSIS_METHODS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
                  Analiz Sırası (Adım):
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={node.analysisOrder || 1}
                  onChange={(e) => handleChange('analysisOrder', parseInt(e.target.value) || 1)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    fontSize: '11px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '5px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
                  Üretilecek Çıktı Adı:
                </label>
                <input
                  type="text"
                  placeholder="Örn: Hasar Tahmin Haritası"
                  value={node.outputName || ''}
                  onChange={(e) => handleChange('outputName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    fontSize: '11px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '5px'
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* Data formats and geometry */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
              Veri Formatı:
            </label>
            <input
              type="text"
              placeholder="Vektör SHP, Raster TIF..."
              value={node.dataFormat || ''}
              onChange={(e) => handleChange('dataFormat', e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
              Geometri Türü:
            </label>
            <select
              value={node.geometryType || 'Poligon'}
              onChange={(e) => handleChange('geometryType', e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="Poligon">Poligon</option>
              <option value="Çizgi">Çizgi</option>
              <option value="Nokta">Nokta</option>
              <option value="Raster">Raster</option>
              <option value="Tablo">Tablo / İstatistik</option>
            </select>
          </div>
        </div>

        {/* Fields and Classification info */}
        <div>
          <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
            Kullanılacak Alanlar / Öznitelikler:
          </label>
          <input
            type="text"
            placeholder="Örn: KAPASITE, HIZ, MARUZIYET_KODU"
            value={node.fieldsToUse || ''}
            onChange={(e) => handleChange('fieldsToUse', e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '11px',
              border: '1px solid #CBD5E1',
              borderRadius: '5px'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
            Sınıflandırma ve Eşik Değerleri:
          </label>
          <input
            type="text"
            placeholder="Örn: 5 Dereceli Natural Breaks, 0-1 Normalizasyon"
            value={node.classificationInfo || ''}
            onChange={(e) => handleChange('classificationInfo', e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '11px',
              border: '1px solid #CBD5E1',
              borderRadius: '5px'
            }}
          />
        </div>

        {/* Status */}
        <div>
          <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
            Analiz Durumu:
          </label>
          <select
            value={node.status || 'not_started'}
            onChange={(e) => handleChange('status', e.target.value as any)}
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '11px',
              border: '1px solid #CBD5E1',
              borderRadius: '5px',
              backgroundColor: '#FFFFFF'
            }}
          >
            <option value="not_started">Başlanmadı</option>
            <option value="data_ready">Veri Hazır</option>
            <option value="in_progress">Analiz Aşamasında</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>

        {/* Source & Year */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
              Veri Kaynağı:
            </label>
            <input
              type="text"
              placeholder="İBB DEZİM, İSKİ..."
              value={node.dataSource || ''}
              onChange={(e) => handleChange('dataSource', e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
              Veri Yılı:
            </label>
            <input
              type="text"
              placeholder="2025"
              value={node.dataYear || ''}
              onChange={(e) => handleChange('dataYear', e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>

        {/* Description & Methodology Notes */}
        <div>
          <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '3px' }}>
            Açıklama ve Metodoloji Notu:
          </label>
          <textarea
            rows={3}
            value={node.description || ''}
            placeholder="Analiz veya katmanın amacı, varsayımlar ve teknik detaylar..."
            onChange={(e) => handleChange('description', e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '11px',
              border: '1px solid #CBD5E1',
              borderRadius: '5px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Gap note */}
        <div>
          <label style={{ fontSize: '10px', fontWeight: 600, color: '#DC2626', display: 'block', marginBottom: '3px' }}>
            Eksik Veri veya Yöntem Notu:
          </label>
          <textarea
            rows={2}
            value={node.gapNote || ''}
            placeholder="Eksik katman, projeksiyon farkı, öznitelik eksikliği vb..."
            onChange={(e) => handleChange('gapNote', e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '11px',
              border: '1px solid #FECACA',
              background: '#FFF5F5',
              borderRadius: '5px',
              resize: 'vertical'
            }}
          />
        </div>
      </div>
    </div>
  );
};
