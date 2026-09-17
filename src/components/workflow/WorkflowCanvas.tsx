import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  Workflow, 
  WorkflowNode, 
  WorkflowEdge, 
  WorkflowValidationError,
  WorkflowNodeType
} from '../../workflowTypes';
import { WorkflowNodeCard } from './WorkflowNodeCard';
import { WorkflowEdgeLine } from './WorkflowEdgeLine';
import { PaletteItem } from '../../workflowDataExtractor';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  RotateCw, 
  Grid, 
  LayoutDashboard, 
  Download, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Trash2,
  Share2,
  Eye,
  Filter,
  Layers,
  ChevronDown,
  Plus,
  AlertTriangle,
  Cpu,
  FileCheck,
  Boxes
} from 'lucide-react';

interface WorkflowCanvasProps {
  workflow: Workflow;
  validationErrors: WorkflowValidationError[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  activeGroup?: string;
  onSelectGroup?: (group: string) => void;
  onSelectNode: (nodeId: string | null) => void;
  onSelectEdge: (edgeId: string | null) => void;
  onUpdateWorkflow: (updated: Workflow, addToHistory?: boolean) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  workflow,
  validationErrors,
  selectedNodeId,
  selectedEdgeId,
  activeGroup = 'all',
  onSelectGroup,
  onSelectNode,
  onSelectEdge,
  onUpdateWorkflow,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  // Canvas viewport transform
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 50, y: 50 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Grid snap & chapter backdrop options
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [showChapterBackdrops, setShowChapterBackdrops] = useState(true);

  // View Filter: all, 4, 5, 6, 8, errors, outputs
  const [viewFilter, setViewFilter] = useState<'all' | '4' | '5' | '6' | '8' | 'errors' | 'outputs'>('all');
  const [groupFilter, setGroupFilter] = useState<'all' | 'ulasim' | 'teknikaltyapi' | 'lojistik'>(() => {
    if (activeGroup === 'ulasim' || activeGroup === 'teknikaltyapi' || activeGroup === 'lojistik') {
      return activeGroup;
    }
    return 'all';
  });

  useEffect(() => {
    if (activeGroup === 'ulasim' || activeGroup === 'teknikaltyapi' || activeGroup === 'lojistik') {
      setGroupFilter(activeGroup);
    } else if (activeGroup === 'hepsi') {
      setGroupFilter('all');
    }
  }, [activeGroup]);

  // Node dragging state
  const [draggingNodeIds, setDraggingNodeIds] = useState<string[]>([]);
  const [dragOffset, setDragStartPos] = useState<{ startX: number; startY: number; initialPositions: Record<string, { x: number; y: number }> }>({
    startX: 0,
    startY: 0,
    initialPositions: {}
  });

  // Connecting line state
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);
  const [connectingMousePos, setConnectingMousePos] = useState<{ x: number; y: number } | null>(null);

  // Multi-selection state
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  // Quick Add Node Menu state
  const [showAddMenu, setShowAddMenu] = useState(false);

  const handleQuickAddNode = (type: WorkflowNodeType) => {
    const containerW = containerRef.current?.clientWidth || 800;
    const containerH = containerRef.current?.clientHeight || 600;
    const cx = (-pan.x + containerW / 2 - 100) / zoom;
    const cy = (-pan.y + containerH / 2 - 50) / zoom;

    const id = `node-${type}-${Date.now().toString(36)}`;
    let defaultTitle = 'Yeni Tehlike Katmanı';
    let chapterNum = '4';
    let dataFormat = 'Vektör (Poligon)';
    let geometryType = 'Poligon';
    let analysisMethod: string | undefined = undefined;

    if (type === 'critical_component') {
      defaultTitle = 'Yeni Kritik Bileşen';
      chapterNum = '3';
      dataFormat = 'Vektör (Çizgi)';
      geometryType = 'Çizgi';
    } else if (type === 'analysis_method') {
      defaultTitle = 'Yeni Analiz Yöntemi';
      chapterNum = 'genel';
      dataFormat = 'CBS Yöntemi';
      geometryType = 'Yok';
      analysisMethod = 'Mekânsal çakışma analizi';
    } else if (type === 'intermediate_output') {
      defaultTitle = 'Yeni Ara Analiz Çıktısı';
      chapterNum = '4';
      dataFormat = 'Vektör / Raster Harita';
      geometryType = 'Poligon';
    } else if (type === 'integrated_assessment') {
      defaultTitle = 'Yeni Bütünleşik Sentez';
      chapterNum = '8';
      dataFormat = 'Çok Kriterli Sentez Modeli';
      geometryType = 'Poligon';
    }

    const newNode: WorkflowNode = {
      id,
      type,
      title: defaultTitle,
      chapterNum,
      workingGroup: workflow.workingGroup || (activeGroup === 'hepsi' ? 'ulasim' : activeGroup),
      dataFormat,
      geometryType,
      analysisMethod,
      status: 'not_started',
      x: Math.round(cx / 20) * 20,
      y: Math.round(cy / 20) * 20
    };

    onUpdateWorkflow({
      ...workflow,
      nodes: [...workflow.nodes, newNode],
      updatedAt: Date.now()
    }, true);

    onSelectNode(newNode.id);
    onSelectEdge(null);
    setShowAddMenu(false);
  };

