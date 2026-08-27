import React from 'react';

interface ReportStatsProps {
  stats: {
    total: number;
    totalProgress: number;
    totalEstimatedPages: number;
    authorsCount: number;
    totalAnalyses: number;
    completedAnalyses: number;
    draftingAnalyses: number;
    completed: number;
    review: number;
    drafting: number;
    notStarted: number;
  };
}

export const ReportStats: React.FC<ReportStatsProps> = ({ stats }) => {
  return (
    <div className="report-stats-grid">
      {/* Genel İlerleme Card */}
      <div className="stat-card main-stat-card">
        <div className="sc-header">
          <span className="sc-label">Genel Rapor İlerlemesi</span>
          <span className="sc-badge">Plan 2050</span>
        </div>
        <div className="sc-main-val">
          <span className="sc-percent">%{stats.totalProgress}</span>
          <div className="sc-ratio">
            <b>{stats.completed}</b> / {stats.total} Başlık Tamamlandı
          </div>
        </div>
        <div className="sc-progress-bar">
          <div 
            className="sc-progress-fill" 
            style={{ width: `${stats.totalProgress}%` }}
          />
        </div>
      </div>

      {/* Tamamlandı (%100) */}
      <div className="stat-card">
        <div className="sc-header">
          <span className="sc-label">Tamamlandı</span>
        </div>
        <div className="sc-val text-emerald-700" style={{ color: 'var(--ok)' }}>{stats.completed}</div>
        <div className="sc-sub">%100 Nihai Hale Gelen</div>
      </div>

      {/* İncelemede (%75) */}
      <div className="stat-card">
        <div className="sc-header">
          <span className="sc-label">İncelemede</span>
        </div>
        <div className="sc-val text-blue-700" style={{ color: '#2563EB' }}>{stats.review}</div>
        <div className="sc-sub">%75 Revizyon / Kontrol</div>
      </div>

      {/* Taslak / Yazılıyor (%50) */}
      <div className="stat-card">
        <div className="sc-header">
          <span className="sc-label">Taslak / Yazılıyor</span>
        </div>
        <div className="sc-val text-amber-700" style={{ color: '#D97706' }}>{stats.drafting}</div>
        <div className="sc-sub">%25-%50 Yazım Aşamasında</div>
      </div>

      {/* Başlanmadı (%0) */}
      <div className="stat-card">
        <div className="sc-header">
          <span className="sc-label">Başlanmadı</span>
        </div>
        <div className="sc-val text-slate-500" style={{ color: '#64748B' }}>{stats.notStarted}</div>
        <div className="sc-sub">%0 Sıradaki Bölümler</div>
      </div>

      {/* Mekânsal Analiz Süreci */}
      <div className="stat-card">
        <div className="sc-header">
          <span className="sc-label">CBS & Analizler</span>
        </div>
        <div className="sc-val" style={{ color: '#475569' }}>
          {stats.completedAnalyses}/{stats.totalAnalyses}
        </div>
        <div className="sc-sub">
          {stats.totalAnalyses > 0 ? `%${Math.round((stats.completedAnalyses / stats.totalAnalyses) * 100)} Tamamlandı` : 'Analiz Tanımlanmadı'}
        </div>
      </div>
    </div>
  );
};
