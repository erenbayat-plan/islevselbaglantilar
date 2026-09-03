import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Layers, FileText, Search, Activity, CheckCircle2 } from 'lucide-react';
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
import { ReportItem } from './reportData';

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
const LAST_UPDATED_KEY = 'app-last-updated';

type WorkStatus = {
  status: string;
  priority: string;
  note: string;
};

const SUB_GROUPS: Record<string, string> = {
  '4': 'Doğa Kaynaklı',
  '5': 'İnsan ve Teknoloji Kaynaklı',
  '6': 'İklim Krizi'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'report'>('inventory');
  const [activeGroup, setActiveGroup] = useState('ulasim');
  const [activeCode, setActiveCode] = useState('4.1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [onlyGaps, setOnlyGaps] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [visibleNotes, setVisibleNotes] = useState<Record<string, boolean>>({});
  const [newRowName, setNewRowName] = useState('');

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

  // 2. Rapor Çatkısı States
  const [reportStatus, setReportStatus] = useState<Record<string, ReportStatusItem>>(() => {
    try {
      const saved = localStorage.getItem(REPORT_STATUS_KEY);
      return saved ? JSON.parse(saved) : {};
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
    chapterOrders
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

  const sectionAllRows = (g: string, code: string) => {
    const sec = DATA[g]?.sections?.find((s: any) => s.code === code);
    if (!sec) return [];
    const rows: any[] = [];
    if (sec.entries) {
      sec.entries.forEach((e: any, eIdx: number) => {
        (e.veri || []).forEach((v: any, vIdx: number) => {
          const id = rowId(g, code, eIdx, vIdx);
          const override = rowOverrides[id];
          if (!override?.deleted) {
            rows.push({ 
              id, 
              n: override?.n !== undefined ? override.n : v.n, 
              v: override?.v !== undefined ? override.v : v.v, 
              custom: false 
            });
          }
        });
      });
    }
    const ck = customKey(g, code);
    (customRows[ck] || []).forEach(c => {
      rows.push({ id: `custom|${g}|${code}|${c.id}`, n: c.name, v: c.v !== undefined ? c.v : false, custom: true, customId: c.id });
    });
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
      DATA[g].sections.forEach((s: any) => {
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
  }, [workStatus, customRows, rowOverrides]);

  const sectionMatches = (g: string, s: any, term: string) => {
    const t = term.toLowerCase();
    if (s.title.toLowerCase().includes(t) || s.code.includes(t)) return true;
    const rows = sectionAllRows(g, s.code);
    return rows.some(r => r.n.toLowerCase().includes(t));
  };

  const handleAddCustomRow = (g: string, code: string) => {
    if (!newRowName.trim()) return;
    const ck = customKey(g, code);
    const newList = [...(customRows[ck] || []), { id: Date.now(), name: newRowName.trim(), v: false }];
    const updatedCustomRows = { ...customRows, [ck]: newList };
    setCustomRows(updatedCustomRows);
    setNewRowName('');
    triggerCloudSync({ customRows: updatedCustomRows });
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
    if (id.startsWith('custom|')) {
      const [, g, code, customIdStr] = id.split('|');
      const ck = customKey(g, code);
      const newList = (customRows[ck] || []).filter(c => String(c.id) !== customIdStr);
      updatedCustom = { ...customRows, [ck]: newList };
      setCustomRows(updatedCustom);
    } else {
      const current = rowOverrides[id] || {};
      updatedOverrides = { ...rowOverrides, [id]: { ...current, deleted: true } };
      setRowOverrides(updatedOverrides);
    }
    const updatedWork = { ...workStatus };
    delete updatedWork[id];
    setWorkStatus(updatedWork);
    triggerCloudSync({ workStatus: updatedWork, customRows: updatedCustom, rowOverrides: updatedOverrides });
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
  const activeSec = activeGroupData?.sections?.find((s: any) => s.code === activeCode) || activeGroupData?.sections?.[0];
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

      {/* Main Navigation Tabs: Veri Envanteri vs Rapor Çatkısı */}
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
              if (DATA[g]?.sections?.[0]) {
                setActiveCode(DATA[g].sections[0].code);
              }
            }}
          >
            {DATA[g].label}
          </button>
        ))}
      </div>

      {/* Tab 2: Rapor Çatkısı & İlerleme (Enhanced with 2nd/3rd/4th degree headings, editable titles & drag/drop) */}
      {activeTab === 'report' ? (
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
        /* Tab 1: Veri Envanteri & Analizler */
        <div className="layout" id="inventory-layout">
          {/* Sidebar */}
          <nav className="sidebar" id="inventory-sidebar">
            <div className="sidebar-title-bar">
              <span>{activeGroupData.label} Bölümleri</span>
            </div>
            {activeGroupData.sections.map((s: any) => {
              const cnt = sectionCounts(activeGroup, s.code);
              const isActive = s.code === activeCode;
              return (
                <div
                  key={s.code}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCode(s.code)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="mono" style={{ fontWeight: 700 }}>{s.code}</span>
                    <span>{s.title}</span>
                  </div>
                  <span className="mono" style={{ fontSize: '11px', opacity: 0.8 }}>
                    {cnt.done}/{cnt.total}
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Main Content Area */}
          <main className="content-area" id="inventory-main-content">
            {activeSec ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--ink)' }}>
                      {activeSec.code} {activeSec.title}
                    </h2>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {activeCnt.done}/{activeCnt.total} Tamamlandı (%{Math.round(pctDone)}) · {activeCnt.gaps} Eksik Veri Kaynağı
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Yeni veri kalemi adı…"
                      value={newRowName}
                      onChange={e => setNewRowName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleAddCustomRow(activeGroup, activeSec.code);
                      }}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        border: '1px solid var(--line-strong)',
                        borderRadius: '4px',
                        minWidth: '220px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddCustomRow(activeGroup, activeSec.code)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: '#0F172A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      + Veri Ekle
                    </button>
                  </div>
                </div>

                <div className="table-panel">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th style={{ width: '45%' }}>Gerekli Veri Kalemi / Katman</th>
                        <th style={{ width: '15%' }}>Kaynak Durumu</th>
                        <th style={{ width: '20%' }}>İş Durumu</th>
                        <th style={{ width: '20%' }}>Not / Açıklama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sectionAllRows(activeGroup, activeSec.code).map((row: any) => {
                        const work = getWork(row.id);
                        return (
                          <tr key={row.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                <span style={{ fontWeight: 500 }}>{row.n}</span>
                                {row.custom && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteRow(row.id)}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: '#DC2626',
                                      cursor: 'pointer',
                                      fontSize: '11px',
                                      fontWeight: 600
                                    }}
                                  >
                                    Sil
                                  </button>
                                )}
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleUpdateRow(row.id, { v: !row.v })}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                              >
                                {row.v ? (
                                  <span className="var-badge">✓ Veri Var</span>
                                ) : (
                                  <span className="yok-badge">✗ Veri Yok</span>
                                )}
                              </button>
                            </td>
                            <td>
                              <select
                                value={work.status}
                                onChange={e => handleUpdateWork(row.id, { status: e.target.value })}
                                style={{
                                  padding: '4px 8px',
                                  fontSize: '12px',
                                  borderRadius: '4px',
                                  border: '1px solid var(--line-strong)',
                                  background: work.status === 'done' ? '#ECFDF5' : work.status === 'progress' ? '#EFF6FF' : '#FFFFFF',
                                  color: work.status === 'done' ? '#065F46' : work.status === 'progress' ? '#1E40AF' : 'var(--ink)'
                                }}
                              >
                                <option value="todo">Başlanmadı</option>
                                <option value="progress">Devam Ediyor</option>
                                <option value="done">Tamamlandı</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder="Açıklama notu…"
                                value={work.note || ''}
                                onChange={e => handleUpdateWork(row.id, { note: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '4px 6px',
                                  fontSize: '12px',
                                  border: '1px solid var(--line)',
                                  borderRadius: '4px'
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </main>
        </div>
      )}
    </div>
  );
}
