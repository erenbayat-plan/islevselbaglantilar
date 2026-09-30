import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  DiagramNode, 
  DiagramEdge, 
  DiagramData, 
  PortPosition, 
  DiagramNodeType,
  NODE_COLORS,
  NODE_TYPE_INFO
} from './diagramTypes';
import { Database, Cpu, HelpCircle, Flag, Trash2, Edit3, Copy, ArrowRight, CornerDownRight } from 'lucide-react';
import { NodeEditModal } from './NodeEditModal';
import { EdgeEditModal } from './EdgeEditModal';
import { DiagramToolbar } from './DiagramToolbar';

interface MiroDiagramCanvasProps {
  initialData: DiagramData;
  onChange?: (data: DiagramData) => void;
  groupKey: string;
}

export const MiroDiagramCanvas: React.FC<MiroDiagramCanvasProps> = ({
  initialData,
  onChange,
  groupKey
}) => {
  // Current Diagram Data
  const [data, setData] = useState<DiagramData>(initialData);

  // History for Undo / Redo
  const [history, setHistory] = useState<DiagramData[]>([initialData]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isUndoRedoAction = useRef(false);

  // Selection
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  // Pan & Zoom
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 60, y: 80 });
  const [zoom, setZoom] = useState<number>(1);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Node Dragging
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Node Resizing
  const [resizingNodeId, setResizingNodeId] = useState<string | null>(null);
  const resizeStartRef = useRef<{ startX: number; startY: number; startW: number; startH: number }>({
    startX: 0,
    startY: 0,
    startW: 200,
    startH: 100
  });

  // Edge Creation (Connecting Ports)
  const [connectingFrom, setConnectingFrom] = useState<{ nodeId: string; port: PortPosition; x: number; y: number } | null>(null);
  const [connectCursorPos, setConnectCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Modals
  const [editingNode, setEditingNode] = useState<DiagramNode | null>(null);
  const [editingEdge, setEditingEdge] = useState<DiagramEdge | null>(null);

  // Containers
  const containerRef = useRef<HTMLDivElement>(null);

  // External sync from other browsers / cloud
  useEffect(() => {
    // Only apply remote changes if not currently dragging or resizing locally
    if (!draggingNodeId && !resizingNodeId && !connectingFrom) {
      setData(prev => {
        if (JSON.stringify(prev) === JSON.stringify(initialData)) return prev;
        return initialData;
      });
    }
  }, [initialData, draggingNodeId, resizingNodeId, connectingFrom]);

  // When switching groups, reset selection and reset history
  useEffect(() => {
    setData(initialData);
    setHistory([initialData]);
    setHistoryIndex(0);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, [groupKey]);

  // Commit changes to history & trigger parent onChange
  const commitChange = useCallback((nextData: DiagramData) => {
    setData(nextData);
    if (onChange) onChange(nextData);

    if (!isUndoRedoAction.current) {
      setHistory(prev => {
        const sliced = prev.slice(0, historyIndex + 1);
        return [...sliced, nextData];
      });
      setHistoryIndex(prev => prev + 1);
    }
    isUndoRedoAction.current = false;
  }, [historyIndex, onChange]);

  // Undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const prevIdx = historyIndex - 1;
      const prevData = history[prevIdx];
      setHistoryIndex(prevIdx);
      setData(prevData);
      if (onChange) onChange(prevData);
    }
  }, [historyIndex, history, onChange]);

  // Redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const nextIdx = historyIndex + 1;
      const nextData = history[nextIdx];
      setHistoryIndex(nextIdx);
      setData(nextData);
      if (onChange) onChange(nextData);
    }
  }, [historyIndex, history, onChange]);

  // Helper: compute coordinates of a port on a node
  const getPortCoordinates = useCallback((node: DiagramNode, port: PortPosition): { x: number; y: number } => {
    switch (port) {
      case 'top':
        return { x: node.x + node.width / 2, y: node.y };
      case 'right':
        return { x: node.x + node.width, y: node.y + node.height / 2 };
      case 'bottom':
        return { x: node.x + node.width / 2, y: node.y + node.height };
      case 'left':
        return { x: node.x, y: node.y + node.height / 2 };
    }
  }, []);

  // Helper: convert screen client coordinates to canvas world coordinates
  const clientToCanvasCoords = useCallback((clientX: number, clientY: number): { x: number; y: number } => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left - pan.x) / zoom;
    const y = (clientY - rect.top - pan.y) / zoom;
    return { x, y };
  }, [pan, zoom]);

  // Add Node
  const handleAddNode = useCallback((type: DiagramNodeType) => {
    // Add near center of current view
    const rect = containerRef.current?.getBoundingClientRect();
    const cx = rect ? (rect.width / 2 - pan.x) / zoom : 300;
    const cy = rect ? (rect.height / 2 - pan.y) / zoom : 200;

    const info = NODE_TYPE_INFO[type];
    const isDiamond = type === 'decision';
    const newNode: DiagramNode = {
      id: `node_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      title: type === 'data' ? 'Yeni Veri Katmanı' 
           : type === 'process' ? 'Yeni CBS İşlemi' 
           : type === 'decision' ? 'Yeni Karar Sorusu?' 
           : 'Yeni Çıktı / Sonuç',
      description: isDiamond ? 'Koşullu karar ve dallanma' : 'Açıklama veya analiz yöntemi',
      x: Math.round(cx - 100),
      y: Math.round(cy - (isDiamond ? 70 : 45)),
      width: isDiamond ? 180 : 220,
      height: isDiamond ? 140 : 90,
      color: info.defaultColor
    };

    const nextData: DiagramData = {
      ...data,
      nodes: [...data.nodes, newNode]
    };
    setSelectedNodeId(newNode.id);
    setSelectedEdgeId(null);
    commitChange(nextData);
  }, [data, pan, zoom, commitChange]);

  // Duplicate Selected Node
  const handleDuplicate = useCallback((idToDuplicate?: string) => {
    const targetId = idToDuplicate || selectedNodeId;
    if (!targetId) return;
    const target = data.nodes.find(n => n.id === targetId);
    if (!target) return;

    const newNode: DiagramNode = {
      ...target,
      id: `node_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: `${target.title} (Kopya)`,
      x: target.x + 40,
      y: target.y + 40
    };

    const nextData: DiagramData = {
      ...data,
      nodes: [...data.nodes, newNode]
    };
    setSelectedNodeId(newNode.id);
    setSelectedEdgeId(null);
    commitChange(nextData);
  }, [data, selectedNodeId, commitChange]);

  // Delete Selected Node or Edge
  const handleDeleteSelected = useCallback(() => {
    if (selectedNodeId) {
      // Remove node and all connected edges
      const nextNodes = data.nodes.filter(n => n.id !== selectedNodeId);
      const nextEdges = data.edges.filter(e => e.sourceId !== selectedNodeId && e.targetId !== selectedNodeId);
      setSelectedNodeId(null);
      commitChange({ nodes: nextNodes, edges: nextEdges });
    } else if (selectedEdgeId) {
      // Remove edge
      const nextEdges = data.edges.filter(e => e.id !== selectedEdgeId);
      setSelectedEdgeId(null);
      commitChange({ ...data, edges: nextEdges });
    }
  }, [data, selectedNodeId, selectedEdgeId, commitChange]);

  // Fit to Screen
  const handleFitToScreen = useCallback(() => {
    if (data.nodes.length === 0 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    data.nodes.forEach(n => {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.width);
      maxY = Math.max(maxY, n.y + n.height);
    });

    const padding = 80;
    const boundsWidth = (maxX - minX) + padding * 2;
    const boundsHeight = (maxY - minY) + padding * 2;

    const scaleX = rect.width / boundsWidth;
    const scaleY = rect.height / boundsHeight;
    const newZoom = Math.min(1.4, Math.max(0.35, Math.min(scaleX, scaleY)));

    const newPanX = (rect.width - boundsWidth * newZoom) / 2 - (minX - padding) * newZoom;
    const newPanY = (rect.height - boundsHeight * newZoom) / 2 - (minY - padding) * newZoom;

    setZoom(newZoom);
    setPan({ x: Math.round(newPanX), y: Math.round(newPanY) });
  }, [data.nodes]);

  // Reset to Initial Template
  const handleResetTemplate = useCallback(() => {
    if (window.confirm('Bu grubun analiz akışı başlangıç örnek şemasına sıfırlanacak. Emin misiniz?')) {
      const template = initialData;
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
      commitChange(template);
      setTimeout(() => handleFitToScreen(), 50);
    }
  }, [initialData, commitChange, handleFitToScreen]);

  // Keyboard Shortcuts (Delete, Undo, Redo, Duplicate, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDeleteSelected();
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.key === 'y' && (e.ctrlKey || e.metaKey)) || (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)) {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleDuplicate();
      } else if (e.key === 'Escape') {
        setSelectedNodeId(null);
        setSelectedEdgeId(null);
        setConnectingFrom(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDeleteSelected, handleUndo, handleRedo, handleDuplicate]);

  // Wheel zoom handler
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Zoom factor
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newZoom = Math.min(2.5, Math.max(0.25, zoom * zoomFactor));

    // Keep mouse pointer centered in world coordinates
    const newPanX = mouseX - (mouseX - pan.x) * (newZoom / zoom);
    const newPanY = mouseY - (mouseY - pan.y) * (newZoom / zoom);

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  }, [zoom, pan]);

  // Canvas Mouse Down: panning or deselect
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Only start pan if clicking directly on canvas background (svg or wrapper)
    const target = e.target as HTMLElement;
    if (target.closest('.diagram-node-card') || target.closest('.diagram-edge-element') || target.closest('.diagram-floating-toolbar')) {
      return;
    }

    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setIsPanning(true);
    panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  // Node Mouse Down: start dragging node
  const handleNodeMouseDown = (e: React.MouseEvent, node: DiagramNode) => {
    e.stopPropagation();
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);

    // If clicking a port or resize handle, don't drag node
    const target = e.target as HTMLElement;
    if (target.closest('.port-dot') || target.closest('.node-resize-handle')) return;

    setDraggingNodeId(node.id);
    const coords = clientToCanvasCoords(e.clientX, e.clientY);
    dragOffsetRef.current = {
      x: coords.x - node.x,
      y: coords.y - node.y
    };
  };

  // Start Resizing Node
  const handleResizeMouseDown = (e: React.MouseEvent, node: DiagramNode) => {
    e.stopPropagation();
    setResizingNodeId(node.id);
    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: node.width,
      startH: node.height
    };
  };

  // Start Connecting from Port
  const handlePortMouseDown = (e: React.MouseEvent, node: DiagramNode, port: PortPosition) => {
    e.stopPropagation();
    const portCoords = getPortCoordinates(node, port);
    setConnectingFrom({
      nodeId: node.id,
      port,
      x: portCoords.x,
      y: portCoords.y
    });
    setConnectCursorPos({ x: portCoords.x, y: portCoords.y });
  };

  // End Connecting on Port
  const handlePortMouseUp = (e: React.MouseEvent, targetNode: DiagramNode, targetPort: PortPosition) => {
    e.stopPropagation();
    if (!connectingFrom) return;

    // Disallow self-connection
    if (connectingFrom.nodeId === targetNode.id) {
      setConnectingFrom(null);
      return;
    }

    // Check if edge already exists
    const exists = data.edges.some(edge => 
      edge.sourceId === connectingFrom.nodeId && 
      edge.targetId === targetNode.id && 
      edge.sourcePort === connectingFrom.port && 
      edge.targetPort === targetPort
    );

    if (!exists) {
      const sourceNode = data.nodes.find(n => n.id === connectingFrom.nodeId);
      // Auto-suggest label if connecting from decision node
      let defaultLabel: string | undefined = undefined;
      if (sourceNode?.type === 'decision') {
        const outEdges = data.edges.filter(ed => ed.sourceId === sourceNode.id);
        if (outEdges.length === 0) defaultLabel = 'Evet';
        else if (outEdges.length === 1) defaultLabel = 'Hayır';
      }

      const newEdge: DiagramEdge = {
        id: `edge_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        sourceId: connectingFrom.nodeId,
        sourcePort: connectingFrom.port,
        targetId: targetNode.id,
        targetPort,
        label: defaultLabel
      };

      const nextData: DiagramData = {
        ...data,
        edges: [...data.edges, newEdge]
      };
      setSelectedEdgeId(newEdge.id);
      commitChange(nextData);
    }

    setConnectingFrom(null);
  };

  // Global Mouse Move (Window-level)
  const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
    // 1. Panning canvas
    if (isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y
      });
      return;
    }

    // 2. Dragging node
    if (draggingNodeId) {
      const coords = clientToCanvasCoords(e.clientX, e.clientY);
      const newX = Math.round(coords.x - dragOffsetRef.current.x);
      const newY = Math.round(coords.y - dragOffsetRef.current.y);

      setData(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n)
      }));
      return;
    }

    // 3. Resizing node
    if (resizingNodeId) {
      const dx = (e.clientX - resizeStartRef.current.startX) / zoom;
      const dy = (e.clientY - resizeStartRef.current.startY) / zoom;
      const newW = Math.max(130, Math.round(resizeStartRef.current.startW + dx));
      const newH = Math.max(70, Math.round(resizeStartRef.current.startH + dy));

      setData(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => n.id === resizingNodeId ? { ...n, width: newW, height: newH } : n)
      }));
      return;
    }

    // 4. In-progress connector line
    if (connectingFrom) {
      const coords = clientToCanvasCoords(e.clientX, e.clientY);
      setConnectCursorPos(coords);
    }
  }, [isPanning, draggingNodeId, resizingNodeId, connectingFrom, clientToCanvasCoords, zoom]);

  // Global Mouse Up (Window-level)
  const handleGlobalMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
    }
    if (draggingNodeId) {
      setDraggingNodeId(null);
      // Commit change to history & parent
      commitChange(data);
    }
    if (resizingNodeId) {
      setResizingNodeId(null);
      // Commit change to history & parent
      commitChange(data);
    }
    if (connectingFrom) {
      setConnectingFrom(null);
    }
  }, [isPanning, draggingNodeId, resizingNodeId, connectingFrom, commitChange, data]);

  useEffect(() => {
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [handleGlobalMouseMove, handleGlobalMouseUp]);

  // Touch event support for tablet & mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const target = e.target as HTMLElement;
      if (!target.closest('.diagram-node-card') && !target.closest('.diagram-floating-toolbar')) {
        setIsPanning(true);
        panStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPanning && e.touches.length === 1) {
      const touch = e.touches[0];
      setPan({
        x: touch.clientX - panStartRef.current.x,
        y: touch.clientY - panStartRef.current.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  // Node Map for O(1) edge lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, DiagramNode>();
    data.nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [data.nodes]);

  // Compute smooth cubic bezier path for an edge
  const computeEdgePath = (edge: DiagramEdge) => {
    const sourceNode = nodeMap.get(edge.sourceId);
    const targetNode = nodeMap.get(edge.targetId);
    if (!sourceNode || !targetNode) return null;

    const p1 = getPortCoordinates(sourceNode, edge.sourcePort);
    const p2 = getPortCoordinates(targetNode, edge.targetPort);

    // Direction control offsets
    const dx = Math.abs(p2.x - p1.x);
    const dy = Math.abs(p2.y - p1.y);
    const curvature = Math.max(40, Math.min(120, (dx + dy) * 0.35));

    let cx1 = p1.x;
    let cy1 = p1.y;
    let cx2 = p2.x;
    let cy2 = p2.y;

    if (edge.sourcePort === 'right') cx1 += curvature;
    else if (edge.sourcePort === 'left') cx1 -= curvature;
    else if (edge.sourcePort === 'top') cy1 -= curvature;
    else if (edge.sourcePort === 'bottom') cy1 += curvature;

    if (edge.targetPort === 'right') cx2 += curvature;
    else if (edge.targetPort === 'left') cx2 -= curvature;
    else if (edge.targetPort === 'top') cy2 -= curvature;
    else if (edge.targetPort === 'bottom') cy2 += curvature;

    const path = `M ${p1.x} ${p1.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`;
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    return { path, midX, midY, p1, p2 };
  };

  return (
    <div 
      ref={containerRef}
      className="miro-canvas-container"
      onWheel={handleWheel}
      onMouseDown={handleCanvasMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '680px',
        overflow: 'hidden',
        background: '#F8FAFC',
        cursor: isPanning ? 'grabbing' : 'default',
        userSelect: 'none'
      }}
    >
      {/* Background Dot Grid SVG */}
      <svg 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <defs>
          <pattern
            id="miro-dot-grid"
            width={24 * zoom}
            height={24 * zoom}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${pan.x}, ${pan.y})`}
          >
            <circle cx={2 * zoom} cy={2 * zoom} r={1.2 * zoom} fill="#CBD5E1" opacity={0.65} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#miro-dot-grid)" />
      </svg>

      {/* Floating Toolbar */}
      <DiagramToolbar
        onAddNode={handleAddNode}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canDuplicate={!!selectedNodeId}
        onDuplicate={() => handleDuplicate()}
        canDelete={!!selectedNodeId || !!selectedEdgeId}
        onDelete={handleDeleteSelected}
        zoom={zoom}
        onZoomIn={() => setZoom(z => Math.min(2.5, z + 0.15))}
        onZoomOut={() => setZoom(z => Math.max(0.25, z - 0.15))}
        onResetZoom={() => setZoom(1)}
        onFitToScreen={handleFitToScreen}
        onResetTemplate={handleResetTemplate}
      />

      {/* Transformed World Layer (Nodes and Edges) */}
      <div
        className="diagram-world-layer"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {/* SVG Layer for Arrows/Edges */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '6000px',
            height: '6000px',
            overflow: 'visible',
            pointerEvents: 'none'
          }}
        >
          <defs>
            {/* Standard Arrowhead */}
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
            </marker>
            {/* Selected Arrowhead */}
            <marker
              id="arrowhead-selected"
              markerWidth="11"
              markerHeight="8"
              refX="10"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 11 4, 0 8" fill="#2563EB" />
            </marker>
            {/* Connecting In-progress Arrowhead */}
            <marker
              id="arrowhead-connecting"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
            </marker>
          </defs>

          {/* Render All Edges */}
          {data.edges.map(edge => {
            const edgePathInfo = computeEdgePath(edge);
            if (!edgePathInfo) return null;

            const isSelected = selectedEdgeId === edge.id;

            return (
              <g 
                key={edge.id}
                className="diagram-edge-element"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEdgeId(edge.id);
                  setSelectedNodeId(null);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setEditingEdge(edge);
                }}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                {/* Thick Invisible Click Target */}
                <path
                  d={edgePathInfo.path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="18"
                />

                {/* Visible Edge Stroke */}
                <path
                  d={edgePathInfo.path}
                  fill="none"
                  stroke={isSelected ? '#2563EB' : '#64748B'}
                  strokeWidth={isSelected ? '3' : '2'}
                  strokeDasharray={isSelected ? 'none' : 'none'}
                  markerEnd={isSelected ? 'url(#arrowhead-selected)' : 'url(#arrowhead)'}
                  style={{
                    transition: 'stroke 0.12s ease',
                    filter: isSelected ? 'drop-shadow(0 0 3px rgba(37,99,235,0.4))' : 'none'
                  }}
                />

                {/* Edge Label (if any) */}
                {edge.label && (
                  <g 
                    transform={`translate(${edgePathInfo.midX}, ${edgePathInfo.midY})`}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <rect
                      x="-26"
                      y="-11"
                      width="52"
                      height="22"
                      rx="11"
                      fill={edge.label === 'Evet' ? '#DCFCE7' : edge.label === 'Hayır' ? '#FEE2E2' : '#FFFFFF'}
                      stroke={edge.label === 'Evet' ? '#16A34A' : edge.label === 'Hayır' ? '#DC2626' : '#94A3B8'}
                      strokeWidth={isSelected ? '2' : '1.2'}
                      filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={edge.label === 'Evet' ? '#15803D' : edge.label === 'Hayır' ? '#B91C1C' : '#1E293B'}
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* In-progress connecting line */}
          {connectingFrom && (
            <path
              d={`M ${connectingFrom.x} ${connectingFrom.y} L ${connectCursorPos.x} ${connectCursorPos.y}`}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.5"
              strokeDasharray="5,4"
              markerEnd="url(#arrowhead-connecting)"
            />
          )}
        </svg>

        {/* HTML Layer for Node Cards */}
        {data.nodes.map(node => {
          const isSelected = selectedNodeId === node.id;
          const colorTheme = NODE_COLORS[node.color] || NODE_COLORS.blue;
          const isDecision = node.type === 'decision';

          return (
            <div
              key={node.id}
              className={`diagram-node-card ${isSelected ? 'is-selected' : ''}`}
              onMouseDown={(e) => handleNodeMouseDown(e, node)}
              onDoubleClick={(e) => {
                e.stopPropagation();
                setEditingNode(node);
              }}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${node.width}px`,
                height: `${node.height}px`,
                pointerEvents: 'auto',
                cursor: draggingNodeId === node.id ? 'grabbing' : 'grab',
                zIndex: isSelected ? 30 : 10
              }}
            >
              {/* NODE CONTAINER */}
              {isDecision ? (
                /* KARAR (DECISION) - ELMAS (DIAMOND) BIÇIMINDE */
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* SVG Diamond Polygon Background */}
                  <svg
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      overflow: 'visible'
                    }}
                  >
                    <polygon
                      points={`${node.width / 2},2 ${node.width - 2},${node.height / 2} ${node.width / 2},${node.height - 2} 2,${node.height / 2}`}
                      fill={colorTheme.bg}
                      stroke={isSelected ? '#2563EB' : colorTheme.border}
                      strokeWidth={isSelected ? '3' : '2'}
                      filter={isSelected ? 'drop-shadow(0 4px 12px rgba(37,99,235,0.25))' : 'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}
                    />
                  </svg>

                  {/* Diamond Content (Centered Text & Badge) */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '75%',
                      textAlign: 'center',
                      padding: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px'
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        padding: '1px 6px',
                        borderRadius: '10px',
                        background: colorTheme.badgeBg,
                        color: colorTheme.badgeText,
                        fontSize: '9px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        marginBottom: '2px'
                      }}
                    >
                      <HelpCircle size={10} />
                      <span>Karar</span>
                    </div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        fontWeight: 700,
                        color: colorTheme.text,
                        lineHeight: 1.25,
                        wordBreak: 'break-word'
                      }}
                    >
                      {node.title}
                    </h4>
                    {node.description && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: '10px',
                          color: '#64748B',
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {node.description}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* STANDART KUTU: VERİ, İŞLEM, SONUÇ */
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: colorTheme.bg,
                    border: `${isSelected ? '2.5px' : '1.5px'} solid ${isSelected ? '#2563EB' : colorTheme.border}`,
                    borderRadius: node.type === 'result' ? '20px' : '10px',
                    boxShadow: isSelected 
                      ? '0 6px 18px rgba(37,99,235,0.22)' 
                      : '0 2px 8px rgba(15,23,42,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'border-color 0.12s ease, box-shadow 0.12s ease'
                  }}
                >
                  {/* Card Header Strip */}
                  <div
                    style={{
                      background: colorTheme.headerBg,
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `1px solid ${colorTheme.border}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          padding: '2px 5px',
                          borderRadius: '4px',
                          background: colorTheme.badgeBg,
                          color: colorTheme.badgeText,
                          fontSize: '9px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px'
                        }}
                      >
                        {node.type === 'data' && <Database size={10} />}
                        {node.type === 'process' && <Cpu size={10} />}
                        {node.type === 'result' && <Flag size={10} />}
                        <span>{NODE_TYPE_INFO[node.type].label}</span>
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingNode(node);
                        }}
                        title="Düzenle"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#475569',
                          cursor: 'pointer',
                          padding: '2px',
                          borderRadius: '3px'
                        }}
                      >
                        <Edit3 size={11} />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '8px 10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        fontWeight: 700,
                        color: colorTheme.text,
                        lineHeight: 1.3,
                        wordBreak: 'break-word'
                      }}
                    >
                      {node.title}
                    </h4>
                    {node.description && (
                      <p
                        style={{
                          margin: '3px 0 0 0',
                          fontSize: '10.5px',
                          color: '#64748B',
                          lineHeight: 1.25,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {node.description}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* 4 CONNECTION PORTS (Top, Right, Bottom, Left) */}
              {(['top', 'right', 'bottom', 'left'] as PortPosition[]).map(pos => {
                let portLeft = '50%';
                let portTop = '50%';
                let transform = 'translate(-50%, -50%)';

                if (pos === 'top') {
                  portTop = '0px';
                } else if (pos === 'right') {
                  portLeft = '100%';
                } else if (pos === 'bottom') {
                  portTop = '100%';
                } else if (pos === 'left') {
                  portLeft = '0px';
                }

                return (
                  <div
                    key={pos}
                    className="port-dot"
                    onMouseDown={(e) => handlePortMouseDown(e, node, pos)}
                    onMouseUp={(e) => handlePortMouseUp(e, node, pos)}
                    title="Ok çekmek veya bağlamak için sürükleyin"
                    style={{
                      position: 'absolute',
                      left: portLeft,
                      top: portTop,
                      transform,
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '2.5px solid #2563EB',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                      cursor: 'crosshair',
                      zIndex: 25,
                      transition: 'transform 0.1s ease, background 0.1s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = `${transform} scale(1.4)`;
                      e.currentTarget.style.background = '#2563EB';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = `${transform} scale(1)`;
                      e.currentTarget.style.background = '#FFFFFF';
                    }}
                  />
                );
              })}

              {/* RESIZE HANDLE (Bottom-Right) */}
              {isSelected && (
                <div
                  className="node-resize-handle"
                  onMouseDown={(e) => handleResizeMouseDown(e, node)}
                  title="Boyutu değiştirmek için sürükleyin"
                  style={{
                    position: 'absolute',
                    right: '-4px',
                    bottom: '-4px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    background: '#2563EB',
                    border: '2px solid #FFFFFF',
                    cursor: 'nwse-resize',
                    zIndex: 26,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Edit Node Modal */}
      <NodeEditModal
        isOpen={!!editingNode}
        node={editingNode}
        onClose={() => setEditingNode(null)}
        onSave={(nodeId, updates) => {
          const nextNodes = data.nodes.map(n => n.id === nodeId ? { ...n, ...updates } : n);
          commitChange({ ...data, nodes: nextNodes });
        }}
        onDelete={(nodeId) => {
          const nextNodes = data.nodes.filter(n => n.id !== nodeId);
          const nextEdges = data.edges.filter(e => e.sourceId !== nodeId && e.targetId !== nodeId);
          commitChange({ nodes: nextNodes, edges: nextEdges });
          setSelectedNodeId(null);
        }}
        onDuplicate={(nodeId) => handleDuplicate(nodeId)}
      />

      {/* Edit Edge Modal */}
      <EdgeEditModal
        isOpen={!!editingEdge}
        edge={editingEdge}
        onClose={() => setEditingEdge(null)}
        onSave={(edgeId, label) => {
          const nextEdges = data.edges.map(e => e.id === edgeId ? { ...e, label } : e);
          commitChange({ ...data, edges: nextEdges });
        }}
        onDelete={(edgeId) => {
          const nextEdges = data.edges.filter(e => e.id !== edgeId);
          commitChange({ ...data, edges: nextEdges });
          setSelectedEdgeId(null);
        }}
      />
    </div>
  );
};
