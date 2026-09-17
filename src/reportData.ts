export type ReportStatusType = 'not_started' | 'drafting' | 'review' | 'completed';

export interface AnalysisItem {
  id: string;
  name: string;
  category?: string;
  status: 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede';
}

export interface ReportStatusItem {
  status: ReportStatusType;
  progress: number;
  author?: string;
  targetPages?: string;
  note?: string;
  driveLink?: string;
}

export interface ReportItem {
  id: string;
  level1?: string;
  level1Num?: string;
  level2?: string;
  level3?: string;
  level4?: string;
  code: string;
  title: string;
  sartnameUyum?: string;
  icerikOzeti?: string;
  defaultPages?: string;
  defaultStatus?: ReportStatusType;
  analizler?: AnalysisItem[];
}

export interface ReportSubSection {
  id?: string;
  code: string;
  title: string;
  level2?: string;
  level3?: string;
  level4?: string;
  defaultPages?: string;
  scope?: string;
  sartnameUyum?: string;
  analizler?: AnalysisItem[];
}

export interface ReportChapter {
  num: string;
  title: string;
  subSections: ReportSubSection[];
  items?: ReportItem[];
}

export interface ReportChapterGroup {
  num: string;
  title: string;
  items: ReportItem[];
}

export const REPORT_STATUS_LABEL: Record<ReportStatusType, string> = {
  not_started: 'Başlanmadı',
  drafting: 'Taslak / Yazılıyor',
  review: 'İncelemede / Revizyon',
  completed: 'Tamamlandı'
};

export const STATUS_PROGRESS_MAP: Record<ReportStatusType, number> = {
  not_started: 0,
  drafting: 50,
  review: 75,
  completed: 100
};

export const REPORT_STATUS_KEYS: ReportStatusType[] = ['not_started', 'drafting', 'review', 'completed'];

export function getStatusLabel(statusKey: string): string {
  if (statusKey in REPORT_STATUS_LABEL) {
    return REPORT_STATUS_LABEL[statusKey as ReportStatusType];
  }
  return statusKey || 'Başlanmadı';
}

export function computeAutoStatusForAnalyses(
  analizler: AnalysisItem[],
  analysisStatuses: Record<string, 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede'>
): { status: ReportStatusType; progress: number } {
  if (!analizler || analizler.length === 0) {
    return { status: 'not_started', progress: 0 };
  }

  let total = analizler.length;
  let done = 0;
  let inProgress = 0;
  let inReview = 0;

  analizler.forEach(a => {
    const st = analysisStatuses[a.id] || a.status;
    if (st === 'Tamamlandı') done++;
    else if (st === 'Devam Ediyor') inProgress++;
    else if (st === 'İncelemede') inReview++;
  });

  const progress = Math.round(((done * 100) + (inReview * 75) + (inProgress * 40)) / total);

  let status: ReportStatusType = 'not_started';
  if (done === total) {
    status = 'completed';
  } else if (progress >= 75) {
    status = 'review';
  } else if (progress > 0) {
    status = 'drafting';
  }

  return { status, progress };
}

// Convert chapter with subSections to ChapterGroup with items
function makeItems(groupKey: string, chapterNum: string, chapterTitle: string, subs: ReportSubSection[]): ReportItem[] {
  if (!subs || subs.length === 0) {
    return [
      {
        id: `${groupKey}_${chapterNum}_0`,
        level1: `${chapterNum}. ${chapterTitle}`,
        level1Num: chapterNum,
        code: `${chapterNum}.0`,
        title: chapterTitle,
        defaultPages: '8-12 sf',
        defaultStatus: 'not_started',
        analizler: []
      }
    ];
  }

  return subs.map(s => {
    const parts = s.code.split('.');
    let level2 = s.level2;
    let level3 = s.level3;
    let level4 = s.level4;

    if (!level2 && parts.length >= 2) {
      level2 = `${parts[0]}.${parts[1]}`;
    }
    if (!level3 && parts.length >= 3) {
      level3 = `${parts[0]}.${parts[1]}.${parts[2]}`;
    }
    if (!level4 && parts.length >= 4) {
      level4 = `${parts[0]}.${parts[1]}.${parts[2]}.${parts[3]}`;
    }

    return {
      id: s.id || `${groupKey}_${s.code.replace(/\./g, '_')}`,
      level1: `${chapterNum}. ${chapterTitle}`,
      level1Num: chapterNum,
      level2,
      level3,
      level4,
      code: s.code,
      title: s.title,
      defaultPages: s.defaultPages || '6-10 sf',
      icerikOzeti: s.scope || '',
      sartnameUyum: s.sartnameUyum || '',
      defaultStatus: 'not_started',
      analizler: s.analizler || []
    };
  });
}

/**
 * Non-destructive migration function that strictly adheres to the user directives:
 * 1. Takes an automatic timestamped backup of reportStatus into localStorage and metadata.
 * 2. Does NOT transfer data between different working groups.
 * 3. Preserves semantic identity:
 *    - 5.2 (previously 'Patlama ve Endüstriyel Kazalar') is mapped to 5.3 ('Patlama ve Endüstriyel Kazalar').
 *    - The new 5.2 ('Yangın') is kept completely unassigned/fresh, avoiding incorrect progress inheritance.
 *    - 6.3 (previously 'Kıtlık ve Kaynak Stresi') is mapped to 6.4 ('Kıtlık ve Kaynak Stresi').
 *    - The new 6.3 ('Fırtına ve Aşırı Hava Olayları') is kept completely unassigned/fresh.
 * 4. Never deletes unreferenced items (such as ulasim_4_1_1 or ulasim_7_2_6); keeps them preserved in status storage and archive.
 * 5. Preserves all authors, notes, drive links, status types, and completion percentages.
 */
