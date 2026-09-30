import React, { useState, useEffect, useCallback } from 'react';
import { DiagramData, getInitialDiagramForGroup } from './workflow/diagramTypes';
import { MiroDiagramCanvas } from './workflow/MiroDiagramCanvas';
import { DATA } from '../data';
import { GitBranch, Layers, Info, CheckCircle2, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'plan2050_analysis_flowcharts_v2';

interface AnalysisFlowTabProps {
  activeGroup?: string;
  onSelectGroup?: (group: string) => void;
  diagramsByGroup?: Record<string, DiagramData>;
  onUpdateDiagram?: (group: string, diagram: DiagramData) => void;
  syncStatus?: 'synced' | 'saving' | 'connected';
}

export const AnalysisFlowTab: React.FC<AnalysisFlowTabProps> = ({
  activeGroup = 'ulasim',
  onSelectGroup,
  diagramsByGroup: externalDiagrams,
  onUpdateDiagram: externalUpdateDiagram,
  syncStatus = 'synced'
}) => {
  // Local fallback storage in case external isn't provided
  const [localDiagrams, setLocalDiagrams] = useState<Record<string, DiagramData>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ulasim: parsed.ulasim || getInitialDiagramForGroup('ulasim'),
            teknik: parsed.teknik || getInitialDiagramForGroup('teknik'),
            lojistik: parsed.lojistik || getInitialDiagramForGroup('lojistik')
          };
        }
      }
    } catch (e) {
      console.error('Failed to load flowchart diagrams from localStorage', e);
    }

    return {
      ulasim: getInitialDiagramForGroup('ulasim'),
      teknik: getInitialDiagramForGroup('teknik'),
      lojistik: getInitialDiagramForGroup('lojistik')
    };
  });

  const diagramsByGroup = externalDiagrams || localDiagrams;

  // Local active group selector (if parent passes or user switches here)
  const currentGroup = activeGroup || 'ulasim';

  // Current active diagram
  const currentDiagram = diagramsByGroup[currentGroup] || getInitialDiagramForGroup(currentGroup);

  // Auto-save changes for current group
  const handleDiagramChange = useCallback((updatedDiagram: DiagramData) => {
    if (externalUpdateDiagram) {
      externalUpdateDiagram(currentGroup, updatedDiagram);
    } else {
      setLocalDiagrams(prev => {
        const next = {
          ...prev,
          [currentGroup]: updatedDiagram
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (e) {}
        return next;
      });
    }
  }, [currentGroup, externalUpdateDiagram]);

  // Group switch handler
  const handleSwitchGroup = (groupKey: string) => {
    if (onSelectGroup) {
      onSelectGroup(groupKey);
    }
  };

  const groupInfo = DATA[currentGroup] || { label: 'Ulaşım' };

  return (
    <div 
      className="analysis-flow-workspace-tab"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)',
        minHeight: '750px',
        width: '100%',
        background: '#F8FAFC',
        position: 'relative'
      }}
    >
      {/* Top Bar with Group Switching & Context Info */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          background: '#0B132B',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px', 
              background: 'rgba(56, 189, 248, 0.15)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#38BDF8',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}
          >
            <GitBranch size={17} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#F8FAFC' }}>
                Analiz Akışı — Düzenlenebilir Şema Çalışma Alanı
              </h2>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: syncStatus === 'saving' 
                    ? 'rgba(234, 179, 8, 0.2)' 
                    : 'rgba(34, 197, 94, 0.2)',
                  color: syncStatus === 'saving' ? '#FACC15' : '#4ADE80',
                  border: syncStatus === 'saving'
                    ? '1px solid rgba(234, 179, 8, 0.35)'
                    : '1px solid rgba(34, 197, 94, 0.3)'
                }}
              >
                <span 
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: syncStatus === 'saving' ? '#FACC15' : '#4ADE80',
                    boxShadow: syncStatus === 'saving' ? '0 0 6px #FACC15' : '0 0 6px #4ADE80'
                  }}
                />
                {syncStatus === 'saving' ? 'Buluta Kaydediliyor…' : 'Tüm Tarayıcılar Eşzamanlı'}
              </span>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94A3B8' }}>
              Kutuları taşıyın, yeniden boyutlandırın, kenarlardan ok bağlayın ve çift tıklayarak düzenleyin.
            </p>
          </div>
        </div>

        {/* Group Selector Pill Buttons (Ulaşım, Teknik Altyapı, Lojistik) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#94A3B8', marginRight: '4px', fontWeight: 500 }}>
            Çalışma Grubu:
          </span>
          {['ulasim', 'teknik', 'lojistik'].map(grp => {
            const isCurrent = currentGroup === grp;
            const label = DATA[grp]?.label || (grp === 'ulasim' ? 'Ulaşım' : grp === 'teknik' ? 'Teknik Altyapı' : 'Lojistik');
            return (
              <button
                key={grp}
                type="button"
                onClick={() => handleSwitchGroup(grp)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: isCurrent ? '1px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.12)',
                  background: isCurrent ? '#0284C7' : 'rgba(255, 255, 255, 0.05)',
                  color: isCurrent ? '#FFFFFF' : '#CBD5E1',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  boxShadow: isCurrent ? '0 2px 8px rgba(2, 132, 199, 0.4)' : 'none'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Miro-Like Canvas Workspace */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <MiroDiagramCanvas
          key={currentGroup} // Remounts fresh state per group smoothly
          initialData={currentDiagram}
          onChange={handleDiagramChange}
          groupKey={currentGroup}
        />
      </div>
    </div>
  );
};
