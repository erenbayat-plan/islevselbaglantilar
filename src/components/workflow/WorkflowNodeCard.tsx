import React from 'react';
import { WorkflowNode, NODE_TYPE_META } from '../../workflowTypes';
import { 
  AlertTriangle, 
  Layers, 
  Cpu, 
  FileCheck, 
  Boxes,
  CheckCircle2,
  Clock,
  Circle,
  Database,
  Trash2
} from 'lucide-react';

interface WorkflowNodeCardProps {
  node: WorkflowNode;
  isSelected: boolean;
  isHighlighted?: boolean;
  isConnectingSource?: boolean;
  isConnectingTargetCandidate?: boolean;
  onSelect: (nodeId: string, e: React.MouseEvent) => void;
  onStartConnect: (nodeId: string, e: React.MouseEvent) => void;
  onEndConnect: (nodeId: string, e: React.MouseEvent) => void;
  onMouseDown: (nodeId: string, e: React.MouseEvent) => void;
  onDelete?: (nodeId: string) => void;
}

export const WorkflowNodeCard: React.FC<WorkflowNodeCardProps> = ({
  node,
  isSelected,
  isHighlighted = false,
  isConnectingSource = false,
  isConnectingTargetCandidate = false,
  onSelect,
  onStartConnect,
  onEndConnect,
  onMouseDown,
  onDelete
}) => {
  const meta = NODE_TYPE_META[node.type] || NODE_TYPE_META.analysis_method;

  const renderIcon = () => {
    switch (node.type) {
      case 'hazard':
        return <AlertTriangle size={13} style={{ color: meta.color }} />;
      case 'critical_component':
        return <Layers size={13} style={{ color: meta.color }} />;
      case 'analysis_method':
        return <Cpu size={13} style={{ color: meta.color }} />;
      case 'intermediate_output':
        return <FileCheck size={13} style={{ color: meta.color }} />;
      case 'integrated_assessment':
        return <Boxes size={13} style={{ color: meta.color }} />;
      default:
        return <Database size={13} style={{ color: meta.color }} />;
    }
  };

  const getStatusBadge = () => {
    switch (node.status) {
      case 'completed':
        return (
          <span title="Tamamlandı" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '1px 5px', borderRadius: '4px', border: '1px solid #A7F3D0', whiteSpace: 'nowrap' }}>
            <CheckCircle2 size={10} /> Tamamlandı
          </span>
        );
      case 'in_progress':
        return (
          <span title="Analiz Aşamasında" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#D97706', background: '#FFFBEB', padding: '1px 5px', borderRadius: '4px', border: '1px solid #FDE68A', whiteSpace: 'nowrap' }}>
            <Clock size={10} /> Devam Ediyor
          </span>
        );
      case 'data_ready':
        return (
          <span title="Veri Hazır" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#2563EB', background: '#EFF6FF', padding: '1px 5px', borderRadius: '4px', border: '1px solid #BFDBFE', whiteSpace: 'nowrap' }}>
            <Circle size={8} fill="#2563EB" /> Veri Hazır
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id={`node-${node.id}`}
      style={{
        position: 'absolute',
        left: `${node.x}px`,
        top: `${node.y}px`,
        width: `${node.width || 230}px`,
        background: '#FFFFFF',
        borderRadius: '8px',
        border: isSelected 
          ? '2px solid #2563EB' 
          : isHighlighted 
          ? '2px solid #F59E0B'
          : isConnectingTargetCandidate
          ? '2px dashed #059669'
          : '1px solid #CBD5E1',
        boxShadow: isSelected
          ? '0 10px 25px -5px rgba(37, 99, 235, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          : '0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        cursor: 'grab',
        userSelect: 'none',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        zIndex: isSelected ? 30 : 10
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id, e);
      }}
      onMouseDown={(e) => {
        onMouseDown(node.id, e);
      }}
      onMouseUp={(e) => {
        if (isConnectingTargetCandidate) {
          e.stopPropagation();
          onEndConnect(node.id, e);
        }
      }}
    >
      {/* Input Port (Left handle) */}
      {node.type !== 'hazard' && node.type !== 'critical_component' && (
        <div
          title="Bağlantı Girişi (Girdi)"
          style={{
            position: 'absolute',
            left: '-8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: isConnectingTargetCandidate ? '#059669' : '#FFFFFF',
            border: `2px solid ${isConnectingTargetCandidate ? '#059669' : '#64748B'}`,
            cursor: 'crosshair',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            onEndConnect(node.id, e);
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#64748B' }} />
        </div>
      )}

      {/* Output Port (Right handle) */}
      {node.type !== 'integrated_assessment' && (
        <div
          title="Bağlantı Çıkışı: Yeni bağlantı için sürükleyin veya tıklayın"
          style={{
            position: 'absolute',
            right: '-8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: isConnectingSource ? '#2563EB' : '#FFFFFF',
            border: `2px solid ${isConnectingSource ? '#2563EB' : '#64748B'}`,
            cursor: 'crosshair',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            onStartConnect(node.id, e);
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: meta.color }} />
        </div>
      )}

      {/* Card Header with Type Badge and Chapter Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '7px 10px',
          borderBottom: '1px solid #F1F5F9',
          backgroundColor: meta.bgColor,
          borderTopLeftRadius: '7px',
          borderTopRightRadius: '7px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {renderIcon()}
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: meta.color,
              whiteSpace: 'nowrap'
            }}
          >
            {meta.badge}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {node.chapterNum && node.chapterNum !== 'genel' && (
            <span
              style={{
                fontSize: '9px',
                fontWeight: 600,
                color: '#475569',
                background: '#FFFFFF',
                padding: '1px 5px',
                borderRadius: '3px',
                border: '1px solid #E2E8F0',
                whiteSpace: 'nowrap'
              }}
            >
              {node.chapterNum}. Bölüm
            </span>
          )}

          {onDelete && (
            <button
              type="button"
              title="Kutuyu Sil"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(node.id);
              }}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '2px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#DC2626';
                e.currentTarget.style.background = '#FEE2E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Trash2 size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '8px 10px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#0F172A',
            lineHeight: 1.35,
            wordBreak: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: node.title.includes('_') ? 'monospace, sans-serif' : 'inherit'
          }}
          title={node.title}
        >
          {node.title}
        </div>

        {/* Secondary detail tag / method name */}
        {(node.analysisMethod || node.componentGroup || node.relatedHazard) && (
          <div
            style={{
              marginTop: '5px',
              fontSize: '10px',
              color: '#64748B',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {node.analysisMethod 
              ? `Yöntem: ${node.analysisMethod}`
              : node.componentGroup || node.relatedHazard}
          </div>
        )}

        {/* Card Footer tags */}
        <div style={{ marginTop: '7px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
          {node.geometryType ? (
            <span style={{ fontSize: '9px', color: '#64748B', background: '#F8FAFC', padding: '1px 5px', borderRadius: '3px', border: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>
              {node.geometryType}
            </span>
          ) : <span />}

          {getStatusBadge()}
        </div>
      </div>
    </div>
  );
};