export function migrateReportStatus(
  currentStatus: Record<string, ReportStatusItem>
): { migrated: Record<string, ReportStatusItem>; hadChanges: boolean; backupKey?: string } {
  if (!currentStatus || typeof currentStatus !== 'object') {
    return { migrated: {}, hadChanges: false };
  }

  // Check if this browser has already completed the v3 structural migration
  if (typeof window !== 'undefined' && localStorage.getItem('report_status_v3_migrated') === 'true') {
    return { migrated: currentStatus, hadChanges: false };
  }

  let hadChanges = false;
  const migrated: Record<string, ReportStatusItem> = { ...currentStatus };

  // 1. Create a safe, restorable backup before applying any key shifts
  const backupTimestamp = new Date().toISOString();
  const backupKey = `report_status_backup_${backupTimestamp}`;
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(backupKey, JSON.stringify(currentStatus));
      localStorage.setItem('report_status_latest_backup', JSON.stringify({
        timestamp: backupTimestamp,
        data: currentStatus
      }));
    }
  } catch (e) {
    console.warn('Backup write to localStorage warning:', e);
  }

  // 2. Perform semantic preservation for each working group individually
  const groups = ['ulasim', 'lojistik', 'teknikaltyapi'];
  groups.forEach(grp => {
    // Check 5.2 -> 5.3 shift (Patlama ve Endüstriyel Kazalar)
    const old52 = migrated[`${grp}_5_2`];
    if (old52 && (old52.progress > 0 || old52.author || old52.note || (old52.status && old52.status !== 'not_started'))) {
      if (!migrated[`${grp}_5_3`]) {
        // Move to new position 5.3 representing the exact same study
        migrated[`${grp}_5_3`] = { ...old52 };
        // Archive under historical key as well so it is permanently preserved
        migrated[`${grp}_5_2_archived_pre_v3`] = { ...old52 };
        // Clear 5.2 so new topic 'Yangın' starts clean without inheriting unrelated work
        delete migrated[`${grp}_5_2`];
        hadChanges = true;
      }
    }

    // Check 6.3 -> 6.4 shift (Kıtlık ve Kaynak Stresi)
    const old63 = migrated[`${grp}_6_3`];
    if (old63 && (old63.progress > 0 || old63.author || old63.note || (old63.status && old63.status !== 'not_started'))) {
      if (!migrated[`${grp}_6_4`]) {
        // Move to new position 6.4 representing the exact same study
        migrated[`${grp}_6_4`] = { ...old63 };
        // Archive under historical key as well
        migrated[`${grp}_6_3_archived_pre_v3`] = { ...old63 };
        // Clear 6.3 so new topic 'Fırtına ve Aşırı Hava Olayları' starts clean
        delete migrated[`${grp}_6_3`];
        hadChanges = true;
      }
    }
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('report_status_v3_migrated', 'true');
  }

  return { migrated, hadChanges, backupKey };
}

