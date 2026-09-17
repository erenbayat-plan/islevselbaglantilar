import React from 'react';
import { WorkflowEdge, WorkflowNode } from '../../workflowTypes';

interface WorkflowEdgeLineProps {
  edge: WorkflowEdge;
  sourceNode?: WorkflowNode;
  targetNode?: WorkflowNode;
  isSelected: boolean;
  onSelect: (edgeId: string, e: React.MouseEvent) => void;
}

export const WorkflowEdgeLine: React.FC<WorkflowEdgeLineProps> = ({
  edge,
  sourceNode,
  targetNode,
  isSelected,
  onSelect
}) => {
  if (!sourceNode || !targetNode) return null;

  const sourceWidth = sourceNode.width || 230;
  const targetWidth = targetNode.width || 230;

  // Output handle is at right center of sourceNode
  const x1 = sourceNode.x + sourceWidth;
  const y1 = sourceNode.y + 40;

  // Input handle is at left center of targetNode
  const x2 = targetNode.x;
  const y2 = targetNode.y + 40;

  // Generate cubic bezier curve
  const dx = Math.abs(x2 - x1) * 0.5;
  const minDx = Math.max(dx, 40);
  const cx1 = x1 + minDx;
  const cy1 = y1;
  const cx2 = x2 - minDx;
  const cy2 = y2;

  const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(edge.id, e);
      }}
    >
      {/* Invisible wider hit-target stroke for easier clicking */}
      <path
        d={pathData}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
      />

      {/* Main visible connection line */}
      <path
        d={pathData}
        fill="none"
        stroke={isSelected ? '#2563EB' : '#64748B'}
        strokeWidth={isSelected ? 2.5 : 1.75}
        strokeDasharray={isSelected ? 'none' : 'none'}
        markerEnd={isSelected ? 'url(#arrow-selected)' : 'url(#arrow-normal)'}
        style={{
          transition: 'stroke 150ms ease, stroke-width 150ms ease'
        }}
      />

      {/* Optional edge label */}
      {edge.label && (
        <g transform={`translate(${midX}, ${midY})`}>
          <rect
            x={-((edge.label.length * 5) + 8)}
            y={-10}
            width={(edge.label.length * 10) + 16}
            height={20}
            rx={4}
            fill="#FFFFFF"
            stroke={isSelected ? '#2563EB' : '#CBD5E1'}
            strokeWidth={1}
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))' }}
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="600"
            fill={isSelected ? '#2563EB' : '#475569'}
          >
            {edge.label}
          </text>
        </g>
      )}
    </g>
  );
};
