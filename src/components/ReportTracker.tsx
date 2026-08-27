import React, { useState, useMemo } from 'react';
import { 
  REPORT_CHAPTERS_MAP, 
  REPORT_DATA_RAW,
  ReportChapterGroup, 
  ReportItem,
  STATUS_PROGRESS_MAP,
  ReportStatusType,
  computeAutoStatusForAnalyses
} from '../reportData';
import type { 
  ReportStatusItem, 
  CustomSubSection, 
  SectionOverride 
} from '../syncService';
import { ChapterCard } from './ChapterCard';
import { ReportStats } from './ReportStats';
import { ExportModal } from './ExportModal';
import { HeadingFormData } from './HeadingModal';

interface ReportTrackerProps {
  activeGroupKey: string;
  reportStatus: Record<string, ReportStatusItem>;
  customSubSections: Record<string, CustomSubSection[]>;
  sectionOverrides: Record<string, SectionOverride>;
  analysisStatuses: Record<string, 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede'>;
  chapterNotes: Record<string, string>;
  chapterOrders: Record<string, string[]>;
  onUpdateStatus: (id: string, updates: Partial<ReportStatusItem>) => void;
  onUpdateAnalysisStatus: (analysisId: string, status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede') => void;
  onAddSubSection: (chapterNum: string, formData: HeadingFormData, degree: 2 | 3 | 4, parentCode?: string) => void;
  onEditSubSection: (item: ReportItem & { customId?: string; isCustom?: boolean }, updates: HeadingFormData) => void;
  onDeleteSubSection: (item: ReportItem & { customId?: string; isCustom?: boolean }) => void;
  onEditSubSectionGroup: (chapterNum: string, groupCode: string, updates: { code: string; title: string }) => void;
  onDeleteSubSectionGroup: (chapterNum: string, groupCode: string) => void;
  onAddAnalysis: (item: ReportItem & { customId?: string; isCustom?: boolean }, data: { name: string; category?: string; status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede' }) => void;
  onEditAnalysis: (item: ReportItem & { customId?: string; isCustom?: boolean }, analysisId: string, updates: { name: string; category?: string; status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede' }) => void;
  onDeleteAnalysis: (item: ReportItem & { customId?: string; isCustom?: boolean }, analysisId: string) => void;
  onUpdateChapterNotes: (chapterNum: string, note: string) => void;
  onReorderItems: (chapterNum: string, newOrder: string[]) => void;
  onResetAll: () => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

export const ReportTracker: React.FC<ReportTrackerProps> = ({
  activeGroupKey,
  reportStatus,
  customSubSections,
  sectionOverrides,
  analysisStatuses,
  chapterNotes,
  chapterOrders,
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
  onReorderItems,
  onResetAll,
  searchTerm = '',
  onSearchChange
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'review' | 'drafting' | 'not_started'>('all');
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const groupName = REPORT_DATA_RAW[activeGroupKey]?.label || 'Ulaşım';
  const defaultChapters: ReportChapterGroup[] = REPORT_CHAPTERS_MAP[activeGroupKey] || [];

  // Merge default chapters with custom subsections and overrides
  const chaptersWithCustoms = useMemo(() => {
    return defaultChapters.map(ch => {
      const customs = (customSubSections[`${activeGroupKey}_${ch.num}`] || []).map(cs => ({
        id: cs.id,
        customId: cs.id,
        isCustom: true,
        level1: `${ch.num}. ${ch.title}`,
        level1Num: ch.num,
        level2: cs.level2,
        level3: cs.level3,
        level4: cs.level4,
        code: cs.code,
        title: cs.title,
        defaultPages: cs.defaultPages || '6-10 sf',
        icerikOzeti: cs.scope || '',
        sartnameUyum: cs.sartnameUyum || '',
        defaultStatus: 'not_started' as const,
        analizler: cs.analizler || []
      }));

      // Apply overrides to default items
      const overriddenDefaults = (ch.items || [])
        .filter(item => {
          const overrideKey = `${activeGroupKey}_${item.id || item.code}`;
          return !sectionOverrides[overrideKey]?.deleted;
        })
        .map(item => {
          const overrideKey = `${activeGroupKey}_${item.id || item.code}`;
          const over = sectionOverrides[overrideKey];
          if (!over) return item;
          return {
            ...item,
            code: over.code || item.code,
            title: over.title || item.title,
            level2: over.level2 || item.level2,
            level3: over.level3 || item.level3,
            defaultPages: over.defaultPages || item.defaultPages,
            icerikOzeti: over.scope || item.icerikOzeti,
            sartnameUyum: over.sartnameUyum || item.sartnameUyum,
            analizler: over.analizler || item.analizler
          };
        });

      return {
        ...ch,
        items: [...overriddenDefaults, ...customs]
      };
    });
  }, [defaultChapters, customSubSections, sectionOverrides, activeGroupKey]);

  // Handle collapse/expand toggle for individual chapter
  const toggleChapterCollapse = (chapterNum: string) => {
    setCollapsedMap(prev => ({
      ...prev,
      [chapterNum]: !prev[chapterNum]
    }));
  };

  // Toggle all chapters collapsed/expanded
  const handleToggleAllChapters = (collapse: boolean) => {
    const nextMap: Record<string, boolean> = {};
    chaptersWithCustoms.forEach(ch => {
      nextMap[ch.num] = collapse;
    });
    setCollapsedMap(nextMap);
  };

  // Filter items based on active search and status filter
  const filteredChapters = useMemo(() => {
    return chaptersWithCustoms.map(ch => {
      const filteredItems = ch.items.filter(item => {
        // Search filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchCode = item.code.toLowerCase().includes(term);
          const matchTitle = item.title.toLowerCase().includes(term);
          const matchLevel1 = (item.level1 || '').toLowerCase().includes(term);
          const matchLevel2 = (item.level2 || '').toLowerCase().includes(term);
          const matchAuthor = (reportStatus[item.id]?.author || '').toLowerCase().includes(term);
          const matchAnalyses = (item.analizler || []).some(a => a.name.toLowerCase().includes(term));
          if (!matchCode && !matchTitle && !matchLevel1 && !matchLevel2 && !matchAuthor && !matchAnalyses) {
            return false;
          }
        }

        // Status filter
        if (activeFilter !== 'all') {
          const st = reportStatus[item.id] || { status: item.defaultStatus || 'not_started' };
          if (activeFilter === 'completed' && st.status !== 'completed' && st.progress !== 100) return false;
          if (activeFilter === 'review' && st.status !== 'review') return false;
          if (activeFilter === 'drafting' && st.status !== 'drafting') return false;
          if (activeFilter === 'not_started' && st.status !== 'not_started') return false;
        }

        return true;
      });

      return {
        ...ch,
        items: filteredItems
      };
    }).filter(ch => ch.items.length > 0);
  }, [chaptersWithCustoms, searchTerm, activeFilter, reportStatus]);

  // Overall Statistics Calculations
  const stats = useMemo(() => {
    let total = 0;
    let completed = 0;
    let review = 0;
    let drafting = 0;
    let notStarted = 0;
    let sumProgress = 0;
    let totalPages = 0;
    const authorsSet = new Set<string>();

    let totalAnalyses = 0;
    let completedAnalyses = 0;
    let draftingAnalyses = 0;

    // Helper to evaluate an item's progress dynamically (matching ChapterCard logic)
    const getItemStatus = (item: ReportItem, chapterItems: ReportItem[]): { status: ReportStatusType; progress: number; author: string; targetPages: string } => {
      const children = chapterItems.filter(i => i.code.startsWith(item.code + '.') && i.code !== item.code);
      if (children.length > 0) {
        const parentPartsLength = item.code.split('.').filter(Boolean).length;
        const directChildren = children.filter(c => c.code.split('.').filter(Boolean).length === parentPartsLength + 1);
        const targets = directChildren.length > 0 ? directChildren : children;

        let sum = 0;
        let cnt = 0;
        targets.forEach(child => {
          const childSt = getItemStatus(child, chapterItems);
          sum += childSt.progress;
          cnt++;
        });

        const progress = cnt > 0 ? Math.round(sum / cnt) : 0;
        const saved = reportStatus[item.id] || {};
        let status: ReportStatusType = 'not_started';
        if (progress >= 100) status = 'completed';
        else if (progress >= 75) status = 'review';
        else if (progress > 0) status = 'drafting';

        return {
          status,
          progress,
          author: saved.author || '',
          targetPages: saved.targetPages || item.defaultPages || ''
        };
      }

      const saved = reportStatus[item.id];
      if (saved) return saved as any;

      if (item.analizler && item.analizler.length > 0) {
        const auto = computeAutoStatusForAnalyses(item.analizler, analysisStatuses);
        return {
          status: auto.status,
          progress: auto.progress,
          author: '',
          targetPages: item.defaultPages || ''
        };
      }

      const st = (item.defaultStatus as ReportStatusType) || 'not_started';
      const defProg = STATUS_PROGRESS_MAP[st] ?? 0;
      return {
        status: st,
        progress: defProg,
        author: '',
        targetPages: item.defaultPages || ''
      };
    };

    chaptersWithCustoms.forEach(ch => {
      ch.items.forEach(item => {
        const st = getItemStatus(item, ch.items);
        
        const parts = item.code.split('.').filter(Boolean);
        const isLevel2 = parts.length === 2; // e.g. "2.1"

        // Overall progress calculations are driven strictly by 2nd-degree headings
        if (isLevel2) {
          total++;
          sumProgress += st.progress;

          if (st.status === 'completed' || st.progress === 100) completed++;
          else if (st.status === 'review' || st.progress >= 75) review++;
          else if (st.status === 'drafting' || st.progress > 0) drafting++;
          else notStarted++;
        }

        if (st.author && st.author.trim()) {
          authorsSet.add(st.author.trim());
        }

        // Accumulate pages across all leaves that don't have children to avoid double-counting 
        // if we are fully hierarchical, but to be safe we follow previous pattern:
        // Or better: only count pages for items that don't have children (leaf nodes).
        const childrenCount = ch.items.filter(i => i.code.startsWith(item.code + '.') && i.code !== item.code).length;
        if (childrenCount === 0) {
          const pagesStr = st.targetPages || item.defaultPages || '';
          const match = pagesStr.match(/\d+/g);
          if (match && match.length > 0) {
            totalPages += parseInt(match[match.length - 1], 10);
          } else {
            totalPages += 8;
          }
        }

        // Analysis counts
        (item.analizler || []).forEach(an => {
          totalAnalyses++;
          const anSt = analysisStatuses[an.id] || an.status;
          if (anSt === 'Tamamlandı') completedAnalyses++;
          else if (anSt === 'Devam Ediyor') draftingAnalyses++;
        });
      });
    });

    const totalProgress = total > 0 ? Math.round(sumProgress / total) : 0;

    return {
      total,
      totalProgress,
      totalEstimatedPages: totalPages,
      authorsCount: authorsSet.size,
      totalAnalyses,
      completedAnalyses,
      draftingAnalyses,
      completed,
      review,
      drafting,
      notStarted
    };
  }, [chaptersWithCustoms, reportStatus, analysisStatuses]);

  return (
    <div className="report-tracker-container" id="report-tracker-container">
      {/* Top Controls Bar */}
      <div className="rt-top-bar">
        <div className="rt-top-left">
          <div className="rt-filter-tabs">
            <button 
              type="button"
              className={`rt-filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Tüm Başlıklar ({stats.total})
            </button>
            <button 
              type="button"
              className={`rt-filter-tab st-completed ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Tamamlandı ({stats.completed})
            </button>
            <button 
              type="button"
              className={`rt-filter-tab st-review ${activeFilter === 'review' ? 'active' : ''}`}
              onClick={() => setActiveFilter('review')}
            >
              İncelemede ({stats.review})
            </button>
            <button 
              type="button"
              className={`rt-filter-tab st-drafting ${activeFilter === 'drafting' ? 'active' : ''}`}
              onClick={() => setActiveFilter('drafting')}
            >
              Taslak ({stats.drafting})
            </button>
            <button 
              type="button"
              className={`rt-filter-tab st-not_started ${activeFilter === 'not_started' ? 'active' : ''}`}
              onClick={() => setActiveFilter('not_started')}
            >
              Başlanmadı ({stats.notStarted})
            </button>
          </div>
        </div>

        <div className="rt-top-right">
          <button 
            type="button" 
            className="btn-toolbar-action"
            onClick={() => handleToggleAllChapters(false)}
            title="Tüm Bölümleri Aç"
          >
            Tümünü Aç
          </button>
          <button 
            type="button" 
            className="btn-toolbar-action"
            onClick={() => handleToggleAllChapters(true)}
            title="Tüm Bölümleri Kapat"
          >
            Tümünü Kapat
          </button>
          <button 
            type="button" 
            className="btn-toolbar-action btn-export-highlight"
            onClick={() => setIsExportModalOpen(true)}
            title="Dışa Aktar, Yazdır & Çatkı Verilerini Paylaş"
          >
            Dışa Aktar & Paylaş
          </button>
        </div>
      </div>

      {/* Executive Progress & Stats Grid */}
      <ReportStats stats={stats} />

      {/* Chapters List */}
      <div className="chapters-list-flow">
        {filteredChapters.length === 0 ? (
          <div className="empty-results-box">
            <h4>Kriterlere Uygun Başlık Bulunamadı</h4>
            <p>Arama filtrenizi temizleyebilir veya "Tüm Başlıklar" sekmesine dönebilirsiniz.</p>
            {onSearchChange && searchTerm && (
              <button 
                type="button" 
                className="btn-clear-filter"
                onClick={() => onSearchChange('')}
              >
                Aramayı Temizle
              </button>
            )}
          </div>
        ) : (
          filteredChapters.map(chapter => (
            <ChapterCard
              key={`${activeGroupKey}_${chapter.num}`}
              chapter={chapter}
              items={chapter.items}
              chapterOrder={chapterOrders[`${activeGroupKey}_${chapter.num}`]}
              reportStatus={reportStatus}
              analysisStatuses={analysisStatuses}
              chapterNotes={chapterNotes[`${activeGroupKey}_${chapter.num}`] || ''}
              isCollapsed={!!collapsedMap[chapter.num]}
              onToggleCollapse={toggleChapterCollapse}
              onUpdateStatus={onUpdateStatus}
              onUpdateAnalysisStatus={onUpdateAnalysisStatus}
              onAddSubSection={(chNum, formData, deg, parentCode) => 
                onAddSubSection(`${activeGroupKey}_${chNum}`, formData, deg, parentCode)
              }
              onEditSubSection={onEditSubSection}
              onDeleteSubSection={onDeleteSubSection}
              onEditSubSectionGroup={(chNum, grpCode, updates) => 
                onEditSubSectionGroup(`${activeGroupKey}_${chNum}`, grpCode, updates)
              }
              onDeleteSubSectionGroup={(chNum, grpCode) => 
                onDeleteSubSectionGroup(`${activeGroupKey}_${chNum}`, grpCode)
              }
              onAddAnalysis={onAddAnalysis}
              onEditAnalysis={onEditAnalysis}
              onDeleteAnalysis={onDeleteAnalysis}
              onUpdateChapterNotes={(chNum, note) => 
                onUpdateChapterNotes(`${activeGroupKey}_${chNum}`, note)
              }
              onReorderItems={(chNum, newOrder) => 
                onReorderItems(`${activeGroupKey}_${chNum}`, newOrder)
              }
            />
          ))
        )}
      </div>

      {/* Export & Print Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        reportStatus={reportStatus}
        analysisStatuses={analysisStatuses}
        chapterNotes={chapterNotes}
        customSubSections={customSubSections}
        onResetAll={onResetAll}
        chapters={chaptersWithCustoms}
        groupName={groupName}
      />
    </div>
  );
};
