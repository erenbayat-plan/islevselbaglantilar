import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Workflow, WorkflowNode, WorkflowEdge, WorkflowValidationError } from '../workflowTypes';
import { WorkflowPalette } from './workflow/WorkflowPalette';
import { WorkflowCanvas } from './workflow/WorkflowCanvas';
import { WorkflowDetailPanel } from './workflow/WorkflowDetailPanel';
import { WorkflowModal } from './workflow/WorkflowModal';
import { validateWorkflow } from '../workflowValidator';
import { PaletteItem } from '../workflowDataExtractor';
import { 
  Plus, 
  GitBranch, 
  Trash2, 
  Copy, 
  Edit3, 
  ChevronDown, 
  FolderCheck,
  Sparkles
} from 'lucide-react';

const WORKFLOWS_STORAGE_KEY = 'spatial_workflows_v1';
const ACTIVE_WORKFLOW_ID_KEY = 'spatial_active_workflow_id_v1';

const DEFAULT_GROUP_WORKFLOWS: Record<string, Workflow> = {
  'wf-ulasim': {
    id: 'wf-ulasim',
    name: 'Ulaşım Sistemleri ve Ağ Dayanıklılığı Analiz Akışı',
    chapterNum: 'hepsi',
    workingGroup: 'ulasim',
    purpose: 'Karayolu, raylı sistem ve deniz ulaşımı kritik bileşenlerinin afet ve iklim risk modelleme akışı',
    componentGroup: 'Ulaşım Ağı ve Kritik Varlıklar',
    expectedOutput: 'Ulaşım Ağı Çoklu Afet Risk Haritası ve Tahliye Koridoru Sentezi',
    nodes: [],
    edges: [],
    createdAt: 1700000000000,
    updatedAt: 1700000000000
  },
  'wf-teknikaltyapi': {
    id: 'wf-teknikaltyapi',
    name: 'Teknik Altyapı ve Tesis Dayanıklılığı Analiz Akışı',
    chapterNum: 'hepsi',
    workingGroup: 'teknikaltyapi',
    purpose: 'İçme suyu, atıksu, enerji iletim hatları, doğalgaz ve haberleşme kritik tesislerinin afet risk analizi',
    componentGroup: 'Teknik Altyapı ve Şebekeler',
    expectedOutput: 'Teknik Altyapı Çoklu Afet Risk Haritası ve Hizmet Kesintisi Öncelik Analizi',
    nodes: [],
    edges: [],
    createdAt: 1700000000001,
    updatedAt: 1700000000001
  },
  'wf-lojistik': {
    id: 'wf-lojistik',
    name: 'Lojistik Tesisleri ve Tedarik Zinciri Analiz Akışı',
    chapterNum: 'hepsi',
    workingGroup: 'lojistik',
    purpose: 'Limanlar, havalimanları, lojistik merkezler ve acil yardım tedarik koridorlarının tedarik sürekliliği modellemesi',
    componentGroup: 'Lojistik ve Tedarik Merkezleri',
    expectedOutput: 'Lojistik Sistemler Çoklu Afet Risk Haritası ve Tedarik Zinciri Kırılganlık Sentezi',
    nodes: [],
    edges: [],
    createdAt: 1700000000002,
    updatedAt: 1700000000002
  }
};

interface WorkflowBuilderTabProps {
  activeGroup?: string;
  onSelectGroup?: (group: string) => void;
}

