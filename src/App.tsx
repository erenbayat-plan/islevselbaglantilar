import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Layers, 
  FileText, 
  Search, 
  Activity, 
  CheckCircle2, 
  Plus, 
  Pencil, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  GripVertical, 
  Check, 
  X,
  LayoutGrid,
  Table as TableIcon,
  ChevronDown,
  ChevronRight,
  GitBranch
} from 'lucide-react';
import { DATA, STATUS_LABEL } from './data';
import { 
  fetchGlobalCloudState, 
  pushGlobalCloudState, 
  queueGlobalCloudPush, 
  subscribeToTabBroadcast,
  subscribeToCloudState,
  AppState,
  ReportStatusItem,
  CustomSubSection,
  SectionOverride
} from './syncService';
import { ReportTracker } from './components/ReportTracker';
import { HeaderCountdown } from './components/HeaderCountdown';
import { HeadingFormData } from './components/HeadingModal';
import { RiskMatrixView } from './components/RiskMatrixView';
import { ReportItem, REPORT_CHAPTERS_MAP, migrateReportStatus } from './reportData';
import { SpatialHazardInventory, SPATIAL_CHAPTERS } from './components/SpatialHazardInventory';
import { WorkflowBuilderTab } from './components/WorkflowBuilderTab';

function toTitleCase(str: string) {
  if (!str) return '';
  return str.split(' ').map((word: string) => 
    word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR')
  ).join(' ');
}