  // Validation Drawer toggle
  const [showValidationDrawer, setShowValidationDrawer] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync selectedNodeId prop with internal array
  useEffect(() => {
    if (selectedNodeId) {
      setSelectedNodeIds([selectedNodeId]);
    } else {
      setSelectedNodeIds([]);
    }
  }, [selectedNodeId]);

  // Native non-passive wheel event listener for direct smooth zoom centered on mouse cursor
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      // Mouse wheel directly zooms in and out
      const zoomFactor = e.deltaY < 0 ? 1.09 : 0.91;
      
      setZoom(currentZoom => {
        const newZoom = Math.min(Math.max(currentZoom * zoomFactor, 0.2), 2.5);
        const rect = el.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setPan(currentPan => ({
          x: mouseX - (mouseX - currentPan.x) * (newZoom / currentZoom),
          y: mouseY - (mouseY - currentPan.y) * (newZoom / currentZoom)
        }));

        return newZoom;
      });
    };

    el.addEventListener('wheel', onWheelNative, { passive: false });
    return () => el.removeEventListener('wheel', onWheelNative);
  }, []);

  // Canvas Mouse Down: Start Pan or Selection Box with Left Click
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Only handle left click (button 0)
    if (e.button !== 0) return;

    if (e.shiftKey) {
      // Shift + click: Start drag selection box
      const rect = containerRef.current!.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - pan.x) / zoom;
      const canvasY = (e.clientY - rect.top - pan.y) / zoom;
      setSelectionBox({ startX: canvasX, startY: canvasY, currentX: canvasX, currentY: canvasY });
    } else {
      // Normal Left-Click: Start panning/dragging the screen!
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      onSelectNode(null);
      onSelectEdge(null);
      setSelectedNodeIds([]);
      setConnectingSourceId(null);
      setConnectingMousePos(null);
    }
  };

  // Window listeners to ensure smooth continuous drag panning even if mouse moves fast or outside container
  useEffect(() => {
    if (!isPanning) return;

    const onWindowMouseMove = (e: MouseEvent) => {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    };

    const onWindowMouseUp = () => {
      setIsPanning(false);
    };

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    };
  }, [isPanning, panStart]);

  // Canvas Mouse Move
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    // 1. Panning
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    // 2. Selection Box
    if (selectionBox && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - pan.x) / zoom;
      const canvasY = (e.clientY - rect.top - pan.y) / zoom;
      setSelectionBox(prev => prev ? { ...prev, currentX: canvasX, currentY: canvasY } : null);

      // Check nodes inside box
      const boxLeft = Math.min(selectionBox.startX, canvasX);
      const boxRight = Math.max(selectionBox.startX, canvasX);
      const boxTop = Math.min(selectionBox.startY, canvasY);
      const boxBottom = Math.max(selectionBox.startY, canvasY);

      const insideIds = workflow.nodes.filter(n => {
        const nw = n.width || 230;
        return n.x + nw > boxLeft && n.x < boxRight && n.y + 80 > boxTop && n.y < boxBottom;
      }).map(n => n.id);

      setSelectedNodeIds(insideIds);
      if (insideIds[0]) onSelectNode(insideIds[0]);
      return;
    }

    // 3. Node Dragging
    if (draggingNodeIds.length > 0) {
      const dx = (e.clientX - dragOffset.startX) / zoom;
      const dy = (e.clientY - dragOffset.startY) / zoom;

      const updatedNodes = workflow.nodes.map(n => {
        if (draggingNodeIds.includes(n.id) && dragOffset.initialPositions[n.id]) {
          let newX = dragOffset.initialPositions[n.id].x + dx;
          let newY = dragOffset.initialPositions[n.id].y + dy;

          if (snapToGrid) {
            newX = Math.round(newX / 20) * 20;
            newY = Math.round(newY / 20) * 20;
          }

          return { ...n, x: newX, y: newY };
        }
        return n;
      });

      onUpdateWorkflow({ ...workflow, nodes: updatedNodes }, false);
      return;
    }

    // 4. Connecting Line
    if (connectingSourceId && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - pan.x) / zoom;
      const canvasY = (e.clientY - rect.top - pan.y) / zoom;
      setConnectingMousePos({ x: canvasX, y: canvasY });
    }
  };

  // Canvas Mouse Up
  const handleCanvasMouseUp = () => {
    if (isPanning) setIsPanning(false);

    if (selectionBox) {
      setSelectionBox(null);
    }

    if (draggingNodeIds.length > 0) {
      setDraggingNodeIds([]);
      // Commit final position to history
      onUpdateWorkflow({ ...workflow }, true);
    }

    if (connectingSourceId) {
      setConnectingSourceId(null);
      setConnectingMousePos(null);
    }
  };

  // Start dragging a node
  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let currentSelection = selectedNodeIds;
    if (!selectedNodeIds.includes(nodeId)) {
      currentSelection = e.shiftKey ? [...selectedNodeIds, nodeId] : [nodeId];
      setSelectedNodeIds(currentSelection);
      onSelectNode(nodeId);
    }

    const initPos: Record<string, { x: number; y: number }> = {};
    workflow.nodes.forEach(n => {
      if (currentSelection.includes(n.id)) {
        initPos[n.id] = { x: n.x, y: n.y };
      }
    });

    setDraggingNodeIds(currentSelection);
    setDragStartPos({
      startX: e.clientX,
      startY: e.clientY,
      initialPositions: initPos
    });
  };

  // Connecting Logic
  const handleStartConnect = (sourceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConnectingSourceId(sourceId);
    const srcNode = workflow.nodes.find(n => n.id === sourceId);
    if (srcNode) {
      setConnectingMousePos({ x: srcNode.x + (srcNode.width || 230), y: srcNode.y + 40 });
    }
  };

  const handleEndConnect = (targetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!connectingSourceId || connectingSourceId === targetId) {
      setConnectingSourceId(null);
      setConnectingMousePos(null);
      return;
    }

    // Check if edge already exists
    const exists = workflow.edges.some(
      edge => edge.sourceId === connectingSourceId && edge.targetId === targetId
    );

    if (!exists) {
      const newEdge: WorkflowEdge = {
        id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        sourceId: connectingSourceId,
        targetId,
        label: ''
      };

      const updatedEdges = [...workflow.edges, newEdge];
      onUpdateWorkflow({ ...workflow, edges: updatedEdges }, true);
      onSelectEdge(newEdge.id);
    }

    setConnectingSourceId(null);
    setConnectingMousePos(null);
  };

  // Fit to screen calculation
  const handleFitToScreen = () => {
    if (workflow.nodes.length === 0 || !containerRef.current) {
      setZoom(1);
      setPan({ x: 50, y: 50 });
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    workflow.nodes.forEach(n => {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + (n.width || 230));
      maxY = Math.max(maxY, n.y + 100);
    });

    const rect = containerRef.current.getBoundingClientRect();
    const padding = 60;
    const contentW = Math.max(maxX - minX + padding * 2, 400);
    const contentH = Math.max(maxY - minY + padding * 2, 400);

    const scaleX = rect.width / contentW;
    const scaleY = rect.height / contentH;
    const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY), 0.35), 1.3);

    const newPanX = (rect.width - (maxX - minX) * newZoom) / 2 - minX * newZoom;
    const newPanY = (rect.height - (maxY - minY) * newZoom) / 2 - minY * newZoom;

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  // Auto layout: Hierarchical column-based positioning
  const handleAutoLayout = () => {
    if (workflow.nodes.length === 0) return;

    // Categorize nodes into 4 hierarchical columns:
    // Col 0: Hazards & Critical Components
    // Col 1: Analysis Methods
    // Col 2: Intermediate Outputs
    // Col 3: Integrated Assessments (Chapter 8)
    const col0: WorkflowNode[] = [];
    const col1: WorkflowNode[] = [];
    const col2: WorkflowNode[] = [];
    const col3: WorkflowNode[] = [];

    workflow.nodes.forEach(n => {
      if (n.type === 'hazard' || n.type === 'critical_component') {
        col0.push(n);
      } else if (n.type === 'analysis_method') {
        col1.push(n);
      } else if (n.type === 'intermediate_output') {
        col2.push(n);
      } else {
        col3.push(n);
      }
    });

    const nodeWidth = 240;
    const colGap = 120;
    const rowGap = 30;
    const startX = 60;
    const startY = 80;

    const newPositions: Record<string, { x: number; y: number }> = {};

    [col0, col1, col2, col3].forEach((colNodes, colIdx) => {
      const curX = startX + colIdx * (nodeWidth + colGap);
      colNodes.forEach((node, rowIdx) => {
        newPositions[node.id] = {
          x: curX,
          y: startY + rowIdx * (110 + rowGap)
        };
      });
    });

    const updatedNodes = workflow.nodes.map(n => ({
      ...n,
      x: newPositions[n.id]?.x ?? n.x,
      y: newPositions[n.id]?.y ?? n.y
    }));

    onUpdateWorkflow({ ...workflow, nodes: updatedNodes }, true);
    setTimeout(() => handleFitToScreen(), 50);
  };

  // Drop item from left palette
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('application/json');
    if (!raw || !containerRef.current) return;

    try {
      const item: PaletteItem = JSON.parse(raw);
      const rect = containerRef.current.getBoundingClientRect();
      let dropX = (e.clientX - rect.left - pan.x) / zoom;
      let dropY = (e.clientY - rect.top - pan.y) / zoom;

      if (snapToGrid) {
        dropX = Math.round(dropX / 20) * 20;
        dropY = Math.round(dropY / 20) * 20;
      }

      const newNode: WorkflowNode = {
        id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        type: item.type,
        title: item.title,
        chapterNum: item.chapterNum || workflow.chapterNum,
        workingGroup: item.workingGroup || workflow.workingGroup,
        componentGroup: item.componentGroup,
        relatedHazard: item.relatedHazard,
        dataFormat: item.dataFormat,
        geometryType: item.geometryType,
        analysisMethod: item.analysisMethod,
        description: item.description,
        dataSource: item.dataSource,
        dataYear: item.dataYear,
        status: 'not_started',
        x: dropX,
        y: dropY,
        width: 230
      };

      const updatedNodes = [...workflow.nodes, newNode];
      onUpdateWorkflow({ ...workflow, nodes: updatedNodes }, true);
      onSelectNode(newNode.id);
    } catch {
      // ignore invalid json
    }
  };

  // Filtered nodes according to current viewFilter
  const visibleNodes = useMemo(() => {
    const errorNodeIds = new Set(validationErrors.map(e => e.nodeId).filter(Boolean));

    return workflow.nodes.filter(node => {
      // Working group filter
      if (groupFilter !== 'all' && node.workingGroup !== groupFilter && node.workingGroup !== 'hepsi') {
        return false;
      }

      // View filter
      if (viewFilter === 'all') return true;
      if (['4', '5', '6', '8'].includes(viewFilter)) {
        return node.chapterNum === viewFilter;
      }
      if (viewFilter === 'errors') {
        return errorNodeIds.has(node.id);
      }
      if (viewFilter === 'outputs') {
        return node.type === 'intermediate_output' || node.type === 'integrated_assessment';
      }
      return true;
    });
  }, [workflow.nodes, viewFilter, groupFilter, validationErrors]);

  const visibleNodeIdSet = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes]);

  // Edges that connect visible nodes
  const visibleEdges = useMemo(() => {
    return workflow.edges.filter(
      edge => visibleNodeIdSet.has(edge.sourceId) && visibleNodeIdSet.has(edge.targetId)
    );
  }, [workflow.edges, visibleNodeIdSet]);

  // Visual Chapter Grouping Bounding Boxes
  const chapterBounds = useMemo(() => {
    if (!showChapterBackdrops) return [];

    const chapters = ['4', '5', '6', '8'];
    const bounds: { chapter: string; title: string; minX: number; minY: number; maxX: number; maxY: number }[] = [];

    const titles: Record<string, string> = {
      '4': '4. BÖLÜM: DOĞA KAYNAKLI AFETLER VE MARUZİYET ANALİZLERİ',
      '5': '5. BÖLÜM: İNSAN VE TEKNOLOJİ KAYNAKLI AFETLER',
      '6': '6. BÖLÜM: İKLİM KRİZİ ETKİLERİ VE DAYANIKLILIK',
      '8': '8. BÖLÜM: ÇOKLU RİSK DEĞERLENDİRMESİ VE BÜTÜNLEŞİK SENTEZ'
    };

    chapters.forEach(ch => {
      const chNodes = workflow.nodes.filter(n => n.chapterNum === ch);
      if (chNodes.length >= 2) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        chNodes.forEach(n => {
          minX = Math.min(minX, n.x);
          minY = Math.min(minY, n.y);
          maxX = Math.max(maxX, n.x + (n.width || 230));
          maxY = Math.max(maxY, n.y + 110);
        });

        bounds.push({
          chapter: ch,
          title: titles[ch] || `${ch}. Bölüm`,
          minX: minX - 25,
          minY: minY - 35,
          maxX: maxX + 25,
          maxY: maxY + 25
        });
      }
    });

    return bounds;
  }, [workflow.nodes, showChapterBackdrops]);

  // Export Workflow as SVG
  const handleExportSVG = () => {
    const svgEl = document.getElementById('workflow-canvas-svg');
    if (!svgEl) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflow.name.replace(/\s+/g, '_')}_Analiz_Akisi.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export as JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(workflow, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflow.name.replace(/\s+/g, '_')}_ModelBuilder.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.nodes && parsed.edges) {
          onUpdateWorkflow({
            ...parsed,
            id: workflow.id, // keep current workflow container ID
            updatedAt: Date.now()
          }, true);
        }
      } catch (err) {
        alert('Geçersiz JSON iş akışı dosyası.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Delete selected nodes or edges (accessible via button or keyboard)
  const handleDeleteSelected = useCallback(() => {
    const toDeleteIds = new Set(
      selectedNodeIds.length > 0
        ? selectedNodeIds
        : (selectedNodeId ? [selectedNodeId] : [])
    );

    if (toDeleteIds.size > 0) {
      const remainingNodes = workflow.nodes.filter(n => !toDeleteIds.has(n.id));
      const remainingEdges = workflow.edges.filter(
        e => !toDeleteIds.has(e.sourceId) && !toDeleteIds.has(e.targetId)
      );
      onUpdateWorkflow({ ...workflow, nodes: remainingNodes, edges: remainingEdges }, true);
      setSelectedNodeIds([]);
      onSelectNode(null);
    } else if (selectedEdgeId) {
      const remainingEdges = workflow.edges.filter(e => e.id !== selectedEdgeId);
      onUpdateWorkflow({ ...workflow, edges: remainingEdges }, true);
      onSelectEdge(null);
    }
  }, [selectedNodeIds, selectedNodeId, selectedEdgeId, workflow, onUpdateWorkflow, onSelectNode, onSelectEdge]);

  const handleDeleteSingleNode = useCallback((nodeId: string) => {
    const remainingNodes = workflow.nodes.filter(n => n.id !== nodeId);
    const remainingEdges = workflow.edges.filter(
      e => e.sourceId !== nodeId && e.targetId !== nodeId
    );
    onUpdateWorkflow({ ...workflow, nodes: remainingNodes, edges: remainingEdges }, true);
    setSelectedNodeIds(prev => prev.filter(id => id !== nodeId));
    if (selectedNodeId === nodeId) {
      onSelectNode(null);
    }
  }, [workflow, onUpdateWorkflow, selectedNodeId, onSelectNode]);

  // Delete selected nodes / edges via Keyboard Delete / Backspace
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDeleteSelected();
      }

      // Ctrl + Z / Ctrl + Y
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          if (canRedo) onRedo();
        } else {
          if (canUndo) onUndo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDeleteSelected, canUndo, canRedo, onUndo, onRedo]);

  return (
    <div style={{ position: 'relative', flex: 1, height: '100%', overflow: 'hidden', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Canvas Controls Toolbar */}
      <div
        style={{
          height: '46px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          zIndex: 20
        }}
      >
        {/* Left Toolbar: View & Group Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* View Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Filter size={12} /> Görünüm:
            </span>
            <select
              value={viewFilter}
              onChange={(e) => setViewFilter(e.target.value as any)}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 8px',
                borderRadius: '5px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#0F172A'
              }}
            >
              <option value="all">Tüm Analiz Akışı</option>
              <option value="4">4. Bölüm (Doğa Afetleri)</option>
              <option value="5">5. Bölüm (İnsan/Teknoloji)</option>
              <option value="6">6. Bölüm (İklim Krizi)</option>
              <option value="8">8. Bölüm (Çoklu Risk Sentezi)</option>
              <option value="errors">Yalnızca Eksik Bağlantılar</option>
              <option value="outputs">Yalnızca Nihai Çıktılar</option>
            </select>
          </div>

          {/* Group Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <select
              value={groupFilter}
              onChange={(e) => {
                const val = e.target.value as any;
                setGroupFilter(val);
                onSelectGroup?.(val);
              }}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 8px',
                borderRadius: '5px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#0F172A'
              }}
            >
              <option value="all">Tüm Çalışma Grupları</option>
              <option value="ulasim">Ulaşım Grubu</option>
              <option value="teknikaltyapi">Teknik Altyapı</option>
              <option value="lojistik">Lojistik Grubu</option>
            </select>
          </div>

          {/* Validation Status Badge */}
          <button
            type="button"
            onClick={() => setShowValidationDrawer(prev => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: '5px',
              border: validationErrors.length === 0 ? '1px solid #A7F3D0' : '1px solid #FCA5A5',
              background: validationErrors.length === 0 ? '#ECFDF5' : '#FEF2F2',
              color: validationErrors.length === 0 ? '#059669' : '#DC2626',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {validationErrors.length === 0 ? (
              <>
                <CheckCircle2 size={12} />
                <span>Model Doğrulandı (0 Uyarı)</span>
              </>
            ) : (
              <>
                <AlertCircle size={12} />
                <span>{validationErrors.length} Model Uyarısı</span>
              </>
            )}
          </button>
        </div>

        {/* Right Toolbar: Zoom, Undo/Redo, Layout, Export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Snap to Grid toggle */}
          <button
            type="button"
            title="Izgaraya Hizala (Snap to Grid)"
            onClick={() => setSnapToGrid(!snapToGrid)}
            style={{
              padding: '5px 8px',
              borderRadius: '4px',
              border: snapToGrid ? '1px solid #2563EB' : '1px solid #CBD5E1',
              background: snapToGrid ? '#EFF6FF' : '#FFFFFF',
              color: snapToGrid ? '#2563EB' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px'
            }}
          >
            <Grid size={13} />
            <span>Izgara</span>
          </button>

          {/* Chapter Backdrops toggle */}
          <button
            type="button"
            title="Bölüm Alanlarını Göster"
            onClick={() => setShowChapterBackdrops(!showChapterBackdrops)}
            style={{
              padding: '5px 8px',
              borderRadius: '4px',
              border: showChapterBackdrops ? '1px solid #0F172A' : '1px solid #CBD5E1',
              background: showChapterBackdrops ? '#0F172A' : '#FFFFFF',
              color: showChapterBackdrops ? '#FFFFFF' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px'
            }}
          >
            <Layers size={13} />
            <span>Bölümleme</span>
          </button>

          {/* Quick Add Node Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              title="Şemaya Yeni Kutu Ekle"
              onClick={() => setShowAddMenu(!showAddMenu)}
              style={{
                padding: '5px 8px',
                borderRadius: '4px',
                border: '1px solid #2563EB',
                background: '#2563EB',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 600,
                boxShadow: '0 1px 2px rgba(37,99,235,0.2)'
              }}
            >
              <Plus size={13} />
              <span>+ Kutu Ekle</span>
              <ChevronDown size={11} />
            </button>

            {showAddMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '4px',
                  width: '210px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
                  border: '1px solid #E2E8F0',
                  padding: '5px',
                  zIndex: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', padding: '4px 6px 2px', textTransform: 'uppercase' }}>
                  Kutu Türü Seçin
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickAddNode('hazard')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: 'transparent',
                    color: '#DC2626',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <AlertTriangle size={13} />
                  <span>+ Tehlike Kutusu Ekle</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickAddNode('critical_component')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: 'transparent',
                    color: '#2563EB',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#EFF6FF')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Layers size={13} />
                  <span>+ Bileşen Kutusu Ekle</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickAddNode('analysis_method')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: 'transparent',
                    color: '#D97706',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#FFFBEB')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Cpu size={13} />
                  <span>+ Analiz Yöntemi Ekle</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickAddNode('intermediate_output')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: 'transparent',
                    color: '#059669',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#ECFDF5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <FileCheck size={13} />
                  <span>+ Ara Çıktı Kutusu Ekle</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickAddNode('integrated_assessment')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: 'transparent',
                    color: '#7C3AED',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F3FF')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Boxes size={13} />
                  <span>+ Bütünleşik Sentez Ekle</span>
                </button>
              </div>
            )}
          </div>

          {/* Auto Layout */}
          <button
            type="button"
            title="Otomatik Düzenle (ModelBuilder Akış Sıralaması)"
            onClick={handleAutoLayout}
            style={{
              padding: '5px 8px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            <LayoutDashboard size={13} />
            <span>Otomatik Düzenle</span>
          </button>

          {/* Delete Selected Item(s) Button */}
          {(selectedNodeIds.length > 0 || selectedNodeId || selectedEdgeId) && (
            <button
              type="button"
              title="Seçili Öğeleri Sil (Delete / Backspace)"
              onClick={handleDeleteSelected}
              style={{
                padding: '5px 8px',
                borderRadius: '4px',
                border: '1px solid #FCA5A5',
                background: '#FEF2F2',
                color: '#DC2626',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 600,
                boxShadow: '0 1px 2px rgba(220,38,38,0.08)'
              }}
            >
              <Trash2 size={13} />
              <span>Sil ({selectedNodeIds.length > 0 ? selectedNodeIds.length : 1})</span>
            </button>
          )}

          {/* Undo / Redo */}
          <button
            type="button"
            title="Geri Al (Ctrl+Z)"
            disabled={!canUndo}
            onClick={onUndo}
            style={{
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: canUndo ? '#334155' : '#CBD5E1',
              cursor: canUndo ? 'pointer' : 'default'
            }}
          >
            <RotateCcw size={13} />
          </button>

          <button
            type="button"
            title="Yinele (Ctrl+Y)"
            disabled={!canRedo}
            onClick={onRedo}
            style={{
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: canRedo ? '#334155' : '#CBD5E1',
              cursor: canRedo ? 'pointer' : 'default'
            }}
          >
            <RotateCw size={13} />
          </button>

          {/* Zoom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '4px', overflow: 'hidden' }}>
            <button
              type="button"
              title="Yakınlaştır"
              onClick={() => setZoom(prev => Math.min(prev * 1.15, 2.0))}
              style={{ padding: '4px 6px', background: '#FFFFFF', border: 'none', borderRight: '1px solid #CBD5E1', cursor: 'pointer', color: '#475569' }}
            >
              <ZoomIn size={12} />
            </button>
            <button
              type="button"
              title="Uzaklaştır"
              onClick={() => setZoom(prev => Math.max(prev * 0.85, 0.25))}
              style={{ padding: '4px 6px', background: '#FFFFFF', border: 'none', borderRight: '1px solid #CBD5E1', cursor: 'pointer', color: '#475569' }}
            >
              <ZoomOut size={12} />
            </button>
            <button
              type="button"
              title="Ekrana Sığdır"
              onClick={handleFitToScreen}
              style={{ padding: '4px 6px', background: '#FFFFFF', border: 'none', cursor: 'pointer', color: '#475569' }}
            >
              <Maximize2 size={12} />
            </button>
            <span style={{ fontSize: '10px', color: '#64748B', padding: '0 6px', background: '#F8FAFC' }}>
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Export / Share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              title="SVG Olarak Dışa Aktar"
              onClick={handleExportSVG}
              style={{
                padding: '5px 7px',
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                cursor: 'pointer',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <Download size={12} />
              <span>SVG</span>
            </button>

            <button
              type="button"
              title="JSON Dosyası Olarak Kaydet"
              onClick={handleExportJSON}
              style={{
                padding: '5px 7px',
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                cursor: 'pointer',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <Download size={12} />
              <span>JSON</span>
            </button>

            <label
              title="JSON Akışı Yükle"
              style={{
                padding: '5px 7px',
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                cursor: 'pointer',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <Upload size={12} />
              <span>Yükle</span>
              <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }}
        onDrop={handleDrop}
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          cursor: isPanning ? 'grabbing' : (draggingNodeIds.length > 0 ? 'move' : 'grab'),
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      >
        {/* Transform Container */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            pointerEvents: 'none'
          }}
        >
          {/* SVG Layer for Connections and Chapter Backdrops */}
          <svg
            id="workflow-canvas-svg"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '8000px',
              height: '8000px',
              overflow: 'visible',
              pointerEvents: 'none'
            }}
          >
            <defs>
              <marker
                id="arrow-normal"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748B" />
              </marker>

              <marker
                id="arrow-selected"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563EB" />
              </marker>
            </defs>

            {/* Chapter Group Backdrops */}
            {chapterBounds.map(b => (
              <g key={b.chapter} style={{ pointerEvents: 'none' }}>
                <rect
                  x={b.minX}
                  y={b.minY}
                  width={b.maxX - b.minX}
                  height={b.maxY - b.minY}
                  rx={12}
                  fill="rgba(241, 245, 249, 0.6)"
                  stroke="#CBD5E1"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <text
                  x={b.minX + 14}
                  y={b.minY + 20}
                  fontSize="11"
                  fontWeight="700"
                  fill="#475569"
                  letterSpacing="0.03em"
                >
                  {b.title}
                </text>
              </g>
            ))}

            {/* Edges */}
            <g style={{ pointerEvents: 'all' }}>
              {visibleEdges.map(edge => {
                const src = workflow.nodes.find(n => n.id === edge.sourceId);
                const tgt = workflow.nodes.find(n => n.id === edge.targetId);
                return (
                  <WorkflowEdgeLine
                    key={edge.id}
                    edge={edge}
                    sourceNode={src}
                    targetNode={tgt}
                    isSelected={selectedEdgeId === edge.id}
                    onSelect={(edgeId, e) => {
                      e.stopPropagation();
                      onSelectEdge(edgeId);
                      onSelectNode(null);
                    }}
                  />
                );
              })}
            </g>

            {/* Active Connecting Drag Line */}
            {connectingSourceId && connectingMousePos && (() => {
              const src = workflow.nodes.find(n => n.id === connectingSourceId);
              if (!src) return null;
              const x1 = src.x + (src.width || 230);
              const y1 = src.y + 40;
              const x2 = connectingMousePos.x;
              const y2 = connectingMousePos.y;
              return (
                <path
                  d={`M ${x1} ${y1} C ${x1 + 60} ${y1}, ${x2 - 60} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              );
            })()}
          </svg>

          {/* Node Cards Layer */}
          <div style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'auto' }}>
            {visibleNodes.map(node => {
              const isErroneous = validationErrors.some(v => v.nodeId === node.id);
              return (
                <WorkflowNodeCard
                  key={node.id}
                  node={node}
                  isSelected={selectedNodeIds.includes(node.id)}
                  isHighlighted={isErroneous}
                  isConnectingSource={connectingSourceId === node.id}
                  isConnectingTargetCandidate={connectingSourceId !== null && connectingSourceId !== node.id}
                  onSelect={(nodeId, e) => {
                    if (e.shiftKey) {
                      const updated = selectedNodeIds.includes(nodeId)
                        ? selectedNodeIds.filter(id => id !== nodeId)
                        : [...selectedNodeIds, nodeId];
                      setSelectedNodeIds(updated);
                      onSelectNode(nodeId);
                    } else {
                      setSelectedNodeIds([nodeId]);
                      onSelectNode(nodeId);
                    }
                    onSelectEdge(null);
                  }}
                  onStartConnect={handleStartConnect}
                  onEndConnect={handleEndConnect}
                  onMouseDown={handleNodeMouseDown}
                  onDelete={handleDeleteSingleNode}
                />
              );
            })}
          </div>
        </div>

        {/* Drag Selection Box (Rubberband) */}
        {selectionBox && (
          <div
            style={{
              position: 'absolute',
              left: `${Math.min(selectionBox.startX, selectionBox.currentX) * zoom + pan.x}px`,
              top: `${Math.min(selectionBox.startY, selectionBox.currentY) * zoom + pan.y}px`,
              width: `${Math.abs(selectionBox.currentX - selectionBox.startX) * zoom}px`,
              height: `${Math.abs(selectionBox.currentY - selectionBox.startY) * zoom}px`,
              border: '1px solid #2563EB',
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Initial Empty State guidance if workflow has no nodes */}
        {workflow.nodes.length === 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                maxWidth: '480px',
                textAlign: 'center',
                padding: '24px 28px',
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                Analiz Akış Şeması Boş
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
                Sol taraftaki <strong>Bileşen Kütüphanesi</strong> panelinden afet tehlikelerini, kritik altyapı/lojistik/ulaşım katmanlarını ve analiz yöntemlerini sürükleyip tuvale bırakın.
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#2563EB',
                  background: '#EFF6FF',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #BFDBFE'
                }}
              >
                Tehlike + Kritik Bileşen → Analiz Yöntemi → Ara Çıktı → Bütünleşik Değerlendirme
              </div>
            </div>
          </div>
        )}

        {/* Interactive Navigation Control Helper Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            right: 14,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(6px)',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#334155',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 15
          }}
        >
          <span>🖱️ <strong>Sol Tık ile Sürükle:</strong> Tuvali Kaydır</span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span>🔍 <strong>Fare Tekerleği:</strong> Yakınlaş / Uzaklaş</span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span>📐 <strong>Shift + Sol Tık:</strong> Çoklu Seç</span>
        </div>
      </div>

      {/* Validation Issues Drawer */}
      {showValidationDrawer && (
        <div
          style={{
            height: '180px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            boxShadow: '0 -4px 10px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 30
          }}
        >
          <div
            style={{
              padding: '8px 14px',
              borderBottom: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F8FAFC'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={14} style={{ color: validationErrors.length > 0 ? '#DC2626' : '#059669' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                ModelBuilder Doğrulama ve Uyarı Listesi ({validationErrors.length})
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowValidationDrawer(false)}
              style={{
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                borderRadius: '4px',
                padding: '2px 7px',
                fontSize: '11px',
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              Kapat
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {validationErrors.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#059669', fontSize: '12px', fontWeight: 600 }}>
                ✓ İş akışında hiçbir mantıksal veya bağlantı hatası tespit edilmedi. Tüm veri akışı tutarlı.
              </div>
            ) : (
              validationErrors.map(err => (
                <div
                  key={err.id}
                  onClick={() => {
                    if (err.nodeId) {
                      setSelectedNodeIds([err.nodeId]);
                      onSelectNode(err.nodeId);
                    }
                  }}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '5px',
                    border: err.severity === 'error' ? '1px solid #FCA5A5' : '1px solid #FDE68A',
                    backgroundColor: err.severity === 'error' ? '#FEF2F2' : '#FFFBEB',
                    color: err.severity === 'error' ? '#991B1B' : '#92400E',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: err.nodeId ? 'pointer' : 'default'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 700 }}>
                      {err.severity === 'error' ? 'HATA:' : 'UYARI:'}
                    </span>
                    <span>{err.message}</span>
                  </div>

                  {err.nodeId && (
                    <span style={{ fontSize: '10px', textDecoration: 'underline', color: '#2563EB', fontWeight: 600 }}>
                      Kutuya Git
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
