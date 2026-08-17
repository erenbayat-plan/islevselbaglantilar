export interface ReportSubSection {
  code: string;
  title: string;
}

export interface ReportChapter {
  num: string;
  title: string;
  subSections: ReportSubSection[];
}

export const REPORT_STATUS_LABEL: Record<string, string> = {
  not_started: 'Başlanmadı',
  drafting: 'Taslak / Yazılıyor',
  review: 'İncelemede / Revizyon',
  completed: 'Tamamlandı'
};

export const REPORT_DATA: Record<string, { label: string; chapters: ReportChapter[] }> = {
  ulasim: {
    label: 'Ulaşım',
    chapters: [
      {
        num: '1',
        title: 'GİRİŞ',
        subSections: [
          { code: '1.1', title: 'Çalışmanın Amacı' },
          { code: '1.2', title: 'Kapsam' },
          { code: '1.3', title: 'Yöntem ve Değerlendirme Yaklaşımı' }
        ]
      },
      {
        num: '2',
        title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        subSections: [
          { code: '2.1', title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler' },
          { code: '2.2', title: 'Üst Strateji ve Politika Belgeleri' },
          { code: '2.3', title: 'Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri' },
          { code: '2.4', title: 'İlgili Mekânsal Planlar' },
          { code: '2.5', title: 'Yasal-Yönetsel Çerçeve' }
        ]
      },
      {
        num: '3',
        title: 'ULAŞIM SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        subSections: [
          { code: '3.1', title: 'Karayolu Ulaşım Ağı' },
          { code: '3.2', title: 'Ulaşım Odakları (Aktarma Merkezi, İstasyonlar, İskeleler vb.)' },
          { code: '3.3', title: 'Toplu Taşıma Sistemi (Lastik Tekerlek, Raylı Sistem vb.)' }
        ]
      },
      {
        num: '4',
        title: 'DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '4.1', title: 'Deprem Riski' },
          { code: '4.2', title: 'Sel ve Taşkın Riski' }
        ]
      },
      {
        num: '5',
        title: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '5.1', title: 'Yangın' },
          { code: '5.2', title: 'Patlama ve Endüstriyel Kazalar' }
        ]
      },
      {
        num: '6',
        title: 'İKLİM KRİZİ ETKİLERİNİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '6.1', title: 'Aşırı Sıcaklıklar' },
          { code: '6.2', title: 'Deniz Seviyesinin Yükselmesi' },
          { code: '6.3', title: 'Fırtına ve Aşırı Hava Olayları' }
        ]
      },
      {
        num: '7',
        title: 'AFET VE İKLİM KRİZİ KARŞISINDA ULAŞIM ALTYAPISINA YÖNELİK ULUSLARARASI İYİ UYGULAMA ÖRNEKLERİ',
        subSections: [
          { code: '7.1', title: 'Afet ve İklim Dayanıklı Ulaşım Planlamasına Yönelik Küresel Yaklaşımlar' },
          { code: '7.2', title: 'Afet ve İklim Dayanıklı Ulaşım Sistemlerinin Uluslararası Uygulama Örnekleri' }
        ]
      },
      {
        num: '8',
        title: 'ÇOKLU RİSK BÖLGELERİ VE KÜMÜLATİF ETKİ DEĞERLENDİRMESİ',
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
          { code: '1.1', title: 'Çalışmanın Amacı' },
          { code: '1.2', title: 'Kapsam' },
          { code: '1.3', title: 'Yöntem ve Değerlendirme Yaklaşımı' }
        ]
      },
      {
        num: '2',
        title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        subSections: [
          { code: '2.1', title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler' },
          { code: '2.2', title: 'Üst Strateji ve Politika Belgeleri' },
          { code: '2.3', title: 'Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri' },
          { code: '2.4', title: 'İlgili Mekânsal Planlar' },
          { code: '2.5', title: 'Yasal-Yönetsel Çerçeve' }
        ]
      },
      {
        num: '3',
        title: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        subSections: [
          { code: '3.1', title: 'Enerji Altyapısı' },
          { code: '3.2', title: 'İçme ve Kullanma Suyu Altyapısı' },
          { code: '3.3', title: 'Atık Altyapısı' },
          { code: '3.4', title: 'Bilgi ve İletişim Altyapısı' }
        ]
      },
      {
        num: '4',
        title: 'DOĞA KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '4.1', title: 'Deprem Riski' },
          { code: '4.2', title: 'Sel ve Taşkın Riski' },
          { code: '4.3', title: 'Heyelan' }
        ]
      },
      {
        num: '5',
        title: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '5.1', title: 'Pandemi' },
          { code: '5.2', title: 'Patlama ve Endüstriyel Kazalar' }
        ]
      },
      {
        num: '6',
        title: 'İKLİM KRİZİ ETKİLERİNİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '6.1', title: 'Aşırı Sıcaklıklar' },
          { code: '6.2', title: 'Deniz Seviyesinin Yükselmesi' },
          { code: '6.3', title: 'Kıtlık ve Kaynak Stresi' }
        ]
      },
      {
        num: '7',
        title: 'AFET VE İKLİM KRİZİ KARŞISINDA TEKNİK ALTYAPI SİSTEMLERİ YÖNELİK ULUSLARARASI İYİ UYGULAMA ÖRNEKLERİ',
        subSections: [
          { code: '7.1', title: 'Afet ve İklim Dayanıklı Altyapı Planlamasına Yönelik Küresel Yaklaşımlar' },
          { code: '7.2', title: 'Afet ve İklim Dayanıklı Altyapı Planlamasının Uluslararası Uygulama Örnekleri' }
        ]
      },
      {
        num: '8',
        title: 'ÇOKLU RİSK BÖLGELERİ VE KÜMÜLATİF ETKİ DEĞERLENDİRMESİ',
        subSections: []
      },
      {
        num: '9',
        title: 'KAYNAKÇA',
        subSections: []
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
          { code: '1.3', title: 'Yöntem ve Değerlendirme Yaklaşımı' }
        ]
      },
      {
        num: '2',
        title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        subSections: [
          { code: '2.1', title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler' },
          { code: '2.2', title: 'Üst Strateji ve Politika Belgeleri' },
          { code: '2.3', title: 'Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri' },
          { code: '2.4', title: 'İlgili Mekânsal Planlar' },
          { code: '2.5', title: 'Yasal-Yönetsel Çerçeve' }
        ]
      },
      {
        num: '3',
        title: 'LOJİSTİK SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        subSections: [
          { code: '3.1', title: 'Ulaşım Ağı (Karayolu, Demiryolu, Havayolu, Denizyolu)' },
          { code: '3.2', title: 'Lojistik Odakları' },
          { code: '3.3', title: 'Lojistik Terminaller' }
        ]
      },
      {
        num: '4',
        title: 'DOĞA KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '4.1', title: 'Deprem Riski' },
          { code: '4.2', title: 'Sel ve Taşkın Riski' }
        ]
      },
      {
        num: '5',
        title: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '5.1', title: 'Patlama ve Endüstriyel Kazalar' }
        ]
      },
      {
        num: '6',
        title: 'İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '6.1', title: 'Aşırı Sıcaklıklar' },
          { code: '6.2', title: 'Deniz Seviyesinin Yükselmesi' },
          { code: '6.3', title: 'Fırtına ve Aşırı Hava Olayları' }
        ]
      },
      {
        num: '7',
        title: 'AFET VE İKLİM KRİZİ KARŞISINDA LOJİSTİK SİSTEMLERİNE YÖNELİK ULUSLARARASI İYİ UYGULAMA ÖRNEKLERİ',
        subSections: [
          { code: '7.1', title: 'Afet ve İklim Dayanıklı Lojistik Planlamasına Yönelik Küresel Yaklaşımlar' },
          { code: '7.2', title: 'Afet ve İklim Dayanıklı Lojistik Planlamasının Uluslararası Uygulama Örnekleri' }
        ]
      },
      {
        num: '8',
        title: 'ÇOKLU RİSK BÖLGELERİ VE KÜMÜLATİF ETKİ DEĞERLENDİRMESİ',
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