function AnalizEditInput({ 
  initialValue, 
  onSave, 
  placeholder,
  onFocusChange
}: { 
  initialValue: string; 
  onSave: (val: string) => void; 
  placeholder: string; 
  onFocusChange?: (isFocused: boolean) => void;
}) {
  const [val, setVal] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setVal(initialValue);
    }
  }, [initialValue, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocusChange) onFocusChange(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onFocusChange) onFocusChange(false);
    const formatted = toTitleCase(val);
    setVal(formatted);
    onSave(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <input 
      className="analiz-edit-input"
      value={val}
      onChange={e => setVal(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
}

const WORK_KEY = 'work-status';
const CUSTOM_KEY = 'custom-rows';
const ROW_OVERRIDES_KEY = 'row-overrides';
const ANALIZ_OVERRIDES_KEY = 'analiz-overrides';
const REPORT_STATUS_KEY = 'report-status';
const CUSTOM_SUBSECTIONS_KEY = 'custom-subsections';
const SECTION_OVERRIDES_KEY = 'section-overrides';
const ANALYSIS_STATUSES_KEY = 'analysis-statuses';
const CHAPTER_NOTES_KEY = 'chapter-notes';
const CHAPTER_ORDERS_KEY = 'chapter-orders';
const INVENTORY_ORDERS_KEY = 'inventory-orders';
const CUSTOM_INVENTORY_SECTIONS_KEY = 'custom-inventory-sections';
const INVENTORY_SECTION_OVERRIDES_KEY = 'inventory-section-overrides';
const LAST_UPDATED_KEY = 'app-last-updated';

type WorkStatus = {
  status: string;
  priority: string;
  note: string;
};

const CHAPTER_TITLES_FALLBACK: Record<string, string> = {
  '1': 'GİRİŞ',
  '2': 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
  '3': 'SİSTEMLER VE KRİTİK BİLEŞENLERİ',
  '4': 'DOĞA KAYNAKLI AFETLERİN ETKİLERİ',
  '5': 'İNSAN VE TEKNOLOJİ KAYNAKLI AFETLERİN ETKİLERİ',
  '6': 'İKLİM KRİZİ ETKİLERİ',
  '7': 'İYİ UYGULAMA ÖRNEKLERİ',
  '8': 'ÇOKLU RİSK DEĞERLENDİRMESİ',
  '9': 'KAYNAKÇA'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'report' | 'workflow'>('inventory');
  const [activeGroup, setActiveGroup] = useState('ulasim');
  const [activeCode, setActiveCode] = useState('3.1');
  const [inventoryViewMode, setInventoryViewMode] = useState<'table' | 'matrix'>('table');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [onlyGaps, setOnlyGaps] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [visibleNotes, setVisibleNotes] = useState<Record<string, boolean>>({});
  const [newRowName, setNewRowName] = useState('');
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editingRowText, setEditingRowText] = useState<string>('');
  const [draggedInventoryRowId, setDraggedInventoryRowId] = useState<string | null>(null);
  const [dragOverInventoryRowId, setDragOverInventoryRowId] = useState<string | null>(null);
  const [dragOverPos, setDragOverPos] = useState<'top' | 'bottom'>('bottom');

  // Modal states for section management in Veri Envanteri
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSectionCode, setNewSectionCode] = useState('');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [editingSectionModal, setEditingSectionModal] = useState<{ originalCode: string; code: string; title: string } | null>(null);
  const [deletingSectionCode, setDeletingSectionCode] = useState<string | null>(null);

  // 1. Veri Envanteri States
  const [workStatus, setWorkStatus] = useState<Record<string, WorkStatus>>(() => {
    try {
      const saved = localStorage.getItem(WORK_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [customRows, setCustomRows] = useState<Record<string, { id: number; name: string; v?: boolean }[]>>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [rowOverrides, setRowOverrides] = useState<Record<string, { n?: string; v?: boolean; deleted?: boolean }>>(() => {
    try {
      const saved = localStorage.getItem(ROW_OVERRIDES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [analizOverrides, setAnalizOverrides] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(ANALIZ_OVERRIDES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [inventoryOrders, setInventoryOrders] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_ORDERS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [customInventorySections, setCustomInventorySections] = useState<Record<string, { code: string; title: string; id: string }[]>>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_INVENTORY_SECTIONS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [inventorySectionOverrides, setInventorySectionOverrides] = useState<Record<string, { code?: string; title?: string; deleted?: boolean }>>(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_SECTION_OVERRIDES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  // 2. Rapor Çatkısı States
  const [reportStatus, setReportStatus] = useState<Record<string, ReportStatusItem>>(() => {
    try {
      const saved = localStorage.getItem(REPORT_STATUS_KEY);
      const initial = saved ? JSON.parse(saved) : {};
      const { migrated, hadChanges } = migrateReportStatus(initial);
      if (hadChanges) {
        try { localStorage.setItem(REPORT_STATUS_KEY, JSON.stringify(migrated)); } catch (e) {}
      }
      return migrated;
    } catch { return {}; }
  });
  const [customSubSections, setCustomSubSections] = useState<Record<string, CustomSubSection[]>>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_SUBSECTIONS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [sectionOverrides, setSectionOverrides] = useState<Record<string, SectionOverride>>(() => {
    try {
      const saved = localStorage.getItem(SECTION_OVERRIDES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [analysisStatuses, setAnalysisStatuses] = useState<Record<string, 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede'>>(() => {
    try {
      const saved = localStorage.getItem(ANALYSIS_STATUSES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [chapterNotes, setChapterNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(CHAPTER_NOTES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [chapterOrders, setChapterOrders] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem(CHAPTER_ORDERS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'synced' | 'saving' | 'connected'>('connected');
  const localVersionRef = useRef<number>((() => {
    try {
      const saved = localStorage.getItem(LAST_UPDATED_KEY);
      return saved ? Number(saved) : 0;
    } catch { return 0; }
  })());
  const cloudVersionRef = useRef(0);

  // Live state ref to ensure synchronous access during operations
  const stateRef = useRef<AppState>({
    workStatus,
    customRows,
    rowOverrides,
    analizOverrides,
    reportStatus,
    customSubSections,
    sectionOverrides,
    analysisStatuses,
    chapterNotes,
    chapterOrders,
    inventoryOrders,
    customInventorySections,
    inventorySectionOverrides,
    lastUpdated: localVersionRef.current
  });

  useEffect(() => {
    stateRef.current = {
      workStatus,
      customRows,
      rowOverrides,
      analizOverrides,
      reportStatus,
      customSubSections,
      sectionOverrides,
      analysisStatuses,
      chapterNotes,
      chapterOrders,
      inventoryOrders,
      customInventorySections,
      inventorySectionOverrides,
      lastUpdated: localVersionRef.current
    };
  }, [
    workStatus,
    customRows,
    rowOverrides,
    analizOverrides,
    reportStatus,
    customSubSections,
    sectionOverrides,
    analysisStatuses,
    chapterNotes,
    chapterOrders,
    inventoryOrders,
    customInventorySections,
    inventorySectionOverrides
  ]);

  // Local storage caching
  useEffect(() => {
    try { localStorage.setItem(WORK_KEY, JSON.stringify(workStatus)); } catch (e) {}
  }, [workStatus]);
  useEffect(() => {
    try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(customRows)); } catch (e) {}
  }, [customRows]);
  useEffect(() => {
    try { localStorage.setItem(ROW_OVERRIDES_KEY, JSON.stringify(rowOverrides)); } catch (e) {}
  }, [rowOverrides]);
  useEffect(() => {
    try { localStorage.setItem(ANALIZ_OVERRIDES_KEY, JSON.stringify(analizOverrides)); } catch (e) {}
  }, [analizOverrides]);
  useEffect(() => {
    try { localStorage.setItem(REPORT_STATUS_KEY, JSON.stringify(reportStatus)); } catch (e) {}
  }, [reportStatus]);
  useEffect(() => {
    try { localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(customSubSections)); } catch (e) {}
  }, [customSubSections]);
  useEffect(() => {
    try { localStorage.setItem(SECTION_OVERRIDES_KEY, JSON.stringify(sectionOverrides)); } catch (e) {}
  }, [sectionOverrides]);
  useEffect(() => {
    try { localStorage.setItem(ANALYSIS_STATUSES_KEY, JSON.stringify(analysisStatuses)); } catch (e) {}
  }, [analysisStatuses]);
  useEffect(() => {
    try { localStorage.setItem(CHAPTER_NOTES_KEY, JSON.stringify(chapterNotes)); } catch (e) {}
  }, [chapterNotes]);
  useEffect(() => {
    try { localStorage.setItem(CHAPTER_ORDERS_KEY, JSON.stringify(chapterOrders)); } catch (e) {}
  }, [chapterOrders]);
  useEffect(() => {
    try { localStorage.setItem(INVENTORY_ORDERS_KEY, JSON.stringify(inventoryOrders)); } catch (e) {}
  }, [inventoryOrders]);
  useEffect(() => {
    try { localStorage.setItem(CUSTOM_INVENTORY_SECTIONS_KEY, JSON.stringify(customInventorySections)); } catch (e) {}
  }, [customInventorySections]);
  useEffect(() => {
    try { localStorage.setItem(INVENTORY_SECTION_OVERRIDES_KEY, JSON.stringify(inventorySectionOverrides)); } catch (e) {}
  }, [inventorySectionOverrides]);

  // Global Real-time Multi-User Cloud & Multi-Tab Sync
  useEffect(() => {
    let isMounted = true;

    const applyCloudState = (cloudData: AppState) => {
      if (!isMounted) return;
      const incomingTime = Number(cloudData.lastUpdated) || 0;
      const localTime = localVersionRef.current;

      // If local state is strictly newer than what came from cloud, do not overwrite local changes
      if (incomingTime > 0 && localTime > 0 && incomingTime < localTime) {
        console.log(`Local state is newer (${localTime} > ${incomingTime}), syncing local to cloud...`);
        const payload: AppState = {
          ...stateRef.current,
          lastUpdated: localTime
        };
        pushGlobalCloudState(payload);
        return;
      }

      cloudVersionRef.current = incomingTime;
      localVersionRef.current = incomingTime;
      try {
        localStorage.setItem(LAST_UPDATED_KEY, String(incomingTime));
      } catch (e) {}

      if (cloudData.workStatus !== undefined) {
        setWorkStatus(prev => {
          const merged = { ...prev, ...cloudData.workStatus };
          try { localStorage.setItem(WORK_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.customRows !== undefined) {
        setCustomRows(prev => {
          const merged: Record<string, any[]> = { ...prev };
          Object.keys(cloudData.customRows || {}).forEach(k => {
            const cloudItems = cloudData.customRows![k] || [];
            const localItems = prev[k] || [];
            const itemMap = new Map<any, any>();
            localItems.forEach(item => itemMap.set(item.id, item));
            cloudItems.forEach(item => itemMap.set(item.id, item));
            merged[k] = Array.from(itemMap.values());
          });
          try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.rowOverrides !== undefined) {
        setRowOverrides(prev => {
          const merged = { ...prev, ...cloudData.rowOverrides };
          try { localStorage.setItem(ROW_OVERRIDES_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.analizOverrides !== undefined) {
        setAnalizOverrides(prev => {
          const merged = { ...prev, ...cloudData.analizOverrides };
          try { localStorage.setItem(ANALIZ_OVERRIDES_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.reportStatus !== undefined) {
        setReportStatus(prev => {
          const merged = { ...prev, ...cloudData.reportStatus };
          try { localStorage.setItem(REPORT_STATUS_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.customSubSections !== undefined) {
        setCustomSubSections(prev => {
          const merged: Record<string, CustomSubSection[]> = { ...prev };
          Object.keys(cloudData.customSubSections || {}).forEach(k => {
            const cloudItems = cloudData.customSubSections![k] || [];
            const localItems = prev[k] || [];
            const itemMap = new Map<string, CustomSubSection>();
            localItems.forEach(item => itemMap.set(item.id, item));
            cloudItems.forEach(item => itemMap.set(item.id, item));
            merged[k] = Array.from(itemMap.values());
          });
          try {
            localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(merged));
          } catch (e) {}
          return merged;
        });
      }
      if (cloudData.sectionOverrides !== undefined) {
        setSectionOverrides(prev => {
          const merged = { ...prev, ...cloudData.sectionOverrides };
          try { localStorage.setItem(SECTION_OVERRIDES_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.analysisStatuses !== undefined) {
        setAnalysisStatuses(prev => {
          const merged = { ...prev, ...cloudData.analysisStatuses };
          try { localStorage.setItem(ANALYSIS_STATUSES_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.chapterNotes !== undefined) {
        setChapterNotes(prev => {
          const merged = { ...prev, ...cloudData.chapterNotes };
          try { localStorage.setItem(CHAPTER_NOTES_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.chapterOrders !== undefined) {
        setChapterOrders(prev => {
          const merged = { ...prev, ...cloudData.chapterOrders };
          try { localStorage.setItem(CHAPTER_ORDERS_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.inventoryOrders !== undefined) {
        setInventoryOrders(prev => {
          const merged = { ...prev, ...cloudData.inventoryOrders };
          try { localStorage.setItem(INVENTORY_ORDERS_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.customInventorySections !== undefined) {
        setCustomInventorySections(prev => {
          const merged = { ...prev, ...cloudData.customInventorySections };
          try { localStorage.setItem(CUSTOM_INVENTORY_SECTIONS_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      if (cloudData.inventorySectionOverrides !== undefined) {
        setInventorySectionOverrides(prev => {
          const merged = { ...prev, ...cloudData.inventorySectionOverrides };
          try { localStorage.setItem(INVENTORY_SECTION_OVERRIDES_KEY, JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
      setCloudSyncStatus('synced');
    };

    const unsubscribeTab = subscribeToTabBroadcast((tabState) => {
      if (!isMounted) return;
      if (tabState.workStatus) setWorkStatus(tabState.workStatus);
      if (tabState.customRows) setCustomRows(tabState.customRows);
      if (tabState.rowOverrides) setRowOverrides(tabState.rowOverrides);
      if (tabState.analizOverrides) setAnalizOverrides(tabState.analizOverrides);
      if (tabState.reportStatus) setReportStatus(tabState.reportStatus);
      if (tabState.customSubSections) setCustomSubSections(tabState.customSubSections);
      if (tabState.sectionOverrides) setSectionOverrides(tabState.sectionOverrides);
      if (tabState.analysisStatuses) setAnalysisStatuses(tabState.analysisStatuses);
      if (tabState.chapterNotes) setChapterNotes(tabState.chapterNotes);
      if (tabState.chapterOrders) setChapterOrders(tabState.chapterOrders);
      if (tabState.inventoryOrders) setInventoryOrders(tabState.inventoryOrders);
      if (tabState.customInventorySections) setCustomInventorySections(tabState.customInventorySections);
      if (tabState.inventorySectionOverrides) setInventorySectionOverrides(tabState.inventorySectionOverrides);
      setCloudSyncStatus('synced');
    });

    const unsubscribeCloud = subscribeToCloudState(
      applyCloudState,
      () => { if (isMounted) setCloudSyncStatus('connected'); }
    );

    return () => {
      isMounted = false;
      unsubscribeTab();
      unsubscribeCloud();
    };
  }, []);

  const triggerCloudSync = (
    nextState?: Partial<AppState>
  ) => {
    const newVersion = Date.now();
    localVersionRef.current = newVersion;
    try {
      localStorage.setItem(LAST_UPDATED_KEY, String(newVersion));
    } catch (e) {}
    setCloudSyncStatus('saving');

    const fullPayload: AppState = {
      workStatus: nextState?.workStatus ?? stateRef.current.workStatus,
      customRows: nextState?.customRows ?? stateRef.current.customRows,
      rowOverrides: nextState?.rowOverrides ?? stateRef.current.rowOverrides,
      analizOverrides: nextState?.analizOverrides ?? stateRef.current.analizOverrides,
      reportStatus: nextState?.reportStatus ?? stateRef.current.reportStatus,
      customSubSections: nextState?.customSubSections ?? stateRef.current.customSubSections,
      sectionOverrides: nextState?.sectionOverrides ?? stateRef.current.sectionOverrides,
      analysisStatuses: nextState?.analysisStatuses ?? stateRef.current.analysisStatuses,
      chapterNotes: nextState?.chapterNotes ?? stateRef.current.chapterNotes,
      chapterOrders: nextState?.chapterOrders ?? stateRef.current.chapterOrders,
      inventoryOrders: nextState?.inventoryOrders ?? stateRef.current.inventoryOrders,
      customInventorySections: nextState?.customInventorySections ?? stateRef.current.customInventorySections,
      inventorySectionOverrides: nextState?.inventorySectionOverrides ?? stateRef.current.inventorySectionOverrides,
      lastUpdated: newVersion
    };

    stateRef.current = fullPayload;

    if (nextState?.workStatus) try { localStorage.setItem(WORK_KEY, JSON.stringify(nextState.workStatus)); } catch (e) {}
    if (nextState?.customRows) try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(nextState.customRows)); } catch (e) {}
    if (nextState?.rowOverrides) try { localStorage.setItem(ROW_OVERRIDES_KEY, JSON.stringify(nextState.rowOverrides)); } catch (e) {}
    if (nextState?.analizOverrides) try { localStorage.setItem(ANALIZ_OVERRIDES_KEY, JSON.stringify(nextState.analizOverrides)); } catch (e) {}
    if (nextState?.reportStatus) try { localStorage.setItem(REPORT_STATUS_KEY, JSON.stringify(nextState.reportStatus)); } catch (e) {}
    if (nextState?.customSubSections) try { localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(nextState.customSubSections)); } catch (e) {}
    if (nextState?.sectionOverrides) try { localStorage.setItem(SECTION_OVERRIDES_KEY, JSON.stringify(nextState.sectionOverrides)); } catch (e) {}
    if (nextState?.analysisStatuses) try { localStorage.setItem(ANALYSIS_STATUSES_KEY, JSON.stringify(nextState.analysisStatuses)); } catch (e) {}
    if (nextState?.chapterNotes) try { localStorage.setItem(CHAPTER_NOTES_KEY, JSON.stringify(nextState.chapterNotes)); } catch (e) {}
    if (nextState?.chapterOrders) try { localStorage.setItem(CHAPTER_ORDERS_KEY, JSON.stringify(nextState.chapterOrders)); } catch (e) {}
    if (nextState?.inventoryOrders) try { localStorage.setItem(INVENTORY_ORDERS_KEY, JSON.stringify(nextState.inventoryOrders)); } catch (e) {}
    if (nextState?.customInventorySections) try { localStorage.setItem(CUSTOM_INVENTORY_SECTIONS_KEY, JSON.stringify(nextState.customInventorySections)); } catch (e) {}
    if (nextState?.inventorySectionOverrides) try { localStorage.setItem(INVENTORY_SECTION_OVERRIDES_KEY, JSON.stringify(nextState.inventorySectionOverrides)); } catch (e) {}

    queueGlobalCloudPush(
      () => fullPayload,
      (status) => {
        setCloudSyncStatus(status === 'saving' ? 'saving' : 'synced');
      }
    );
  };

  // --- Veri Envanteri Helpers ---
  const rowId = (g: string, code: string, eIdx: number, vIdx: number) => `${g}|${code}|${eIdx}|${vIdx}`;
  const customKey = (g: string, code: string) => `${g}::${code}`;

  const getWork = (id: string): WorkStatus => {
    return workStatus[id] || { status: 'todo', priority: 'low', note: '' };
  };

  const getGroupSections = (g: string) => {
    const baseSections = DATA[g]?.sections || [];
    const result: { code: string; title: string; chapterNum?: string; chapterTitle?: string; isCustom?: boolean; customId?: string; originalCode?: string }[] = [];
    
    baseSections.forEach((s: any) => {
      const override = inventorySectionOverrides[`${g}::${s.code}`];
      if (!override?.deleted) {
        result.push({
          code: override?.code || s.code,
          title: override?.title || s.title,
          chapterNum: s.chapterNum || (s.code ? s.code.split('.')[0] : '1'),
          chapterTitle: s.chapterTitle || '',
          originalCode: s.code,
          isCustom: false
        });
      }
    });

    const customSecs = customInventorySections[g] || [];
    customSecs.forEach(cs => {
      const override = inventorySectionOverrides[`${g}::${cs.code}`];
      if (!override?.deleted) {
        const inferredChapter = cs.code ? cs.code.split('.')[0] : '1';
        result.push({
          code: override?.code || cs.code,
          title: override?.title || cs.title,
          chapterNum: inferredChapter,
          chapterTitle: '',
          originalCode: cs.code,
          isCustom: true,
          customId: cs.id
        });
      }
    });

    return result;
  };

  const handleAddInventorySection = (g: string, code: string, title: string) => {
    const trimmedCode = code.trim();
    const trimmedTitle = title.trim();
    if (!trimmedCode || !trimmedTitle) return;
    const newId = String(Date.now());
    const list = customInventorySections[g] || [];
    const updatedList = [...list, { id: newId, code: trimmedCode, title: trimmedTitle }];
    const updatedMap = { ...customInventorySections, [g]: updatedList };
    setCustomInventorySections(updatedMap);
    setActiveCode(trimmedCode);
    setShowAddSectionModal(false);
    setNewSectionCode('');
    setNewSectionTitle('');
    try { localStorage.setItem(CUSTOM_INVENTORY_SECTIONS_KEY, JSON.stringify(updatedMap)); } catch (e) {}
    triggerCloudSync({ customInventorySections: updatedMap });
  };

  const handleEditInventorySection = (g: string, originalCode: string, newCode: string, newTitle: string) => {
    const key = `${g}::${originalCode}`;
    const current = inventorySectionOverrides[key] || {};
    const updatedOverrides = {
      ...inventorySectionOverrides,
      [key]: { ...current, code: newCode.trim(), title: newTitle.trim() }
    };
    setInventorySectionOverrides(updatedOverrides);
    if (activeCode === originalCode) {
      setActiveCode(newCode.trim());
    }
    setEditingSectionModal(null);
    try { localStorage.setItem(INVENTORY_SECTION_OVERRIDES_KEY, JSON.stringify(updatedOverrides)); } catch (e) {}
    triggerCloudSync({ inventorySectionOverrides: updatedOverrides });
  };

  const handleDeleteInventorySection = (g: string, code: string) => {
    const key = `${g}::${code}`;
    const current = inventorySectionOverrides[key] || {};
    const updatedOverrides = {
      ...inventorySectionOverrides,
      [key]: { ...current, deleted: true }
    };
    setInventorySectionOverrides(updatedOverrides);
    setDeletingSectionCode(null);
    try { localStorage.setItem(INVENTORY_SECTION_OVERRIDES_KEY, JSON.stringify(updatedOverrides)); } catch (e) {}
    
    const remaining = getGroupSections(g).filter(s => s.code !== code);
    if (activeCode === code && remaining.length > 0) {
      setActiveCode(remaining[0].code);
    }
    triggerCloudSync({ inventorySectionOverrides: updatedOverrides });
  };

  const sectionAllRows = (g: string, code: string) => {
    const sec = DATA[g]?.sections?.find((s: any) => s.code === code);
    const rows: any[] = [];
    if (sec?.entries) {
      sec.entries.forEach((e: any, eIdx: number) => {
        (e.veri || []).forEach((v: any, vIdx: number) => {
          const id = rowId(g, code, eIdx, vIdx);
          const override = rowOverrides[id];
          if (!override?.deleted) {
            rows.push({ 
              id, 
              n: override?.n !== undefined ? override.n : v.n, 
              v: override?.v !== undefined ? override.v : v.v, 
              custom: false,
              eIdx,
              vIdx
            });
          }
        });
      });
    }
    const ck = customKey(g, code);
    (customRows[ck] || []).forEach(c => {
      rows.push({ 
        id: `custom|${g}|${code}|${c.id}`, 
        n: c.name, 
        v: c.v !== undefined ? c.v : false, 
        custom: true, 
        customId: c.id 
      });
    });

    const order = inventoryOrders[ck];
    if (order && order.length > 0) {
      rows.sort((a, b) => {
        const idxA = order.indexOf(a.id);
        const idxB = order.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }

    return rows;
  };

  const sectionCounts = (g: string, code: string) => {
    const rows = sectionAllRows(g, code);
    const total = rows.length;
    const done = rows.filter(r => getWork(r.id).status === 'done').length;
    const gaps = rows.filter(r => r.v === false).length;
    return { total, done, gaps };
  };

  const overallCounts = useMemo(() => {
    let workTotal = 0, workDone = 0, srcVar = 0, srcYok = 0;
    Object.keys(DATA).forEach(g => {
      getGroupSections(g).forEach((s: any) => {
        const rows = sectionAllRows(g, s.code);
        workTotal += rows.length;
        workDone += rows.filter(r => getWork(r.id).status === 'done').length;
        rows.forEach(r => {
          if (r.v === true) srcVar++;
          else if (r.v === false) srcYok++;
        });
      });
    });
    return { workTotal, workDone, srcVar, srcYok };
  }, [workStatus, customRows, rowOverrides, inventoryOrders, customInventorySections, inventorySectionOverrides]);

  const sectionMatches = (g: string, s: any, term: string) => {
    const t = term.toLowerCase();
    if (s.title.toLowerCase().includes(t) || s.code.includes(t)) return true;
    const rows = sectionAllRows(g, s.code);
    return rows.some(r => r.n.toLowerCase().includes(t));
  };

  const handleAddCustomRow = (g: string, code: string, rowName?: string) => {
    const nameToAdd = (rowName !== undefined ? rowName : newRowName).trim();
    if (!nameToAdd) return;
    const ck = customKey(g, code);
    const newId = Date.now();
    const newItem = { id: newId, name: nameToAdd, v: false };
    const currentList = customRows[ck] || [];
    const updatedList = [...currentList, newItem];
    const updatedCustomRows = { ...customRows, [ck]: updatedList };
    
    // Also append to order
    const fullCustomId = `custom|${g}|${code}|${newId}`;
    const existingOrder = inventoryOrders[ck] || sectionAllRows(g, code).map(r => r.id);
    const newOrder = [...existingOrder, fullCustomId];
    const updatedOrders = { ...inventoryOrders, [ck]: newOrder };

    setCustomRows(updatedCustomRows);
    setInventoryOrders(updatedOrders);
    setNewRowName('');
    try {
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(updatedCustomRows));
      localStorage.setItem(INVENTORY_ORDERS_KEY, JSON.stringify(updatedOrders));
    } catch (e) {}
    triggerCloudSync({ customRows: updatedCustomRows, inventoryOrders: updatedOrders });
  };

  const handleReorderInventoryRows = (g: string, code: string, newOrderIds: string[]) => {
    const ck = customKey(g, code);
    const updatedOrders = { ...inventoryOrders, [ck]: newOrderIds };
    setInventoryOrders(updatedOrders);
    try { localStorage.setItem(INVENTORY_ORDERS_KEY, JSON.stringify(updatedOrders)); } catch (e) {}
    triggerCloudSync({ inventoryOrders: updatedOrders });
  };

  const handleMoveInventoryRow = (g: string, code: string, rowId: string, direction: 'up' | 'down') => {
    const rows = sectionAllRows(g, code);
    const currentIds = rows.map(r => r.id);
    const index = currentIds.indexOf(rowId);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === currentIds.length - 1) return;

    const newIds = [...currentIds];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const [moved] = newIds.splice(index, 1);
    newIds.splice(targetIndex, 0, moved);

    handleReorderInventoryRows(g, code, newIds);
  };

  const handleUpdateWork = (id: string, updates: Partial<WorkStatus>) => {
    const current = workStatus[id] || { status: 'todo', priority: 'low', note: '' };
    const updatedWorkStatus = { ...workStatus, [id]: { ...current, ...updates } };
    setWorkStatus(updatedWorkStatus);
    triggerCloudSync({ workStatus: updatedWorkStatus });
  };

  const handleUpdateRow = (id: string, updates: { n?: string; v?: boolean }) => {
    if (id.startsWith('custom|')) {
      const [, g, code, customIdStr] = id.split('|');
      const ck = customKey(g, code);
      const currentList = customRows[ck] || [];
      const newList = currentList.map(c => String(c.id) === customIdStr 
        ? { ...c, name: updates.n !== undefined ? updates.n : c.name, v: updates.v !== undefined ? updates.v : c.v } 
        : c);
      const updatedCustomRows = { ...customRows, [ck]: newList };
      setCustomRows(updatedCustomRows);
      triggerCloudSync({ customRows: updatedCustomRows });
    } else {
      const current = rowOverrides[id] || {};
      const updatedOverrides = { ...rowOverrides, [id]: { ...current, ...updates } };
      setRowOverrides(updatedOverrides);
      triggerCloudSync({ rowOverrides: updatedOverrides });
    }
  };

  const handleDeleteRow = (id: string) => {
    let updatedCustom = customRows;
    let updatedOverrides = rowOverrides;
    let gKey = activeGroup;
    let codeKey = activeCode;

    if (id.startsWith('custom|')) {
      const [, g, code, customIdStr] = id.split('|');
      gKey = g;
      codeKey = code;
      const ck = customKey(g, code);
      const newList = (customRows[ck] || []).filter(c => String(c.id) !== customIdStr);
      updatedCustom = { ...customRows, [ck]: newList };
      setCustomRows(updatedCustom);
    } else {
      const parts = id.split('|');
      if (parts.length >= 2) {
        gKey = parts[0];
        codeKey = parts[1];
      }
      const current = rowOverrides[id] || {};
      updatedOverrides = { ...rowOverrides, [id]: { ...current, deleted: true } };
      setRowOverrides(updatedOverrides);
    }

    // Also remove from inventory orders
    const ck = customKey(gKey, codeKey);
    const currentOrder = inventoryOrders[ck];
    let updatedOrders = inventoryOrders;
    if (currentOrder) {
      const filteredOrder = currentOrder.filter(itemId => itemId !== id);
      updatedOrders = { ...inventoryOrders, [ck]: filteredOrder };
      setInventoryOrders(updatedOrders);
      try { localStorage.setItem(INVENTORY_ORDERS_KEY, JSON.stringify(updatedOrders)); } catch (e) {}
    }

    const updatedWork = { ...workStatus };
    delete updatedWork[id];
    setWorkStatus(updatedWork);
    triggerCloudSync({ 
      workStatus: updatedWork, 
      customRows: updatedCustom, 
      rowOverrides: updatedOverrides,
      inventoryOrders: updatedOrders
    });
  };

  const handleSaveAnaliz = (entryId: string, val: string) => {
    const updatedAnaliz = { ...analizOverrides, [entryId]: val };
    setAnalizOverrides(updatedAnaliz);
    triggerCloudSync({ analizOverrides: updatedAnaliz });
  };

  // --- Rapor Çatkısı Handlers (2., 3., 4. Derece Başlıklar & Analizler) ---
  const handleUpdateReportStatus = (id: string, updates: Partial<ReportStatusItem>) => {
    const current = reportStatus[id] || { status: 'not_started', progress: 0, author: '', targetPages: '', note: '', driveLink: '' };
    const updated = { ...reportStatus, [id]: { ...current, ...updates } };
    setReportStatus(updated);
    triggerCloudSync({ reportStatus: updated });
  };

  const handleUpdateAnalysisStatus = (analysisId: string, status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede') => {
    const updated = { ...analysisStatuses, [analysisId]: status };
    setAnalysisStatuses(updated);
    triggerCloudSync({ analysisStatuses: updated });
  };

  const handleAddSubSection = (
    chapterKey: string, // e.g. "ulasim_3"
    formData: HeadingFormData,
    degree: 2 | 3 | 4,
    parentCode?: string
  ) => {
    const parts = formData.code.split('.').filter(Boolean);
    const chapterNum = parts[0] || '1';
    let level2 = undefined;
    let level3 = undefined;
    let level4 = undefined;

    if (parts.length >= 2) level2 = `${parts[0]}.${parts[1]}`;
    if (parts.length >= 3) level3 = `${parts[0]}.${parts[1]}.${parts[2]}`;
    if (parts.length >= 4) level4 = `${parts[0]}.${parts[1]}.${parts[2]}.${parts[3]}`;

    const newSubSection: CustomSubSection = {
      id: `${activeGroup}_${formData.code.replace(/\./g, '_')}_${Date.now()}`,
      chapterNum,
      code: formData.code,
      title: formData.title,
      level2,
      level3,
      level4,
      defaultPages: formData.defaultPages || '6-10 sf',
      scope: formData.icerikOzeti || '',
      sartnameUyum: formData.sartnameUyum || '',
      analizler: []
    };

    const targetKey = chapterKey && chapterKey.includes('_') ? chapterKey : `${activeGroup}_${chapterNum}`;
    const currentList = customSubSections[targetKey] || [];
    const updatedList = [...currentList, newSubSection];
    const updatedCustoms = { ...customSubSections, [targetKey]: updatedList };
    
    try {
      localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(updatedCustoms));
    } catch (e) {}

    setCustomSubSections(updatedCustoms);
    triggerCloudSync({ customSubSections: updatedCustoms });
  };

  const handleEditSubSection = (
    item: ReportItem & { customId?: string; isCustom?: boolean },
    updates: HeadingFormData
  ) => {
    const parts = updates.code.split('.').filter(Boolean);
    let level2 = item.level2;
    let level3 = item.level3;
    let level4 = item.level4;

    if (parts.length >= 2) level2 = `${parts[0]}.${parts[1]}`;
    if (parts.length >= 3) level3 = `${parts[0]}.${parts[1]}.${parts[2]}`;
    if (parts.length >= 4) level4 = `${parts[0]}.${parts[1]}.${parts[2]}.${parts[3]}`;

    if (item.isCustom && (item.customId || item.id)) {
      const matchId = item.customId || item.id;
      // Find which chapterKey contains this customId
      let foundKey = '';
      Object.keys(customSubSections).forEach(k => {
        if (customSubSections[k].some(cs => cs.id === matchId)) {
          foundKey = k;
        }
      });
      if (foundKey) {
        const currentList = customSubSections[foundKey] || [];
        const updatedList = currentList.map(cs => cs.id === matchId ? {
          ...cs,
          code: updates.code,
          title: updates.title,
          level2,
          level3,
          level4,
          defaultPages: updates.defaultPages,
          scope: updates.icerikOzeti,
          sartnameUyum: updates.sartnameUyum
        } : cs);
        const updatedCustoms = { ...customSubSections, [foundKey]: updatedList };
        try {
          localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(updatedCustoms));
        } catch (e) {}
        setCustomSubSections(updatedCustoms);
        triggerCloudSync({ customSubSections: updatedCustoms });
      }
    } else {
      // Default item override
      const overrideKey = `${activeGroup}_${item.id || item.code}`;
      const currentOverride = sectionOverrides[overrideKey] || {};
      const updatedOverrides = {
        ...sectionOverrides,
        [overrideKey]: {
          ...currentOverride,
          code: updates.code,
          title: updates.title,
          level2,
          level3,
          defaultPages: updates.defaultPages,
          scope: updates.icerikOzeti,
          sartnameUyum: updates.sartnameUyum
        }
      };
      try {
        localStorage.setItem(SECTION_OVERRIDES_KEY, JSON.stringify(updatedOverrides));
      } catch (e) {}
      setSectionOverrides(updatedOverrides);
      triggerCloudSync({ sectionOverrides: updatedOverrides });
    }
  };

  const handleDeleteSubSection = (
    item: ReportItem & { customId?: string; isCustom?: boolean }
  ) => {
    if (item.isCustom && (item.customId || item.id)) {
      const matchId = item.customId || item.id;
      let foundKey = '';
      Object.keys(customSubSections).forEach(k => {
        if (customSubSections[k].some(cs => cs.id === matchId)) {
          foundKey = k;
        }
      });
      if (foundKey) {
        const currentList = customSubSections[foundKey] || [];
        const updatedList = currentList.filter(cs => cs.id !== matchId);
        const updatedCustoms = { ...customSubSections, [foundKey]: updatedList };
        try {
          localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(updatedCustoms));
        } catch (e) {}
        setCustomSubSections(updatedCustoms);
        triggerCloudSync({ customSubSections: updatedCustoms });
      }
    } else {
      const overrideKey = `${activeGroup}_${item.id || item.code}`;
      const currentOverride = sectionOverrides[overrideKey] || {};
      const updatedOverrides = {
        ...sectionOverrides,
        [overrideKey]: {
          ...currentOverride,
          deleted: true
        }
      };
      try {
        localStorage.setItem(SECTION_OVERRIDES_KEY, JSON.stringify(updatedOverrides));
      } catch (e) {}
      setSectionOverrides(updatedOverrides);
      triggerCloudSync({ sectionOverrides: updatedOverrides });
    }
  };

  const handleEditSubSectionGroup = (
    chapterKey: string,
    groupCode: string,
    updates: { code: string; title: string }
  ) => {
    // Update all matching custom sub-sections and default item overrides with new group code/title
    const currentList = customSubSections[chapterKey] || [];
    const updatedCustomList = currentList.map(cs => {
      if (cs.code.startsWith(groupCode + '.')) {
        const rest = cs.code.slice(groupCode.length);
        const newCode = updates.code + rest;
        return {
          ...cs,
          code: newCode,
          level2: `${updates.code}. ${updates.title}`
        };
      }
      return cs;
    });

    const updatedCustoms = { ...customSubSections, [chapterKey]: updatedCustomList };
    try {
      localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(updatedCustoms));
    } catch (e) {}
    setCustomSubSections(updatedCustoms);
    triggerCloudSync({ customSubSections: updatedCustoms });
  };

  const handleDeleteSubSectionGroup = (
    chapterKey: string,
    groupCode: string
  ) => {
    // Delete all custom subsections starting with groupCode
    const currentList = customSubSections[chapterKey] || [];
    const updatedCustomList = currentList.filter(cs => !cs.code.startsWith(groupCode));
    const updatedCustoms = { ...customSubSections, [chapterKey]: updatedCustomList };
    try {
      localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(updatedCustoms));
    } catch (e) {}
    setCustomSubSections(updatedCustoms);
    triggerCloudSync({ customSubSections: updatedCustoms });
  };

  const handleAddAnalysis = (
    item: ReportItem & { customId?: string; isCustom?: boolean },
    data: { name: string; category?: string; status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede' }
  ) => {
    const newId = `an_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newAnalysis = {
      id: newId,
      name: data.name,
      category: data.category,
      status: data.status
    };

    const currentAnalyses = item.analizler || [];
    const updatedAnalyses = [...currentAnalyses, newAnalysis];

    if (item.isCustom && (item.customId || item.id)) {
      const matchId = item.customId || item.id;
      let foundKey = '';
      Object.keys(customSubSections).forEach(k => {
        if (customSubSections[k].some(cs => cs.id === matchId)) {
          foundKey = k;
        }
      });
      if (foundKey) {
        const currentList = customSubSections[foundKey] || [];
        const updatedList = currentList.map(cs => cs.id === matchId ? { ...cs, analizler: updatedAnalyses } : cs);
        const updatedCustoms = { ...customSubSections, [foundKey]: updatedList };
        try {
          localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(updatedCustoms));
        } catch (e) {}
        setCustomSubSections(updatedCustoms);
        triggerCloudSync({ customSubSections: updatedCustoms });
      }
    } else {
      const overrideKey = `${activeGroup}_${item.id || item.code}`;
      const currentOverride = sectionOverrides[overrideKey] || {};
      const updatedOverrides = {
        ...sectionOverrides,
        [overrideKey]: {
          ...currentOverride,
          analizler: updatedAnalyses
        }
      };
      try {
        localStorage.setItem(SECTION_OVERRIDES_KEY, JSON.stringify(updatedOverrides));
      } catch (e) {}
      setSectionOverrides(updatedOverrides);
      triggerCloudSync({ sectionOverrides: updatedOverrides });
    }
  };

  const handleEditAnalysis = (
    item: ReportItem & { customId?: string; isCustom?: boolean },
    analysisId: string,
    updates: { name: string; category?: string; status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede' }
  ) => {
    const currentAnalyses = item.analizler || [];
    const updatedAnalyses = currentAnalyses.map(an => an.id === analysisId ? {
      ...an,
      name: updates.name,
      category: updates.category,
      status: updates.status
    } : an);

    if (item.isCustom && (item.customId || item.id)) {
      const matchId = item.customId || item.id;
      let foundKey = '';
      Object.keys(customSubSections).forEach(k => {
        if (customSubSections[k].some(cs => cs.id === matchId)) {
          foundKey = k;
        }
      });
      if (foundKey) {
        const currentList = customSubSections[foundKey] || [];
        const updatedList = currentList.map(cs => cs.id === matchId ? { ...cs, analizler: updatedAnalyses } : cs);
        const updatedCustoms = { ...customSubSections, [foundKey]: updatedList };
        try {
          localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(updatedCustoms));
        } catch (e) {}
        setCustomSubSections(updatedCustoms);
        triggerCloudSync({ customSubSections: updatedCustoms });
      }
    } else {
      const overrideKey = `${activeGroup}_${item.id || item.code}`;
      const currentOverride = sectionOverrides[overrideKey] || {};
      const updatedOverrides = {
        ...sectionOverrides,
        [overrideKey]: {
          ...currentOverride,
          analizler: updatedAnalyses
        }
      };
      try {
        localStorage.setItem(SECTION_OVERRIDES_KEY, JSON.stringify(updatedOverrides));
      } catch (e) {}
      setSectionOverrides(updatedOverrides);
      triggerCloudSync({ sectionOverrides: updatedOverrides });
    }
  };

  const handleDeleteAnalysis = (
    item: ReportItem & { customId?: string; isCustom?: boolean },
    analysisId: string
  ) => {
    const currentAnalyses = item.analizler || [];
    const updatedAnalyses = currentAnalyses.filter(an => an.id !== analysisId);

    if (item.isCustom && (item.customId || item.id)) {
      const matchId = item.customId || item.id;
      let foundKey = '';
      Object.keys(customSubSections).forEach(k => {
        if (customSubSections[k].some(cs => cs.id === matchId)) {
          foundKey = k;
        }
      });
      if (foundKey) {
        const currentList = customSubSections[foundKey] || [];
        const updatedList = currentList.map(cs => cs.id === matchId ? { ...cs, analizler: updatedAnalyses } : cs);
        const updatedCustoms = { ...customSubSections, [foundKey]: updatedList };
        try {
          localStorage.setItem(CUSTOM_SUBSECTIONS_KEY, JSON.stringify(updatedCustoms));
        } catch (e) {}
        setCustomSubSections(updatedCustoms);
        triggerCloudSync({ customSubSections: updatedCustoms });
      }
    } else {
      const overrideKey = `${activeGroup}_${item.id || item.code}`;
      const currentOverride = sectionOverrides[overrideKey] || {};
      const updatedOverrides = {
        ...sectionOverrides,
        [overrideKey]: {
          ...currentOverride,
          analizler: updatedAnalyses
        }
      };
      try {
        localStorage.setItem(SECTION_OVERRIDES_KEY, JSON.stringify(updatedOverrides));
      } catch (e) {}
      setSectionOverrides(updatedOverrides);
      triggerCloudSync({ sectionOverrides: updatedOverrides });
    }
  };

  const handleUpdateChapterNotes = (chapterKey: string, note: string) => {
    const updated = { ...chapterNotes, [chapterKey]: note };
    try {
      localStorage.setItem(CHAPTER_NOTES_KEY, JSON.stringify(updated));
    } catch (e) {}
    setChapterNotes(updated);
    triggerCloudSync({ chapterNotes: updated });
  };

  const handleReorderItems = (chapterKey: string, newOrder: string[]) => {
    const updated = { ...chapterOrders, [chapterKey]: newOrder };
    try {
      localStorage.setItem(CHAPTER_ORDERS_KEY, JSON.stringify(updated));
    } catch (e) {}
    setChapterOrders(updated);
    triggerCloudSync({ chapterOrders: updated });
  };

  const handleResetAll = () => {
    if (window.confirm('Tüm rapor durumları, yazar atamaları ve özel başlıklar sıfırlanacak. Emin misiniz?')) {
      setReportStatus({});
      setCustomSubSections({});
      setSectionOverrides({});
      setAnalysisStatuses({});
      setChapterNotes({});
      setChapterOrders({});
      try {
        localStorage.removeItem(REPORT_STATUS_KEY);
        localStorage.removeItem(CUSTOM_SUBSECTIONS_KEY);
        localStorage.removeItem(SECTION_OVERRIDES_KEY);
        localStorage.removeItem(ANALYSIS_STATUSES_KEY);
        localStorage.removeItem(CHAPTER_NOTES_KEY);
        localStorage.removeItem(CHAPTER_ORDERS_KEY);
      } catch {}
      triggerCloudSync({
        reportStatus: {},
        customSubSections: {},
        sectionOverrides: {},
        analysisStatuses: {},
        chapterNotes: {},
        chapterOrders: {}
      });
    }
  };

  const activeGroupData = DATA[activeGroup];
  const activeGroupSections = getGroupSections(activeGroup);
  const activeSec = activeGroupSections.find((s) => s.code === activeCode) || activeGroupSections[0];
  const activeCnt = activeSec ? sectionCounts(activeGroup, activeSec.code) : { total: 0, done: 0, gaps: 0 };
  const pctDone = activeCnt.total ? (activeCnt.done / activeCnt.total * 100) : 0;

  return (
    <div className={`shell-container theme-${activeGroup}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Toolbar */}
      <header className="toolbar" id="app-main-toolbar">
        <div className="toolbar-brand-section">
          <div className="brandmark">
            <span className="brand-dot"></span>
            <span className="brand-text">PLAN 2050</span>
          </div>
          <div className="toolbar-headings">
            <div className="toolbar-title-row">
              <h1 className="toolbar-title">Plan 2050 — Afet, İklim Krizi & Rapor Portalı</h1>
              <span className="toolbar-env-tag">İSTANBUL ÇDP</span>
            </div>
            <div className="toolbar-sub">Ulaşım · Teknik Altyapı · Lojistik Veri Envanteri ve Rapor Çatkısı</div>
          </div>
        </div>

        <div className="toolbar-spacer"></div>

        <div className="toolbar-actions-group">
          {/* Header Countdown Timer Widget */}
          <HeaderCountdown />

          {/* Search Box */}
          <div className="search-box">
            <Search size={13} className="search-icon" />
            <input
              type="text"
              placeholder="Veri veya bölüm ara…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="search-clear-btn" 
                onClick={() => setSearchTerm('')}
                title="Aramayı temizle"
              >
                ×
              </button>
            )}
          </div>

          {/* Stats Chips (Active in Veri Envanteri Tab) */}
          {activeTab === 'inventory' && (
            <div className="toolbar-stats-row">
              <div className="stat-chip" title="Tamamlanan veri iş durumu">
                <span className="stat-chip-label">İş Durumu</span>
                <span className="stat-chip-val">
                  <b className="val-accent">{overallCounts.workDone}</b>
                  <span className="val-divider">/</span>
                  <span className="val-total">{overallCounts.workTotal}</span>
                </span>
              </div>
              <div className="stat-chip" title="Kaynak verisi varlık durumu">
                <span className="stat-chip-label">Kaynak</span>
                <span className="stat-chip-val">
                  <span style={{ color: '#34D399', fontWeight: 600 }}>{overallCounts.srcVar}</span>
                  <span style={{ color: '#94A3B8', fontSize: '10px', margin: '0 3px' }}>Var ·</span>
                  <span style={{ color: '#F87171', fontWeight: 600 }}>{overallCounts.srcYok}</span>
                  <span style={{ color: '#94A3B8', fontSize: '10px', marginLeft: '3px' }}>Yok</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Navigation Tabs: Veri Envanteri vs Rapor Çatkısı vs Analiz Akışı */}
      <nav className="app-tabs-nav" role="tablist" id="app-main-tabs">
        <button
          role="tab"
          aria-selected={activeTab === 'inventory'}
          className={`app-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          <Layers size={14} />
          <span>Veri Envanteri & Analizler</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'report'}
          className={`app-tab-btn ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          <FileText size={14} />
          <span>Rapor Çatkısı & İlerleme</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'workflow'}
          className={`app-tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflow')}
        >
          <GitBranch size={14} />
          <span>Analiz Akışı</span>
        </button>
      </nav>

      {/* Secondary Group Selector (Ulaşım, Teknik Altyapı, Lojistik) */}
      <div className="group-nav-bar" id="app-group-selector">
        {Object.keys(DATA).map(g => (
          <button
            key={g}
            type="button"
            className={`group-pill-btn ${activeGroup === g ? 'active' : ''}`}
            onClick={() => {
              setActiveGroup(g);
              const groupSecs = getGroupSections(g);
              if (groupSecs[0]) {
                setActiveCode(groupSecs[0].code);
              }
            }}
          >
            {DATA[g].label}
          </button>
        ))}
      </div>

      {/* Tab 3: Analiz Akışı (ArcGIS Pro ModelBuilder Görsel Modelleme) */}
      {activeTab === 'workflow' ? (
        <WorkflowBuilderTab 
          activeGroup={activeGroup}
          onSelectGroup={(grp) => setActiveGroup(grp)}
        />
      ) : activeTab === 'report' ? (
        <ReportTracker 
          activeGroupKey={activeGroup}
          reportStatus={reportStatus}
          customSubSections={customSubSections}
          sectionOverrides={sectionOverrides}
          analysisStatuses={analysisStatuses}
          chapterNotes={chapterNotes}
          chapterOrders={chapterOrders}
          onUpdateStatus={handleUpdateReportStatus}
          onUpdateAnalysisStatus={handleUpdateAnalysisStatus}
          onAddSubSection={handleAddSubSection}
          onEditSubSection={handleEditSubSection}
          onDeleteSubSection={handleDeleteSubSection}
          onEditSubSectionGroup={handleEditSubSectionGroup}
          onDeleteSubSectionGroup={handleDeleteSubSectionGroup}
          onAddAnalysis={handleAddAnalysis}
          onEditAnalysis={handleEditAnalysis}
          onDeleteAnalysis={handleDeleteAnalysis}
          onUpdateChapterNotes={handleUpdateChapterNotes}
          onReorderItems={handleReorderItems}
          onResetAll={handleResetAll}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      ) : (
        /* Tab 1: Veri Envanteri & Analizler (Mekânsal Afet & Risk Matrisleri: 4, 5, 6, 8) */
        <div style={{ padding: '20px 24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <SpatialHazardInventory
            activeGroup={activeGroup}
            data={DATA}
            workStatus={workStatus}
            rowOverrides={rowOverrides}
            customRows={customRows}
            onUpdateWorkStatus={handleUpdateWork}
            onUpdateRowOverride={handleUpdateRow}
            onAddCustomRow={(g, secCode, name, compCode) => {
              const fullKey = compCode ? `${g}::${secCode}::${compCode}` : `${g}::${secCode}`;
              const newId = Date.now();
              const newItem = { id: newId, name, v: true };
              const currentList = customRows[fullKey] || [];
              const updatedList = [...currentList, newItem];
              const updatedCustomRows = { ...customRows, [fullKey]: updatedList };
              setCustomRows(updatedCustomRows);
              try {
                localStorage.setItem(CUSTOM_KEY, JSON.stringify(updatedCustomRows));
              } catch (e) {}
              triggerCloudSync({ customRows: updatedCustomRows });
            }}
            onDeleteRow={handleDeleteRow}
          />
        </div>
      )}

      {/* Modal: Add Inventory 2nd Degree Section */}
      {showAddSectionModal && (
        <div className="custom-modal-backdrop" onClick={() => setShowAddSectionModal(false)}>
          <div className="custom-modal-dialog" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="custom-modal-header">
              <div className="cmh-title-row">
                <div className="cmh-icon-badge">
                  <Plus size={16} />
                </div>
                <div>
                  <h3 className="custom-modal-title">{activeGroupData.label} — 2. Derece Bölüm Ekle</h3>
                  <div className="custom-modal-subtitle">Yeni bölüm kodu ve başlığını belirleyin</div>
                </div>
              </div>
              <button 
                type="button" 
                className="custom-modal-close" 
                onClick={() => setShowAddSectionModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="custom-modal-body">
              <div className="form-field-group">
                <label className="form-label">
                  Bölüm Kodu <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-input code-input"
                  placeholder="Örn: 4.5 veya 4.6"
                  value={newSectionCode}
                  onChange={e => setNewSectionCode(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">
                  Bölüm Başlığı <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Örn: Bisiklet ve Mikromobilite Ağı"
                  value={newSectionTitle}
                  onChange={e => setNewSectionTitle(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleAddInventorySection(activeGroup, newSectionCode, newSectionTitle);
                  }}
                />
              </div>
            </div>

            <div className="custom-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setShowAddSectionModal(false)}
              >
                İptal
              </button>
              <button
                type="button"
                className="btn-modal-submit"
                disabled={!newSectionCode.trim() || !newSectionTitle.trim()}
                onClick={() => handleAddInventorySection(activeGroup, newSectionCode, newSectionTitle)}
              >
                Bölüm Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Inventory Section */}
      {editingSectionModal && (
        <div className="custom-modal-backdrop" onClick={() => setEditingSectionModal(null)}>
          <div className="custom-modal-dialog" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="custom-modal-header">
              <div className="cmh-title-row">
                <div className="cmh-icon-badge">
                  <Pencil size={16} />
                </div>
                <div>
                  <h3 className="custom-modal-title">Bölüm Başlığını Düzenle</h3>
                  <div className="custom-modal-subtitle">{editingSectionModal.originalCode} kodlu bölüm</div>
                </div>
              </div>
              <button 
                type="button" 
                className="custom-modal-close" 
                onClick={() => setEditingSectionModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="custom-modal-body">
              <div className="form-field-group">
                <label className="form-label">
                  Bölüm Kodu <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-input code-input"
                  value={editingSectionModal.code}
                  onChange={e => setEditingSectionModal({ ...editingSectionModal, code: e.target.value })}
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">
                  Bölüm Başlığı <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={editingSectionModal.title}
                  onChange={e => setEditingSectionModal({ ...editingSectionModal, title: e.target.value })}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleEditInventorySection(
                        activeGroup,
                        editingSectionModal.originalCode,
                        editingSectionModal.code,
                        editingSectionModal.title
                      );
                    }
                  }}
                  autoFocus
                />
              </div>
            </div>

            <div className="custom-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setEditingSectionModal(null)}
              >
                İptal
              </button>
              <button
                type="button"
                className="btn-modal-submit"
                disabled={!editingSectionModal.code.trim() || !editingSectionModal.title.trim()}
                onClick={() => {
                  handleEditInventorySection(
                    activeGroup,
                    editingSectionModal.originalCode,
                    editingSectionModal.code,
                    editingSectionModal.title
                  );
                }}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Section Confirmation */}
      {deletingSectionCode && (
        <div className="custom-modal-backdrop" onClick={() => setDeletingSectionCode(null)}>
          <div className="custom-modal-dialog confirm-dialog" onClick={e => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-icon-box variant-danger">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="confirm-title">Bölüm Silinsin mi?</h3>
                <p className="confirm-message">
                  <strong>{deletingSectionCode}</strong> kodlu bölümü ve altındaki tüm veri kalemlerini kaldırmak istediğinize emin misiniz?
                </p>
              </div>
            </div>
            <div className="confirm-modal-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setDeletingSectionCode(null)}
              >
                Vazgeç
              </button>
              <button
                type="button"
                className="btn-modal-confirm variant-danger"
                onClick={() => handleDeleteInventorySection(activeGroup, deletingSectionCode)}
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
