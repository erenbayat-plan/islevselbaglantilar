import React, { useState } from 'react';
import { Workflow } from '../../workflowTypes';
import { X, GitBranch, Check } from 'lucide-react';

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workflowData: Omit<Workflow, 'id' | 'nodes' | 'edges' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Partial<Workflow>;
}

export const WorkflowModal: React.FC<WorkflowModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [chapterNum, setChapterNum] = useState(initialData?.chapterNum || '4');
  const [workingGroup, setWorkingGroup] = useState(initialData?.workingGroup || 'ulasim');
  const [purpose, setPurpose] = useState(initialData?.purpose || '');
  const [componentGroup, setComponentGroup] = useState(initialData?.componentGroup || '');
  const [expectedOutput, setExpectedOutput] = useState(initialData?.expectedOutput || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      chapterNum,
      workingGroup,
      purpose: purpose.trim(),
      componentGroup: componentGroup.trim(),
      expectedOutput: expectedOutput.trim()
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(2px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #CBD5E1',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitBranch size={18} style={{ color: '#2563EB' }} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                {initialData ? 'İş Akışını Düzenle' : 'Yeni İş Akışı Oluştur'}
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>
                ModelBuilder analiz akışı parametrelerini tanımlayın
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
              İş Akışı Adı *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Karayolu Ağı Deprem Maruziyet ve Hasar Analizi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: '12px',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                İlgili Bölüm
              </label>
              <select
                value={chapterNum}
                onChange={(e) => setChapterNum(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontSize: '12px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="4">4. Bölüm (Doğa Kaynaklı Afetler)</option>
                <option value="5">5. Bölüm (İnsan ve Teknoloji Kaynaklı)</option>
                <option value="6">6. Bölüm (İklim Krizi Etkileri)</option>
                <option value="8">8. Bölüm (Çoklu Risk Değerlendirmesi)</option>
                <option value="hepsi">Bütünleşik / Çok Bölümlü</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Çalışma Grubu
              </label>
              <select
                value={workingGroup}
                onChange={(e) => setWorkingGroup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontSize: '12px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="ulasim">Ulaşım</option>
                <option value="teknikaltyapi">Teknik Altyapı</option>
                <option value="lojistik">Lojistik</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Analizin Amacı
            </label>
            <textarea
              rows={2}
              placeholder="Bu analiz akışının teknik ve planlama hedefi..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 9px',
                fontSize: '12px',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Kullanılacak Kritik Bileşen Grubu
            </label>
            <input
              type="text"
              placeholder="Örn: 3.1 Kritik Otoyollar, Köprüler ve Viyadükler"
              value={componentGroup}
              onChange={(e) => setComponentGroup(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: '12px',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Beklenen Nihai Çıktı
            </label>
            <input
              type="text"
              placeholder="Örn: İlçe Bazında Otoyol Hasar Olasılık Haritası ve Koridor İndeksi"
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: '12px',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '7px 14px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              İptal
            </button>
            <button
              type="submit"
              style={{
                padding: '7px 16px',
                borderRadius: '6px',
                border: 'none',
                background: '#2563EB',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)'
              }}
            >
              <Check size={14} />
              <span>{initialData ? 'Güncelle' : 'İş Akışını Oluştur'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