// Raw chapters for each group
export const REPORT_DATA_RAW: Record<string, { label: string; chapters: ReportChapter[] }> = {
  ulasim: {
    label: 'Ulaşım',
    chapters: [
      {
        num: '1',
        title: 'GİRİŞ',
        subSections: [
          { code: '1.1', title: 'Çalışmanın Amacı' },
          { code: '1.2', title: 'Kapsam' },
          { code: '1.3', title: 'Yöntem ve Analiz Yaklaşımı' }
        ]
      },
      {
        num: '2',
        title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        subSections: [
          { code: '2.1', title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler' },
          { code: '2.1.1', title: 'Yokohama ve Stratejisi Eylem Planı' },
          { code: '2.1.2', title: 'Hyogo Çerçeve Eylem Planı (2005–2015)' },
          { code: '2.1.3', title: 'Sendai Afet Risklerinin Azaltılması Çerçevesi (2015–2030)' },
          { code: '2.1.4', title: 'Birleşmiş Milletler İklim Değişikliği Çerçeve Sözleşmesi' },
          { code: '2.1.5', title: 'Kyoto Protokolü' },
          { code: '2.1.6', title: 'Engelli Hakları Sözleşmesi' },
          { code: '2.1.7', title: 'Tehlikeli Malların Karayoluyla Uluslararası Taşınmasına İlişkin Avrupa Anlaşması (ADR)' },
          { code: '2.1.8', title: 'Tehlikeli Malların Demiryoluyla Uluslararası Taşınmasına İlişkin Düzenlemeler (RID)' },
          { code: '2.1.9', title: 'TIR Karneleri Himayesinde Uluslararası Eşya Taşınmasına Dair Gümrük Sözleşmesi' },
          { code: '2.1.10', title: 'Paris Anlaşması' },
          { code: '2.1.11', title: 'Avrupa Yeşil Mutabakatı' },
          { code: '2.1.12', title: 'AB “Fit for 55” Paketi' },
          { code: '2.1.13', title: 'Sınırda Karbon Düzenleme Mekanizması (SKDM)' },
          { code: '2.1.14', title: 'AB Sürdürülebilir ve Akıllı Hareketlilik Stratejisi' },
          { code: '2.1.15', title: 'AB Ulaştırma Müktesebatı – Fasıl 14: Taşımacılık Politikası' },
          
          { code: '2.2', title: 'Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri' },
          { code: '2.2.1', title: 'On İkinci Kalkınma Planı (2024-2028)' },
          { code: '2.2.2', title: 'İklim Şurası Kararları' },
          { code: '2.2.3', title: 'Bütünleşik Kentsel Gelişme Stratejisi ve Eylem Planı' },
          { code: '2.2.4', title: 'Türkiye Afet Yönetimi Strateji Belgesi ve Eylem Planı (TAYSB)' },
          { code: '2.2.5', title: 'Türkiye Afet Risk Azaltma Planı (TARAP)' },
          { code: '2.2.6', title: 'Türkiye Afet Müdahale Planı (TAMP)' },
          { code: '2.2.7', title: 'Ulusal Deprem Stratejisi ve Eylem Planı' },
          { code: '2.2.8', title: 'Ulaştırma ve Lojistik Ana Planı 2053' },
          { code: '2.2.9', title: 'Bölgesel Gelişme Ulusal Stratejisi' },
          { code: '2.2.10', title: '2053 Uzun Dönemli İklim Stratejisi' },
          { code: '2.2.11', title: 'İklim Değişikliği Azaltım Stratejisi ve Eylem Planı (İDASEP)' },
          { code: '2.2.12', title: 'İklim Değişikliği Uyum Stratejisi ve Eylem Planı (İDUSEP)' },
          { code: '2.2.13', title: 'Enerji Verimliliği 2030 Stratejisi ve II. Ulusal Enerji Verimliliği Eylem Planı' },
          { code: '2.2.14', title: 'Marmara Bölgesi Mekânsal Gelişme Stratejik Çerçeve Belgesi' },
          { code: '2.2.15', title: 'Marmara Denizi Bütünleşik Stratejik Planı' },
          { code: '2.2.16', title: 'Sanayi Kuruluşlarının Afetlere Dirençli Hâle Getirilmesi: Marmara Bölgesi Uygulaması (RESMAR Projesi)' },
          
          { code: '2.3', title: 'İstanbul İli Stratejik Planlar ve Belgeler' },
          { code: '2.3.1', title: 'İstanbul Bölge Planı' },
          { code: '2.3.2', title: 'İBB Stratejik Planı 2025-2029' },
          { code: '2.3.3', title: 'İstanbul Vizyon 2050 Strateji Belgesi ve Eylem Planı' },
          { code: '2.3.4', title: 'İstanbul Deprem Master Planı (İDMP)' },
          { code: '2.3.5', title: 'İstanbul İl Afet Risk Azaltma Planı (İRAP)' },
          { code: '2.3.6', title: 'İstanbul Sismik Riskin Azaltılması ve Acil Durum Hazırlık Kapasitesinin Arttırılması Projesi (İSMEP)' },
          { code: '2.3.7', title: 'İstanbul İklim Değişikliği Eylem Planı (İİDEP)' },
          { code: '2.3.8', title: 'İstanbul Sürdürebilir Enerji ve İklim Eylem Planı (SECAP)' },
          { code: '2.3.9', title: 'İstanbul Deprem Seferberlik Planı' },
          
          { code: '2.4', title: 'İlgili Mekânsal Planlar' },
          { code: '2.4.1', title: 'İstanbul Çevre Düzeni Planı (1/100.000 – 2009)' },
          { code: '2.4.2', title: 'İstanbul Çevre Düzeni Planı Revizyon Taslağı (1/100.000 – 2015)' },
          
          { code: '2.5', title: 'Yasal-Yönetsel Çerçeve' },
          { code: '2.5.1', title: 'Yasal Çerçeve' },
          { code: '2.5.1.1', title: '4373 Sayılı Taşkın Sulara ve Su Baskınlarına Karşı Korunma Kanunu' },
          { code: '2.5.1.2', title: '7269 Sayılı Umumi Hayata Müessir Afetler Dolayısıyla Alınacak Tedbirlerle Yapılacak Yardımlara Dair Kanun' },
          { code: '2.5.1.3', title: '3194 Sayılı İmar Kanunu' },
          { code: '2.5.1.4', title: '4708 Sayılı Yapı Denetimi Hakkında Kanun' },
          { code: '2.5.1.5', title: '2918 Sayılı Karayolları Trafik Kanunu' },
          { code: '2.5.1.6', title: '4925 Sayılı Karayolu Taşıma Kanunu' },
          { code: '2.5.1.7', title: '6001 Sayılı Karayolları Genel Müdürlüğünün Teşkilat ve Görevleri Hakkında Kanun' },
          { code: '2.5.1.8', title: '6461 Sayılı Türkiye Demiryolu Ulaştırmasının Serbestleştirilmesi Hakkında Kanun' },
          { code: '2.5.1.9', title: '2920 Sayılı Türk Sivil Havacılık Kanunu' },
          { code: '2.5.1.10', title: '618 Limanlar Kanunu' },
          { code: '2.5.1.11', title: '5312 Sayılı Deniz Çevresinin Petrol ve Diğer Zararlı Maddelerle Kirlenmesinde Acil Durumlarda Müdahale ve Zararların Tazmini Esaslarına Dair Kanun' },
          { code: '2.5.1.12', title: '2872 Sayılı Çevre Kanunu' },
          { code: '2.5.1.13', title: '5216 Sayılı Büyükşehir Belediyesi Kanunu' },
          { code: '2.5.1.14', title: '5393 Sayılı Belediye Kanunu' },
          { code: '2.5.1.15', title: '6306 Sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun' },
          { code: '2.5.1.16', title: '4 Sayılı Cumhurbaşkanlığı Kararnamesi' },
          { code: '2.5.1.17', title: '49 Sayılı Coğrafi Bilgi Sistemleri Hakkında Cumhurbaşkanlığı Kararnamesi' },
          { code: '2.5.1.18', title: '7552 Sayılı İklim Kanunu' },
          { code: '2.5.2', title: 'Yönetsel Çerçeve' },
          
          { code: '2.6', title: 'Türkiye’de ve İstanbul\'da Tarihsel Süreçte Afetler ve İklim Krizleri' },
          { code: '2.6.1', title: 'Osmanlı Döneminde Afet Yönetimi ve İlk Düzenlemeler (1509–1923)' },
          { code: '2.6.2', title: 'Cumhuriyet Döneminde Afet Mevzuatının Oluşumu (1923–1959)' },
          { code: '2.6.3', title: 'Temeller ve Kurumsallaşma Dönemi (1959–1999)' },
          { code: '2.6.4', title: 'Risk Yönetimine Geçiş Süreci (1999–2009)' },
          { code: '2.6.5', title: 'Bütünleşik Afet Yönetimi Dönemi (2009–Günümüz)' }
        ]
      },
      {
        num: '3',
        title: 'ULAŞIM SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        subSections: [
          { code: '3.1', title: 'Kritik Karayolu Ulaşım Ağları' },
          { code: '3.2', title: 'Kritik Ulaşım Odakları (Aktarma Merkezi, İstasyonlar, İskeleler vb.)' },
          { code: '3.3', title: 'Kritik Toplu Taşıma Sistemi (Lastik Tekerlek, Raylı Sistem vb.)' }
        ]
      },
      {
        num: '4',
        title: 'DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '4.1', title: 'Deprem Riski' },
          { code: '4.2', title: 'Sel ve Taşkın Riski' },
          { code: '4.3', title: 'Heyelan' },
          { code: '4.4', title: 'Tsunami' }
        ]
      },
      {
        num: '5',
        title: 'İNSAN VE TEKONOLOJİ KAYNAKLI AFETLERİN ULAŞIM SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '5.1', title: 'Pandemi' },
          { code: '5.2', title: 'Yangın' },
          { code: '5.3', title: 'Patlama ve Endüstriyel Kazalar' },
          { code: '5.4', title: 'Savaş ve Terör Saldırıları' }
        ]
      },
      {
        num: '6',
        title: 'İKLİM KRİZİ ETKİLERİNİN ULAŞIM SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '6.1', title: 'Aşırı Sıcaklıklar' },
          { code: '6.2', title: 'Deniz Seviyesinin Yükselmesi' },
          { code: '6.3', title: 'Fırtına ve Aşırı Hava Olayları' },
          { code: '6.4', title: 'Kıtlık ve Kaynak Stresi' }
        ]
      },
      {
        num: '7',
        title: 'AFET VE İKLİM KRİZİ KARŞISINDA ULAŞIM ALTYAPISINA YÖNELİK ULUSLARARASI İYİ UYGULAMA ÖRNEKLERİ',
        subSections: [
          { code: '7.1', title: 'Afet ve İklim Dayanıklı Ulaşım Planlamasına Yönelik Küresel Yaklaşımlar' },
          { code: '7.2.1', title: 'Japonya: Ulaşımın “Hayat Hatları (Lifelines)” Olarak Ele Alınması', level2: '7.1' },
          { code: '7.2.2', title: 'New York City: Tahliye Odaklı Afet Ulaşımı', level2: '7.1' },
          { code: '7.2.3', title: 'Hollanda: Akıllı Ulaşım Sistemleri (ITS)', level2: '7.1' },
          { code: '7.2.4', title: 'Singapur: Taşkın ve Aşırı Yağışlara Karşı Dayanıklı Toplu Taşıma', level2: '7.1' },
          { code: '7.2.5', title: 'Yeni Zelanda: Kaikōura Depremi Sonrası Ulaşım Ağının Yeniden Yapılanması', level2: '7.1' },
          { code: '7.2.7', title: 'Sydney: İklim Değişikliğine Uyumlu Metro Sistemi', level2: '7.1' },
          { code: '7.2.8', title: 'Hanoi: Taşkın Riskine Karşı Metro İşletme ve Varlık Yönetimi', level2: '7.1' }
        ]
      },
      {
        num: '8',
        title: 'ÇOKLU RİSK BÖLGELERİ VE KÜMÜLATİF ETKİ DEĞERELENDİRMESİ',
        subSections: []
      },
      {
        num: '9',
        title: 'KAYNAKÇA',
        subSections: []
      }
    ]
  },
  teknikaltyapi: {
    label: 'Teknik Altyapı',
    chapters: [
      {
        num: '1',
        title: 'GİRİŞ',
        subSections: [
          { code: '1.1', title: 'Çalışmanın Amacı', defaultPages: 'sf. 15' },
          { code: '1.2', title: 'Kapsam', defaultPages: 'sf. 16' },
          { code: '1.3', title: 'Yöntem ve Analiz Yaklaşımı', defaultPages: 'sf. 18' }
        ]
      },
      {
        num: '2',
        title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        subSections: [
          // 2.1 İlgili Uluslararası Anlaşma ve Sözleşmeler
          { code: '2.1', title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 18' },
          { code: '2.1.1', title: 'Yokohama Stratejisi ve Eylem Planı', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 20' },
          { code: '2.1.2', title: 'Hyogo Çerçeve Eylem Planı (2005–2015)', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 21' },
          { code: '2.1.3', title: 'Sendai Afet Risklerinin Azaltılması Çerçevesi (2015–2030)', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 22' },
          { code: '2.1.4', title: 'AB Afet Dayanıklılık Hedefleri', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 23' },
          { code: '2.1.5', title: 'Birleşmiş Milletler İklim Değişikliği Çerçeve Sözleşmesi', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 24' },
          { code: '2.1.6', title: 'Kyoto Protokolü', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 25' },
          { code: '2.1.7', title: 'Paris Antlaşması', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 26' },
          { code: '2.1.8', title: "Barcelona Sözleşmesi (Akdeniz'in Deniz Ortamı ve Kıyı Bölgesinin Korunması Sözleşmesi)", level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 27' },
          { code: '2.1.9', title: 'AB Fit for 55', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 28' },
          { code: '2.1.10', title: 'Basel Sözleşmesi', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 29' },
          { code: '2.1.11', title: 'MARPOL 73/78 Sözleşmesi', level2: '2.1. İlgili Uluslararası Anlaşma ve Sözleşmeler', defaultPages: 'sf. 29' },

          // 2.2 Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri
          { code: '2.2', title: 'Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 30' },
          { code: '2.2.1', title: 'On İkinci Kalkınma Planı (2024–2028)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 32' },
          { code: '2.2.2', title: 'Türkiye Afet Yönetimi Strateji Belgesi ve Eylem Planı (TAYSB)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 33' },
          { code: '2.2.3', title: 'Türkiye Afet Risk Azaltma Planı (TARAP) (2022–2030)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 33' },
          { code: '2.2.4', title: 'Ulusal Deprem Stratejisi ve Eylem Planı (UDSEP-2023)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 34' },
          { code: '2.2.5', title: 'Ulusal Akıllı Şehirler Stratejisi ve Eylem Planı', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 35' },
          { code: '2.2.6', title: 'İklim Değişikliğine Uyum Stratejisi ve Eylem Planı (İDUSEP) (2024–2030)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 37' },
          { code: '2.2.7', title: 'İklim Değişikliği Azaltım Stratejisi ve Eylem Planı (İDASEP) (2024–2030)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 37' },
          { code: '2.2.8', title: 'Değişen İklime Uyum Çerçevesinde Su Verimliliği Strateji Belgesi ve Eylem Planı (2023–2033)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 38' },
          { code: '2.2.9', title: 'Ulusal Enerji Planı', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 39' },
          { code: '2.2.10', title: 'Ulusal Su Planı (2026–2035)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 40' },
          { code: '2.2.11', title: 'Su Yönetimi Özel İhtisas Komisyonu Raporu', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 41' },
          { code: '2.2.12', title: 'Enerji Verimliliği 2030 Stratejisi ve II. Ulusal Enerji Verimliliği Eylem Planı', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 42' },
          { code: '2.2.13', title: 'Ulusal Havza Yönetimi Stratejisi (UHYS)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 43' },
          { code: '2.2.14', title: 'Ulusal Genişbant Stratejisi ve Eylem Planı', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 44' },
          { code: '2.2.15', title: 'Bölgesel Gelişme Ulusal Stratejisi (2024–2028)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 45' },
          { code: '2.2.16', title: 'Marmara Bölgesi Mekânsal Gelişme Stratejik Çerçeve Belgesi', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 46' },
          { code: '2.2.17', title: 'Marmara Bölgesi Afet Risk Azaltma Planı (MARAP)', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 47' },
          { code: '2.2.18', title: 'Marmara Denizi Bütünleşik Stratejik Planı', level2: '2.2. Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri', defaultPages: 'sf. 48' },

          // 2.3 İstanbul İli Stratejik Planlar ve Belgeler
          { code: '2.3', title: 'İstanbul İli Stratejik Planlar ve Belgeler', defaultPages: 'sf. 49' },
          { code: '2.3.1', title: 'İBB Stratejik Planı (2025–2029)', level2: '2.3. İstanbul İli Stratejik Planlar ve Belgeler', defaultPages: 'sf. 49' },
          { code: '2.3.2', title: 'İstanbul Vizyon 2050 Strateji Belgesi ve Eylem Planı', level2: '2.3. İstanbul İli Stratejik Planlar ve Belgeler', defaultPages: 'sf. 51' },
          { code: '2.3.3', title: 'İstanbul Deprem Master Planı (İDMP)', level2: '2.3. İstanbul İli Stratejik Planlar ve Belgeler', defaultPages: 'sf. 52' },
          { code: '2.3.4', title: 'İstanbul İl Afet Risk Azaltma Planı (İRAP)', level2: '2.3. İstanbul İli Stratejik Planlar ve Belgeler', defaultPages: 'sf. 53' },
          { code: '2.3.5', title: 'İstanbul İklim Değişikliği Eylem Planı (İİDEP)', level2: '2.3. İstanbul İli Stratejik Planlar ve Belgeler', defaultPages: 'sf. 54' },
          { code: '2.3.6', title: 'İstanbul Sürdürülebilir Enerji ve İklim Eylem Planı (SECAP)', level2: '2.3. İstanbul İli Stratejik Planlar ve Belgeler', defaultPages: 'sf. 55' },
          { code: '2.3.7', title: 'İstanbul İçme Suyu ve Kanalizasyon Master Planı (İKMP)', level2: '2.3. İstanbul İli Stratejik Planlar ve Belgeler', defaultPages: 'sf. 55' },

          // 2.4 İlgili Mekânsal Planlar
          { code: '2.4', title: 'İlgili Mekânsal Planlar', defaultPages: 'sf. 58' },

          // 2.5 Yasal-Yönetsel Çerçeve
          { code: '2.5', title: 'Yasal-Yönetsel Çerçeve', defaultPages: 'sf. 58' },
          { code: '2.5.1', title: 'Yasal Çerçeve', level2: '2.5. Yasal-Yönetsel Çerçeve', defaultPages: 'sf. 59' },
          { code: '2.5.1.1', title: '4373 Sayılı Taşkın Sulara ve Su Baskınlarına Karşı Korunma Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 60' },
          { code: '2.5.1.2', title: '7269 Sayılı Umumi Hayata Müessir Afetler Dolayısıyla Alınacak Tedbirlerle Yapılacak Yardımlara Dair Kanun', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 61' },
          { code: '2.5.1.3', title: '6831 Sayılı Orman Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 61' },
          { code: '2.5.1.4', title: '6200 Sayılı Devlet Su İşleri Genel Müdürlüğünce Yürütülen Hizmetler Hakkında Kanun', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 62' },
          { code: '2.5.1.5', title: '2560 Sayılı İstanbul Su ve Kanalizasyon İdaresi Genel Müdürlüğü Kuruluş ve Görevleri Hakkında Kanun', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 62' },
          { code: '2.5.1.6', title: '3194 Sayılı İmar Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 63' },
          { code: '2.5.1.7', title: '4708 Sayılı Yapı Denetimi Hakkında Kanun', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 64' },
          { code: '2.5.1.8', title: '4646 Sayılı Doğal Gaz Piyasası Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 64' },
          { code: '2.5.1.9', title: '6446 Sayılı Elektrik Piyasası Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 65' },
          { code: '2.5.1.10', title: '5346 Sayılı Yenilenebilir Enerji Kaynaklarının Elektrik Enerjisi Üretimi Amaçlı Kullanımına İlişkin Kanun', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 65' },
          { code: '2.5.1.11', title: '5627 Sayılı Enerji Verimliliği Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 66' },
          { code: '2.5.1.12', title: '2872 Sayılı Çevre Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 67' },
          { code: '2.5.1.13', title: '5216 Sayılı Büyükşehir Belediyesi Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 67' },
          { code: '2.5.1.14', title: '5393 Sayılı Belediye Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 68' },
          { code: '2.5.1.15', title: '5902 Sayılı Afet ve Acil Durum Yönetimi Başkanlığının Teşkilat ve Görevleri Hakkında Kanun', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 68' },
          { code: '2.5.1.16', title: '6306 Sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 69' },
          { code: '2.5.1.17', title: '5809 Sayılı Elektronik Haberleşme Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 69' },
          { code: '2.5.1.18', title: '49 Sayılı Coğrafi Bilgi Sistemleri Hakkında Cumhurbaşkanlığı Kararnamesi', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 70' },
          { code: '2.5.1.19', title: '7545 Sayılı Siber Güvenlik Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 71' },
          { code: '2.5.1.20', title: '7552 Sayılı İklim Kanunu', level2: '2.5. Yasal-Yönetsel Çerçeve', level3: '2.5.1. Yasal Çerçeve', defaultPages: 'sf. 72' },
          { code: '2.5.2', title: 'Yönetsel Çerçeve', level2: '2.5. Yasal-Yönetsel Çerçeve', defaultPages: 'sf. 72' },

          // 2.6 Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri
          { code: '2.6', title: 'Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri', defaultPages: 'sf. 77' },
          { code: '2.6.1', title: 'Osmanlı Döneminde Afet Yönetimi ve İlk Düzenlemeler (1509–1923)', level2: '2.6. Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri', defaultPages: 'sf. 78' },
          { code: '2.6.2', title: 'Cumhuriyet Döneminde Afet Mevzuatının Oluşumu (1923–1959)', level2: '2.6. Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri', defaultPages: 'sf. 79' },
          { code: '2.6.3', title: 'Temeller ve Kurumsallaşma Dönemi (1959–1999)', level2: '2.6. Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri', defaultPages: 'sf. 80' },
          { code: '2.6.4', title: 'Risk Yönetimine Geçiş Süreci (1999–2009)', level2: '2.6. Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri', defaultPages: 'sf. 81' },
          { code: '2.6.5', title: 'Bütünleşik Afet Yönetimi ve İklim Krizi Dönemi (2009–Günümüz)', level2: '2.6. Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri', defaultPages: 'sf. 82' }
        ]
      },
      {
        num: '3',
        title: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        subSections: [
          { code: '3.1', title: 'Kritik Enerji Altyapıları', defaultPages: 'sf. 87' },
          { code: '3.2', title: 'Kritik İçme ve Kullanma Suyu Altyapıları', defaultPages: 'sf. 89' },
          { code: '3.3', title: 'Kritik Atık Altyapıları', defaultPages: 'sf. 90' },
          { code: '3.4', title: 'Kritik Bilgi ve İletişim Altyapıları', defaultPages: 'sf. 92' }
        ]
      },
      {
        num: '4',
        title: 'DOĞA KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { 
            code: '4.1', 
            title: 'Deprem Riski', 
            defaultPages: 'sf. 95'
          },
          { 
            code: '4.2', 
            title: 'Sel ve Taşkın Riski', 
            defaultPages: 'sf. 100'
          },
          { 
            code: '4.3', 
            title: 'Heyelan', 
            defaultPages: 'sf. 104'
          },
          { 
            code: '4.4', 
            title: 'Tsunami', 
            defaultPages: 'sf. 106'
          }
        ]
      },
      {
        num: '5',
        title: 'İNSAN VE TEKONOLOJİ KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { 
            code: '5.1', 
            title: 'Pandemi', 
            defaultPages: 'sf. 108'
          },
          { 
            code: '5.2', 
            title: 'Yangın', 
            defaultPages: 'sf. 110'
          },
          { 
            code: '5.3', 
            title: 'Patlama ve Endüstriyel Kazalar', 
            defaultPages: 'sf. 112'
          },
          { 
            code: '5.4', 
            title: 'Savaş ve Terör Saldırıları', 
            defaultPages: 'sf. 114'
          }
        ]
      },
      {
        num: '6',
        title: 'İKLİM KRİZİ ETKİLERİNİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '6.1', title: 'Aşırı Sıcaklıklar', defaultPages: 'sf. 117' },
          { code: '6.2', title: 'Deniz Seviyesinin Yükselmesi', defaultPages: 'sf. 117' },
          { code: '6.3', title: 'Fırtına ve Aşırı Hava Olayları', defaultPages: 'sf. 117' },
          { code: '6.4', title: 'Kıtlık ve Kaynak Stresi', defaultPages: 'sf. 117' }
        ]
      },
      {
        num: '7',
        title: 'AFET VE İKLİM KRİZİ KARŞISINDA TEKNİK ALTYAPI SİSTEMLERİNE YÖNELİK ULUSLARARASI İYİ UYGULAMA ÖRNEKLERİ',
        subSections: [
          { code: '7.1', title: 'Tokyo – Depreme Dayanıklı Su Altyapısı', defaultPages: 'sf. 119' },
          { code: '7.2', title: 'Singapur – Bütünleşik Taşkın Yönetimi ve Source–Pathway–Receptor Yaklaşımı', defaultPages: 'sf. 122' },
          { code: '7.3', title: 'New York – Enerji Altyapısında İklim Dayanıklılığı', defaultPages: 'sf. 125' },
          { code: '7.4', title: 'Japonya – Afet Atık Yönetimi', defaultPages: 'sf. 128' },
          { code: '7.5', title: 'Japonya – Afete Dayanıklı Bilgi ve İletişim Altyapısı', defaultPages: 'sf. 133' },
          { code: '7.6', title: 'Wellington – Bütünleşik Kritik Altyapı Dayanıklılığı ve Lifelines Yaklaşımı', defaultPages: 'sf. 136' },
          { code: '7.7', title: 'Değerlendirme', defaultPages: 'sf. 140' }
        ]
      },
      {
        num: '8',
        title: 'ÇOKLU RİSK BÖLGELERİ VE KÜMÜLATİF ETKİ DEĞERELENDİRMESİ',
        subSections: [
          { code: '8.1', title: 'Çoklu Risk Bölgeleri ve Kümülatif Etki Değerlendirmesi', defaultPages: 'sf. 142' }
        ]
      },
      {
        num: '9',
        title: 'KAYNAKÇA',
        subSections: [
          { code: '9.1', title: 'Kaynakça', defaultPages: 'sf. 143' }
        ]
      }
    ]
  },
  lojistik: {
    label: 'Lojistik',
    chapters: [
      {
        num: '1',
        title: 'GİRİŞ',
        subSections: [
          { code: '1.1', title: 'Çalışmanın Amacı' },
          { code: '1.2', title: 'Kapsam' },
          { code: '1.3', title: 'Yöntem ve Analiz Yaklaşımı' }
        ]
      },
      {
        num: '2',
        title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        subSections: [
          { code: '2.1', title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler' },
          { code: '2.1.1', title: 'Hyogo Çerçeve Eylem Planı (2005–2015)' },
          { code: '2.1.2', title: 'Sendai Afet Risklerinin Azaltılması Çerçevesi (2015–2030)' },
          { code: '2.1.3', title: 'Birleşmiş Milletler İklim Değişikliği Çerçeve Sözleşmesi' },
          { code: '2.1.4', title: 'Kyoto Protokolü' },
          { code: '2.1.5', title: 'Paris Anlaşması' },
          { code: '2.1.6', title: 'Tehlikeli Malların Karayoluyla Uluslararası Taşınmasına İlişkin Avrupa Anlaşması (ADR)' },
          { code: '2.1.7', title: 'Tehlikeli Malların Demiryoluyla Uluslararası Taşınmasına İlişkin Düzenlemeler (RID)' },
          { code: '2.1.8', title: 'TIR Karneleri Himayesinde Uluslararası Eşya Taşınmasına Dair Gümrük Sözleşmesi' },
          { code: '2.1.9', title: 'Yeni Kentsel Gündem' },
          { code: '2.1.10', title: 'Gündem 2030: Birleşmiş Milletler Sürdürülebilir Kalkınma Amaçları' },
          { code: '2.1.11', title: 'AB “Fit for 55” Paketi' },
          { code: '2.1.12', title: '2023–2030 AB Afet Dayanıklılık Hedefleri' },
          { code: '2.1.13', title: 'AB Sel Direktifi' },
          { code: '2.1.14', title: '2023 IMO Gemilerden Kaynaklanan Sera Gazı Emisyonlarını Azaltma Stratejisi' },
          { code: '2.1.15', title: 'Uluslararası Havacılık için Karbon Dengeleme ve Azaltma Programı (CORSIA)' },
          { code: '2.2', title: 'Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri' },
          { code: '2.2.1', title: 'On İkinci Kalkınma Planı (2024–2028)' },
          { code: '2.2.2', title: 'Türkiye Afet Yönetimi Strateji Belgesi ve Eylem Planı (TAYSB)' },
          { code: '2.2.3', title: 'Türkiye Afet Risk Azaltma Planı (TARAP)' },
          { code: '2.2.4', title: 'Türkiye Afet Müdahale Planı (TAMP)' },
          { code: '2.2.5', title: 'Bölgesel Gelişme Ulusal Stratejisi (BGUS)' },
          { code: '2.2.6', title: 'Ulaştırma ve Lojistik Ana Planı 2053' },
          { code: '2.2.7', title: '2053 Uzun Dönemli İklim Stratejisi' },
          { code: '2.2.8', title: 'İklim Değişikliği Azaltım Stratejisi ve Eylem Planı (İDASEP)' },
          { code: '2.2.9', title: 'İklim Değişikliği Uyum Stratejisi ve Eylem Planı (İDUSEP)' },
          { code: '2.2.10', title: 'Değişen İklime Uyum Çerçevesinde Su Verimliliği Strateji Belgesi ve Eylem Planı' },
          { code: '2.2.11', title: 'Sürdürülebilir Gıda Sistemlerine Doğru Türkiye\'nin Ulusal Yol Haritası' },
          { code: '2.2.12', title: 'Yeşil Mutabakat Eylem Planı' },
          { code: '2.2.13', title: 'Ulusal Enerji Planı' },
          { code: '2.2.14', title: 'Marmara Bölgesi Mekânsal Gelişme Stratejik Çerçeve Belgesi' },
          { code: '2.2.15', title: 'Marmara Denizi Bütünleşik Stratejik Planı' },
          { code: '2.2.16', title: 'Sanayi Kuruluşlarının Afetlere Dirençli Hâle Getirilmesi: Marmara Bölgesi Uygulaması (RESMAR)' },
          { code: '2.3', title: 'İstanbul İli Stratejik Planlar ve Belgeler' },
          { code: '2.3.1', title: 'İstanbul Bölge Planı 2024–2028' },
          { code: '2.3.2', title: 'İBB Stratejik Planı 2025–2029' },
          { code: '2.3.3', title: 'İstanbul Vizyon 2050 Strateji Belgesi ve Eylem Planı' },
          { code: '2.3.4', title: 'İstanbul İl Afet Risk Azaltma Planı (İRAP)' },
          { code: '2.3.5', title: 'İstanbul Deprem Seferberlik Planı' },
          { code: '2.3.6', title: 'İstanbul İklim Değişikliği Eylem Planı (İİDEP)' },
          { code: '2.3.7', title: 'İstanbul Sürdürülebilir Enerji ve İklim Eylem Planı (SECAP)' },
          { code: '2.3.8', title: 'İstanbul Gıda Strateji Belgesi (İGSB)' },
          { code: '2.4', title: 'İlgili Mekânsal Planlar' },
          { code: '2.5', title: 'Yasal-Yönetsel Çerçeve' },
          { code: '2.5.1', title: 'Yasal Çerçeve' },
          { code: '2.5.1.1', title: '4373 Sayılı Taşkın Sulara ve Su Baskınlarına Karşı Korunma Kanunu' },
          { code: '2.5.1.2', title: '7269 Sayılı Umumi Hayata Müessir Afetler Dolayısıyla Alınacak Tedbirlerle Yapılacak Yardımlara Dair Kanun' },
          { code: '2.5.1.3', title: '3194 Sayılı İmar Kanunu' },
          { code: '2.5.1.4', title: '4708 Sayılı Yapı Denetimi Hakkında Kanun' },
          { code: '2.5.1.5', title: '2918 Sayılı Karayolları Trafik Kanunu' },
          { code: '2.5.1.6', title: '4925 Sayılı Karayolu Taşıma Kanunu' },
          { code: '2.5.1.7', title: '4458 Sayılı Gümrük Kanunu' },
          { code: '2.5.1.8', title: '6001 Sayılı Karayolları Genel Müdürlüğünün Teşkilat ve Görevleri Hakkında Kanun' },
          { code: '2.5.1.9', title: '6461 Sayılı Türkiye Demiryolu Ulaştırmasının Serbestleştirilmesi Hakkında Kanun' },
          { code: '2.5.1.10', title: '2920 Sayılı Türk Sivil Havacılık Kanunu' },
          { code: '2.5.1.11', title: '618 Sayılı Limanlar Kanunu' },
          { code: '2.5.1.12', title: '5312 Sayılı Deniz Çevresinin Petrol ve Diğer Zararlı Maddelerle Kirlenmesinde Acil Durumlarda Müdahale ve Zararların Tazmini Esaslarına Dair Kanun' },
          { code: '2.5.1.13', title: '2872 Sayılı Çevre Kanunu' },
          { code: '2.5.1.14', title: '5216 Sayılı Büyükşehir Belediyesi Kanunu' },
          { code: '2.5.1.15', title: '5393 Sayılı Belediye Kanunu' },
          { code: '2.5.1.16', title: '6306 Sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun' },
          { code: '2.5.1.17', title: '4 Sayılı Cumhurbaşkanlığı Kararnamesi' },
          { code: '2.5.1.18', title: '49 Sayılı Coğrafi Bilgi Sistemleri Hakkında Cumhurbaşkanlığı Kararnamesi' },
          { code: '2.5.1.19', title: '7552 Sayılı İklim Kanunu' },
          { code: '2.5.2', title: 'Yönetsel Çerçeve' },
          { code: '2.6', title: 'Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri' }
        ]
      },
      {
        num: '3',
        title: 'LOJİSTİK SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        subSections: [
          { code: '3.1', title: 'Kritik Ulaşım Ağları (Karayolu, Demiryolu, Havayolu, Denizyolu)' },
          { code: '3.2', title: 'Kritik Lojistik Odakları' },
          { code: '3.3', title: 'Kritik Lojistik Terminaller' }
        ]
      },
      {
        num: '4',
        title: 'DOĞA KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '4.1', title: 'Deprem Riski' },
          { code: '4.2', title: 'Sel ve Taşkın Riski' },
          { code: '4.3', title: 'Heyelan' },
          { code: '4.4', title: 'Tsunami' }
        ]
      },
      {
        num: '5',
        title: 'İNSAN VE TEKONOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '5.1', title: 'Pandemi' },
          { code: '5.2', title: 'Yangın' },
          { code: '5.3', title: 'Patlama ve Endüstriyel Kazalar' },
          { code: '5.4', title: 'Savaş ve Terör Saldırıları' }
        ]
      },
      {
        num: '6',
        title: 'İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '6.1', title: 'Aşırı Sıcaklıklar' },
          { code: '6.2', title: 'Deniz Seviyesinin Yükselmesi' },
          { code: '6.3', title: 'Fırtına ve Aşırı Hava Olayları' },
          { code: '6.4', title: 'Kıtlık ve Kaynak Stresi' }
        ]
      },
      {
        num: '7',
        title: 'AFET VE İKLİM KRİZİ KARŞISINDA LOJİSTİK SİSTEMLERİNE YÖNELİK ULUSLARARASI İYİ UYGULAMA ÖRNEKLERİ',
        subSections: [
          { code: '7.1', title: 'Japonya – Afetlere Dayanıklı Lojistik ve Acil Ulaşım Ağı' },
          { code: '7.2', title: 'Japonya – Havalimanlarında İş Sürekliliği ve Lojistik Fonksiyonların Erken İyileştirilmesi' },
          { code: '7.3', title: 'Rotterdam – Liman ve Lojistik Alanlarında Taşkın ve Deniz Seviyesi Yükselmesine Uyum' },
          { code: '7.4', title: 'New York/New Jersey – Çok Modlu Lojistik Altyapıda İklim Dayanıklılığı' },
          { code: '7.5', title: 'Kaikōura – Deprem Sonrası Karayolu ve Demiryolu Lojistik Koridorunun Yeniden Kurulması' },
          { code: '7.6', title: 'Antwerp-Bruges – Tehlikeli Madde Taşımacılığı ve Liman Acil Durum Yönetimi' },
          { code: '7.7', title: 'Değerlendirme' }
        ]
      },
      {
        num: '8',
        title: 'ÇOKLU RİSK BÖLGELERİ VE KÜMÜLATİF ETKİ DEĞERELENDİRMESİ',
        subSections: []
      },
      {
        num: '9',
        title: 'KAYNAKÇA',
        subSections: []
      }
    ]
  }
};

// Export organized chapter groups with items
export const REPORT_CHAPTERS_MAP: Record<string, ReportChapterGroup[]> = {
  ulasim: REPORT_DATA_RAW.ulasim.chapters.map(ch => ({
    num: ch.num,
    title: ch.title,
    items: makeItems('ulasim', ch.num, ch.title, ch.subSections)
  })),
  teknikaltyapi: REPORT_DATA_RAW.teknikaltyapi.chapters.map(ch => ({
    num: ch.num,
    title: ch.title,
    items: makeItems('teknikaltyapi', ch.num, ch.title, ch.subSections)
  })),
  lojistik: REPORT_DATA_RAW.lojistik.chapters.map(ch => ({
    num: ch.num,
    title: ch.title,
    items: makeItems('lojistik', ch.num, ch.title, ch.subSections)
  }))
};

export const REPORT_DATA = REPORT_DATA_RAW;
