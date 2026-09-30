import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  RotateCcw, 
  RotateCw, 
  Copy, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Database, 
  Cpu, 
  HelpCircle, 
  Flag,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { DiagramNodeType, NODE_TYPE_INFO } from './diagramTypes';

interface DiagramToolbarProps {
  onAddNode: (type: DiagramNodeType) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canDuplicate: boolean;
  onDuplicate: () => void;
  canDelete: boolean;
  onDelete: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitToScreen: () => void;
  onResetTemplate: () => void;
}

export const DiagramToolbar: React.FC<DiagramToolbarProps> = ({
  onAddNode,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  canDuplicate,
  onDuplicate,
  canDelete,
  onDelete,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitToScreen,
  onResetTemplate
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAddMenu(false);
      }
    };
    if (showAddMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddMenu]);

  return (
    <div 
      className="diagram-floating-toolbar"
      style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        right: '16px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        pointerEvents: 'none' // children will have pointer-events: auto
      }}
    >
      {/* Left Action Controls (Add Box, Undo, Redo, Duplicate, Delete) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '6px 8px',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
          pointerEvents: 'auto'
        }}
      >
        {/* Kutu Ekle Dropdown */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="dt-btn dt-btn-primary"
            onClick={() => setShowAddMenu(!showAddMenu)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: 600,
              background: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
              transition: 'background 0.12s ease'
            }}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Kutu Ekle</span>
            <ChevronDown size={13} />
          </button>

          {showAddMenu && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                background: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                padding: '6px',
                width: '210px',
                zIndex: 60,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              {(Object.keys(NODE_TYPE_INFO) as DiagramNodeType[]).map(t => {
                const info = NODE_TYPE_INFO[t];
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      onAddNode(t);
                      setShowAddMenu(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#1E293B',
                      transition: 'background 0.1s ease'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F1F5F9')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '6px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: t === 'data' ? '#DBEAFE' : t === 'process' ? '#DCFCE7' : t === 'decision' ? '#FEF3C7' : '#FFE4E6',
                        color: t === 'data' ? '#1D4ED8' : t === 'process' ? '#15803D' : t === 'decision' ? '#B45309' : '#BE123C'
                      }}
                    >
                      {t === 'data' && <Database size={13} />}
                      {t === 'process' && <Cpu size={13} />}
                      {t === 'decision' && <HelpCircle size={13} />}
                      {t === 'result' && <Flag size={13} />}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}>{info.label}</span>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>
                        {t === 'decision' ? 'Elmas biçimli karar' : info.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ width: '1px', height: '22px', background: '#E2E8F0', margin: '0 2px' }} />

        {/* Undo (Geri Al) */}
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Geri Al (Ctrl+Z)"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: 'none',
            background: 'transparent',
            color: canUndo ? '#334155' : '#94A3B8',
            cursor: canUndo ? 'pointer' : 'not-allowed',
            transition: 'all 0.12s ease'
          }}
          onMouseEnter={e => { if (canUndo) e.currentTarget.style.background = '#F1F5F9'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <RotateCcw size={15} />
        </button>

        {/* Redo (Yinele) */}
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Yinele (Ctrl+Y)"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: 'none',
            background: 'transparent',
            color: canRedo ? '#334155' : '#94A3B8',
            cursor: canRedo ? 'pointer' : 'not-allowed',
            transition: 'all 0.12s ease'
          }}
          onMouseEnter={e => { if (canRedo) e.currentTarget.style.background = '#F1F5F9'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <RotateCw size={15} />
        </button>

        <div style={{ width: '1px', height: '22px', background: '#E2E8F0', margin: '0 2px' }} />

        {/* Duplicate (Çoğalt) */}
        <button
          type="button"
          onClick={onDuplicate}
          disabled={!canDuplicate}
          title="Seçili Kutuyu Çoğalt (Ctrl+D)"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            borderRadius: '6px',
            border: 'none',
            background: 'transparent',
            color: canDuplicate ? '#334155' : '#94A3B8',
            cursor: canDuplicate ? 'pointer' : 'not-allowed',
            fontSize: '11px',
            fontWeight: 600,
            transition: 'all 0.12s ease'
          }}
          onMouseEnter={e => { if (canDuplicate) e.currentTarget.style.background = '#F1F5F9'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <Copy size={13} />
          <span>Çoğalt</span>
        </button>

        {/* Delete (Sil) */}
        <button
          type="button"
          onClick={onDelete}
          disabled={!canDelete}
          title="Seçili Öğeyi Sil (Delete)"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            borderRadius: '6px',
            border: 'none',
            background: 'transparent',
            color: canDelete ? '#E11D48' : '#94A3B8',
            cursor: canDelete ? 'pointer' : 'not-allowed',
            fontSize: '11px',
            fontWeight: 600,
            transition: 'all 0.12s ease'
          }}
          onMouseEnter={e => { if (canDelete) e.currentTarget.style.background = '#FFE4E6'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <Trash2 size={13} />
          <span>Sil</span>
        </button>
      </div>

      {/* Right Controls (Zoom, Fit, Template Reset) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '6px 8px',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
          pointerEvents: 'auto'
        }}
      >
        {/* Zoom Out */}
        <button
          type="button"
          onClick={onZoomOut}
          title="Uzaklaştır"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: 'none',
            background: 'transparent',
            color: '#334155',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F1F5F9')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <ZoomOut size={14} />
        </button>

        {/* Zoom Level Indicator / Reset */}
        <button
          type="button"
          onClick={onResetZoom}
          title="%100'e Sıfırla"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#475569',
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            background: '#F1F5F9',
            cursor: 'pointer',
            minWidth: '46px',
            textAlign: 'center'
          }}
        >
          %{Math.round(zoom * 100)}
        </button>

        {/* Zoom In */}
        <button
          type="button"
          onClick={onZoomIn}
          title="Yakınlaştır"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: 'none',
            background: 'transparent',
            color: '#334155',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F1F5F9')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <ZoomIn size={14} />
        </button>

        <div style={{ width: '1px', height: '20px', background: '#E2E8F0', margin: '0 2px' }} />

        {/* Şemayı Ekrana Sığdır */}
        <button
          type="button"
          onClick={onFitToScreen}
          title="Şemayı Ekrana Sığdır (Tüm kutuları göster)"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '5px 9px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            background: '#FFFFFF',
            color: '#0F172A',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.12s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
          onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}
        >
          <Maximize2 size={13} />
          <span>Sığdır</span>
        </button>

        {/* Örnek Şablonu Yükle */}
        <button
          type="button"
          onClick={onResetTemplate}
          title="Başlangıç Örnek Şemasını Yeniden Yükle"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '5px 9px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            background: '#FFFFFF',
            color: '#64748B',
            fontSize: '11px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.12s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
          onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}
        >
          <Sparkles size={13} color="#D97706" />
          <span>Örnek Şablon</span>
        </button>
      </div>
    </div>
  );
};
