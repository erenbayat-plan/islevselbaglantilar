import React, { useState, useEffect } from 'react';
import { X, Database, Cpu, HelpCircle, Flag, Trash2, Copy, Check } from 'lucide-react';
import { DiagramNode, DiagramNodeType, NODE_COLORS, NODE_TYPE_INFO } from './diagramTypes';

interface NodeEditModalProps {
  isOpen: boolean;
  node: DiagramNode | null;
  onClose: () => void;
  onSave: (nodeId: string, updates: Partial<DiagramNode>) => void;
  onDelete?: (nodeId: string) => void;
  onDuplicate?: (nodeId: string) => void;
}

export const NodeEditModal: React.FC<NodeEditModalProps> = ({
  isOpen,
  node,
  onClose,
  onSave,
  onDelete,
  onDuplicate
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<DiagramNodeType>('process');
  const [color, setColor] = useState('blue');

  useEffect(() => {
    if (node) {
      setTitle(node.title || '');
      setDescription(node.description || '');
      setType(node.type || 'process');
      setColor(node.color || 'blue');
    }
  }, [node]);

  if (!isOpen || !node) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(node.id, {
      title: title.trim(),
      description: description.trim(),
      type,
      color
    });
    onClose();
  };

  return (
    <div className="custom-modal-backdrop" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="custom-modal-dialog" 
        onClick={e => e.stopPropagation()} 
        style={{ maxWidth: '500px', width: '100%' }}
      >
        <div className="custom-modal-header">
          <div className="cmh-title-row">
            <div 
              className="cmh-icon-badge"
              style={{ background: NODE_COLORS[color]?.headerBg || '#E2E8F0', color: NODE_COLORS[color]?.accent || '#334155' }}
            >
              {type === 'data' && <Database size={16} />}
              {type === 'process' && <Cpu size={16} />}
              {type === 'decision' && <HelpCircle size={16} />}
              {type === 'result' && <Flag size={16} />}
            </div>
            <div>
              <h3 className="custom-modal-title">Kutuyu Düzenle</h3>
              <div className="custom-modal-subtitle">Başlık, açıklama, tür ve renk ayarları</div>
            </div>
          </div>
          <button 
            type="button" 
            className="custom-modal-close" 
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="custom-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Kutu Türü Seçimi */}
            <div>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '12px' }}>
                Kutu Türü
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {(Object.keys(NODE_TYPE_INFO) as DiagramNodeType[]).map((t) => {
                  const info = NODE_TYPE_INFO[t];
                  const isSelected = type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setType(t);
                        // Auto-adjust default color if still on prior default
                        if (!node || node.color === NODE_TYPE_INFO[type].defaultColor) {
                          setColor(info.defaultColor);
                        }
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 6px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                        background: isSelected ? '#EFF6FF' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        gap: '4px'
                      }}
                    >
                      <span style={{ color: isSelected ? '#2563EB' : '#64748B' }}>
                        {t === 'data' && <Database size={18} />}
                        {t === 'process' && <Cpu size={18} />}
                        {t === 'decision' && <HelpCircle size={18} />}
                        {t === 'result' && <Flag size={18} />}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: isSelected ? '#1E3A8A' : '#334155' }}>
                        {info.label}
                      </span>
                      {t === 'decision' && (
                        <span style={{ fontSize: '9px', color: '#D97706', fontWeight: 500 }}>
                          (Elmas)
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Başlık */}
            <div className="form-field-group">
              <label className="form-label">
                Başlık <span className="req-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Örn: Kritik bileşen verisi"
                required
                autoFocus
              />
            </div>

            {/* Kısa Açıklama */}
            <div className="form-field-group">
              <label className="form-label">
                Kısa Açıklama / Metodoloji Notu
              </label>
              <textarea
                className="form-input"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Örn: Select Layer By Location veya senaryo tehlike haritası"
                rows={3}
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Renk Seçimi */}
            <div>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '12px' }}>
                Renk Teması
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.keys(NODE_COLORS).map(cKey => {
                  const c = NODE_COLORS[cKey];
                  const isSelected = color === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setColor(cKey)}
                      title={c.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: c.accent,
                        border: isSelected ? '3px solid #0F172A' : '2px solid #FFFFFF',
                        boxShadow: isSelected ? '0 0 0 2px #38BDF8' : '0 1px 3px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.1s ease',
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="custom-modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {onDuplicate && (
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => {
                    onDuplicate(node.id);
                    onClose();
                  }}
                  title="Kutuyu Çoğalt"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <Copy size={13} />
                  <span>Çoğalt</span>
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => {
                    onDelete(node.id);
                    onClose();
                  }}
                  title="Kutuyu Sil"
                  style={{ color: '#E11D48', borderColor: '#FECDD3', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <Trash2 size={13} />
                  <span>Sil</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={onClose}
              >
                İptal
              </button>
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={!title.trim()}
              >
                Kaydet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
