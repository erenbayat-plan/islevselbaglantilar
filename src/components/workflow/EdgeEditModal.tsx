import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Trash2 } from 'lucide-react';
import { DiagramEdge } from './diagramTypes';

interface EdgeEditModalProps {
  isOpen: boolean;
  edge: DiagramEdge | null;
  onClose: () => void;
  onSave: (edgeId: string, label: string) => void;
  onDelete?: (edgeId: string) => void;
}

export const EdgeEditModal: React.FC<EdgeEditModalProps> = ({
  isOpen,
  edge,
  onClose,
  onSave,
  onDelete
}) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (edge) {
      setLabel(edge.label || '');
    }
  }, [edge]);

  if (!isOpen || !edge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(edge.id, label.trim());
    onClose();
  };

  return (
    <div className="custom-modal-backdrop" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="custom-modal-dialog" 
        onClick={e => e.stopPropagation()} 
        style={{ maxWidth: '420px', width: '100%' }}
      >
        <div className="custom-modal-header">
          <div className="cmh-title-row">
            <div className="cmh-icon-badge" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <ArrowRight size={16} />
            </div>
            <div>
              <h3 className="custom-modal-title">Bağlantı Okunu Düzenle</h3>
              <div className="custom-modal-subtitle">Ok üzerine etiket ekleyin veya silin</div>
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
          <div className="custom-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-field-group">
              <label className="form-label">
                Ok Etiketi
              </label>
              <input
                type="text"
                className="form-input"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="Örn: Evet, Hayır, Koşullu..."
                autoFocus
              />
            </div>

            {/* Quick Suggestions */}
            <div>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Hızlı Etiket Seçenekleri:
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Evet', 'Hayır', 'Doğru', 'Yanlış', 'Alternatif', 'Kesişim Var', '1. Kol', '2. Kol'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setLabel(opt)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: label === opt ? '#2563EB' : '#F1F5F9',
                      color: label === opt ? '#FFFFFF' : '#334155',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.12s ease'
                    }}
                  >
                    {opt}
                  </button>
                ))}
                {label && (
                  <button
                    type="button"
                    onClick={() => setLabel('')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: '#FEE2E2',
                      color: '#DC2626',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Etiketi Temizle
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="custom-modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {onDelete ? (
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => {
                  onDelete(edge.id);
                  onClose();
                }}
                style={{ color: '#E11D48', borderColor: '#FECDD3', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={13} />
                <span>Oku Sil</span>
              </button>
            ) : <div />}

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
