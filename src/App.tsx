import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DATA, STATUS_LABEL } from './data';
import { 
  fetchGlobalCloudState, 
  pushGlobalCloudState, 
  queueGlobalCloudPush, 
  subscribeToTabBroadcast,
  subscribeToCloudState,
  AppState 
} from './syncService';
import ReportTracker, { ReportStatusItem } from './components/ReportTracker';

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

  // Sync with external changes only when not currently being typed into
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [workStatus, setWorkStatus] = useState<Record<string, WorkStatus>>(() => {
    try {
      const saved = localStorage.getItem(WORK_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [customRows, setCustomRows] = useState<Record<string, { id: number; name: string; v?: boolean }[]>>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [rowOverrides, setRowOverrides] = useState<Record<string, { n?: string; v?: boolean; deleted?: boolean }>>(() => {
    try {
      const saved = localStorage.getItem(ROW_OVERRIDES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [analizOverrides, setAnalizOverrides] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(ANALIZ_OVERRIDES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [reportStatus, setReportStatus] = useState<Record<string, ReportStatusItem>>(() => {
    try {
      const saved = localStorage.getItem(REPORT_STATUS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'synced' | 'saving' | 'connected'>('connected');
  const localVersionRef = useRef(0);
  const cloudVersionRef = useRef(0);
  const isEditingRef = useRef(false);

  const [activeGroup, setActiveGroup] = useState('ulasim');
  const [activeCode, setActiveCode] = useState('4.1');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [onlyGaps, setOnlyGaps] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [visibleNotes, setVisibleNotes] = useState<Record<string, boolean>>({});
  const [newRowName, setNewRowName] = useState('');

  // Persist to local storage immediately
  useEffect(() => {
    try {
      localStorage.setItem(WORK_KEY, JSON.stringify(workStatus));
    } catch (e) { console.error(e); }
  }, [workStatus]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(customRows));
    } catch (e) { console.error(e); }
  }, [customRows]);

  useEffect(() => {
    try {
      localStorage.setItem(ROW_OVERRIDES_KEY, JSON.stringify(rowOverrides));
    } catch (e) { console.error(e); }
  }, [rowOverrides]);

  useEffect(() => {
    try {
      localStorage.setItem(ANALIZ_OVERRIDES_KEY, JSON.stringify(analizOverrides));
    } catch (e) { console.error(e); }
  }, [analizOverrides]);

  useEffect(() => {
    try {
      localStorage.setItem(REPORT_STATUS_KEY, JSON.stringify(reportStatus));
    } catch (e) { console.error(e); }
  }, [reportStatus]);

  // Global Real-time Multi-User Cloud & Multi-Tab Sync
  useEffect(() => {
    let isMounted = true;

    const applyCloudState = (cloudData: AppState) => {
      // If user is actively typing or a local save is pending, do not overwrite
      if (!isMounted || isEditingRef.current) return;

      // Ensure cloud update is newer than local version
      if (cloudData.lastUpdated && cloudData.lastUpdated < localVersionRef.current) {
        return;
      }
      cloudVersionRef.current = cloudData.lastUpdated || Date.now();

      setWorkStatus(prev => {
        const next = cloudData.workStatus || {};
        return JSON.stringify(prev) !== JSON.stringify(next) ? next : prev;
      });
      setCustomRows(prev => {
        const next = cloudData.customRows || {};
        return JSON.stringify(prev) !== JSON.stringify(next) ? next : prev;
      });
      setRowOverrides(prev => {
        const next = cloudData.rowOverrides || {};
        return JSON.stringify(prev) !== JSON.stringify(next) ? next : prev;
      });
      setAnalizOverrides(prev => {
        const next = cloudData.analizOverrides || {};
        return JSON.stringify(prev) !== JSON.stringify(next) ? next : prev;
      });
      if (cloudData.reportStatus) {
        setReportStatus(prev => {
          const next = cloudData.reportStatus || {};
          return JSON.stringify(prev) !== JSON.stringify(next) ? next : prev;
        });
      }
      setCloudSyncStatus('synced');
    };

    // Instant multi-tab broadcast listener on same computer
    const unsubscribeTab = subscribeToTabBroadcast((tabState) => {
      if (!isMounted || isEditingRef.current) return;
      if (tabState.workStatus) setWorkStatus(tabState.workStatus);
      if (tabState.customRows) setCustomRows(tabState.customRows);
      if (tabState.rowOverrides) setRowOverrides(tabState.rowOverrides);
      if (tabState.analizOverrides) setAnalizOverrides(tabState.analizOverrides);
      if (tabState.reportStatus) setReportStatus(tabState.reportStatus);
      setCloudSyncStatus('synced');
    });

    // True real-time cross-device/cross-user sync via Firestore's onSnapshot
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
    nextWork: Record<string, WorkStatus>,
    nextCustom: Record<string, { id: number; name: string; v?: boolean }[]>,
    nextOverrides: Record<string, { n?: string; v?: boolean; deleted?: boolean }>,
    nextAnaliz: Record<string, string>,
    nextReport?: Record<string, ReportStatusItem>
  ) => {
    const newVersion = Date.now();
    localVersionRef.current = newVersion;
    isEditingRef.current = true;
    setCloudSyncStatus('saving');

    const reportToSave = nextReport !== undefined ? nextReport : reportStatus;

    queueGlobalCloudPush(
      () => ({
        workStatus: nextWork,
        customRows: nextCustom,
        rowOverrides: nextOverrides,
        analizOverrides: nextAnaliz,
        reportStatus: reportToSave,
        lastUpdated: newVersion
      }),
      (status) => {
        setCloudSyncStatus(status === 'saving' ? 'saving' : 'synced');
        // Release edit lock after push finishes
        setTimeout(() => {
          isEditingRef.current = false;
        }, 1200);
      }
    );
  };

  const rowId = (g: string, code: string, eIdx: number, vIdx: number) => `${g}|${code}|${eIdx}|${vIdx}`;
  const customKey = (g: string, code: string) => `${g}::${code}`;

  const getWork = (id: string): WorkStatus => {
    return workStatus[id] || { status: 'todo', priority: 'low', note: '' };
  };

  const sectionAllRows = (g: string, code: string) => {
    const sec = DATA[g].sections.find((s: any) => s.code === code);
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

  const handleReset = () => {
    if (window.confirm('Tüm iş durumu, öncelik, not ve eklenen/değiştirilen veri kalemleri silinecek. Emin misiniz?')) {
      setWorkStatus({});
      setCustomRows({});
      setRowOverrides({});
      setAnalizOverrides({});
      setReportStatus({});
      try {
        localStorage.removeItem(WORK_KEY);
        localStorage.removeItem(CUSTOM_KEY);
        localStorage.removeItem(ROW_OVERRIDES_KEY);
        localStorage.removeItem(ANALIZ_OVERRIDES_KEY);
        localStorage.removeItem(REPORT_STATUS_KEY);
      } catch {}
      triggerCloudSync({}, {}, {}, {}, {});
    }
  };

  const handleAddCustomRow = (g: string, code: string) => {
    if (!newRowName.trim()) return;
    const ck = customKey(g, code);
    const newList = [...(customRows[ck] || []), { id: Date.now(), name: newRowName.trim(), v: false }];
    const updatedCustomRows = { ...customRows, [ck]: newList };
    setCustomRows(updatedCustomRows);
    setNewRowName('');
    triggerCloudSync(workStatus, updatedCustomRows, rowOverrides, analizOverrides);
  };

  const handleUpdateWork = (id: string, updates: Partial<WorkStatus>) => {
    const current = workStatus[id] || { status: 'todo', priority: 'low', note: '' };
    const updatedWorkStatus = { ...workStatus, [id]: { ...current, ...updates } };
    setWorkStatus(updatedWorkStatus);
    triggerCloudSync(updatedWorkStatus, customRows, rowOverrides, analizOverrides);
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
      triggerCloudSync(workStatus, updatedCustomRows, rowOverrides, analizOverrides);
    } else {
      const current = rowOverrides[id] || {};
      const updatedOverrides = { ...rowOverrides, [id]: { ...current, ...updates } };
      setRowOverrides(updatedOverrides);
      triggerCloudSync(workStatus, customRows, updatedOverrides, analizOverrides);
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
    triggerCloudSync(updatedWork, updatedCustom, updatedOverrides, analizOverrides);
  };

  const handleSaveAnaliz = (entryId: string, val: string) => {
    const updatedAnaliz = { ...analizOverrides, [entryId]: val };
    setAnalizOverrides(updatedAnaliz);
    triggerCloudSync(workStatus, customRows, rowOverrides, updatedAnaliz);
  };

  const handleUpdateReportStatus = (id: string, updates: Partial<ReportStatusItem>) => {
    const current = reportStatus[id] || { status: 'not_started', progress: 0, author: '', targetPages: '', note: '' };
    const updated = { ...reportStatus, [id]: { ...current, ...updates } };
    setReportStatus(updated);
    triggerCloudSync(workStatus, customRows, rowOverrides, analizOverrides, updated);
  };

  const activeGroupData = DATA[activeGroup];
  const activeSec = activeGroupData.sections.find((s: any) => s.code === activeCode);
  const activeCnt = sectionCounts(activeGroup, activeSec.code);
  const pctDone = activeCnt.total ? (activeCnt.done / activeCnt.total * 100) : 0;

  return (
    <div className={`shell-container theme-${activeGroup}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-brand-section" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="brandmark">AR</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1>Plan 2050 — Afet, İklim Krizi & Rapor Portalı</h1>
            <div className="sub">Ulaşım · Teknik Altyapı · Lojistik Veri Envanteri ve Rapor Çatkısı</div>
          </div>
        </div>

        {/* Top View Selector Tabs */}
        <div className="view-tabs">
          <button
            className={`view-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <span className="tab-icon">📊</span>
            <span>Veri Envanteri & Analizler</span>
          </button>
          <button
            className={`view-tab-btn ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            <span className="tab-icon">📑</span>
            <span>Rapor Çatkısı & İlerleme</span>
          </button>
        </div>

        <div className="toolbar-spacer"></div>

        {activeTab === 'inventory' && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Veri veya bölüm ara…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="toolbar-stats-row">
            <div className="stat-pill">İş Durumu: <b>{overallCounts.workDone}/{overallCounts.workTotal}</b></div>
            <div className="stat-pill">Kaynak: <b>{overallCounts.srcVar} Var</b> · {overallCounts.srcYok} Yok</div>
          </div>
        )}

        <button className="icon-btn" onClick={handleReset}>Verileri Temizle</button>
      </div>

      {activeTab === 'report' ? (
        <ReportTracker 
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          reportStatus={reportStatus}
          onUpdateReportStatus={handleUpdateReportStatus}
        />
      ) : (
        <div className="shell">
          {/* Mobile Sidebar Selector Bar */}
          <div className="mobile-section-picker" style={{ display: 'none' }}>
            <button 
              className="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
            >
              <span>📂 {activeGroupData.label} / {activeSec.code} - {activeSec.title}</span>
              <span>{mobileMenuOpen ? '▲ Kapat' : '▼ Bölüm Seç'}</span>
            </button>
          </div>

          {/* Sidebar */}
          <nav className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {Object.keys(DATA).map(g => {
              const grp = DATA[g];
              const gd = grp.sections.reduce((acc: any, s: any) => {
                const c = sectionCounts(g, s.code);
                acc.d += c.done;
                acc.t += c.total;
                return acc;
              }, { d: 0, t: 0 });

              const isCollapsed = collapsedGroups[g];

              return (
                <div key={g}>
                  <div className={`grp-head ${isCollapsed ? 'collapsed' : ''}`} onClick={() => setCollapsedGroups(prev => ({ ...prev, [g]: !isCollapsed }))}>
                    <span className="name">{grp.label}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="gfrac">{gd.d}/{gd.t}</span>
                      <span className="car">&#x25be;</span>
                    </span>
                  </div>
                  <div className={`sec-list ${isCollapsed ? 'hidden' : ''}`}>
                    {['4', '5', '6'].map(prefix => {
                      const sections = grp.sections.filter((s: any) => s.code.startsWith(prefix));
                      const visibleSections = sections.filter((s: any) => !searchTerm || sectionMatches(g, s, searchTerm));
                      
                      if (visibleSections.length === 0) return null;

                      return (
                        <div key={prefix} className="sub-grp-wrap">
                          <div className="sub-grp-title">{SUB_GROUPS[prefix]}</div>
                          {visibleSections.map((s: any) => {
                            const cnt = sectionCounts(g, s.code);
                            const isActive = g === activeGroup && s.code === activeCode;
                            
                            let swCls = 'empty';
                            if (cnt.total > 0) {
                              if (cnt.done === 0) swCls = '';
                              else if (cnt.done < cnt.total) swCls = 'partial';
                              else swCls = 'full';
                            }

                            return (
                              <button
                                key={s.code}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => { 
                                  setActiveGroup(g); 
                                  setActiveCode(s.code);
                                  setMobileMenuOpen(false); 
                                }}
                              >
                                <span className="code">{s.code}</span>
                                <span className="title">{s.title}</span>
                                {cnt.gaps > 0 && <span className="gap" title={`${cnt.gaps} eksik veri`}></span>}
                                <span className={`swatch ${swCls}`}></span>
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Content */}
          <main className="content">
            <div className="crumb">{activeGroupData.label} / Olası Afet ve İklim Krizi Riskleri</div>
            <div className="sec-title">
              <span className="code-badge">{activeSec.code}</span>
              <h2>{activeSec.title}</h2>
            </div>
            
            <div className="sec-progress">
              <div className="track">
                <span style={{ width: `${pctDone}%`, background: 'var(--st-done)' }}></span>
              </div>
              <span className="fig">
                {activeCnt.done} / {activeCnt.total} İş Durumu tamamlandı
                {activeCnt.gaps > 0 ? ` · ${activeCnt.gaps} Kaynak Veri eksik` : ''}
              </span>
            </div>

            <div className="filter-row">
              <label>
                <input type="checkbox" checked={onlyGaps} onChange={e => setOnlyGaps(e.target.checked)} /> 
                Sadece eksik Kaynak Veriyi (Yok) göster
              </label>
            </div>

            {activeSec.climate ? (
              <>
                <div className="empty-panel">
                  <p className="etext">{activeSec.sartname}</p>
                  <div className="hint">Bu bölüm için şartnamede madde tanımlı, ancak analiz türü ve veri envanteri henüz oluşturulmamış — mekânsal analize başlamadan önce aşağıya gerekli veri kalemlerini ekleyip durumlarını takip edebilirsiniz.</div>
                </div>
                <div className="entry-card">
                  <div className="ehead"><div className="elabel">Veri Envanteri</div></div>
                  <VeriTable 
                    rows={sectionAllRows(activeGroup, activeSec.code)} 
                    onlyGaps={onlyGaps}
                    getWork={getWork}
                    handleUpdateWork={handleUpdateWork}
                    visibleNotes={visibleNotes}
                    setVisibleNotes={setVisibleNotes}
                    handleUpdateRow={handleUpdateRow}
                    handleDeleteRow={handleDeleteRow}
                  />
                  <div className="add-row" style={{ padding: '0 18px 16px' }}>
                    <input type="text" placeholder="Yeni veri kalemi adı…" value={newRowName} onChange={e => setNewRowName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddCustomRow(activeGroup, activeSec.code)} />
                    <button onClick={() => handleAddCustomRow(activeGroup, activeSec.code)}>Ekle</button>
                  </div>
                </div>
              </>
            ) : (
              activeSec.entries.map((e: any, eIdx: number) => {
                const rows = e.veri.map((v: any, vIdx: number) => {
                  const id = rowId(activeGroup, activeSec.code, eIdx, vIdx);
                  const override = rowOverrides[id];
                  return {
                    id,
                    n: override?.n !== undefined ? override.n : v.n,
                    v: override?.v !== undefined ? override.v : v.v,
                    custom: false,
                    deleted: override?.deleted
                  };
                }).filter((r: any) => !r.deleted);

                const entryId = `${activeGroup}|${activeSec.code}|${eIdx}`;
                const currentAnaliz = analizOverrides[entryId] !== undefined ? analizOverrides[entryId] : (e.analiz ? toTitleCase(e.analiz) : '');
                
                return (
                  <div key={eIdx} className="entry-card">
                    <div className="ehead">
                      <div className="elabel">Şartname Karşılığı</div>
                      <p className="etext">{e.sartname}</p>
                      {(e.analiz || currentAnaliz) && (
                        <div className="analiz-block">
                          <div className="elabel">Analiz Adı</div>
                          <AnalizEditInput 
                            initialValue={currentAnaliz}
                            onSave={(val) => handleSaveAnaliz(entryId, val)}
                            placeholder="Analiz adı girin..."
                          />
                        </div>
                      )}
                    </div>
                    <VeriTable 
                      rows={rows} 
                      onlyGaps={onlyGaps}
                      getWork={getWork}
                      handleUpdateWork={handleUpdateWork}
                      visibleNotes={visibleNotes}
                      setVisibleNotes={setVisibleNotes}
                      handleUpdateRow={handleUpdateRow}
                      handleDeleteRow={handleDeleteRow}
                    />
                  </div>
                );
              })
            )}

            {!activeSec.climate && (
              <div className="entry-card">
                <div className="ehead">
                  <div className="elabel">Eklenen Veri Kalemleri</div>
                  <p className="etext" style={{ marginBottom: 0, fontSize: '11.5px', color: 'var(--muted)' }}>Bu bölüme özel olarak oluşturduğunuz ek veri satırları</p>
                </div>
                <VeriTable 
                  rows={(customRows[customKey(activeGroup, activeSec.code)] || []).map(c => ({
                    id: `custom|${activeGroup}|${activeSec.code}|${c.id}`, n: c.name, v: c.v !== undefined ? c.v : false, custom: true, customId: c.id
                  }))} 
                  onlyGaps={onlyGaps}
                  getWork={getWork}
                  handleUpdateWork={handleUpdateWork}
                  visibleNotes={visibleNotes}
                  setVisibleNotes={setVisibleNotes}
                  handleUpdateRow={handleUpdateRow}
                  handleDeleteRow={handleDeleteRow}
                />
                <div className="add-row" style={{ padding: '0 18px 16px' }}>
                  <input type="text" placeholder="Yeni veri kalemi adı…" value={newRowName} onChange={e => setNewRowName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddCustomRow(activeGroup, activeSec.code)} />
                  <button onClick={() => handleAddCustomRow(activeGroup, activeSec.code)}>Ekle</button>
                </div>
              </div>
            )}

            <div className="legend">
              <div className="li"><span className="sw" style={{ background: 'var(--ok)' }}></span>Kaynakta Var</div>
              <div className="li"><span className="sw" style={{ background: 'var(--warn)' }}></span>Kaynakta Yok / Eksik</div>
              <div className="li"><span className="sw" style={{ background: 'var(--st-progress)' }}></span>Veri Toplanıyor</div>
              <div className="li"><span className="sw" style={{ background: 'var(--st-gis)' }}></span>ArcGIS’te Analiz</div>
              <div className="li"><span className="sw" style={{ background: 'var(--st-done)' }}></span>Tamamlandı</div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

function VeriTable({ 
  rows, onlyGaps, getWork, handleUpdateWork, 
  visibleNotes, setVisibleNotes, handleUpdateRow, handleDeleteRow
}: any) {
  const visRows = rows.filter((r: any) => !onlyGaps || r.v === false);
  
  if (visRows.length === 0) {
    return <div style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--muted)' }} className="mono">Gösterilecek satır yok.</div>;
  }

  return (
    <table className="veri">
      <thead>
        <tr>
          <th className="idx">#</th>
          <th>Veri Adı</th>
          <th>Kaynak Veri</th>
          <th>İş Durumu</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {visRows.map((r: any, i: number) => {
          const w = getWork(r.id);
          const gapCls = (r.v === false) ? 'gap-row' : '';
          const priCls = (w.priority === 'high') ? 'priority-row' : '';
          const rowCls = [gapCls, priCls].filter(Boolean).join(' ');
          const isNoteVisible = visibleNotes[r.id];

          return (
            <React.Fragment key={r.id}>
              <tr className={rowCls}>
                <td className="idx">{i + 1}</td>
                <td className="vname">
                  <div className="veri-mobile-header">
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                      <input 
                        type="text"
                        className="edit-input"
                        value={r.n}
                        onChange={e => handleUpdateRow(r.id, { n: e.target.value })}
                        placeholder="Veri adı girin..."
                      />
                      {r.custom && <span className="mono" style={{ color: 'var(--muted)', fontSize: '9.5px', marginLeft: '4px', flexShrink: 0 }}>(eklendi)</span>}
                    </div>
                  </div>
                </td>
                <td className="kaynak">
                  <div className="veri-mobile-controls">
                    <div className="veri-mobile-controls-left">
                      <button 
                        className={`pill ${r.v ? 'var' : 'yok'}`}
                        onClick={() => handleUpdateRow(r.id, { v: !r.v })}
                        style={{ cursor: 'pointer', outline: 'none' }}
                      >
                        {r.v ? 'VAR' : 'YOK'}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="durum">
                  <select 
                    className={`st-${w.status}`} 
                    value={w.status}
                    onChange={e => handleUpdateWork(r.id, { status: e.target.value })}
                  >
                    {Object.keys(STATUS_LABEL).map(k => (
                      <option key={k} value={k}>{STATUS_LABEL[k]}</option>
                    ))}
                  </select>
                </td>
                <td className="actions">
                  <button 
                    className={`note-btn ${w.note ? 'has' : ''}`} 
                    title="Not"
                    aria-label="Not ekle veya düzenle"
                    onClick={() => setVisibleNotes((prev: any) => ({ ...prev, [r.id]: !prev[r.id] }))}
                  >
                    &#x270e;
                  </button>
                  <button 
                    className="del-btn" 
                    title="Sil"
                    aria-label="Veri kalemini sil"
                    onClick={() => {
                      if (window.confirm('Bu veri kalemi kalıcı olarak silinsin mi?')) {
                        handleDeleteRow(r.id);
                      }
                    }}
                    style={{ marginLeft: '4px' }}
                  >
                    &#x2715;
                  </button>
                </td>
              </tr>
              <tr className={`note-row ${isNoteVisible ? '' : 'hidden'}`}>
                <td colSpan={5}>
                  <textarea 
                    placeholder="Not ekleyin…"
                    value={w.note || ''}
                    onChange={e => handleUpdateWork(r.id, { note: e.target.value })}
                  />
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
