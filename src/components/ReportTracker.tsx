import React, { useState, useMemo } from 'react';
import { REPORT_DATA, REPORT_STATUS_LABEL } from '../reportData';

export type ReportStatusItem = {
  status: 'not_started' | 'drafting' | 'review' | 'completed';
  progress: number; // 0 to 100
  author: string;
  targetPages?: string;
  note: string;
};

interface ReportTrackerProps {
  activeGroup: string;
  setActiveGroup: (g: string) => void;
  reportStatus: Record<string, ReportStatusItem>;
  onUpdateReportStatus: (id: string, updates: Partial<ReportStatusItem>) => void;
}

export default function ReportTracker({
  activeGroup,
  setActiveGroup,
  reportStatus,
  onUpdateReportStatus
}: ReportTrackerProps) {
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [visibleNotes, setVisibleNotes] = useState<Record<string, boolean>>({});

  const currentGroupData = REPORT_DATA[activeGroup] || REPORT_DATA.ulasim;

  const getItemId = (g: string, chapterNum: string, subCode?: string) => {
    return subCode ? `report|${g}|${chapterNum}|${subCode}` : `report|${g}|${chapterNum}`;
  };

  const getStatus = (id: string): ReportStatusItem => {
    return reportStatus[id] || {
      status: 'not_started',
      progress: 0,
      author: '',
      targetPages: '',
      note: ''
    };
  };

  // Group level stats
  const groupStats = useMemo(() => {
    const stats: Record<string, { total: number; completed: number; drafting: number; review: number; notStarted: number; totalProgress: number }> = {};

    Object.keys(REPORT_DATA).forEach(g => {
      let total = 0;
      let completed = 0;
      let drafting = 0;
      let review = 0;
      let notStarted = 0;
      let sumProgress = 0;

      REPORT_DATA[g].chapters.forEach(ch => {
        if (ch.subSections && ch.subSections.length > 0) {
          ch.subSections.forEach(sub => {
            total++;
            const id = getItemId(g, ch.num, sub.code);
            const item = getStatus(id);
            if (item.status === 'completed') completed++;
            else if (item.status === 'drafting') drafting++;
            else if (item.status === 'review') review++;
            else notStarted++;
            sumProgress += (item.progress || (item.status === 'completed' ? 100 : 0));
          });
        } else {
          total++;
          const id = getItemId(g, ch.num);
          const item = getStatus(id);
          if (item.status === 'completed') completed++;
          else if (item.status === 'drafting') drafting++;
          else if (item.status === 'review') review++;
          else notStarted++;
          sumProgress += (item.progress || (item.status === 'completed' ? 100 : 0));
        }
      });

      const avgProgress = total > 0 ? Math.round(sumProgress / total) : 0;
      stats[g] = { total, completed, drafting, review, notStarted, totalProgress: avgProgress };
    });

    return stats;
  }, [reportStatus]);

  const activeStats = groupStats[activeGroup] || { total: 0, completed: 0, drafting: 0, review: 0, notStarted: 0, totalProgress: 0 };

  const toggleChapter = (chapterNum: string) => {
    setCollapsedChapters(prev => ({
      ...prev,
      [chapterNum]: !prev[chapterNum]
    }));
  };

  return (
    <div className={`report-view-container theme-${activeGroup}`}>
      {/* Header Banner */}
      <div className="report-header-banner">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2>Rapor Çatkısı ve İlerleme Takibi</h2>
            <p>Plan 2050 — Ulaşım, Teknik Altyapı ve Lojistik rapor bölümlerinin taslak, yazım ve inceleme süreçleri</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="search-box" style={{ minWidth: '220px', background: 'var(--panel)', border: '1px solid var(--line-strong)' }}>
              <input
                type="text"
                placeholder="Rapor bölümü veya yazar ara…"
                style={{ color: 'var(--ink)' }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '12px',
                fontFamily: "'IBM Plex Sans', sans-serif",
                border: '1px solid var(--line-strong)',
                borderRadius: '2px',
                background: 'var(--panel)',
                cursor: 'pointer'
              }}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="not_started">Başlanmadı</option>
              <option value="drafting">Taslak / Yazılıyor</option>
              <option value="review">İncelemede / Revizyon</option>
              <option value="completed">Tamamlandı</option>
            </select>
          </div>
        </div>
      </div>

      {/* Group Navigation Bar */}
      <div className="group-nav-bar">
        {Object.keys(REPORT_DATA).map(g => {
          const grp = REPORT_DATA[g];
          const st = groupStats[g] || { total: 0, completed: 0, totalProgress: 0 };
          const isActive = g === activeGroup;

          return (
            <button
              key={g}
              className={`group-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveGroup(g)}
            >
              <span>{grp.label} Raporu</span>
              <span className="grp-prog-badge">%{st.totalProgress} ({st.completed}/{st.total})</span>
            </button>
          );
        })}
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="report-stats-grid">
        <div className="stat-card">
          <div className="sc-label">Genel İlerleme</div>
          <div className="sc-val" style={{ color: 'var(--brand)' }}>%{activeStats.totalProgress}</div>
          <div className="sec-progress" style={{ margin: '8px 0 0' }}>
            <div className="track" style={{ width: '100%', maxWidth: 'none', height: '6px' }}>
              <span style={{ width: `${activeStats.totalProgress}%`, background: 'var(--ok)' }}></span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="sc-label">Toplam Bölüm</div>
          <div className="sc-val">{activeStats.total}</div>
          <div className="sc-sub">9 Ana Çatı Başlığı</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid var(--ok)' }}>
          <div className="sc-label">Tamamlandı</div>
          <div className="sc-val" style={{ color: 'var(--ok)' }}>{activeStats.completed}</div>
          <div className="sc-sub">Nihai hale gelen</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid #1C7ED6' }}>
          <div className="sc-label">İncelemede</div>
          <div className="sc-val" style={{ color: '#1C7ED6' }}>{activeStats.review}</div>
          <div className="sc-sub">Revizyonda / Kontrol</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid #F59F00' }}>
          <div className="sc-label">Yazılıyor</div>
          <div className="sc-val" style={{ color: '#F59F00' }}>{activeStats.drafting}</div>
          <div className="sc-sub">Taslak aşamasında</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid #868E96' }}>
          <div className="sc-label">Başlanmadı</div>
          <div className="sc-val" style={{ color: '#868E96' }}>{activeStats.notStarted}</div>
          <div className="sc-sub">Sıradaki bölümler</div>
        </div>
      </div>

      {/* Chapters Breakdown */}
      <div className="chapters-list">
        {currentGroupData.chapters.map(chapter => {
          const isCollapsed = !!collapsedChapters[chapter.num];
          const hasSubSections = chapter.subSections && chapter.subSections.length > 0;

          // Filter sub-sections if search or status filter active
          let visibleSubSections = chapter.subSections || [];
          if (searchTerm) {
            const sLower = searchTerm.toLowerCase();
            visibleSubSections = visibleSubSections.filter(sub => {
              const id = getItemId(activeGroup, chapter.num, sub.code);
              const st = getStatus(id);
              return (
                sub.code.toLowerCase().includes(sLower) ||
                sub.title.toLowerCase().includes(sLower) ||
                (st.author && st.author.toLowerCase().includes(sLower)) ||
                (st.note && st.note.toLowerCase().includes(sLower))
              );
            });
          }
          if (statusFilter !== 'all') {
            visibleSubSections = visibleSubSections.filter(sub => {
              const id = getItemId(activeGroup, chapter.num, sub.code);
              return getStatus(id).status === statusFilter;
            });
          }

          // Single chapter item check if no subSections
          const singleChapterId = getItemId(activeGroup, chapter.num);
          const singleItem = getStatus(singleChapterId);
          let showSingleChapter = true;
          if (!hasSubSections) {
            if (searchTerm) {
              const sLower = searchTerm.toLowerCase();
              showSingleChapter = (
                chapter.title.toLowerCase().includes(sLower) ||
                (singleItem.author && singleItem.author.toLowerCase().includes(sLower)) ||
                (singleItem.note && singleItem.note.toLowerCase().includes(sLower))
              );
            }
            if (statusFilter !== 'all') {
              showSingleChapter = showSingleChapter && singleItem.status === statusFilter;
            }
          }

          // Chapter progress calculation
          let chTotal = hasSubSections ? chapter.subSections.length : 1;
          let chDone = 0;
          if (hasSubSections) {
            chDone = chapter.subSections.filter(s => getStatus(getItemId(activeGroup, chapter.num, s.code)).status === 'completed').length;
          } else {
            chDone = singleItem.status === 'completed' ? 1 : 0;
          }
          const chPct = chTotal > 0 ? Math.round((chDone / chTotal) * 100) : 0;

          if (hasSubSections && visibleSubSections.length === 0 && (searchTerm || statusFilter !== 'all')) {
            return null;
          }
          if (!hasSubSections && !showSingleChapter) {
            return null;
          }

          return (
            <div key={chapter.num} className="chapter-card">
              <div className="chapter-head" onClick={() => toggleChapter(chapter.num)}>
                <div className="chapter-head-left">
                  <span className="chapter-num-badge">{chapter.num}. BÖLÜM</span>
                  <span className="chapter-title">{chapter.title}</span>
                </div>
                <div className="chapter-head-right">
                  <div className="chapter-mini-progress">
                    <span>{chDone}/{chTotal} Tamamlandı</span>
                    <div className="chapter-mini-track">
                      <span style={{ width: `${chPct}%` }}></span>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', transform: isCollapsed ? 'rotate(-90deg)' : 'none', transition: 'transform 0.15s ease' }}>
                    &#x25be;
                  </span>
                </div>
              </div>

              {!isCollapsed && (
                <table className="report-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Kod</th>
                      <th>Bölüm Başlığı</th>
                      <th style={{ width: '160px' }}>Yazım Durumu</th>
                      <th style={{ width: '150px' }}>İlerleme (%)</th>
                      <th style={{ width: '130px' }}>Sorumlu / Yazar</th>
                      <th style={{ width: '80px' }}>Sayfa</th>
                      <th style={{ width: '50px', textAlign: 'center' }}>Not</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasSubSections ? (
                      visibleSubSections.map(sub => {
                        const id = getItemId(activeGroup, chapter.num, sub.code);
                        const st = getStatus(id);
                        const isNoteOpen = !!visibleNotes[id];

                        return (
                          <React.Fragment key={sub.code}>
                            <tr>
                              <td className="sec-code">{sub.code}</td>
                              <td className="sec-title">{sub.title}</td>
                              <td>
                                <select
                                  className={`report-status-select st-${st.status}`}
                                  value={st.status}
                                  onChange={e => onUpdateReportStatus(id, { status: e.target.value as any })}
                                >
                                  {Object.keys(REPORT_STATUS_LABEL).map(k => (
                                    <option key={k} value={k}>{REPORT_STATUS_LABEL[k]}</option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <div className="progress-pill-group">
                                  {[0, 25, 50, 75, 100].map(p => (
                                    <button
                                      key={p}
                                      className={`progress-pill-btn ${st.progress === p ? 'active' : ''}`}
                                      onClick={() => {
                                        onUpdateReportStatus(id, {
                                          progress: p,
                                          status: p === 100 ? 'completed' : p > 0 ? (st.status === 'not_started' ? 'drafting' : st.status) : st.status
                                        });
                                      }}
                                    >
                                      {p}%
                                    </button>
                                  ))}
                                </div>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="author-input"
                                  placeholder="Yazar adı…"
                                  value={st.author || ''}
                                  onChange={e => onUpdateReportStatus(id, { author: e.target.value })}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="author-input"
                                  style={{ width: '60px' }}
                                  placeholder="Örn: 8 sf"
                                  value={st.targetPages || ''}
                                  onChange={e => onUpdateReportStatus(id, { targetPages: e.target.value })}
                                />
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <button
                                  className={`note-btn ${st.note ? 'has' : ''}`}
                                  title="Not veya Taslak Detayı"
                                  onClick={() => setVisibleNotes(prev => ({ ...prev, [id]: !prev[id] }))}
                                >
                                  &#x270e;
                                </button>
                              </td>
                            </tr>
                            {isNoteOpen && (
                              <tr className="note-row">
                                <td colSpan={7}>
                                  <div style={{ padding: '4px 0' }}>
                                    <textarea
                                      placeholder="Bu bölümle ilgili taslak notları, Drive / belge bağlantıları, açıklama veya revizyon notlarını yazın…"
                                      value={st.note || ''}
                                      onChange={e => onUpdateReportStatus(id, { note: e.target.value })}
                                      style={{
                                        width: '100%',
                                        minHeight: '60px',
                                        padding: '8px 10px',
                                        border: '1px solid var(--line-strong)',
                                        borderRadius: '2px',
                                        fontSize: '12px'
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      // Single item for Chapter 8 or 9
                      (() => {
                        const id = singleChapterId;
                        const st = singleItem;
                        const isNoteOpen = !!visibleNotes[id];

                        return (
                          <React.Fragment key={chapter.num}>
                            <tr>
                              <td className="sec-code">{chapter.num}.0</td>
                              <td className="sec-title">{chapter.title}</td>
                              <td>
                                <select
                                  className={`report-status-select st-${st.status}`}
                                  value={st.status}
                                  onChange={e => onUpdateReportStatus(id, { status: e.target.value as any })}
                                >
                                  {Object.keys(REPORT_STATUS_LABEL).map(k => (
                                    <option key={k} value={k}>{REPORT_STATUS_LABEL[k]}</option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <div className="progress-pill-group">
                                  {[0, 25, 50, 75, 100].map(p => (
                                    <button
                                      key={p}
                                      className={`progress-pill-btn ${st.progress === p ? 'active' : ''}`}
                                      onClick={() => {
                                        onUpdateReportStatus(id, {
                                          progress: p,
                                          status: p === 100 ? 'completed' : p > 0 ? (st.status === 'not_started' ? 'drafting' : st.status) : st.status
                                        });
                                      }}
                                    >
                                      {p}%
                                    </button>
                                  ))}
                                </div>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="author-input"
                                  placeholder="Yazar adı…"
                                  value={st.author || ''}
                                  onChange={e => onUpdateReportStatus(id, { author: e.target.value })}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="author-input"
                                  style={{ width: '60px' }}
                                  placeholder="Örn: 12 sf"
                                  value={st.targetPages || ''}
                                  onChange={e => onUpdateReportStatus(id, { targetPages: e.target.value })}
                                />
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <button
                                  className={`note-btn ${st.note ? 'has' : ''}`}
                                  title="Not veya Taslak Detayı"
                                  onClick={() => setVisibleNotes(prev => ({ ...prev, [id]: !prev[id] }))}
                                >
                                  &#x270e;
                                </button>
                              </td>
                            </tr>
                            {isNoteOpen && (
                              <tr className="note-row">
                                <td colSpan={7}>
                                  <div style={{ padding: '4px 0' }}>
                                    <textarea
                                      placeholder="Bu bölümle ilgili taslak notları, Drive / belge bağlantıları, açıklama veya revizyon notlarını yazın…"
                                      value={st.note || ''}
                                      onChange={e => onUpdateReportStatus(id, { note: e.target.value })}
                                      style={{
                                        width: '100%',
                                        minHeight: '60px',
                                        padding: '8px 10px',
                                        border: '1px solid var(--line-strong)',
                                        borderRadius: '2px',
                                        fontSize: '12px'
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })()
                    )}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
