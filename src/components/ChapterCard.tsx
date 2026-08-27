import React, { useState, useMemo } from 'react';
import { Pencil, Plus, X, GripVertical } from 'lucide-react';
import type { ReportChapterGroup, ReportItem, ReportStatusType, AnalysisItem } from '../reportData';
import { 
  STATUS_PROGRESS_MAP, 
  computeAutoStatusForAnalyses,
  REPORT_STATUS_KEYS,
  getStatusLabel
} from '../reportData';
import type { ReportStatusItem } from '../syncService';
import { HeadingModal, HeadingFormData } from './HeadingModal';
import { AnalysisModal } from './AnalysisModal';
import { ConfirmModal } from './ConfirmModal';

interface ChapterCardProps {
  chapter: ReportChapterGroup;
  items: (ReportItem & { customId?: string; isCustom?: boolean })[];
  chapterOrder?: string[];
  reportStatus: Record<string, ReportStatusItem>;
  analysisStatuses: Record<string, 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede'>;
  chapterNotes: string;
  isCollapsed: boolean;
  onToggleCollapse: (chapterNum: string) => void;
  onUpdateStatus: (id: string, updates: Partial<ReportStatusItem>) => void;
  onUpdateAnalysisStatus: (analysisId: string, status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede') => void;
  onAddSubSection: (
    chapterNum: string, 
    formData: HeadingFormData, 
    degree: 2 | 3 | 4, 
    parentCode?: string
  ) => void;
  onEditSubSection: (
    item: ReportItem & { customId?: string; isCustom?: boolean },
    updates: HeadingFormData
  ) => void;
  onDeleteSubSection: (
    item: ReportItem & { customId?: string; isCustom?: boolean }
  ) => void;
  onEditSubSectionGroup?: (
    chapterNum: string,
    groupCode: string,
    updates: { code: string; title: string }
  ) => void;
  onDeleteSubSectionGroup?: (
    chapterNum: string,
    groupCode: string
  ) => void;
  onAddAnalysis: (
    item: ReportItem & { customId?: string; isCustom?: boolean },
    data: { name: string; category?: string; status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede' }
  ) => void;
  onEditAnalysis: (
    item: ReportItem & { customId?: string; isCustom?: boolean },
    analysisId: string,
    updates: { name: string; category?: string; status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede' }
  ) => void;
  onDeleteAnalysis: (
    item: ReportItem & { customId?: string; isCustom?: boolean },
    analysisId: string
  ) => void;
  onUpdateChapterNotes: (chapterNum: string, note: string) => void;
  onReorderItems?: (chapterNum: string, newOrder: string[]) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  items,
  chapterOrder,
  reportStatus,
  analysisStatuses,
  chapterNotes,
  isCollapsed,
  onToggleCollapse,
  onUpdateStatus,
  onUpdateAnalysisStatus,
  onAddSubSection,
  onEditSubSection,
  onDeleteSubSection,
  onEditSubSectionGroup,
  onDeleteSubSectionGroup,
  onAddAnalysis,
  onEditAnalysis,
  onDeleteAnalysis,
  onUpdateChapterNotes,
  onReorderItems
}) => {
  const [showChapterNote, setShowChapterNote] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  
  // Initialize collapsedGroups: all parent nodes start collapsed by default
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach(item => {
      const hasKids = items.some(i => i.code.startsWith(item.code + '.') && i.code !== item.code);
      if (hasKids) {
        initial[item.code] = true;
      }
    });
    return initial;
  });