export const WorkflowBuilderTab: React.FC<WorkflowBuilderTabProps> = ({
  activeGroup = 'ulasim',
  onSelectGroup
}) => {
  // Load saved workflows or start with grouped workflows
  const [workflows, setWorkflows] = useState<Record<string, Workflow>>(() => {
    try {
      const saved = localStorage.getItem(WORKFLOWS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Object.keys(parsed).length > 0) {
          // Clean out any legacy wf-hepsi
          delete parsed['wf-hepsi'];
          return { ...DEFAULT_GROUP_WORKFLOWS, ...parsed };
        }
      }
    } catch {}
    return { ...DEFAULT_GROUP_WORKFLOWS };
  });

  const [activeWorkflowId, setActiveWorkflowId] = useState<string>(() => {
    const targetId = `wf-${activeGroup}`;
    if (workflows[targetId]) return targetId;
    try {
      const savedId = localStorage.getItem(ACTIVE_WORKFLOW_ID_KEY);
      if (savedId && workflows[savedId] && savedId !== 'wf-hepsi') return savedId;
    } catch {}
    return Object.keys(workflows)[0] || 'wf-ulasim';
  });

  // Current active workflow
  const activeWorkflow = workflows[activeWorkflowId] || (Object.values(workflows) as Workflow[])[0];

  // Sync active workflow when activeGroup changes from the outside navigation bar
  useEffect(() => {
    if (!activeGroup) return;
    const currentWf = workflows[activeWorkflowId];
    if (currentWf && currentWf.workingGroup === activeGroup) {
      return;
    }
    const targetId = `wf-${activeGroup}`;
    if (workflows[targetId]) {
      setActiveWorkflowId(targetId);
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
      return;
    }
    const match = (Object.values(workflows) as Workflow[]).find(w => w.workingGroup === activeGroup);
    if (match) {
      setActiveWorkflowId(match.id);
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
    }
  }, [activeGroup, workflows]);

  // Selection states
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  // Panels visibility
  const [isPaletteOpen, setIsPaletteOpen] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  // Modal for new/edit workflow
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkflowData, setEditingWorkflowData] = useState<Partial<Workflow> | undefined>(undefined);

  // Undo / Redo history stacks for active workflow
  const [history, setHistory] = useState<Workflow[]>([]);
  const [redoStack, setRedoStack] = useState<Workflow[]>([]);

  // Persist workflows
  useEffect(() => {
    try {
      localStorage.setItem(WORKFLOWS_STORAGE_KEY, JSON.stringify(workflows));
    } catch (e) {
      console.error('Failed to save workflows to localStorage', e);
    }
  }, [workflows]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_WORKFLOW_ID_KEY, activeWorkflowId);
    } catch {}
  }, [activeWorkflowId]);

  // Validation
  const validationErrors = useMemo(() => {
    if (!activeWorkflow) return [];
    return validateWorkflow(activeWorkflow);
  }, [activeWorkflow]);

  // Handle Workflow Update (with optional history tracking)
  const handleUpdateWorkflow = useCallback((updated: Workflow, addToHistory = false) => {
    if (addToHistory && activeWorkflow) {
      setHistory(prev => [...prev.slice(-30), activeWorkflow]);
      setRedoStack([]);
    }

    setWorkflows(prev => ({
      ...prev,
      [updated.id]: {
        ...updated,
        updatedAt: Date.now()
      }
    }));
  }, [activeWorkflow]);

  // Undo
  const handleUndo = useCallback(() => {
    if (history.length === 0 || !activeWorkflow) return;
    const previous = history[history.length - 1];
    setRedoStack(prev => [activeWorkflow, ...prev]);
    setHistory(prev => prev.slice(0, prev.length - 1));

    setWorkflows(prev => ({
      ...prev,
      [previous.id]: previous
    }));
  }, [history, activeWorkflow]);

  // Redo
  const handleRedo = useCallback(() => {
    if (redoStack.length === 0 || !activeWorkflow) return;
    const next = redoStack[0];
    setHistory(prev => [...prev, activeWorkflow]);
    setRedoStack(prev => prev.slice(1));

    setWorkflows(prev => ({
      ...prev,
      [next.id]: next
    }));
  }, [redoStack, activeWorkflow]);

  // Create or update workflow metadata from modal
  const handleModalSubmit = (data: Omit<Workflow, 'id' | 'nodes' | 'edges' | 'createdAt' | 'updatedAt'>) => {
    if (editingWorkflowData && editingWorkflowData.id) {
      // Editing existing
      const existing = workflows[editingWorkflowData.id];
      if (!existing) return;
      const updated: Workflow = {
        ...existing,
        ...data,
        updatedAt: Date.now()
      };
      handleUpdateWorkflow(updated, true);
    } else {
      // Creating new
      const newId = `wf-${Date.now()}`;
      const newWf: Workflow = {
        id: newId,
        ...data,
        nodes: [],
        edges: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      setWorkflows(prev => ({ ...prev, [newId]: newWf }));
      setActiveWorkflowId(newId);
      setHistory([]);
      setRedoStack([]);
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
    }
  };

  // Duplicate active workflow
  const handleDuplicateWorkflow = () => {
    if (!activeWorkflow) return;
    const newId = `wf-${Date.now()}`;
    const duplicated: Workflow = {
      ...activeWorkflow,
      id: newId,
      name: `${activeWorkflow.name} (Kopya)`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setWorkflows(prev => ({ ...prev, [newId]: duplicated }));
    setActiveWorkflowId(newId);
    setHistory([]);
    setRedoStack([]);
  };

  // Delete active workflow
  const handleDeleteWorkflow = () => {
    const keys = Object.keys(workflows);
    if (keys.length <= 1) {
      return;
    }

    const remaining = { ...workflows };
    delete remaining[activeWorkflow.id];
    setWorkflows(remaining);
    setActiveWorkflowId(Object.keys(remaining)[0]);
    setHistory([]);
    setRedoStack([]);
  };

  // Add Item to canvas from Palette "+ Ekle" button
  const handleAddItemFromPalette = (item: PaletteItem) => {
    if (!activeWorkflow) return;

    // Place near center
    const x = 200 + (activeWorkflow.nodes.length % 5) * 40;
    const y = 140 + (activeWorkflow.nodes.length % 5) * 40;

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: item.type,
      title: item.title,
      chapterNum: item.chapterNum || activeWorkflow.chapterNum,
      workingGroup: item.workingGroup || activeWorkflow.workingGroup,
      componentGroup: item.componentGroup,
      relatedHazard: item.relatedHazard,
      dataFormat: item.dataFormat,
      geometryType: item.geometryType,
      analysisMethod: item.analysisMethod,
      description: item.description,
      dataSource: item.dataSource,
      dataYear: item.dataYear,
      status: 'not_started',
      x,
      y,
      width: 230
    };

    handleUpdateWorkflow({
      ...activeWorkflow,
      nodes: [...activeWorkflow.nodes, newNode]
    }, true);

    setSelectedNodeId(newNode.id);
  };

  // Node CRUD from Detail Panel
  const handleUpdateNode = (updated: WorkflowNode) => {
    if (!activeWorkflow) return;
    const updatedNodes = activeWorkflow.nodes.map(n => n.id === updated.id ? updated : n);
    handleUpdateWorkflow({ ...activeWorkflow, nodes: updatedNodes }, true);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!activeWorkflow) return;
    const remainingNodes = activeWorkflow.nodes.filter(n => n.id !== nodeId);
    const remainingEdges = activeWorkflow.edges.filter(
      e => e.sourceId !== nodeId && e.targetId !== nodeId
    );
    handleUpdateWorkflow({
      ...activeWorkflow,
      nodes: remainingNodes,
      edges: remainingEdges
    }, true);
    setSelectedNodeId(null);
  };

  const handleDuplicateNode = (nodeId: string) => {
    if (!activeWorkflow) return;
    const target = activeWorkflow.nodes.find(n => n.id === nodeId);
    if (!target) return;

    const newNode: WorkflowNode = {
      ...target,
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: `${target.title} (Kopya)`,
      x: target.x + 30,
      y: target.y + 30
    };

    handleUpdateWorkflow({
      ...activeWorkflow,
      nodes: [...activeWorkflow.nodes, newNode]
    }, true);
    setSelectedNodeId(newNode.id);
  };

  // Edge CRUD from Detail Panel
  const handleUpdateEdge = (updated: WorkflowEdge) => {
    if (!activeWorkflow) return;
    const updatedEdges = activeWorkflow.edges.map(e => e.id === updated.id ? updated : e);
    handleUpdateWorkflow({ ...activeWorkflow, edges: updatedEdges }, true);
  };

  const handleDeleteEdge = (edgeId: string) => {
    if (!activeWorkflow) return;
    const remainingEdges = activeWorkflow.edges.filter(e => e.id !== edgeId);
    handleUpdateWorkflow({ ...activeWorkflow, edges: remainingEdges }, true);
    setSelectedEdgeId(null);
  };

  const selectedNode = useMemo(() => {
    if (!selectedNodeId || !activeWorkflow) return null;
    return activeWorkflow.nodes.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId, activeWorkflow]);

  const selectedEdge = useMemo(() => {
    if (!selectedEdgeId || !activeWorkflow) return null;
    return activeWorkflow.edges.find(e => e.id === selectedEdgeId) || null;
  }, [selectedEdgeId, activeWorkflow]);

  if (!activeWorkflow) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>İş akışı yükleniyor...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', minHeight: '600px', backgroundColor: '#F8FAFC' }}>
      {/* Top Header Navigation Bar for Workflows */}
      <div
        style={{
          padding: '10px 16px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          zIndex: 30
        }}
      >
        {/* Workflow Switcher & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>İş Akışı:</span>
            <select
              value={activeWorkflowId}
              onChange={(e) => {
                const targetId = e.target.value;
                setActiveWorkflowId(targetId);
                const selectedWf = workflows[targetId];
                if (selectedWf && selectedWf.workingGroup) {
                  onSelectGroup?.(selectedWf.workingGroup);
                }
                setSelectedNodeId(null);
                setSelectedEdgeId(null);
                setHistory([]);
                setRedoStack([]);
              }}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#0F172A',
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                maxWidth: '320px'
              }}
            >
              <optgroup label="Ulaşım Grubu">
                {(Object.values(workflows) as Workflow[]).filter(w => w.workingGroup === 'ulasim').map(wf => (
                  <option key={wf.id} value={wf.id}>{wf.name}</option>
                ))}
              </optgroup>
              <optgroup label="Teknik Altyapı Grubu">
                {(Object.values(workflows) as Workflow[]).filter(w => w.workingGroup === 'teknikaltyapi').map(wf => (
                  <option key={wf.id} value={wf.id}>{wf.name}</option>
                ))}
              </optgroup>
              <optgroup label="Lojistik Grubu">
                {(Object.values(workflows) as Workflow[]).filter(w => w.workingGroup === 'lojistik').map(wf => (
                  <option key={wf.id} value={wf.id}>{wf.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Workflow Metadata badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#1D4ED8',
                background: '#EFF6FF',
                padding: '2px 7px',
                borderRadius: '4px',
                border: '1px solid #BFDBFE'
              }}
            >
              {activeWorkflow.chapterNum === 'hepsi' ? 'Tüm Bölümler' : `${activeWorkflow.chapterNum}. Bölüm`}
            </span>

            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#475569',
                background: '#F1F5F9',
                padding: '2px 7px',
                borderRadius: '4px',
                border: '1px solid #E2E8F0'
              }}
            >
              {activeWorkflow.workingGroup === 'ulasim' ? 'Ulaşım' : activeWorkflow.workingGroup === 'teknikaltyapi' ? 'Teknik Altyapı' : activeWorkflow.workingGroup === 'lojistik' ? 'Lojistik' : 'Bütünleşik'}
            </span>

            {activeWorkflow.purpose && (
              <span
                style={{
                  fontSize: '11px',
                  color: '#64748B',
                  maxWidth: '300px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                title={activeWorkflow.purpose}
              >
                {activeWorkflow.purpose}
              </span>
            )}
          </div>
        </div>

        {/* Workflow Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            title="İş Akışı Bilgilerini Düzenle"
            onClick={() => {
              setEditingWorkflowData(activeWorkflow);
              setIsModalOpen(true);
            }}
            style={{
              padding: '5px 8px',
              borderRadius: '5px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Edit3 size={12} />
            <span>Düzenle</span>
          </button>

          <button
            type="button"
            title="İş Akışını Çoğalt"
            onClick={handleDuplicateWorkflow}
            style={{
              padding: '5px 8px',
              borderRadius: '5px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Copy size={12} />
            <span>Çoğalt</span>
          </button>

          {Object.keys(workflows).length > 1 && (
            <button
              type="button"
              title="İş Akışını Sil"
              onClick={handleDeleteWorkflow}
              style={{
                padding: '5px 8px',
                borderRadius: '5px',
                border: '1px solid #FCA5A5',
                background: '#FEF2F2',
                color: '#DC2626',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Trash2 size={12} />
              <span>Sil</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setEditingWorkflowData(undefined);
              setIsModalOpen(true);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: '#2563EB',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)'
            }}
          >
            <Plus size={14} />
            <span>Yeni İş Akışı</span>
          </button>
        </div>
      </div>

      {/* Main Builder Workspace Body */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        {/* Left Component Palette */}
        <WorkflowPalette
          isOpen={isPaletteOpen}
          onToggle={() => setIsPaletteOpen(!isPaletteOpen)}
          onAddItem={handleAddItemFromPalette}
          activeGroup={activeGroup}
          onSelectGroup={onSelectGroup}
        />

        {/* Center Canvas */}
        <WorkflowCanvas
          workflow={activeWorkflow}
          validationErrors={validationErrors}
          selectedNodeId={selectedNodeId}
          selectedEdgeId={selectedEdgeId}
          activeGroup={activeGroup}
          onSelectGroup={onSelectGroup}
          onSelectNode={(nodeId) => {
            setSelectedNodeId(nodeId);
            if (nodeId) setSelectedEdgeId(null);
          }}
          onSelectEdge={(edgeId) => {
            setSelectedEdgeId(edgeId);
            if (edgeId) setSelectedNodeId(null);
          }}
          onUpdateWorkflow={handleUpdateWorkflow}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={history.length > 0}
          canRedo={redoStack.length > 0}
        />

        {/* Right Detail Panel */}
        {(selectedNode || selectedEdge) && (
          <WorkflowDetailPanel
            selectedNode={selectedNode}
            selectedEdge={selectedEdge}
            allNodes={activeWorkflow.nodes}
            onUpdateNode={handleUpdateNode}
            onDeleteNode={handleDeleteNode}
            onDuplicateNode={handleDuplicateNode}
            onUpdateEdge={handleUpdateEdge}
            onDeleteEdge={handleDeleteEdge}
            onClose={() => {
              setSelectedNodeId(null);
              setSelectedEdgeId(null);
            }}
          />
        )}
      </div>

      {/* Modal for Creating / Editing Workflow */}
      <WorkflowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingWorkflowData}
      />
    </div>
  );
};
