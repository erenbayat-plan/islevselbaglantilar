const fs = require('fs');

let content = fs.readFileSync('src/reportData.ts', 'utf-8');

const lojistikStart = content.indexOf("  lojistik: {");
const lojistikEndStr = "  }\n};\n\n// Export organized chapter groups with items";
const lojistikEnd = content.indexOf(lojistikEndStr);

if (lojistikStart !== -1 && lojistikEnd !== -1) {
  const newLojistik = `  lojistik: {
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
          { code: '2.2.11', title: 'Sürdürülebilir Gıda Sistemlerine Doğru Türkiye\\'nin Ulusal Yol Haritası' },
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
        subSections: []
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
        title: 'İNSAN VE TEKNOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '5.1', title: 'Pandemi' },
          { code: '5.2', title: 'Patlama ve Endüstriyel Kazalar' }
        ]
      },
      {
        num: '6',
        title: 'İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        subSections: [
          { code: '6.1', title: 'Aşırı Sıcaklıklar' },
          { code: '6.2', title: 'Deniz Seviyesinin Yükselmesi' },
          { code: '6.3', title: 'Kıtlık ve Kaynak Stresi' }
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
        title: 'ÇOKLU RİSK BÖLGELERİ VE KÜMÜLATİF ETKİ DEĞERLENDİRMESİ',
        subSections: []
      },
      {
        num: '9',
        title: 'KAYNAKÇA',
        subSections: []
      }
    ]`;
  
  const before = content.substring(0, lojistikStart);
  const after = content.substring(lojistikEnd);
  
  fs.writeFileSync('src/reportData.ts', before + newLojistik + after);
  console.log('Successfully updated src/reportData.ts with new Lojistik structure');
} else {
  console.log('Could not find boundaries for lojistik block');
}
