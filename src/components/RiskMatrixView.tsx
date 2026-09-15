import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  Sun, 
  CloudRain, 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  HelpCircle,
  Info,
  Maximize2
} from 'lucide-react';

interface RiskMatrixViewProps {
  activeGroup: string;
  data: Record<string, any>;
  workStatus: Record<string, any>;
  rowOverrides: Record<string, any>;
  onSelectSection: (sectionCode: string) => void;
}

export const RiskMatrixView: React.FC<RiskMatrixViewProps> = ({
  activeGroup,
  data,
  workStatus,
  rowOverrides,
  onSelectSection
}) => {
  const groupData = data[activeGroup] || data.ulasim;
  const sections: any[] = groupData.sections || [];

  // 1. Extract Critical Components (Chapter 3)
  const criticalComponents = useMemo(() => {
    return sections.filter((s: any) => s.code.startsWith('3.'));
  }, [sections]);

  // 2. Extract Hazards grouped by Category
  // Doğa Kaynaklı Afetler (Chapter 4)
  const natureDisasters = useMemo(() => {
    return sections.filter((s: any) => s.code.startsWith('4.'));
  }, [sections]);

  // İnsan ve Teknoloji Kaynaklı Afetler (Chapter 5)
  const humanDisasters = useMemo(() => {
    return sections.filter((s: any) => s.code.startsWith('5.'));
  }, [sections]);

  // İklim Krizi Etkileri (Chapter 6)
  const climateRisks = useMemo(() => {
    return sections.filter((s: any) => s.code.startsWith('6.'));
  }, [sections]);

  const [selectedCell, setSelectedCell] = useState<{ compCode: string; compTitle: string; riskCode: string; riskTitle: string; category: string } | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'doga' | 'insan' | 'iklim'>('all');

  // Compute stats for a specific risk section
  const getSectionStats = (secCode: string) => {
    const sec = sections.find((s: any) => s.code === secCode);
    if (!sec || !sec.entries) return { total: 0, done: 0, inProgress: 0, gaps: 0, verifiedRatio: 0 };
    
    let total = 0;
    let done = 0;
    let inProgress = 0;
    let gaps = 0;

    sec.entries.forEach((e: any, eIdx: number) => {
      (e.veri || []).forEach((v: any, vIdx: number) => {
        const id = `${activeGroup}::${secCode}::${eIdx}::${vIdx}`;
        const override = rowOverrides[id];
        if (override?.deleted) return;
        total++;
        const hasData = override?.v !== undefined ? override.v : v.v;
        if (!hasData) gaps++;

        const st = workStatus[id]?.status || 'todo';
        if (st === 'done') done++;
        else if (st === 'progress' || st === 'gis') inProgress++;
      });
    });

    const verifiedRatio = total > 0 ? Math.round(((total - gaps) / total) * 100) : 0;
    return { total, done, inProgress, gaps, verifiedRatio };
  };

  const displayedCategories = useMemo(() => {
    const list: { key: 'doga' | 'insan' | 'iklim'; label: string; badge: string; color: string; bg: string; border: string; items: any[] }[] = [];
    
    if (filterCategory === 'all' || filterCategory === 'doga') {
      list.push({
        key: 'doga',
        label: 'Doğa Kaynaklı Afetler',
        badge: 'Bölüm 4',
        color: '#B45309',
        bg: '#FEF3C7',
        border: '#FDE68A',
        items: natureDisasters
      });
    }
    if (filterCategory === 'all' || filterCategory === 'insan') {
      list.push({
        key: 'insan',
        label: 'İnsan ve Teknoloji Kaynaklı Afetler',
        badge: 'Bölüm 5',
        color: '#BE123C',
        bg: '#FFE4E6',
        border: '#FECDD3',
        items: humanDisasters
      });
    }
    if (filterCategory === 'all' || filterCategory === 'iklim') {
      list.push({
        key: 'iklim',
        label: 'İklim Krizi Etkileri & Riskleri',
        badge: 'Bölüm 6',
        color: '#0369A1',
        bg: '#E0F2FE',
        border: '#BAE6FD',
        items: climateRisks
      });
    }
    return list;
  }, [filterCategory, natureDisasters, humanDisasters, climateRisks]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--line)',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              background: '#0F172A',
              color: '#FFFFFF',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {groupData.label}
            </span>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--ink)' }}>
              Kritik Bileşen × Afet ve İklim Riskleri Matrisi
            </h2>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0 0' }}>
            3. Bölümdeki kritik sistem bileşenleri ile 4, 5 ve 6. bölümlerdeki afet ve iklim riskleri arasındaki veri katmanları ve analiz kesişim matrisi.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', background: '#F1F5F9', padding: '3px', borderRadius: '6px' }}>
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: filterCategory === 'all' ? '#FFFFFF' : 'transparent',
              color: filterCategory === 'all' ? '#0F172A' : '#64748B',
              boxShadow: filterCategory === 'all' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            Tüm Riskler
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('doga')}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: filterCategory === 'doga' ? '#FEF3C7' : 'transparent',
              color: filterCategory === 'doga' ? '#B45309' : '#64748B'
            }}
          >
            Doğa Kaynaklı (4.)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('insan')}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: filterCategory === 'insan' ? '#FFE4E6' : 'transparent',
              color: filterCategory === 'insan' ? '#BE123C' : '#64748B'
            }}
          >
            İnsan/Teknoloji (5.)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('iklim')}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: filterCategory === 'iklim' ? '#E0F2FE' : 'transparent',
              color: filterCategory === 'iklim' ? '#0369A1' : '#64748B'
            }}
          >
            İklim Krizi (6.)
          </button>
        </div>
      </div>

      {/* Main Matrix Grid Container */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--line)',
        borderRadius: '8px',
        overflowX: 'auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          {/* Header Row: Disaster Categories & Hazard Columns */}
          <thead>
            {/* Top Level Category Row */}
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--line)' }}>
              <th 
                rowSpan={2}
                style={{ 
                  padding: '12px 16px', 
                  width: '260px', 
                  minWidth: '240px',
                  borderRight: '2px solid var(--line-strong)',
                  verticalAlign: 'bottom',
                  fontWeight: 700,
                  color: '#0F172A',
                  background: '#F1F5F9'
                }}
              >
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', marginBottom: '2px' }}>
                  Kritik Bileşenler (Bölüm 3)
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>
                  Sistem / Altyapı Unsuru
                </div>
              </th>

              {displayedCategories.map(cat => (
                <th
                  key={cat.key}
                  colSpan={cat.items.length}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'center',
                    borderRight: '2px solid var(--line-strong)',
                    borderBottom: `2px solid ${cat.color}`,
                    background: cat.bg,
                    color: cat.color,
                    fontWeight: 700,
                    fontSize: '12px'
                  }}
                >
                  <span style={{ marginRight: '6px' }}>{cat.label}</span>
                  <span style={{ fontSize: '10px', background: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', opacity: 0.9 }}>
                    {cat.badge}
                  </span>
                </th>
              ))}
            </tr>

            {/* Sub Level: Specific Hazards */}
            <tr style={{ background: '#FAFAFA', borderBottom: '2px solid var(--line-strong)' }}>
              {displayedCategories.flatMap(cat => 
                cat.items.map((hazard: any) => {
                  const stats = getSectionStats(hazard.code);
                  return (
                    <th
                      key={hazard.code}
                      style={{
                        padding: '10px 12px',
                        minWidth: '140px',
                        maxWidth: '180px',
                        borderRight: '1px solid var(--line)',
                        verticalAlign: 'top',
                        cursor: 'pointer'
                      }}
                      onClick={() => onSelectSection(hazard.code)}
                      title={`${hazard.code} ${hazard.title} veri tablosuna git`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', marginBottom: '4px' }}>
                        <span className="mono" style={{ fontWeight: 700, fontSize: '11px', color: cat.color }}>
                          {hazard.code}
                        </span>
                        <ChevronRight size={12} color="#94A3B8" />
                      </div>
                      <div style={{ 
                        fontWeight: 600, 
                        color: '#1E293B', 
                        lineHeight: 1.3, 
                        fontSize: '11px',
                        marginBottom: '6px'
                      }}>
                        {hazard.title}
                      </div>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '10px',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          background: stats.gaps === 0 ? '#DCFCE7' : stats.verifiedRatio > 50 ? '#FEF3C7' : '#FEE2E2',
                          color: stats.gaps === 0 ? '#166534' : stats.verifiedRatio > 50 ? '#92400E' : '#991B1B',
                          fontWeight: 600
                        }}>
                          %{stats.verifiedRatio} Veri
                        </span>
                      </div>
                    </th>
                  );
                })
              )}
            </tr>
          </thead>

          {/* Body Rows: Critical Components */}
          <tbody>
            {criticalComponents.length === 0 ? (
              <tr>
                <td colSpan={20} style={{ padding: '30px', textAlign: 'center', color: '#64748B' }}>
                  Bu grup için 3. Bölüm altında kritik bileşen tanımlanmamış.
                </td>
              </tr>
            ) : (
              criticalComponents.map((comp: any, cIdx: number) => {
                const compStats = getSectionStats(comp.code);
                return (
                  <tr 
                    key={comp.code}
                    style={{ 
                      borderBottom: '1px solid var(--line)',
                      background: cIdx % 2 === 0 ? '#FFFFFF' : '#FBFBFB'
                    }}
                  >
                    {/* Leftmost Critical Component Info */}
                    <td style={{
                      padding: '12px 16px',
                      borderRight: '2px solid var(--line-strong)',
                      verticalAlign: 'top',
                      background: '#F8FAFC'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className="mono" style={{ fontWeight: 700, fontSize: '11px', color: '#0F172A' }}>
                          {comp.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSelectSection(comp.code)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            padding: '1px 4px',
                            cursor: 'pointer',
                            fontSize: '10px',
                            color: '#3B82F6',
                            textDecoration: 'underline'
                          }}
                          title="Bileşen Verilerine Git"
                        >
                          İncele
                        </button>
                      </div>
                      <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '12px', lineHeight: 1.35, marginBottom: '6px' }}>
                        {comp.title}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>
                        {compStats.total} Veri Katmanı Tanımlı
                      </div>
                    </td>

                    {/* Matrix Intersection Cells */}
                    {displayedCategories.flatMap(cat => 
                      cat.items.map((hazard: any) => {
                        const isSelected = selectedCell?.compCode === comp.code && selectedCell?.riskCode === hazard.code;
                        const hStats = getSectionStats(hazard.code);

                        return (
                          <td
                            key={`${comp.code}_${hazard.code}`}
                            style={{
                              padding: '10px 12px',
                              borderRight: '1px solid var(--line)',
                              verticalAlign: 'top',
                              cursor: 'pointer',
                              background: isSelected ? '#EFF6FF' : 'transparent',
                              transition: 'background 0.15s ease'
                            }}
                            onClick={() => {
                              setSelectedCell({
                                compCode: comp.code,
                                compTitle: comp.title,
                                riskCode: hazard.code,
                                riskTitle: hazard.title,
                                category: cat.label
                              });
                            }}
                            onDoubleClick={() => onSelectSection(hazard.code)}
                          >
                            <div style={{
                              border: isSelected ? '1px solid #3B82F6' : '1px solid var(--line)',
                              borderRadius: '6px',
                              padding: '8px',
                              background: '#FFFFFF',
                              minHeight: '75px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              gap: '6px',
                              boxShadow: isSelected ? '0 0 0 2px rgba(59,130,246,0.1)' : 'none'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: cat.color }}>
                                  {hazard.code}
                                </span>
                                {hStats.gaps === 0 ? (
                                  <span title="Tüm veri katmanları mevcut" style={{ color: '#16A34A' }}>
                                    <CheckCircle2 size={12} />
                                  </span>
                                ) : (
                                  <span title={`${hStats.gaps} veri katmanı eksik`} style={{ color: '#E11D48', fontSize: '10px', fontWeight: 600 }}>
                                    {hStats.gaps} Eksik
                                  </span>
                                )}
                              </div>

                              <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.25 }}>
                                {hStats.done}/{hStats.total} İşlem
                              </div>

                              <div style={{
                                width: '100%',
                                height: '4px',
                                background: '#E2E8F0',
                                borderRadius: '2px',
                                overflow: 'hidden'
                              }}>
                                <div style={{
                                  width: `${hStats.total > 0 ? (hStats.done / hStats.total) * 100 : 0}%`,
                                  height: '100%',
                                  background: cat.color,
                                  borderRadius: '2px'
                                }} />
                              </div>
                            </div>
                          </td>
                        );
                      })
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Cell Modal/Drawer Summary */}
      {selectedCell && (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--line)',
          borderRadius: '8px',
          padding: '16px 20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>
                Seçili Kesişim
              </span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                {selectedCell.category}
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
              {selectedCell.compCode} {selectedCell.compTitle} <span style={{ color: '#94A3B8', margin: '0 6px' }}>×</span> {selectedCell.riskCode} {selectedCell.riskTitle}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => onSelectSection(selectedCell.riskCode)}
              style={{
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 600,
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{selectedCell.riskCode} Veri Envanterini Aç</span>
              <ChevronRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => setSelectedCell(null)}
              style={{
                padding: '8px 12px',
                fontSize: '12px',
                border: '1px solid var(--line)',
                background: '#FFFFFF',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
