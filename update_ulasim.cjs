const fs = require('fs');

let content = fs.readFileSync('src/reportData.ts', 'utf-8');

const ulasimStart = content.indexOf("  ulasim: {");
const ulasimEndStr = "  teknikaltyapi: {";
const ulasimEnd = content.indexOf(ulasimEndStr);

if (ulasimStart !== -1 && ulasimEnd !== -1) {
  const newUlasim = `  ulasim: {
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
          
          { code: '2.2', title: 'Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri' },
          { code: '2.2.1', title: 'On İkinci Kalkınma Planı' },
          { code: '2.2.2', title: 'Bütünleşik Kentsel Gelişme Stratejisi ve Eylem Planı' },
          { code: '2.2.3', title: 'Türkiye Afet Risk Azaltma Planı (TARAP)' },
          { code: '2.2.4', title: 'Sanayi Kuruluşlarının Afetlere Dirençli Hâle Getirilmesi: Marmara Bölgesi Uygulaması (RESMAR Projesi)' },
          { code: '2.2.5', title: 'Ulusal Deprem Stratejisi ve Eylem Planı' },
          { code: '2.2.6', title: 'Ulaştırma ve Lojistik Ana Planı 2053' },
          { code: '2.2.7', title: 'Bölgesel Gelişme Ulusal Stratejisi' },
          { code: '2.2.8', title: 'Marmara Bölgesi Mekânsal Gelişme Stratejik Çerçeve Belgesi' },
          { code: '2.2.9', title: 'Marmara Denizi Bütünleşik Stratejik Planı' },
          
          { code: '2.3', title: 'İstanbul İli Stratejik Planlar ve Belgeler' },
          { code: '2.3.1', title: 'İstanbul Deprem Master Planı (İDMP)' },
          { code: '2.3.2', title: 'İstanbul İl Afet Risk Azaltma Planı (İRAP)' },
          { code: '2.3.3', title: 'İstanbul Sismik Riskin Azaltılması ve Acil Durum Hazırlık Kapasitesinin Arttırılması Projesi (İSMEP)' },
          
          { code: '2.4', title: 'İlgili Mekânsal Planlar' },
          { code: '2.4.1', title: 'İstanbul Çevre Düzeni Planı (1/100.000 – 2009)' },
          { code: '2.4.2', title: 'İstanbul Çevre Düzeni Planı Revizyon Taslağı (1/100.000 – 2015)' },
          
          { code: '2.5', title: 'Yasal-Yönetsel Çerçeve' },
          { code: '2.5.1', title: 'Yasal Çerçeve' },
          { code: '2.5.1.1', title: '4373 Sayılı Taşkın Sulara ve Su Baskınlarına Karşı Korunma Kanunu' },
          { code: '2.5.1.2', title: '7269 Sayılı Umumi Hayata Müessir Afetler Dolayısıyla Alınacak Tedbirlerle Yapılacak Yardımlara Dair Kanun' },
          { code: '2.5.1.3', title: '3194 Sayılı İmar Kanunu' },
          { code: '2.5.1.4', title: '4708 Sayılı Yapı Denetimi Hakkında Kanun' },
          { code: '2.5.1.5', title: '5216 Sayılı Büyükşehir Belediyesi Kanunu' },
          { code: '2.5.1.6', title: '5393 Sayılı Belediye Kanunu' },
          { code: '2.5.1.7', title: '5902 Sayılı Afet ve Acil Durum Yönetimi Başkanlığının Teşkilat ve Görevleri Hakkında Kanun' },
          { code: '2.5.1.8', title: '49 Sayılı Coğrafi Bilgi Sistemleri Hakkında Cumhurbaşkanlığı Kararnamesi' },
          { code: '2.5.2', title: 'Yönetsel Çerçeve' },
          
          { code: '2.6', title: 'İstanbul\\'da Afetler Sonrasında Ulaşım Sisteminin Tarihsel Gelişimi' },
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
        subSections: []
      },
      {
        num: '4',
        title: 'DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '4.1', title: 'Deprem Tehlikesi ve Riskler' },
          { code: '4.1.1', title: 'Deprem Maruziyetleri' },
          { code: '4.2', title: 'Sel ve Taşkın Riski' }
        ]
      },
      {
        num: '5',
        title: 'İNSAN VE TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '5.1', title: 'Pandemi' },
          { code: '5.2', title: 'Patlama ve Endüstriyel Kazalar' }
        ]
      },
      {
        num: '6',
        title: 'İKLİM KRİZİ ETKİLERİNİN ULAŞIM SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '6.1', title: 'Aşırı Sıcaklıklar' },
          { code: '6.2', title: 'Deniz Seviyesinin Yükselmesi' },
          { code: '6.3', title: 'Kıtlık ve Kaynak Stresi' }
        ]
      },
      {
        num: '7',
        title: 'AFET VE İKLİM KRİZİ KARŞISINDA ULAŞIM ALTYAPISINA YÖNELİK ULUSLARARASI İYİ UYGULAMA ÖRNEKLERİ',
        subSections: [
          { code: '7.1', title: 'Afet ve İklim Dayanıklı Ulaşım Planlamasına Yönelik Küresel Yaklaşımlar' },
          { code: '7.2', title: 'Afet ve İklim Dayanıklı Ulaşımda Uluslararası Uygulama Örnekleri' },
          { code: '7.2.1', title: 'Japonya: Ulaşımın “Hayat Hatları (Lifelines)” Olarak Ele Alınması' },
          { code: '7.2.2', title: 'New York City: Tahliye Odaklı Afet Ulaşımı' },
          { code: '7.2.3', title: 'Hollanda: Akıllı Ulaşım Sistemleri (ITS)' }
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
`;
  
  const before = content.substring(0, ulasimStart);
  const after = content.substring(ulasimEnd);
  
  fs.writeFileSync('src/reportData.ts', before + newUlasim + after);
  console.log('Successfully updated src/reportData.ts with new Ulasim structure');
} else {
  console.log('Could not find boundaries for ulasim block');
}
