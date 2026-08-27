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
          
          { code: '2.6', title: 'Türkiye’de ve İstanbul\\'da Tarihsel Süreçte Afetler ve İklim Krizleri' },
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
        title: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
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
  console.log('Successfully updated src/reportData.ts with updated Ulasim structure');
} else {
  console.log('Could not find boundaries for ulasim block');
}