  // Drag and drop state
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);
  const [dragOverPos, setDragOverPos] = useState<'top' | 'bottom'>('bottom');

  // Modals state
  const [headingModalState, setHeadingModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    degree: 2 | 3 | 4;
    parentCode?: string;
    parentTitle?: string;
    targetItem?: ReportItem & { customId?: string; isCustom?: boolean };
  }>({
    isOpen: false,
    mode: 'add',
    degree: 3
  });

  const [analysisModalState, setAnalysisModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    targetItem?: ReportItem & { customId?: string; isCustom?: boolean };
    targetAnalysis?: AnalysisItem;
  }>({
    isOpen: false,
    mode: 'add'
  });

  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: 'danger' | 'warning' | 'primary';
    confirmLabel?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'danger',
    onConfirm: () => {}
  });

  const getItemId = (item: ReportItem) => item.id || `item_${item.code.replace(/\./g, '_')}`;

  const getHeadingDegree = (code: string): number => {
    return code.split('.').filter(Boolean).length;
  };

  // Natural numeric code comparison (e.g., 2.1 < 2.1.1 < 2.1.2 < 2.1.10 < 2.2 < 2.5 < 2.5.1 < 2.5.1.1 < 2.5.2)
  const compareCodes = (a: string, b: string): number => {
    const partsA = a.split('.').map(p => parseInt(p, 10));
    const partsB = b.split('.').map(p => parseInt(p, 10));
    const maxLen = Math.max(partsA.length, partsB.length);
    for (let i = 0; i < maxLen; i++) {
      const numA = partsA[i] ?? -1;
      const numB = partsB[i] ?? -1;
      if (numA !== numB) return numA - numB;
    }
    return a.localeCompare(b);
  };

  // Sorted items maintaining tree hierarchy while respecting manual drag & drop order for siblings
  const sortedItems = useMemo(() => {
    const naturallySorted = [...items].sort((a, b) => compareCodes(a.code, b.code));
    
    if (!chapterOrder || chapterOrder.length === 0) {
      return naturallySorted;
    }

    const orderMap = new Map<string, number>();
    chapterOrder.forEach((id, idx) => orderMap.set(id, idx));

    const getSortIndex = (item: ReportItem) => {
      const id = getItemId(item);
      return orderMap.has(id) ? orderMap.get(id)! : 9999;
    };

    const rootItems: typeof items = [];
    const childrenMap = new Map<string, typeof items>();
    const itemCodes = new Set(naturallySorted.map(i => i.code));

    naturallySorted.forEach(item => {
      const parts = item.code.split('.').filter(Boolean);
      let parentCode = parts.slice(0, -1).join('.');
      
      while (parentCode && !itemCodes.has(parentCode)) {
        const pParts = parentCode.split('.');
        pParts.pop();
        parentCode = pParts.join('.');
      }
      
      if (parentCode) {
        if (!childrenMap.has(parentCode)) childrenMap.set(parentCode, []);
        childrenMap.get(parentCode)!.push(item);
      } else {
        rootItems.push(item);
      }
    });

    const sortByOrder = (a: ReportItem, b: ReportItem) => {
      const idxA = getSortIndex(a);
      const idxB = getSortIndex(b);
      if (idxA !== idxB) return idxA - idxB;
      return compareCodes(a.code, b.code);
    };

    rootItems.sort(sortByOrder);
    childrenMap.forEach(children => children.sort(sortByOrder));

    const result: typeof items = [];
    const traverse = (item: ReportItem) => {
      result.push(item);
      const children = childrenMap.get(item.code);
      if (children) {
        children.forEach(traverse);
      }
    };

    rootItems.forEach(traverse);
    return result;
  }, [items, chapterOrder]);

  const getStatus = (item: ReportItem): ReportStatusItem => {
    const children = sortedItems.filter(i => i.code.startsWith(item.code + '.') && i.code !== item.code);
    const hasChildren = children.length > 0;

    if (hasChildren) {
      const parentPartsLength = item.code.split('.').filter(Boolean).length;
      const directChildren = children.filter(c => c.code.split('.').filter(Boolean).length === parentPartsLength + 1);
      const targets = directChildren.length > 0 ? directChildren : children;

      let sumProgress = 0;
      let count = 0;
      targets.forEach(child => {
        const childSt = getStatus(child);
        sumProgress += childSt.progress;
        count++;
      });

      const progress = count > 0 ? Math.round(sumProgress / count) : 0;
      const id = getItemId(item);
      const saved = reportStatus[id] || {};
      
      let status: ReportStatusType = 'not_started';
      if (progress >= 100) status = 'completed';
      else if (progress >= 75) status = 'review';
      else if (progress > 0) status = 'drafting';

      return {
        status,
        progress,
        author: saved.author || '',
        targetPages: saved.targetPages || item.defaultPages || '',
        note: saved.note || '',
        driveLink: saved.driveLink || ''
      };
    }

    const id = getItemId(item);
    if (reportStatus[id]) return reportStatus[id];
    if (item.analizler && item.analizler.length > 0) {
      const auto = computeAutoStatusForAnalyses(item.analizler, analysisStatuses);
      return {
        status: auto.status,
        progress: auto.progress,
        author: '',
        targetPages: item.defaultPages || '',
        note: '',
        driveLink: ''
      };
    }
    const st = item.defaultStatus || 'not_started';
    const defProg = STATUS_PROGRESS_MAP[st] ?? 0;
    return {
      status: st,
      progress: defProg,
      author: '',
      targetPages: item.defaultPages || '',
      note: '',
      driveLink: ''
    };
  };

  // Chapter overall statistics
  const totalCount = sortedItems.length;
  const completedCount = sortedItems.filter(item => {
    const st = getStatus(item);
    return st.status === 'completed' || st.progress === 100;
  }).length;

  const sumProgress = sortedItems.reduce((acc, item) => {
    const st = getStatus(item);
    const itemProg = typeof st.progress === 'number' ? st.progress : (STATUS_PROGRESS_MAP[st.status] ?? 0);
    return acc + itemProg;
  }, 0);
  const chapterProgress = totalCount > 0 ? Math.round(sumProgress / totalCount) : 0;

  // Analysis statistics in this chapter
  let totalAnalysesCount = 0;
  let completedAnalysesCount = 0;
  sortedItems.forEach(item => {
    (item.analizler || []).forEach(an => {
      totalAnalysesCount++;
      const currentSt = analysisStatuses[an.id] || an.status;
      if (currentSt === 'Tamamlandı') completedAnalysesCount++;
    });
  });

  const toggleDetail = (id: string) => {
    setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleGroupCollapse = (code: string) => {
    setCollapsedGroups(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const handleExpandAll = () => {
    setCollapsedGroups({});
  };

  const handleCollapseAll = () => {
    const allParents: Record<string, boolean> = {};
    sortedItems.forEach(item => {
      const hasKids = sortedItems.some(i => i.code.startsWith(item.code + '.') && i.code !== item.code);
      if (hasKids) {
        allParents[item.code] = true;
      }
    });
    setCollapsedGroups(allParents);
  };

  // Check if all parent nodes are currently collapsed
  const parentItems = useMemo(() => {
    return sortedItems.filter(item => sortedItems.some(i => i.code.startsWith(item.code + '.') && i.code !== item.code));
  }, [sortedItems]);

  const hasParentNodes = parentItems.length > 0;
  const areAllParentsCollapsed = hasParentNodes && parentItems.every(p => !!collapsedGroups[p.code]);

  // --- Handlers for Drag & Drop Reordering ---
  const handleItemReorder = (draggedId: string, targetId: string, position: 'top' | 'bottom') => {
    if (!onReorderItems || draggedId === targetId) return;
    const currentList = sortedItems.map(it => getItemId(it));
    const fromIdx = currentList.indexOf(draggedId);
    const toIdx = currentList.indexOf(targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const newList = [...currentList];
    const [movedItem] = newList.splice(fromIdx, 1);
    const targetCurrentIdx = newList.indexOf(targetId);
    const insertIdx = position === 'top' ? targetCurrentIdx : targetCurrentIdx + 1;
    newList.splice(insertIdx, 0, movedItem);

    onReorderItems(chapter.num, newList);
  };

  // --- Handlers for Headings Actions ---
  const handleOpenAddHeading = (degree: 2 | 3 | 4, parentCode: string, parentTitle: string) => {
    setHeadingModalState({
      isOpen: true,
      mode: 'add',
      degree,
      parentCode,
      parentTitle
    });
  };

  const handleOpenEditHeading = (item: ReportItem & { customId?: string; isCustom?: boolean }) => {
    const deg = getHeadingDegree(item.code);
    const degree = (deg === 4 ? 4 : deg === 3 ? 3 : 2) as 2 | 3 | 4;
    const parts = item.code.split('.').filter(Boolean);
    const parentCode = parts.length > 1 ? parts.slice(0, -1).join('.') : chapter.num;
    setHeadingModalState({
      isOpen: true,
      mode: 'edit',
      degree,
      parentCode,
      parentTitle: degree === 2 ? chapter.title : (item.level2 || item.level3 || ''),
      targetItem: item
    });
  };

  const handleOpenDeleteHeading = (item: ReportItem & { customId?: string; isCustom?: boolean }) => {
    const degree = getHeadingDegree(item.code);
    const children = sortedItems.filter(i => i.code.startsWith(item.code + '.') && i.code !== item.code);
    setConfirmModalState({
      isOpen: true,
      title: `${degree}. Derece Başlığı Silmek İstiyor musunuz?`,
      message: children.length > 0
        ? `"${item.code} ${item.title}" başlıklı bölüm ve altındaki ${children.length} alt başlık kaldırılacaktır.`
        : `"${item.code} ${item.title}" başlıklı bölüm kaldırılacaktır.`,
      variant: 'danger',
      confirmLabel: 'Evet, Sil',
      onConfirm: () => {
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
        onDeleteSubSection(item);
      }
    });
  };

  // --- Handlers for Spatial Analysis Actions ---
  const handleOpenAddAnalysis = (item: ReportItem & { customId?: string; isCustom?: boolean }) => {
    setAnalysisModalState({
      isOpen: true,
      mode: 'add',
      targetItem: item
    });
  };

  const handleOpenEditAnalysis = (item: ReportItem & { customId?: string; isCustom?: boolean }, an: AnalysisItem) => {
    setAnalysisModalState({
      isOpen: true,
      mode: 'edit',
      targetItem: item,
      targetAnalysis: an
    });
  };

  const handleOpenDeleteAnalysis = (item: ReportItem & { customId?: string; isCustom?: boolean }, an: AnalysisItem) => {
    setConfirmModalState({
      isOpen: true,
      title: 'Mekânsal Analizi Silmek İstiyor musunuz?',
      message: `"${an.name}" analizi "${item.code} ${item.title}" başlığı altından kaldırılacaktır.`,
      variant: 'danger',
      confirmLabel: 'Evet, Sil',
      onConfirm: () => {
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
        onDeleteAnalysis(item, an.id);
      }
    });
  };

  const allItemCodes = useMemo(() => items.map(i => i.code), [items]);

  return (
    <div className={`chapter-card ${isCollapsed ? 'collapsed' : ''}`} id={`chapter-${chapter.num}`}>
      {/* Chapter Head */}
      <div className="chapter-head" onClick={() => onToggleCollapse(chapter.num)}>
        <div className="chapter-head-left">
          <span className="chapter-num-badge">{chapter.num}.</span>
          <div className="chapter-titles-wrap">
            <h3 className="chapter-title">{chapter.title}</h3>
            {totalAnalysesCount > 0 && (
              <div className="chapter-meta-line">
                <span className="chapter-analysis-badge">
                  {completedAnalysesCount}/{totalAnalysesCount} CBS Analiz
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="chapter-head-right" onClick={e => e.stopPropagation()}>
          <div className="chapter-mini-progress">
            <span className="ch-prog-text">
              <b>{completedCount}/{totalCount}</b> Tamamlandı (%{chapterProgress})
            </span>
            <div className="chapter-mini-track">
              <span 
                style={{ 
                  width: `${chapterProgress}%`, 
                  background: chapterProgress === 100 ? 'var(--ok)' : 'var(--brand)' 
                }}
              />
            </div>
          </div>

          {hasParentNodes && (
            <button
              type="button"
              className="btn-text-subtle"
              title={areAllParentsCollapsed ? 'Tüm Alt Başlıkları Aç' : 'Tüm Alt Başlıkları Daralt'}
              onClick={(e) => {
                e.stopPropagation();
                if (areAllParentsCollapsed) {
                  handleExpandAll();
                } else {
                  handleCollapseAll();
                }
              }}
            >
              {areAllParentsCollapsed ? 'Tümünü Genişlet' : 'Tümünü Daralt'}
            </button>
          )}

          <button
            type="button"
            className="btn-add-sub-minimal"
            title={`${chapter.num}. Bölüm altına 2. Düzey yeni başlık ekle`}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenAddHeading(2, chapter.num, chapter.title);
            }}
          >
            <Plus size={12} />
            <span>2. Düzey Başlık Ekle</span>
          </button>

          <button 
            type="button"
            className={`btn-text-subtle ${chapterNotes ? 'has-content' : ''}`}
            title="Bölüm Genel Notları & Koordinasyon Yönergesi"
            onClick={() => setShowChapterNote(prev => !prev)}
          >
            {chapterNotes ? 'Notlar (Dolu)' : 'Notlar'}
          </button>

          <button
            type="button"
            className="btn-text-subtle btn-collapse-toggle"
            title={isCollapsed ? 'Bölümü Genişlet' : 'Bölümü Daralt'}
            onClick={() => onToggleCollapse(chapter.num)}
          >
            {isCollapsed ? 'Aç' : 'Kapat'}
          </button>
        </div>
      </div>

      {/* Chapter Overall Note Drawer */}
      {showChapterNote && (
        <div className="chapter-general-note-bar">
          <div className="cgn-header">
            <span className="cgn-title">
              {chapter.num}. Bölüm Genel Koordinasyon & Metodoloji Notları
            </span>
            <button 
              type="button" 
              className="cgn-close" 
              onClick={() => setShowChapterNote(false)}
            >
              Kapat
            </button>
          </div>
          <textarea
            className="cgn-textarea"
            placeholder="Bu ana bölüm için genel araştırma kapsamı, veri kaynakları veya çalışma takvimi notlarını girin…"
            value={chapterNotes || ''}
            onChange={e => onUpdateChapterNotes(chapter.num, e.target.value)}
          />
        </div>
      )}

      {/* Chapter Body Table */}
      {!isCollapsed && (
        <div className="chapter-body">
          <div className="table-responsive">
            <table className="report-table">
              <thead>
                <tr>
                  <th style={{ width: '110px' }}>Kod</th>
                  <th>Başlık / Alt Başlıklar</th>
                  <th style={{ width: '210px' }}>Yazım Durumu</th>
                  <th style={{ width: '130px' }}>İlerleme</th>
                  <th style={{ width: '160px' }}>Sorumlu Yazar</th>
                  <th style={{ width: '90px', textAlign: 'right' }}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item, idx) => {
                  const id = getItemId(item);
                  const st = getStatus(item);
                  const isDetailOpen = !!expandedDetails[id];
                  const analyses = item.analizler || [];
                  const analysesDoneCount = analyses.filter(a => (analysisStatuses[a.id] || a.status) === 'Tamamlandı').length;
                  
                  const parts = item.code.split('.').filter(Boolean);
                  const depth = parts.length; // e.g. 2 for 1.1, 3 for 2.1.1, 4 for 2.5.1.1
                  const degree = (depth >= 4 ? 4 : depth === 3 ? 3 : 2) as 2 | 3 | 4;

                  const children = sortedItems.filter(i => i.code.startsWith(item.code + '.') && i.code !== item.code);
                  const hasChildren = children.length > 0;
                  const isCollapsedNode = !!collapsedGroups[item.code];

                  // Check if any ancestor is collapsed
                  let isHiddenByParent = false;
                  for (let i = depth - 1; i >= 2; i--) {
                    const ancestorCode = parts.slice(0, i).join('.');
                    if (collapsedGroups[ancestorCode]) {
                      isHiddenByParent = true;
                      break;
                    }
                  }

                  if (isHiddenByParent) return null;

                  // Indentation calculation
                  const indentPx = Math.max(0, (depth - 2)) * 22;

                  return (
                    <React.Fragment key={item.id || item.code || idx}>
                      <tr 
                        draggable={true}
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.dataTransfer.setData('text/plain', id);
                          setDraggedItemId(id);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (draggedItemId && draggedItemId !== id) {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            const relY = e.clientY - rect.top;
                            setDragOverItemId(id);
                            setDragOverPos(relY < rect.height / 2 ? 'top' : 'bottom');
                          }
                        }}
                        onDragLeave={() => {
                          if (dragOverItemId === id) setDragOverItemId(null);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (draggedItemId && draggedItemId !== id) {
                            handleItemReorder(draggedItemId, id, dragOverPos);
                          }
                          setDraggedItemId(null);
                          setDragOverItemId(null);
                        }}
                        onDragEnd={() => {
                          setDraggedItemId(null);
                          setDragOverItemId(null);
                        }}
                        className={`sub-section-row ${hasChildren ? (depth === 2 ? 'is-parent-level2 has-children-row' : 'is-parent-level3 has-children-row') : (depth === 4 ? 'level-4-leaf' : 'is-leaf-row')} ${st.progress === 100 || st.status === 'completed' ? 'row-completed' : ''} ${isDetailOpen ? 'row-expanded-active' : ''} ${(analyses.length > 0 || hasChildren) ? 'is-clickable' : ''} ${draggedItemId === id ? 'report-row-is-dragging' : ''} ${dragOverItemId === id ? (dragOverPos === 'top' ? 'report-row-drag-over-top' : 'report-row-drag-over-bottom') : ''}`}
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          if (target.closest('select, input, textarea, button, a, .row-drag-handle, .tree-toggle-btn')) return;
                          if (hasChildren) {
                            toggleGroupCollapse(item.code);
                          } else if (analyses.length > 0) {
                            toggleDetail(id);
                          }
                        }}
                      >
                        {/* Kod */}
                        <td className="sec-code" style={{ paddingLeft: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {indentPx > 0 && (
                              <div style={{ width: `${indentPx}px`, flexShrink: 0 }} />
                            )}
                            <span className="row-drag-handle" title="Başlığı sürükleyerek sırasını değiştirin">
                              <GripVertical size={13} />
                            </span>
                            <div style={{ width: '20px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                              {hasChildren ? (
                                <button
                                  type="button"
                                  className="tree-toggle-btn"
                                  title={isCollapsedNode ? 'Alt başlıkları genişlet' : 'Alt başlıkları daralt'}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleGroupCollapse(item.code);
                                  }}
                                >
                                  {isCollapsedNode ? '▶' : '▼'}
                                </button>
                              ) : (
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: depth === 4 ? '#94A3B8' : '#CBD5E1', display: 'inline-block' }} />
                              )}
                            </div>
                            <span className={`sec-code-badge ${hasChildren ? (depth === 2 ? 'level-2-badge parent-heading-badge' : 'level-3-badge parent-heading-badge') : (depth === 4 ? 'level-4-code-badge' : depth === 3 ? 'sub-code-badge' : 'main-code-badge')}`}>
                              {item.code}
                            </span>
                          </div>
                        </td>

                        {/* Başlık */}
                        <td className="sec-title-cell">
                          <div className="sub-title-main">
                            <span className={`sub-title-text ${hasChildren ? (depth === 2 ? 'parent-heading-text' : 'level-3-parent-text') : ''}`}>
                              {item.title}
                            </span>
                            {hasChildren && (
                              <span className="inline-children-count-badge">
                                {children.length} Alt Başlık
                              </span>
                            )}
                            {analyses.length > 0 && (
                              <span
                                className={`inline-analysis-count-badge ${isDetailOpen ? 'is-open' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleDetail(id);
                                }}
                              >
                                {analysesDoneCount}/{analyses.length} CBS Analiz {isDetailOpen ? '▲' : '▼'}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Yazım Durumu */}
                        <td>
                          {hasChildren ? (
                            <div className="auto-status-indicator" title="Bu başlığın durumu, alt başlıkların tamamlanma durumuna göre otomatik hesaplanmaktadır.">
                              <span className={`report-status-badge st-${st.status}`}>
                                {getStatusLabel(st.status)}
                              </span>
                              <span className="auto-status-subtext">Otomatik Hesaplanan</span>
                            </div>
                          ) : (
                            <select
                              className={`report-status-select st-${st.status}`}
                              value={st.status}
                              onChange={e => {
                                const newSt = e.target.value as ReportStatusType;
                                const autoProg = STATUS_PROGRESS_MAP[newSt] ?? 0;
                                onUpdateStatus(id, { 
                                  status: newSt,
                                  progress: autoProg
                                });
                              }}
                            >
                              {REPORT_STATUS_KEYS.map(k => (
                                <option key={k} value={k}>{getStatusLabel(k)}</option>
                              ))}
                            </select>
                          )}
                        </td>

                        {/* İlerleme Sütunu */}
                        <td>
                          <div className="progress-display-cell">
                            <div className="pdc-bar-wrap">
                              <span className="pdc-percent">%{st.progress ?? (STATUS_PROGRESS_MAP[st.status] ?? 0)}</span>
                              <div className="pdc-track">
                                <div 
                                  className="pdc-fill" 
                                  style={{ 
                                    width: `${st.progress ?? (STATUS_PROGRESS_MAP[st.status] ?? 0)}%`,
                                    background: 
                                      (st.progress >= 98 || st.status === 'completed') ? 'var(--ok)' :
                                      st.progress >= 70 ? 'var(--status-review)' :
                                      st.progress >= 30 ? 'var(--status-draft)' : 'var(--line-strong)'
                                  }} 
                                />
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Sorumlu Yazar */}
                        <td>
                          <div className="author-input-wrapper">
                            <input
                              type="text"
                              className="author-input"
                              placeholder="Yazar ekle…"
                              value={st.author || ''}
                              onChange={e => onUpdateStatus(id, { author: e.target.value })}
                            />
                          </div>
                        </td>

                        {/* İşlem Sütunu */}
                        <td className="row-actions-cell">
                          <div className="row-actions-group" onClick={e => e.stopPropagation()}>
                            {/* 3. Düzey Alt Başlık Ekleme (2. Derece Başlıklarda) */}
                            {degree === 2 && (
                              <button
                                type="button"
                                className="action-symbol-btn add-symbol-btn"
                                title={`${item.code} altına 3. Düzey alt başlık ekle`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenAddHeading(3, item.code, item.title);
                                }}
                              >
                                <Plus size={13} />
                              </button>
                            )}

                            {/* 4. Düzey Alt Başlık Ekleme (3. Derece Başlıklarda) */}
                            {degree === 3 && (
                              <button
                                type="button"
                                className="action-symbol-btn add-symbol-btn"
                                title={`${item.code} altına 4. Düzey alt başlık ekle`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenAddHeading(4, item.code, item.title);
                                }}
                              >
                                <Plus size={13} />
                              </button>
                            )}

                            {/* Düzenleme */}
                            <button
                              type="button"
                              className="action-symbol-btn edit-symbol-btn"
                              title="Başlığı Düzenle"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEditHeading(item);
                              }}
                            >
                              <Pencil size={13} />
                            </button>

                            {/* Silme */}
                            <button
                              type="button"
                              className="action-symbol-btn delete-circle-btn"
                              title="Başlığı Kaldır"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDeleteHeading(item);
                              }}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Detail Drawer: CBS & Mekânsal Analizler */}
                      {isDetailOpen && (
                        <tr className="note-expanded-row">
                          <td colSpan={6}>
                            <div className="detail-expanded-panel compact-analyses-panel">
                              <div className="dep-top-bar">
                                <div className="dep-top-left">
                                  <span className="dep-code-pill">{item.code}</span>
                                  <h4 className="dep-item-title">{item.title} — CBS & Mekânsal Analizler</h4>
                                </div>
                                <div className="dep-top-right">
                                  <button
                                    type="button"
                                    className="btn-add-analysis-minimal"
                                    title="Bu başlık altına yeni mekânsal analiz ekle"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenAddAnalysis(item);
                                    }}
                                  >
                                    <Plus size={12} />
                                    <span>Analiz Ekle</span>
                                  </button>
                                  <span className="dep-analyses-count-pill">
                                    {analysesDoneCount} / {analyses.length} Tamamlandı
                                  </span>
                                </div>
                              </div>

                              <div className="dep-analyses-grid-compact">
                                {analyses.length === 0 ? (
                                  <div style={{ padding: '10px', color: 'var(--muted)', fontSize: '12px' }}>
                                    Bu başlık altında kayıtlı CBS analizi bulunmuyor. Yeni analiz eklemek için "Analiz Ekle" butonunu kullanabilirsiniz.
                                  </div>
                                ) : (
                                  analyses.map(an => {
                                    const currentStatus = analysisStatuses[an.id] || an.status;
                                    return (
                                      <div 
                                        key={an.id} 
                                        className={`dep-analysis-card status-${currentStatus}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const nextSt = 
                                            currentStatus === 'Tamamlandı' ? 'Devam Ediyor' :
                                            currentStatus === 'Devam Ediyor' ? 'Başlamadı' :
                                            currentStatus === 'Başlamadı' ? 'Tamamlandı' : 'Tamamlandı';
                                          onUpdateAnalysisStatus(an.id, nextSt);
                                        }}
                                        title="Durumu değiştirmek için tıklayın"
                                      >
                                        <div className="dac-head">
                                          <span className="dac-name">{an.name}</span>
                                          <div className="dac-actions-wrap" onClick={e => e.stopPropagation()}>
                                            <button
                                              type="button"
                                              className="an-action-btn edit-an-btn"
                                              title="Analizi Düzenle"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenEditAnalysis(item, an);
                                              }}
                                            >
                                              <Pencil size={11} />
                                            </button>
                                            <button
                                              type="button"
                                              className="an-action-btn delete-an-circle-btn"
                                              title="Analizi Kaldır"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenDeleteAnalysis(item, an);
                                              }}
                                            >
                                              <X size={11} />
                                            </button>
                                            <span className={`dac-badge st-${currentStatus}`}>{currentStatus}</span>
                                          </div>
                                        </div>
                                        {an.category && (
                                          <span className="dac-category">{an.category}</span>
                                        )}
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Heading Add / Edit Modal */}
      <HeadingModal
        isOpen={headingModalState.isOpen}
        mode={headingModalState.mode}
        degree={headingModalState.degree}
        parentCode={headingModalState.parentCode}
        parentTitle={headingModalState.parentTitle}
        initialData={
          headingModalState.targetItem
            ? {
                code: headingModalState.targetItem.code,
                title: headingModalState.targetItem.title,
                defaultPages: headingModalState.targetItem.defaultPages,
                icerikOzeti: headingModalState.targetItem.icerikOzeti,
                sartnameUyum: headingModalState.targetItem.sartnameUyum
              }
            : undefined
        }
        existingCodes={allItemCodes}
        onClose={() => setHeadingModalState(prev => ({ ...prev, isOpen: false }))}
        onSubmit={(formData) => {
          if (headingModalState.mode === 'add') {
            onAddSubSection(chapter.num, formData, headingModalState.degree, headingModalState.parentCode);
          } else if (headingModalState.targetItem) {
            onEditSubSection(headingModalState.targetItem, formData);
          }
        }}
      />

      {/* Analysis Add / Edit Modal */}
      <AnalysisModal
        isOpen={analysisModalState.isOpen}
        mode={analysisModalState.mode}
        itemCode={analysisModalState.targetItem?.code}
        itemTitle={analysisModalState.targetItem?.title}
        initialData={
          analysisModalState.targetAnalysis
            ? {
                name: analysisModalState.targetAnalysis.name,
                category: analysisModalState.targetAnalysis.category,
                status: (analysisStatuses[analysisModalState.targetAnalysis.id] || analysisModalState.targetAnalysis.status)
              }
            : undefined
        }
        onClose={() => setAnalysisModalState(prev => ({ ...prev, isOpen: false }))}
        onSubmit={(analysisData) => {
          if (!analysisModalState.targetItem) return;
          if (analysisModalState.mode === 'add') {
            onAddAnalysis(analysisModalState.targetItem, analysisData);
          } else if (analysisModalState.targetAnalysis) {
            onEditAnalysis(analysisModalState.targetItem, analysisModalState.targetAnalysis.id, analysisData);
          }
        }}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModalState.isOpen}
        title={confirmModalState.title}
        message={confirmModalState.message}
        variant={confirmModalState.variant}
        confirmLabel={confirmModalState.confirmLabel || 'Onayla'}
        onConfirm={confirmModalState.onConfirm}
        onCancel={() => setConfirmModalState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
