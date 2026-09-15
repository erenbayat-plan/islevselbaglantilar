export const DATA: Record<string, any> = {
  ulasim: {
    label: 'Ulaşım',
    chapters: [
      { num: '1', title: 'GİRİŞ' },
      { num: '2', title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE' },
      { num: '3', title: 'ULAŞIM SİSTEMLERİ VE KRİTİK BİLEŞENLERİ' },
      { num: '4', title: 'DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ' },
      { num: '5', title: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ' },
      { num: '6', title: 'İKLİM KRİZİ ETKİLERİNİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ' },
      { num: '7', title: 'AFET VE İKLİM KRİZİ KARŞISINDA ULAŞIM ALTYAPISINA YÖNELİK İYİ UYGULAMA ÖRNEKLERİ' },
      { num: '8', title: 'ÇOKLU RİSK DEĞERLENDİRMESİ' },
      { num: '9', title: 'KAYNAKÇA' }
    ],
    sections: [
      // 1. GİRİŞ
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.1',
        title: 'Çalışmanın Amacı',
        entries: [
          {
            sartname: 'İstanbul Ulaşım Altyapısı Afet ve İklim Dayanıklılığı Çalışmasının Amacının Belirlenmesi',
            analiz: 'Amaç, vizyon ve stratejik hedeflerin tanımlanması',
            veri: [
              { n: 'İstanbul Çevre Düzeni Planı Revizyonu hedefleri ve vizyon belgeleri', v: true },
              { n: 'Ulaşım dirençliliği ve afet dayanıklılığı temel amaç tanımı', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.2',
        title: 'Kapsam',
        entries: [
          {
            sartname: 'Çalışmanın mekânsal, tematik ve kurumsal kapsamının sınırlandırılması',
            analiz: 'Çalışma alanı ve ulaşım modları kapsam analizi',
            veri: [
              { n: 'İstanbul il sınırı ve fonksiyonel kentsel bölge / Marmara hinterlandı sınırları', v: true },
              { n: 'Ele alınan ulaşım türleri (Karayolu, Raylı Sistem, Denizyolu, Havayolu, Mikromobilite)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.3',
        title: 'Yöntem ve Değerlendirme Yaklaşımı',
        entries: [
          {
            sartname: 'Çoklu tehlike ve risk değerlendirme metodolojisinin kurgulanması',
            analiz: 'Metodolojik akış ve veri analitiği çerçevesi',
            veri: [
              { n: 'CBS tabanlı mekânsal analiz metodolojisi', v: true },
              { n: 'AHP ve çok kriterli karar verme (ÇKKV) ağırlıklandırma modeli', v: true },
              { n: 'İklim projeksiyonları ve afet senaryoları modelleme kılavuzu', v: true }
            ]
          }
        ]
      },

      // 2. STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.1',
        title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler',
        entries: [
          {
            sartname: 'Uluslararası iklim, afet ve ulaşım anlaşmalarının incelenmesi',
            analiz: 'Uluslararası taahhütler ve uyum analizi',
            veri: [
              { n: 'Sendai Afet Risk Azaltma Çerçevesi (2015–2030) ilkeleri', v: true },
              { n: 'Paris Anlaşması ve BM Sürdürülebilir Kalkınma Amaçları (SKA 9, 11, 13)', v: true },
              { n: 'AB Yeşil Mutabakatı ve Sürdürülebilir & Akıllı Hareketlilik Stratejisi', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.2',
        title: 'Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri',
        entries: [
          {
            sartname: 'Ulusal ve bölgesel kalkınma, ulaşım ve afet stratejilerinin değerlendirilmesi',
            analiz: 'Üst ölçekli politika uyum analizi',
            veri: [
              { n: '12. Kalkınma Planı (2024–2028) ulaşım ve afet hedefleri', v: true },
              { n: 'Türkiye Afet Risk Azaltma Planı (TARAP) ve Türkiye Afet Müdahale Planı (TAMP)', v: true },
              { n: 'Ulaştırma ve Lojistik Ana Planı 2053 ve Ulusal Akıllı Ulaşım Sistemleri Strateji Belgesi', v: true },
              { n: '2053 Uzun Dönemli İklim Değişikliği Stratejisi', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.3',
        title: 'İstanbul İli Stratejik Planlar ve Belgeler',
        entries: [
          {
            sartname: 'İstanbul il düzeyindeki stratejik belgelerin ulaşım ve afet açılarından irdelenmesi',
            analiz: 'Yerel stratejik planlar uyum ve hedef analizi',
            veri: [
              { n: 'İstanbul Vizyon 2050 Strateji Belgesi (İPA)', v: true },
              { n: 'İBB Stratejik Planı (2025–2029)', v: true },
              { n: 'İstanbul Sürdürülebilir Kentsel Hareketlilik Planı (SKUP İstanbul)', v: true },
              { n: 'İstanbul İl Afet Risk Azaltma Planı (İRAP)', v: true },
              { n: 'İstanbul İklim Değişikliği Eylem Planı ve SECAP', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.4',
        title: 'İlgili Mekânsal Planlar',
        entries: [
          {
            sartname: 'Yürürlükteki ve vizyon mekânsal planların ulaşım kararlarının değerlendirilmesi',
            analiz: 'Mekânsal planlama ve ulaşım koridorları sentezi',
            veri: [
              { n: '1/100.000 Ölçekli İstanbul Çevre Düzeni Planı (2009) ulaşım kararları', v: true },
              { n: 'İstanbul Ulaşım Ana Planı (İUAP) revizyon verileri', v: true },
              { n: 'Marmara Bölgesi Mekânsal Gelişme Strateji Belgesi', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.5',
        title: 'Yasal-Yönetsel Çerçeve',
        entries: [
          {
            sartname: 'Ulaşım altyapısı ve afet yönetimi mevzuatının kurumsal yetki matrisi ile incelenmesi',
            analiz: 'Yasal yetki, mülkiyet ve sorumluluk matrisi analizi',
            veri: [
              { n: '5216 Sayılı Büyükşehir Belediyesi Kanunu ve UKOME yönetmeliği', v: true },
              { n: '7269 Sayılı Afetler Kanunu ve 6306 Sayılı Kentsel Dönüşüm Kanunu', v: true },
              { n: '6001 Sayılı Karayolları Genel Müdürlüğü ve 6461 Sayılı TCDD mevzuatı', v: true },
              { n: 'İklim Kanunu ve ilgili yönetmelikler', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.6',
        title: 'Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri',
        entries: [
          {
            sartname: 'Geçmiş afetlerin ve aşırı hava olaylarının ulaşım sistemine tarihsel etkilerinin derlenmesi',
            analiz: 'Tarihsel afet kronolojisi ve ulaşım hasar analizi',
            veri: [
              { n: '1999 Marmara Depremi karayolu, köprü ve liman hasar kayıtları', v: true },
              { n: '2009 Ayamama ve 2017/2021 İstanbul sel & fırtına ulaşım kesinti verileri', v: true },
              { n: 'Tarihsel kar fırtınaları ve karayolu tıkanma arşiv kayıtları (2022 vb.)', v: true }
            ]
          }
        ]
      },

      // 3. ULAŞIM SİSTEMLERİ VE KRİTİK BİLEŞENLERİ (KRİTİK BİLEŞENLER MATRİSİ İÇİN TEMEL)
      {
        chapterNum: '3',
        chapterTitle: 'ULAŞIM SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.1',
        title: 'Kritik Karayolu Ulaşım Ağları',
        entries: [
          {
            sartname: 'Karayolu ana arterleri, otoyollar, devlet yolları, köprüler, tüneller, otoparklar ve mikromobilite ağları',
            analiz: 'Kritik karayolu ağı hiyerarşisi, trafik yoğunluğu (YOGT), arzu hatları ve erişilebilirlik analizi',
            veri: [
              { n: 'İstanbul Karayolu Ağı (ULA_Yol_agi_cdp)', v: true },
              { n: 'Marmara Bölgesindeki Otoyollar (ULA_MB_Otoyollar)', v: true },
              { n: 'Marmara Bölgesindeki Planlanan Otoyollar (ULA_MB_PlanlananOtoyollar)', v: true },
              { n: 'Marmara Bölgesindeki Devlet Yolları (ULA_MB_DevletYollari)', v: true },
              { n: 'Marmara Bölgesindeki Otoyolların (Sadece TEM) Yıllık Ortalama Günlük Trafik Değerleri (ULA_MB_Otoyol_YOGT)', v: true },
              { n: 'Marmara Bölgesindeki Devlet Yollarının Yıllık Ortalama Günlük Trafik Değerleri (ULA_MB_DevletYoluYOGT)', v: true },
              { n: 'Yol Üstü Otoparklar (ULA_Yolustu_Otoparklar)', v: true },
              { n: 'Yol Dışı Otoparklar (ULA_Yoldisi_Otoparklar)', v: true },
              { n: 'Park et Devam et Otoparkları (ULA_PD_Otoparklar)', v: true },
              { n: 'Yaya Yolları (ULA_Yaya_Yollari)', v: true },
              { n: 'Mikromobilite Park Alanları (ULA_Mikromobilite_Park_Alanlari)', v: true },
              { n: 'Bisiklet Park Alanları (ULA_Bisiklet_Park_Alanlari)', v: true },
              { n: 'Mevcut Paylaşımlı Bisiklet Yolu (ULA_Mevcut_Paylasimli_Bisiklet)', v: true },
              { n: 'Mevcut Ayrılmış Bisiklet Yolu (ULA_Mevcut_Ayrilmis_Bisiklet)', v: true },
              { n: 'İnşaat Aşamasındaki Bisiklet Yolu (ULA_Insaat_Asamasi_Bisiklet)', v: true },
              { n: 'UTK Kararlı Bisiklet Yolu (ULA_UTK_Kararli_Bisiklet)', v: true },
              { n: 'Üst Ölçek Zonlarındaki Üretim ve Çekim Yolculuk Değerleri (ULA_Zon_Yolculuk)', v: true },
              { n: 'Toplam Yolculukların İlçeler Arası Arzu Hatları (ULA_Top_Arzu_Hatlari)', v: true },
              { n: 'Toplu Taşıma Yolculukların İlçeler Arası Arzu Hatları (ULA_TT_Arzu_Hatlari)', v: true },
              { n: 'Özel Otomobil Yolculukların İlçeler Arası Arzu Hatları (ULA_OO_Arzu_Hatlari)', v: true },
              { n: 'Köprü, Viyadük ve Tünel Envanteri (İBB & KGM)', v: true },
              { n: 'Acil Ulaşım Yolları Ağı (AUY 1. ve 2. Derece Güzergâhlar)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'ULAŞIM SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.2',
        title: 'Kritik Ulaşım Odakları (Aktarma Merkezi, İstasyonlar, İskeleler vb.)',
        entries: [
          {
            sartname: 'Ulaşım aktarma merkezleri, raylı sistem istasyonları, deniz iskeleleri, otogarlar ve erişilebilirlik alanları',
            analiz: 'Ulaşım odakları 5-10-15 dakika yaya erişilebilirlik ve yolcu transfer kapasitesi analizi',
            veri: [
              { n: "İstanbul'daki Toplu Taşıma Raylı Sistem İstasyonları (Mevcut ve İnşaat Aşamasında) Metro, Tramvay, Marmaray, Füniküler, Teleferik vb. (ULA_Rayli_Sistem_Istasyonlari)", v: true },
              { n: 'Marmara Bölgesindeki Demiryolu İstasyonları (ULA_MB_Demiryolu_Istasyonlari)', v: true },
              { n: "İstanbul'daki Denizyolu İskeleleri (ULA_Denizyolu_Iskeleler)", v: true },
              { n: 'Marmara Bölgesi İç Sulardaki İskeleler (İDO, BUDO vb.) (ULA_MB_Iskele)', v: true },
              { n: 'Marmara Bölgesindeki Otogarlar (ULA_MB_Otogarlar)', v: true },
              { n: 'Metrobüs Durakları (ULA_Metrobus_Duraklari)', v: true },
              { n: 'İETT Hatları Durakları (ULA_IETT_Duraklar)', v: true },
              { n: 'Taksi Dolmuş Durakları (ULA_Taksi_Dolmus_Durak)', v: true },
              { n: 'Marmara Bölgesindeki Kruvaziyer Limanları (ULA_MB_Kruvaziyer_Limanlari)', v: true },
              { n: 'Marmara Bölgesindeki Havalimanları (ULA_MB_Havalimanlari)', v: true },
              { n: 'Metrobüs Duraklarından 5-10-15 Dakika Yaya Erişim (ULA_Metrobus_Erisilebilirlik)', v: true },
              { n: 'Raylı Sistem İstasyonlarından 5-10-15 Dakika Yaya Erişim (ULA_RayliSistem_Erisilebilirlik)', v: true },
              { n: 'Mevcut ve Planlanan Raylı Sistem İstasyonlarından 5-10-15 Dakika Yaya Erişim (ULA_PL_Rayli_Erisilebilirlik)', v: true },
              { n: 'Ulaşım Aktarma Merkezleri Envanteri (Yenikapı, Üsküdar, Kadıköy, Mecidiyeköy)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'ULAŞIM SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.3',
        title: 'Kritik Toplu Taşıma Sistemi (Lastik Tekerlek, Raylı Sistem vb.)',
        entries: [
          {
            sartname: 'Toplu taşıma raylı sistem hatları, hızlı tren, konvansiyonel hatlar, otobüs ana güzergâhları, garajlar ve denizyolu hatları',
            analiz: 'Toplu taşıma hat kapasitesi, şebeke sürekliliği ve garaj/depo lojistik analizi',
            veri: [
              { n: "İstanbul'daki Toplu Taşıma Raylı Sistem Hatları (Mevcut ve İnşaat Aşamasında) Metro, Tramvay, Marmaray, Füniküler, Teleferik vb. (ULA_Rayli_Sistem_Hatlari)", v: true },
              { n: 'Marmara Bölgesindeki YHT Hattı (ULA_MB_YHT_Hatti)', v: true },
              { n: 'Marmara Bölgesindeki Planlanan YHT Hattı (ULA_MB_PL_YHT_Hatti)', v: true },
              { n: 'Marmara Bölgesindeki Konvansiyonel Hat (ULA_MB_Konvansiyonel_Hat)', v: true },
              { n: 'İETT Hatları Ana Güzergâhları (Metrobüs dahil) (ULA_IETT_Anaguzergahlar)', v: true },
              { n: 'İETT Garajları (ULA_IETT_Garaj)', v: true },
              { n: "İstanbul'daki Minibüs Hatları (ULA_Minibus_Hatlari)", v: true },
              { n: "İstanbul'daki Denizyolu Hatları (ULA_Denizyolu_Hatlari)", v: true },
              { n: 'Marmara Bölgesi İç Sulardaki Denizyolu Güzergâhları (ULA_MB_DY_Guzergah)', v: true }
            ]
          }
        ]
      },

      // 4. DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '4.1',
        title: 'Deprem Riski',
        entries: [
          {
            sartname: 'Depremin karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Deprem tehlikesi–ulaşım sistemi maruziyet analizi',
            veri: [
              { n: 'Deterministik deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: '475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: '2475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Acil ulaşım yolları ağı (SoV_EARoutes)', v: true },
              { n: 'Köprü envanteri', v: true },
              { n: 'Ulaşım odakları envanteri (aktarma merkezleri, istasyonlar, iskeleler vb.)', v: false },
              { n: 'Otobüs güzergâhları ağı (SoV_BusNetwork)', v: true },
              { n: 'Raylı sistem ağı (SoV_RailwayNetwork)', v: true }
            ]
          },
          {
            sartname: 'Deprem kaynaklı hasarların ulaşım ağında, ulaşım odaklarında ve toplu taşıma sisteminde oluşturabileceği kapanma ve hizmet kayıplarının değerlendirilmesi',
            analiz: 'Deprem hasarı, yol/hat kapanması ve ulaşım bileşenleri bazında işlev kaybı analizi',
            veri: [
              { n: 'JMA deprem senaryosu bina hasar sonucu (Sa02_BinaHasar_JmA_ba08)', v: true },
              { n: 'JMC deprem senaryosu bina hasar sonucu (Sa02_BinaHasar_JmC_ba08)', v: true },
              { n: 'YFB deprem senaryosu bina hasar sonucu (Sa02_BinaHasar_YfB_ba08 / ba082)', v: true },
              { n: 'Üç deprem senaryosuna göre olası yol kapanma sonucu (Yol_Agi_3Sen_Kapanma_Olasi)', v: true },
              { n: 'Kapalı yol alanları ve olası kapalı yol kesimleri (Kapali_Yol_Alani, Yol_Agi_Kapali_olasi)', v: true },
              { n: 'PGA temelli köprü hasar sonuçları (PGA_KopruHasar_JmA_ba08, PGA_KopruHasar_JmC_ba08, PGA_KopruHasar_YfB_ba08)', v: true },
              { n: 'Deprem senaryosuna göre kapanan acil ulaşım yolu kesimleri (Parts_of_Closure_AUY_fiEQ / AUY_Closure_fiEQ)', v: true },
              { n: 'Deprem senaryosuna göre kapanan raylı sistem kesimleri (Raylisis_BlockedParts_fintEQ)', v: true },
              { n: 'Deprem senaryosuna göre kapanan otobüs güzergâhı kesimleri (Bus_Routes_iEQ_just_posClosed_segments)', v: true },
              { n: 'Ulaşım odaklarına ait deprem hasarı, kapanma ve işlev kaybı verileri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '4.2',
        title: 'Sel ve Taşkın Riski',
        entries: [
          {
            sartname: 'Sel ve taşkının karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Q500 taşkın tehlikesi–ulaşım sistemi maruziyet analizi',
            veri: [
              { n: '500 yıllık tekerrür periyotlu su derinliği temelli taşkın tehlike haritası (İSKİ ve TUCBS verileri)', v: true },
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Acil ulaşım yolları ağı (SoV_EARoutes)', v: true },
              { n: 'Ulaşım odakları envanteri (aktarma merkezleri, istasyonlar, iskeleler vb.)', v: false },
              { n: 'Otobüs güzergâhları ağı (SoV_BusNetwork)', v: true },
              { n: 'Raylı sistem ağı (SoV_RailwayNetwork)', v: true }
            ]
          },
          {
            sartname: 'Q500 taşkın senaryosunda ulaşım ağında, ulaşım odaklarında ve toplu taşıma sisteminde oluşabilecek kapanma ve işlev kayıplarının değerlendirilmesi',
            analiz: 'Ulaşım bileşenleri bazında Q500 kapanma ve su altında kalma analizi',
            veri: [
              { n: 'İstanbul SKUP Projesi Q500 karayolu kapanma ve su altında kalma sonuçları', v: true },
              { n: 'Q500 taşkın senaryosuna göre kapanan acil ulaşım yolu kesimleri (Parts_of_Closure_AUY_fQ500 / AUY_Closure_fQ500)', v: true },
              { n: 'Q500 taşkın senaryosuna göre kapanan ve su altında kalan raylı sistem kesimleri (RailwayNetwork_Closed_Parts_Q500, RailwayNetwork_Inundation_Q500)', v: true },
              { n: 'Q500 taşkın senaryosunda su altında kalan otobüs güzergâhı kesimleri (BusRoutes_Inundated_Segments_Q500)', v: true },
              { n: 'Ulaşım odaklarına ait Q500 su altında kalma ve işlev kaybı verileri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '4.3',
        title: 'Heyelan',
        entries: [
          {
            sartname: 'Heyelan ve kütle hareketlerinin karayolu, raylı sistem ve köprüler üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Heyelan duyarlılığı ve ulaşım altyapısı kesinti analizi',
            veri: [
              { n: 'Heyelana maruz bölgeler ve heyelan duyarlılık haritası (İBB DEZİM)', v: true },
              { n: 'Karayolu ve raylı sistem ağlarının heyelan duyarlılık bölgeleri ile kesişimi', v: true },
              { n: 'Yol yarmaları, istinat duvarları ve şev duraylılığı envanteri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '4.4',
        title: 'Tsunami',
        entries: [
          {
            sartname: 'Olası Marmara tsunamisinin sahil yolları, iskeleler ve kıyı aktarma merkezleri üzerindeki etkilerinin değerlendirilmesi',
            analiz: 'Tsunami su basma ve kıyı ulaşım altyapısı maruziyet analizi',
            veri: [
              { n: 'İstanbul kıyıları tsunami su basma ve tırmanma haritası (İBB DEZİM)', v: true },
              { n: 'Kıyı sahil yolları (Kennedy Cad., Sahil Yolu vb.) ve altgeçitler', v: true },
              { n: 'Şehir Hatları iskeleleri ve kıyı aktarma merkezleri maruziyet katmanı', v: true },
              { n: 'Marmaray kıyı tünel girişleri ve kıyı metro istasyonları drenaj güvenlik durumu', v: false }
            ]
          }
        ]
      },

      // 5. İNSAN VE TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.1',
        title: 'Pandemi',
        entries: [
          {
            sartname: 'Pandeminin toplu taşıma yolculuk talebi, kapasite yönetimi ve operasyonel süreklilik üzerindeki etkileri',
            analiz: 'Yolculuk düşüşü, hijyen/kapasite kısıtı ve hat optimizasyonu analizi',
            veri: [
              { n: 'COVID-19 dönemi toplu taşıma yolculuk verileri (İstanbulkart binişleri)', v: true },
              { n: 'Kritik sağlık tesislerine erişim sağlayan acil servis hatları', v: true },
              { n: 'Şoför ve işletim personeli iş gücü sürekliliği ve acil eylem planları', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.2',
        title: 'Yangın',
        entries: [
          {
            sartname: 'Yangının karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Yangın maruziyeti ve ulaşım sistemi işlev kaybı analizi',
            veri: [
              { n: 'Normalize edilmiş yangın tehlikesi katmanı (Yangin_Tehlike_Normalizasyon)', v: true },
              { n: 'Deprem sonrası yangın tehlike katmanı (Deprem Sonrası Yangın)', v: true },
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Ulaşım odakları envanteri', v: false },
              { n: 'Otobüs güzergâhları ve raylı sistem ağı (SoV_BusNetwork, SoV_RailwayNetwork)', v: true },
              { n: 'Yangın olayları nedeniyle gerçekleşen yol, hat ve odak kapanma kayıtları', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.3',
        title: 'Patlama ve Endüstriyel Kazalar',
        entries: [
          {
            sartname: 'Patlama ve endüstriyel kazaların karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Endüstriyel tehlike maruziyeti ve ulaşım bağlantısı kesinti analizi',
            veri: [
              { n: 'Normalize edilmiş endüstriyel tehlike katmanı (Endustriyel_Tehlikeler_Normalizasyon)', v: true },
              { n: 'Normalize edilmiş kimyasal tehlike katmanı (Kimyasal_Tehlikeler_Normalizasyon)', v: true },
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Ulaşım odakları envanteri', v: false },
              { n: 'Otobüs güzergâhları ve raylı sistem ağı (SoV_BusNetwork, SoV_RailwayNetwork)', v: true },
              { n: 'Sanayi alanları, organize sanayi bölgeleri ve riskli tesis envanteri', v: false },
              { n: 'Tehlikeli madde taşıma güzergâhları (ADR koridorları)', v: false },
              { n: 'Patlama ve endüstriyel kaza olay kayıtları', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.4',
        title: 'Savaş ve Terör Saldırıları',
        entries: [
          {
            sartname: 'Kritik köprüler, tüneller ve aktarma merkezlerine yönelik güvenlik ve ağ esnekliği değerlendirmesi',
            analiz: 'Kritik düğüm noktası dayanıklılığı ve bypass kapasitesi analizi',
            veri: [
              { n: 'Boğaz köprüleri ve Avrasya Tüneli güvenlik ve acil tahliye planları', v: true },
              { n: 'Merkezi metro aktarma istasyonları fiziki güvenlik ve tahliye kapasiteleri', v: false },
              { n: 'Alternatif servis koridorları ve yedek ulaşım ağı esnekliği (Network Redundancy)', v: false }
            ]
          }
        ]
      },

      // 6. İKLİM KRİZİ ETKİLERİNİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.1',
        title: 'Aşırı Sıcaklıklar',
        climate: true,
        entries: [
          {
            sartname: 'İklim krizine bağlı aşırı sıcaklıkların ulaşım altyapısı ve araç filosu üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Kentsel ısı adası–ulaşım altyapısı maruziyet analizi',
            veri: [
              { n: 'İstanbul kentsel ısı adası (UHI) haritası ve yüzey sıcaklığı projeksiyonları', v: true },
              { n: 'Asfalt kaplama bozulması, tekerlek izi ve ray genleşmesi hassasiyet verileri', v: false },
              { n: 'Toplu taşıma araçları ve klimalı istasyon enerji tüketim artış verileri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.2',
        title: 'Deniz Seviyesinin Yükselmesi',
        climate: true,
        entries: [
          {
            sartname: 'Deniz seviyesinin yükselmesinin kıyı ulaşım sistemleri ve sahil arterleri üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Deniz seviyesi yükselmesi (SLR) kıyı ulaşım maruziyet analizi',
            veri: [
              { n: 'Orta ve uzun vadeli deniz seviyesi yükselme senaryoları (RCP 4.5 / 8.5)', v: true },
              { n: 'Kıyı karayolları, sahil dolgu alanları ve yürüyüş/bisiklet yolları su baskını katmanı', v: true },
              { n: 'Şehir Hatları iskele rampaları ve kıyı aktarma yapıları kot durumu', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.3',
        title: 'Fırtına ve Aşırı Hava Olayları',
        climate: true,
        entries: [
          {
            sartname: 'İklim krizi bağlamında fırtına, şiddetli rüzgâr, tipi ve aşırı hava olaylarının ulaşım altyapısı üzerindeki etkileri',
            analiz: 'Aşırı rüzgâr, fırtına ve kış koşulları ulaşım kesinti analizi',
            veri: [
              { n: 'Maksimum rüzgâr hızı ve fırtına risk haritaları (MGM verileri)', v: true },
              { n: 'Asma köprüler ve deniz seferleri fırtına kaynaklı kapanma/iptal kayıtları', v: true },
              { n: 'Karla mücadele acil müdahale güzergâhları ve buzlanma risk haritaları', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN ULAŞIM ALTYAPISI ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.4',
        title: 'Kıtlık ve Kaynak Stresi',
        climate: true,
        entries: [
          {
            sartname: 'İklim krizine bağlı yakıt, elektrik enerjisi ve hammadde kısıtlarının ulaşım işletmesine etkileri',
            analiz: 'Ulaşım enerji arz güvenliği ve kaynak kırılganlığı analizi',
            veri: [
              { n: 'Elektrikli otobüs ve raylı sistem şebeke elektrik talebi projeksiyonları', v: true },
              { n: 'Fosil yakıt ikmal zinciri kırılganlığı ve stratejik akaryakıt rezervi verileri', v: false }
            ]
          }
        ]
      },

      // 7. AFET VE İKLİM KRİZİ KARŞISINDA ULAŞIM ALTYAPISINA YÖNELİK İYİ UYGULAMA ÖRNEKLERİ
      {
        chapterNum: '7',
        chapterTitle: 'AFET VE İKLİM KRİZİ KARŞISINDA ULAŞIM ALTYAPISINA YÖNELİK İYİ UYGULAMA ÖRNEKLERİ',
        code: '7.1',
        title: 'Afetlere ve İklim Değişikliğine Dayanıklı Ulaşım Sistemleri: Uluslararası Uygulama Örnekleri',
        entries: [
          {
            sartname: 'Tokyo, New York, Londra, Kopenhag vb. metropollerin ulaşım dayanıklılığı iyi uygulama örnekleri',
            analiz: 'Uluslararası dirençli ulaşım uygulamaları karşılaştırmalı analizi',
            veri: [
              { n: 'Tokyo deprem ve tsunami erken uyarı ve raylı sistem otomatik durdurma sistemleri', v: true },
              { n: 'New York (MTA) Sandy Kasırgası sonrası metro su yalıtımı ve iklim uyum projeleri', v: true },
              { n: 'Rotterdam ve Kopenhag bulut patlaması (cloudburst) cadde tasarımları', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '7',
        chapterTitle: 'AFET VE İKLİM KRİZİ KARŞISINDA ULAŞIM ALTYAPISINA YÖNELİK İYİ UYGULAMA ÖRNEKLERİ',
        code: '7.2',
        title: 'Afetlere ve İklim Değişikliğine Dayanıklı Ulaşım Sistemleri: Ulusal Uygulama Örnekleri',
        entries: [
          {
            sartname: 'Türkiye geneli ve İstanbul özelinde hayata geçirilen ulaşım dayanıklılık projeleri',
            analiz: 'Ulusal dayanıklı ulaşım uygulamaları analizi',
            veri: [
              { n: 'İSMEP kapsamında güçlendirilen viyadük ve köprü uygulamaları', v: true },
              { n: 'İBB Acil Ulaşım Yolları ve AKOM akıllı trafik yönetim entegrasyonu', v: true }
            ]
          }
        ]
      },

      // 8. ÇOKLU RİSK DEĞERLENDİRMESİ
      {
        chapterNum: '8',
        chapterTitle: 'ÇOKLU RİSK DEĞERLENDİRMESİ',
        code: '8.1',
        title: 'Çoklu Risk Değerlendirmesi ve Sentez',
        entries: [
          {
            sartname: 'Deprem, taşkın, yangın, endüstriyel kaza ve iklim risklerinin ulaşım altyapısı üzerinde kümülatif sentezi',
            analiz: 'Ulaşım çoklu risk endeksi ve öncelikli müdahale koridorları sentezi',
            veri: [
              { n: 'Çoklu tehlike maruziyet matrisi katmanı', v: true },
              { n: 'Ulaşım ağı kritiklik ve kırılganlık ağırlıklandırma sentezi', v: true },
              { n: 'Öncelikli güçlendirme ve iklim uyum yatırımları haritası', v: true }
            ]
          }
        ]
      },

      // 9. KAYNAKÇA
      {
        chapterNum: '9',
        chapterTitle: 'KAYNAKÇA',
        code: '9.1',
        title: 'Kaynakça ve Referanslar',
        entries: [
          {
            sartname: 'Çalışmada kullanılan tüm veri setleri, kurum raporları ve akademik kaynakların listelenmesi',
            analiz: 'Kaynakça ve veri dokümantasyonu',
            veri: [
              { n: 'Akademik makaleler, ulusal ve uluslararası standartlar (ISO 22301, ISO 14090 vb.)', v: true },
              { n: 'Kurumsal veri kaynakları (İBB, DEZİM, AKOM, KGM, TCDD, MGM, İSKİ)', v: true }
            ]
          }
        ]
      }
    ]
  },

  teknikaltyapi: {
    label: 'Teknik Altyapı',
    chapters: [
      { num: '1', title: 'GİRİŞ' },
      { num: '2', title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE' },
      { num: '3', title: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ' },
      { num: '4', title: 'DOĞA KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ' },
      { num: '5', title: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ' },
      { num: '6', title: 'İKLİM KRİZİ ETKİLERİNİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ' },
      { num: '7', title: 'AFET VE İKLİM KRİZİ KARŞISINDA TEKNİK ALTYAPI SİSTEMLERİ YÖNELİK İYİ UYGULAMA ÖRNEKLERİ' },
      { num: '8', title: 'ÇOKLU RİSK DEĞERLENDİRMESİ' },
      { num: '9', title: 'KAYNAKÇA' }
    ],
    sections: [
      // 1. GİRİŞ
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.1',
        title: 'Çalışmanın Amacı',
        entries: [
          {
            sartname: 'Teknik altyapı sistemlerinin afet ve iklim dirençliliği çalışma amacının tanımlanması',
            analiz: 'Amaç ve kapsam belirleme analizi',
            veri: [
              { n: 'İstanbul teknik altyapı sürdürülebilirlik ve kesintisiz hizmet hedefleri', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.2',
        title: 'Kapsam',
        entries: [
          {
            sartname: 'Enerji, su, atıksu, atık ve iletişim sistemleri kapsam sınırlarının belirlenmesi',
            analiz: 'Sektörel ve mekânsal kapsam analizi',
            veri: [
              { n: 'İstanbul il geneli şebeke ve tesis katmanları kapsamı', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.3',
        title: 'Yöntem ve Değerlendirme Yaklaşımı',
        entries: [
          {
            sartname: 'Teknik altyapı hasar tahmin ve kırılganlık analiz yaklaşımı',
            analiz: 'Kırılganlık ve hizmet kesintisi modelleme çerçevesi',
            veri: [
              { n: 'CBS tabanlı kritik altyapı çakıştırma ve etki değerlendirme modeli', v: true }
            ]
          }
        ]
      },

      // 2. STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.1',
        title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler',
        entries: [
          {
            sartname: 'Altyapı dayanıklılığına yönelik uluslararası çerçevelerin incelenmesi',
            analiz: 'Uluslararası standartlar ve direktifler analizi',
            veri: [
              { n: 'Sendai Afet Çerçevesi ve AB Kritik Altyapıların Dayanıklılığı Direktifi (CER)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.2',
        title: 'Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri',
        entries: [
          {
            sartname: 'Ulusal Enerji Planı, Su Verimliliği Strateji Belgesi ve TARAP hedefleri',
            analiz: 'Ulusal altyapı stratejileri uyum analizi',
            veri: [
              { n: 'Ulusal Enerji Verimliliği Eylem Planı ve Türkiye Su Yönetimi Stratejisi', v: true },
              { n: 'TARAP ve TAMP teknik altyapı çalışma grubu eylem planları', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.3',
        title: 'İstanbul İli Stratejik Planlar ve Belgeler',
        entries: [
          {
            sartname: 'İSKİ, İGDAŞ, BEDAŞ, AYEDAŞ ve İSTAÇ stratejik belgelerinin incelenmesi',
            analiz: 'Kurumsal strateji ve yatırım programları analizi',
            veri: [
              { n: 'İSKİ İçmesuyu ve Kanalizasyon Master Planı', v: true },
              { n: 'İstanbul SECAP ve İİDEP teknik altyapı hedefleri', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.4',
        title: 'İlgili Mekânsal Planlar',
        entries: [
          {
            sartname: 'İmar planlarında teknik altyapı alanları, koruma kuşakları ve iletim koridorları',
            analiz: 'Mekânsal plan ve koruma havzaları uyum analizi',
            veri: [
              { n: 'İçme suyu havzaları koruma planları ve enerji iletim koridoru tahsisleri', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.5',
        title: 'Yasal-Yönetsel Çerçeve',
        entries: [
          {
            sartname: 'Teknik altyapı yönetimi, EPDK, İSKİ Kanunu ve ilgili yönetmelikler',
            analiz: 'Kurumsal yetki ve sorumluluk paylaşımı analizi',
            veri: [
              { n: '2560 Sayılı İSKİ Kanunu, 6446 Sayılı Elektrik Piyasası Kanunu, 4646 Doğalgaz Kanunu', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.6',
        title: 'Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri',
        entries: [
          {
            sartname: 'Geçmiş afetlerde yaşanan enerji, su, kanalizasyon ve iletişim kesintileri',
            analiz: 'Tarihsel altyapı hasar ve kesinti analizi',
            veri: [
              { n: '1999 Depremi ve büyük fırtınalarda gerçekleşen trafo, boru hattı ve şebeke hasarları', v: true }
            ]
          }
        ]
      },

      // 3. TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ
      {
        chapterNum: '3',
        chapterTitle: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.1',
        title: 'Kritik Enerji Altyapıları',
        entries: [
          {
            sartname: 'BOTAŞ ve İGDAŞ doğalgaz boru hatları, TEİAŞ/BEDAŞ/AYEDAŞ elektrik iletim ve dağıtım şebekesi, RES santralleri ve şarj/akaryakıt istasyonları',
            analiz: 'Enerji iletim omurgası, trafo merkezleri, arz güvenliği ve tüketim analizi',
            veri: [
              { n: 'Botaş İletim Hatları (TAY_BOTAS_HAT)', v: true },
              { n: 'Botaş Nokta Verisi (TAY_BOTAS_NOKTA)', v: true },
              { n: 'Doğal Gaz Dağıtım Hatları (TAY_DGAZ_HAT)', v: true },
              { n: 'Doğal Gaz Hizmet Alanı (TAY_DOGALGAZ_HIZMET)', v: true },
              { n: 'Mahalle Bazında Doğal Gaz Tüketimi (TAY_DOGALGAZTUK_MAH)', v: true },
              { n: 'İlçe Bazında Doğal Gaz Tüketimi (TAY_DOGALGAZTUK_ILCE)', v: true },
              { n: 'Elektrik İletim Hatları (TAY_ELEK_ILETIM)', v: true },
              { n: 'Elektrik Dağıtım Hatları (TAY_ELEK_DAGITIM)', v: true },
              { n: 'Elektrik Dağıtım Merkezleri (TAY_ELEK_DAGITIMMER)', v: true },
              { n: 'İlçe Bazında Elektrik Tüketim Verisi (TAY_ELEK_TUK_ILCE)', v: true },
              { n: 'Dağıtım Bölgeleri Bazında Elektrik Verileri (TAY_ELEK_ULUSAL_VERI)', v: true },
              { n: 'Marmara Bölgesi Üretim Tüketim Verisi (TAY_ELEK_MRMR_VERI)', v: true },
              { n: 'TR Elektrik Kurulu Güç, Üretim ve Tüketim Verileri (TAY_ULUSAL_VERI)', v: true },
              { n: 'Elektrik Kesintisi Verileri (TAY_ELEK_KESINTI)', v: true },
              { n: 'Elektrikli Şarj İstasyonları (TAY_ELEK_SARJ_IST)', v: true },
              { n: 'İlçelerdeki Petrol Bayiliği (TAY_PETROL_EPDK_2026)', v: true },
              { n: 'İlçelerdeki LPG Bayiliği (TAY_LPG_EPDK_2026)', v: true },
              { n: 'Lisanslı RES Alanları (TAY_RES_LSN_ALAN)', v: true },
              { n: 'Planlanan RES Alanları (TAY_RES_PLN_ALAN)', v: true },
              { n: 'Önlisanslı RES Alanları (TAY_RES_ON_ALAN)', v: true },
              { n: 'Lisanslı RES Türbinleri (TAY_RES_LSN_TRBN)', v: true },
              { n: 'Planlanan RES Türbinleri (TAY_RES_PLN_TRBN)', v: true },
              { n: 'Önlisanslı RES Türbinleri (TAY_RES_ON_TRBN)', v: true },
              { n: 'Marmara Bölgesi İBBS Düzeyleri (TAY_MRMR_BOLGE)', v: true },
              { n: 'Marmara Bölgesi Sınırları (TAY_MRMR_SINIR)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.2',
        title: 'Kritik İçme ve Kullanma Suyu Altyapıları',
        entries: [
          {
            sartname: 'İSKİ barajları, göletler, kuyular, dereler, içme suyu isale ve dağıtım hatları, arıtma tesisleri, terfi merkezleri ve depolar',
            analiz: 'İçme suyu kaynak koruma havzaları, isale kapasitesi ve su depolama yedeklilik analizi',
            veri: [
              { n: 'Mevcut ve Plandaki Barajlar (TAY_BARAJLAR)', v: true },
              { n: 'Göletler (TAY_GOLETLER)', v: true },
              { n: 'Kuyular (TAY_KUYU)', v: true },
              { n: 'Dereler (TAY_DERELER)', v: true },
              { n: 'İçme Suyu İsale Hatları (TAY_ICMESUYU_ISALE)', v: true },
              { n: 'İçmesuyu İsale Hattı Noktaları (TAY_ICMESUYU_ISALE_NOKTA)', v: true },
              { n: 'İçme Suyu Dağıtım Hatları (TAY_ICMESUYU_DAGITIM)', v: true },
              { n: 'İçmesuyu Arıtma Tesisleri Alanları (TAY_ICMESUYU_IAT)', v: true },
              { n: 'İçmesuyu Arıtma Tesisleri Noktaları (TAY_ICMESUYU_IAT_NOKTA)', v: true },
              { n: 'İçmesuyu Terfi Merkezleri (TAY_ICMESUYU_TERFI)', v: true },
              { n: 'İçmesuyu Terfi Merkezi Alanları (TAY_ICMESUYU_TERFI_ALAN)', v: true },
              { n: 'İçmesuyu Temizsu Depoları (TAY_ICMESUYU_DEPO)', v: true },
              { n: 'İçmesuyu Temizsu Depo Alanları (TAY_ICMESUYU_DEPO_ALAN)', v: true },
              { n: 'İçmesuyu Kolektor Hatları (TAY_ICMESUYU_KOLEKTOR)', v: true },
              { n: 'İçmesuyu Kolektor Noktaları (TAY_ICMESUYU_KOLEKTOR_NOKTA)', v: true },
              { n: 'İçmesuyu Numune Noktaları (TAY_ICMESUYU_NUMUNE)', v: true },
              { n: 'İçmesuyu Sulama Hatları (TAY_ICMESUYU_SULAMA)', v: true },
              { n: 'İçmesuyu Sulama Noktaları (TAY_ICMESUYU_SULAMA_NOKTA)', v: true },
              { n: 'İSKİ Parselleri (TAY_ISKI_PARSEL)', v: true },
              { n: 'Havzalardaki Yapılaşma (TAY_HAVZALARDAYAPI)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.3',
        title: 'Kritik Atık ve Drenaj Altyapıları',
        entries: [
          {
            sartname: 'Atıksu arıtma tesisleri (AAT), deşarj hatları, yağmursuyu drenaj ana hatları, dere işletme bantları, taşkın alanları, katı atık ve hafriyat sahaları',
            analiz: 'Atıksu toplama, yağmursuyu havzaları hidrolik kapasitesi ve katı atık bertaraf yönetimi analizi',
            veri: [
              { n: 'Atıksu Arıtma Tesisleri Alanları (TAY_ATIKSU_AAT)', v: true },
              { n: 'Atıksu Arıtma Tesisleri Noktaları (TAY_AAT_POINT)', v: true },
              { n: 'Planlanan Atıksu Arıtma Tesisleri Noktaları (TAY_PLN_AAT_POINT)', v: true },
              { n: 'Atıksu Arıtma Tesisleri Numune Noktaları (TAY_ATIKSU_AAT_NUMUNE)', v: true },
              { n: 'Atıksu Toplama Hatları (TAY_ATIKSU_HAT)', v: true },
              { n: 'Atıksu Deşarj Hatları (TAY_ATIKSU_DESARJHAT)', v: true },
              { n: 'Atıksu Terfi Merkezleri (TAY_ATIKSU_TERFI)', v: true },
              { n: 'Atıksu Deşarjı Olan Tesisler (TAY_DESARJ_TESIS)', v: true },
              { n: 'Deşarj Noktaları (TAY_DESARJ_NOKTA)', v: true },
              { n: 'Yağmursuyu Drenaj Ana Hatları (TAY_YAGMURS_ANADRENAJ)', v: true },
              { n: 'Yağmursuyu Drenaj Hatları (TAY_YAGMURS_DRENAJ)', v: true },
              { n: 'Toplayıcı Yağmur Suyu Hattı (TAY_YAGMUR_TOPLAYICI)', v: true },
              { n: 'Toplayıcı Yağmur Suyu Hattı Noktaları (TAY_YAGMUR_TOPLAYICI_NOKTA)', v: true },
              { n: 'Yağmursuyu Havzaları (TAY_YGMR_HAVZA)', v: true },
              { n: 'Avrupa Yakası Dere İşletme Bantları (TAY_AVR_DERE_ISTBANT)', v: true },
              { n: 'Anadolu Yakası Dere İşletme Bantları (TAY_AND_DERE_ISTBANT)', v: true },
              { n: 'İSKİ Dere Taşkın Alanları (TAY_DERE_TASKIN)', v: true },
              { n: 'Su Geri Kazanım Hatları (TAY_GERIKAZANIMHAT)', v: true },
              { n: 'Geri Kazanım Nokta (TAY_GERIKAZANIM_NOKTA)', v: true },
              { n: 'Katı Atık Depolama ve Bertaraf Entegre Tesisleri (TAY_KATIATIK_TESIS)', v: true },
              { n: 'İlçe Bazında Evsel Atık Miktarı (ton/yıl) (TAY_ATIK_EVSELVERI)', v: true },
              { n: 'Tehlikeli Atık Tesisleri (TAY_TEHLIKELIATK_TESIS)', v: true },
              { n: 'Atık Elektrikli ve Elektronik Eşya Tesisleri (TAY_AEEE_TESIS)', v: true },
              { n: 'Hafriyat Döküm Sahaları (TAY_AKTF_HAFRIYAT)', v: true },
              { n: 'Pasif Hafriyat Döküm Sahaları (2021-2026) (TAY_PSF_HAFRIYAT)', v: true },
              { n: 'İSTAÇ Hafriyat Atıkları Yönetim Ofisleri (TAY_HAFRIYATYNTM)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.4',
        title: 'Kritik Bilgi, İletişim ve Acil Durum Altyapıları',
        entries: [
          {
            sartname: 'Veri merkezleri, telekomünikasyon santralleri, baz istasyonları ve ilçe sağlık altyapıları',
            analiz: 'Kritik veri merkezleri sürekliliği, iletişim ağı yedekliliği ve acil sağlık altyapısı kapasitesi',
            veri: [
              { n: 'Veri Merkezleri (TAY_VERI_MERKEZLERI)', v: true },
              { n: 'İlçe Bazında Sağlık Tesisi Sayısı (TAY_SAGLIKTESIS_ILCE)', v: true },
              { n: 'Fiber optik ana iletim hatları ve telekomünikasyon santralleri', v: true },
              { n: 'GSM baz istasyonları ve acil telsiz haberleşme kuleleri', v: true }
            ]
          }
        ]
      },

      // 4. DOĞA KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '4.1',
        title: 'Deprem Riski',
        entries: [
          {
            sartname: 'Depremin enerji altyapısı, su ve atıksu sistemleri, atık yönetimi sistemleri ve ICT üzerindeki fiziksel ve işlevsel etkilerinin değerlendirilmesi',
            analiz: 'Deprem tehlikesi–teknik altyapı maruziyet analizi',
            veri: [
              { n: 'Deterministik deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: '475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: '2475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: 'İstanbul doğal gaz altyapısı deprem hasar sonucu (ist_dogalgaz_hasar)', v: true },
              { n: 'İçme suyu isale hattı deprem hasar sonucu (isale_hatti_l6_hasar)', v: true },
              { n: 'Elektrik ve enerji altyapısı envanteri ve deprem hasar sonuçları', v: false },
              { n: 'Atıksu ve yağmur suyu altyapısı envanteri ve deprem hasar sonuçları', v: false },
              { n: 'Atık yönetimi tesisleri envanteri ve yapısal durum verisi', v: false },
              { n: 'Bilgi ve iletişim altyapısı envanteri ve deprem hasar sonuçları', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '4.2',
        title: 'Sel ve Taşkın Riski',
        entries: [
          {
            sartname: 'Sel ve taşkının enerji altyapısı, su ve atıksu sistemleri, atık yönetimi sistemleri ve ICT üzerindeki fiziksel ve işlevsel etkilerinin değerlendirilmesi',
            analiz: 'Q500 taşkın tehlikesi–teknik altyapı maruziyet analizi',
            veri: [
              { n: '500 yıllık tekerrür periyotlu su derinliği temelli taşkın tehlike haritası (İSKİ ve TUCBS verileri)', v: true },
              { n: 'Doğal gaz iletim ve dağıtım hattı güzergâhları', v: true },
              { n: 'İçme suyu isale hattı güzergâhları', v: true },
              { n: 'Elektrik iletim, dağıtım ve trafo sistemi', v: false },
              { n: 'Atıksu ve yağmur suyu sistemi', v: false },
              { n: 'Atık yönetimi tesisleri ve taşıma güzergâhları', v: false },
              { n: 'Bilgi ve iletişim altyapısı', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '4.3',
        title: 'Heyelan',
        entries: [
          {
            sartname: 'Heyelanın enerji altyapısı, su ve atıksu sistemleri, atık yönetimi sistemleri ve ICT üzerindeki fiziksel ve işlevsel etkilerinin değerlendirilmesi',
            analiz: 'Heyelan maruziyeti, hat deformasyonu ve hizmet kesintisi analizi',
            veri: [
              { n: 'Heyelana maruz bölgeler haritası (İBB DEZİM verileri)', v: true },
              { n: 'Heyelan duyarlılık haritası (İBB DEZİM verileri)', v: true },
              { n: 'İçme suyu isale hattı güzergâhları', v: true },
              { n: 'Doğal gaz iletim ve dağıtım hattı güzergâhları', v: true },
              { n: 'Elektrik iletim ve dağıtım hatları', v: false },
              { n: 'Atıksu ve yağmur suyu hatları', v: false },
              { n: 'Atık yönetimi tesisleri ve taşıma güzergâhları', v: false },
              { n: 'Fiber optik ve diğer bilgi-iletişim hatları', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '4.4',
        title: 'Tsunami',
        entries: [
          {
            sartname: 'Kıyı arıtma tesisleri, deşarj yapıları ve sahil teknik altyapısının tsunami maruziyeti',
            analiz: 'Tsunami kıyı teknik altyapı hasar ve işlev kaybı analizi',
            veri: [
              { n: 'Tsunami su basma haritası ve kıyı arıtma tesisleri kesişimi', v: true },
              { n: 'Kıyı trafo merkezleri ve enerji iletim hatları su basma durumu', v: false },
              { n: 'Deniz deşarj hatları geri basma ve hasar riski', v: false }
            ]
          }
        ]
      },

      // 5. İNSAN VE TEKNOLOJİ KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.1',
        title: 'Pandemi',
        entries: [
          {
            sartname: 'Pandemi koşullarının teknik altyapı hizmetlerinin işletilmesi, bakımı ve sürekliliği üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'İş gücü bağımlılığı, işletme kapasitesi ve hizmet sürekliliği analizi',
            veri: [
              { n: 'Kritik teknik altyapı tesisleri ve hizmet alanları envanteri', v: false },
              { n: 'İşletme ve bakım personeli sayısı, uzmanlık ve vardiya verileri', v: false },
              { n: 'Asgari personelle işletim ve acil durum planları', v: false },
              { n: 'Uzaktan işletme, otomasyon ve kontrol kapasitesi (SCADA)', v: false },
              { n: 'Pandemi dönemlerine ait hizmet kesintisi ve bakım-onarım kayıtları', v: false },
              { n: 'Kritik yedek parça, kimyasal madde ve ekipman tedarik bağımlılığı', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.2',
        title: 'Yangın',
        entries: [
          {
            sartname: 'Yangının enerji hatları, doğalgaz boruları ve arıtma tesisleri üzerindeki riskleri',
            analiz: 'Yangın maruziyeti ve altyapı yangın riski analizi',
            veri: [
              { n: 'Yangın tehlike katmanı ve trafo merkezleri / doğalgaz şebekesi çakıştırması', v: true },
              { n: 'Orman yangını tehdidi altındaki enerji nakil hatları', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.3',
        title: 'Patlama ve Endüstriyel Kazalar',
        entries: [
          {
            sartname: 'Patlama ve endüstriyel kazaların enerji, su ve atıksu, atık yönetimi ve ICT sistemlerinde oluşturabileceği doğrudan ve zincirleme etkilerin değerlendirilmesi',
            analiz: 'Endüstriyel tehlike maruziyeti ve zincirleme altyapı hasarı analizi',
            veri: [
              { n: 'Normalize edilmiş endüstriyel tehlike katmanı (Endustriyel_Tehlikeler_Normalizasyon)', v: true },
              { n: 'Normalize edilmiş kimyasal tehlike katmanı (Kimyasal_Tehlikeler_Normalizasyon)', v: true },
              { n: 'Doğal gaz iletim ve dağıtım altyapısı', v: true },
              { n: 'Elektrik ve enerji üretim, iletim ve dağıtım tesisleri', v: false },
              { n: 'Su ve atıksu tesisleri ile ana iletim hatları', v: false },
              { n: 'Atık yönetimi ve tehlikeli atık tesisleri', v: false },
              { n: 'Bilgi ve iletişim altyapısı tesisleri', v: false },
              { n: 'Sanayi alanları, organize sanayi bölgeleri ve riskli tesis envanteri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.4',
        title: 'Savaş ve Terör Saldırıları',
        entries: [
          {
            sartname: 'Kritik altyapı tesislerine yönelik sabotaj, siber saldırı ve fiziksel saldırı dayanıklılığı',
            analiz: 'Altyapı siber güvenlik, SCADA yedekleme ve fiziki koruma analizi',
            veri: [
              { n: 'Kritik su arıtma ve baraj tesisleri koruma protokolleri', v: false },
              { n: 'SCADA kontrol sistemleri siber dayanıklılık ve bağımsız ada çalışma kapasitesi', v: false }
            ]
          }
        ]
      },

      // 6. İKLİM KRİZİ ETKİLERİNİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.1',
        title: 'Aşırı Sıcaklıklar',
        climate: true,
        entries: [
          {
            sartname: 'İklim krizine bağlı aşırı sıcaklıkların teknik altyapı sistemleri üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Aşırı sıcaklık–enerji/su talebi ve şebeke aşırı yüklenme analizi',
            veri: [
              { n: 'Pik sıcaklık günlerinde elektrik trafoları yüklenme ve soğutma verileri', v: true },
              { n: 'İçme suyu barajlarında buharlaşma kayıpları ve su kalitesi termal parametreleri', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.2',
        title: 'Deniz Seviyesinin Yükselmesi',
        climate: true,
        entries: [
          {
            sartname: 'Deniz seviyesinin yükselmesinin kıyı teknik altyapı sistemleri üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Kıyı teknik altyapı su basması ve tuzlanma analizi',
            veri: [
              { n: 'Kıyı atıksu arıtma tesisleri su seviyesi maruziyet analizi', v: true },
              { n: 'Kıyı akiferleri tuzlu su girişimi ve yeraltı içme suyu kuyuları risk verisi', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.3',
        title: 'Fırtına ve Aşırı Hava Olayları',
        climate: true,
        entries: [
          {
            sartname: 'Fırtına ve yıldırım olaylarının enerji ve iletişim iletim hatlarına etkileri',
            analiz: 'Fırtına kaynaklı hat kopması ve trafo devre dışı kalma analizi',
            veri: [
              { n: 'Geçmiş şiddetli fırtınalarda elektrik kesinti kayıtları ve hasar haritaları', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN TEKNİK ALTYAPI SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.4',
        title: 'Kıtlık ve Kaynak Stresi',
        climate: true,
        entries: [
          {
            sartname: 'İklim krizine bağlı kuraklık ve su stresi senaryolarının teknik altyapıya etkileri',
            analiz: 'Su stresi, baraj doluluk projeksiyonu ve alternatif su arzı analizi',
            veri: [
              { n: 'İstanbul barajları yıllık su bütçesi ve kuraklık dönemi simülasyonları (İSKİ)', v: true },
              { n: 'Melen ve Yeşilçay gibi şehirlerarası su transferi bağımlılık analizi', v: true }
            ]
          }
        ]
      },

      // 7. AFET VE İKLİM KRİZİ KARŞISINDA TEKNİK ALTYAPI SİSTEMLERİ YÖNELİK İYİ UYGULAMA ÖRNEKLERİ
      {
        chapterNum: '7',
        chapterTitle: 'AFET VE İKLİM KRİZİ KARŞISINDA TEKNİK ALTYAPI SİSTEMLERİ YÖNELİK İYİ UYGULAMA ÖRNEKLERİ',
        code: '7.1',
        title: 'Afetlere ve İklim Değişikliğine Dayanıklı Teknik Altyapı Sistemleri: Uluslararası Uygulama Örnekleri',
        entries: [
          {
            sartname: 'Uluslararası akıllı şebekeler, mikrogrip sistemleri ve dirençli su arıtma iyi uygulama örnekleri',
            analiz: 'Uluslararası dirençli altyapı uygulamaları analizi',
            veri: [
              { n: 'Singapur NEWater ve entegre kapalı devre su yönetimi modeli', v: true },
              { n: 'Kopenhag ve Amsterdam akıllı yağmur suyu drenajı ve iklim parkları', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '7',
        chapterTitle: 'AFET VE İKLİM KRİZİ KARŞISINDA TEKNİK ALTYAPI SİSTEMLERİ YÖNELİK İYİ UYGULAMA ÖRNEKLERİ',
        code: '7.2',
        title: 'Afetlere ve İklim Değişikliğine Dayanıklı Teknik Altyapı Sistemleri: Ulusal Uygulama Örnekleri',
        entries: [
          {
            sartname: 'Türkiye ve İstanbul’da uygulanan otomatik vana kapatma ve SCADA yedekleme projeleri',
            analiz: 'Ulusal dayanıklı teknik altyapı örnekleri analizi',
            veri: [
              { n: 'İGDAŞ Erken Uyarı ve Otomatik Gaz Kesme Sistemi uygulaması', v: true },
              { n: 'İSKİ SCADA merkezleri ve yedekli pompa istasyonu projeleri', v: true }
            ]
          }
        ]
      },

      // 8. ÇOKLU RİSK DEĞERLENDİRMESİ
      {
        chapterNum: '8',
        chapterTitle: 'ÇOKLU RİSK DEĞERLENDİRMESİ',
        code: '8.1',
        title: 'Çoklu Risk Değerlendirmesi ve Sentez',
        entries: [
          {
            sartname: 'Teknik altyapı sistemleri üzerinde tüm tehlikelerin çakıştırılması ve kesişim analizi',
            analiz: 'Teknik altyapı kümülatif risk haritası ve öncelik matrisi',
            veri: [
              { n: 'Doğalgaz, elektrik, su ve atıksu çoklu risk çakıştırma katmanı', v: true }
            ]
          }
        ]
      },

      // 9. KAYNAKÇA
      {
        chapterNum: '9',
        chapterTitle: 'KAYNAKÇA',
        code: '9.1',
        title: 'Kaynakça ve Referanslar',
        entries: [
          {
            sartname: 'Teknik altyapı bölümünde yararlanılan kaynaklar, şartnameler ve standartlar',
            analiz: 'Kaynakça listesi',
            veri: [
              { n: 'İSKİ, İGDAŞ, TEİAŞ, BEDAŞ, AYEDAŞ ve uluslararası altyapı literatürü', v: true }
            ]
          }
        ]
      }
    ]
  },

  lojistik: {
    label: 'Lojistik',
    chapters: [
      { num: '1', title: 'GİRİŞ' },
      { num: '2', title: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE' },
      { num: '3', title: 'LOJİSTİK SİSTEMLERİ VE KRİTİK BİLEŞENLERİ' },
      { num: '4', title: 'DOĞA KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLER' },
      { num: '5', title: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ' },
      { num: '6', title: 'İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ' },
      { num: '7', title: 'AFET VE İKLİM KRİZİ KARŞISINDA LOJİSTİK SİSTEMLERİNE YÖNELİK İYİ UYGULAMA ÖRNEKLERİ' },
      { num: '8', title: 'ÇOKLU RİSK DEĞERLENDİRMESİ' },
      { num: '9', title: 'KAYNAKÇA' }
    ],
    sections: [
      // 1. GİRİŞ
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.1',
        title: 'Çalışmanın Amacı',
        entries: [
          {
            sartname: 'İstanbul ve Marmara lojistik sisteminin afet ve iklim dirençliliği çalışma amacının belirlenmesi',
            analiz: 'Amaç ve lojistik dayanıklılık vizyonu analizi',
            veri: [
              { n: 'Afet anı ve sonrası kesintisiz tedarik zinciri hedefleri', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.2',
        title: 'Kapsam',
        entries: [
          {
            sartname: 'Lojistik modlar, odaklar, terminaller ve tedarik zincirleri kapsam sınırlandırması',
            analiz: 'Mekânsal ve sektörel kapsam analizi',
            veri: [
              { n: 'İstanbul ve Marmara Bölgesi yük koridorları ve depolama alanları kapsamı', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '1',
        chapterTitle: 'GİRİŞ',
        code: '1.3',
        title: 'Yöntem ve Değerlendirme Yaklaşımı',
        entries: [
          {
            sartname: 'Tedarik zinciri kırılganlığı ve lojistik erişilebilirlik analiz modeli',
            analiz: 'Lojistik ağ simülasyonu ve risk analiz yöntemi',
            veri: [
              { n: 'Mekânsal ağ analizi ve lojistik erişilebilirlik kaybı modelleme metodolojisi', v: true }
            ]
          }
        ]
      },

      // 2. STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.1',
        title: 'İlgili Uluslararası Anlaşma ve Sözleşmeler',
        entries: [
          {
            sartname: 'Uluslararası taşımacılık ve lojistik sözleşmelerinin (ADR, RID, TIR Karnesi vb.) incelenmesi',
            analiz: 'Uluslararası taşımacılık mevzuatı uyum analizi',
            veri: [
              { n: 'Tehlikeli Malların Karayoluyla Taşınması Anlaşması (ADR)', v: true },
              { n: 'Demiryoluyla Uluslararası Taşımalara İlişkin Sözleşme (COTIF/RID)', v: true },
              { n: 'IMO Denizde Güvenlik (SOLAS) ve MARPOL sözleşmeleri', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.2',
        title: 'Üst Ölçekli Ulusal ve Bölgesel Strateji ve Politika Belgeleri',
        entries: [
          {
            sartname: 'Ulaştırma ve Lojistik Ana Planı 2053 ve TAMP Lojistik Hizmet Grubu Planı',
            analiz: 'Ulusal lojistik stratejileri uyum analizi',
            veri: [
              { n: 'Ulaştırma ve Lojistik Ana Planı 2053 yük koridorları', v: true },
              { n: 'TAMP Lojistik ve İkmal Hizmet Grubu Planı hedefleri', v: true },
              { n: 'Türkiye Lojistik Merkezler Master Planı', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.3',
        title: 'İstanbul İli Stratejik Planlar ve Belgeler',
        entries: [
          {
            sartname: 'İstanbul Gıda Strateji Belgesi, İRAP Lojistik Önlemleri ve Vizyon 2050',
            analiz: 'İl düzeyinde lojistik ve tedarik stratejileri analizi',
            veri: [
              { n: 'İstanbul Gıda Strateji Belgesi ve toptancı halleri planlaması', v: true },
              { n: 'İstanbul İRAP acil lojistik alanları ve depolama stratejileri', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.4',
        title: 'İlgili Mekânsal Planlar',
        entries: [
          {
            sartname: 'Mekânsal planlarda lojistik köyler, liman alanları ve depolama bölgeleri',
            analiz: 'Lojistik alanlar mekânsal planlama kararları analizi',
            veri: [
              { n: '1/100.000 ÇDP lojistik bölge ve liman kararları (Ambarlı, Hadımköy, Tuzla vb.)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.5',
        title: 'Yasal-Yönetsel Çerçeve',
        entries: [
          {
            sartname: 'Karayolu Taşıma Kanunu, Limanlar Kanunu, Gümrük Kanunu ve yetki dağılımı',
            analiz: 'Lojistik yasal-yönetsel yetki matrisi analizi',
            veri: [
              { n: '4925 Sayılı Karayolu Taşıma Kanunu ve 4458 Sayılı Gümrük Kanunu', v: true },
              { n: '618 Sayılı Limanlar Kanunu ve TCDD Taşımacılık A.Ş. mevzuatı', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '2',
        chapterTitle: 'STRATEJİ, PLANLAMA VE YASAL ÇERÇEVE',
        code: '2.6',
        title: 'Türkiye ve İstanbul’da Tarihsel Süreçte Afetler ve İklim Krizleri',
        entries: [
          {
            sartname: 'Geçmiş afetlerde yaşanan tedarik zinciri aksamaları, liman hasarları ve gıda krizleri',
            analiz: 'Tarihsel lojistik kesinti ve hasar analizi',
            veri: [
              { n: '1999 Depremi Derince ve Ambarlı liman operasyon durması kayıtları', v: true },
              { n: '6 Şubat 2023 Depremlerinde İskenderun Limanı yangını ve lojistik dersler', v: true }
            ]
          }
        ]
      },

      // 3. LOJİSTİK SİSTEMLERİ VE KRİTİK BİLEŞENLERİ
      {
        chapterNum: '3',
        chapterTitle: 'LOJİSTİK SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.1',
        title: 'Kritik Ulaşım Ağları (Karayolu, Demiryolu, Havayolu, Denizyolu)',
        entries: [
          {
            sartname: 'Ağır taşıt yük koridorları, demiryolu iltisak hatları, hava kargo ve liman bağlantıları, Ro-Ro ve konteyner hatları',
            analiz: 'Çok modlu lojistik ağ ve koridor hiyerarşisi, yük elleçleme ve gros ton taşımacılık analizi',
            veri: [
              { n: 'Karayolu yük taşımacılığı ana arterleri (TEM, Kuzey Marmara Otoyolu, D-100)', v: true },
              { n: 'Halkalı Yük Terminali (Lojistik Merkez) İstatistikleri (LOJ_TCDD_Yuk_Terminalleri_2015-2024)', v: true },
              { n: 'Havayolu ile taşınan yük miktarı (Marmara Bölgesi ve İstanbul Havalimanları Kıyaslaması) (LOJ_Havalimanı_Yük_2015-2024)', v: true },
              { n: 'Marmara Bölgesi Havalimanları (Marmara_Havalimanlari_2025)', v: true },
              { n: 'Liman Başkanlıkları Bazında Gemilerde Taşınan Gros Ton Miktarı (LOJ_Gros_Ton_2015-2024)', v: true },
              { n: 'Liman Başkanlıkları Bazında Gemi Sayısı (LOJ_Gemi_sayisi_2015-2024)', v: true },
              { n: 'Konteyner Yük Elleçleme İstatistikleri (LOJ_Konteyner_Yuk_Ellecleme_2015-2024)', v: true },
              { n: 'Yük Elleçleme İstatistikleri (LOJ_Yuk_Ellecleme_2015-2024)', v: true },
              { n: 'Ro-Ro İstatistikleri (LOJ_Ro-Ro_istatistikleri_2019-2024)', v: true },
              { n: 'Marmara Bölgesi Liman İşletmeleri (LOJ_Marmara_Bolgesi_Liman_ isletmeleri_2025)', v: true },
              { n: 'Marmara Bölgesi Yük Limanları (Lojistik_limanlar_2025)', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'LOJİSTİK SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.2',
        title: 'Kritik Lojistik Odakları',
        entries: [
          {
            sartname: 'Organize Sanayi Bölgeleri (OSB), haller, sanayi sektörleri, serbest bölgeler ve eşya nakliye firma merkezleri',
            analiz: 'Kritik lojistik odakları mekânsal kümelenme, OSB sektörel dağılımı ve gıda tedarik zinciri analizi',
            veri: [
              { n: 'İstanbul Kuru Gıda, Sebze Meyve ve Su Ürünleri Halleri (Haller_2025)', v: true },
              { n: 'Marmara Bölgesindeki Organize Sanayi Bölgelerinin Konumları (Marmara_OSB_2025)', v: true },
              { n: 'Makro Arazi Kullanım Üzerindeki İSO Sanayi Sektörleri (Sanayi_alan_sektorler_2025)', v: true },
              { n: "İstanbul'un Doğu Sınırındaki Sanayi Alanlarının Sürekliliğini Gösteren Gebze Sanayi Alanları (Kocaeli_Gebze_sanayi_alanlari_2025)", v: true },
              { n: 'OSBlerdeki Sektör Dağılımı (Anadolu Yakası OSB) (LOJ_Anadolu_yakası_osb_ sektörler)', v: true },
              { n: 'OSBlerdeki Sektör Dağılımı (Kimya OSB) (LOJ_kimya_osb_sektörler)', v: true },
              { n: 'OSBlerdeki Sektör Dağılımı (Deri OSB) (LOJ_deri_OSB_sektörler)', v: true },
              { n: 'OSBlerdeki Sektör Dağılımı (Tuzla OSB) (LOJ_tuzla_OSB_sektörler)', v: true },
              { n: 'OSBlerdeki Sektör Dağılımı (Birlik OSB) (LOJ_birlik_OSB_sektörler)', v: true },
              { n: 'OSBlerdeki Sektör Dağılımı (Dudullu OSB) (LOJ_dudullu_OSB_sektörler)', v: true },
              { n: 'OSBlerdeki Sektör Dağılımı (Beylikdüzü OSB) (LOJ_beylikdüzü_osb_sektörler)', v: true },
              { n: 'OSBlerdeki Sektör Dağılımı (İkitelli OSB) (LOJ_ikitelli_OSB_sektörler)', v: true },
              { n: 'Marmara Bölgesindeki Serbest Bölgeler (Marmara_serbest_bolgeler_2025)', v: true },
              { n: '2009 ÇDP Alanları (CDP_2009_alan)', v: true },
              { n: "İstanbul'da Eşya Taşımacılığı Yapan Nakliye Firma Konumları (Nakliye_firma_2025)", v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'LOJİSTİK SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.3',
        title: 'Kritik Lojistik Terminaller',
        entries: [
          {
            sartname: 'Yük terminalleri, gümrük müdürlükleri, antrepolar, ithalat-ihracat merkezleri ve yanıcı-parlayıcı depolar',
            analiz: 'Terminal depolama kapasitesi, gümrük işlem hacmi ve yanıcı-patlayıcı tehlike yoğunluk analizi',
            veri: [
              { n: 'Mevcut Yük Terminali (Lojistik Merkez) Konumu (Yuk_Terminalleri_2025)', v: true },
              { n: "İstanbul'daki Gümrük Müdürlükleri Konumları ve Bağlı Antrepo Sayıları (Gumruk_mudurlukleri_2025)", v: true },
              { n: 'İstanbul Gümrük İstatistikleri (İthalat-İhracat-Antrepo) (LOJ_İstanbul_Gumruk_istatistikleri_2016-2024)', v: true },
              { n: 'İstanbul Gümrük Değerleri (İthalat-İhracat) (LOJ_İstanbul_Gumruk_ithalat_ihracat_deger_2017-2024)', v: true },
              { n: 'Yanıcı Parlayıcı Patlayıcı Madde Depo Bilgileri (LOJ_İstanbul_Parlayıcı_Depolar)', v: true },
              { n: 'Yanıcı Parlayıcı Patlayıcı Madde Depo Konumları (Yanici_patlayici_depo_2025)', v: true }
            ]
          }
        ]
      },

      // 4. DOĞA KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLER
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLER',
        code: '4.1',
        title: 'Deprem Riski',
        entries: [
          {
            sartname: 'Depremin ulaşım ağı, lojistik odakları ve lojistik terminaller üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Deprem tehlikesi–lojistik sistem maruziyet analizi',
            veri: [
              { n: 'Deterministik deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: '475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: '2475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v: true },
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v: true },
              { n: 'Havayolu ve denizyolu lojistik bağlantıları envanteri', v: false },
              { n: 'Lojistik odakları envanteri', v: false },
              { n: 'Lojistik terminaller envanteri', v: false }
            ]
          },
          {
            sartname: 'Deprem kaynaklı ulaşım kesintilerinin lojistik erişilebilirlik, yük hareketleri ve hizmet sürekliliği üzerindeki etkilerinin değerlendirilmesi',
            analiz: 'Deprem kaynaklı lojistik bağlantı ve erişilebilirlik kaybı analizi',
            veri: [
              { n: 'Üç deprem senaryosuna göre olası karayolu kapanma sonuçları (Yol_Agi_3Sen_Kapanma_Olasi)', v: true },
              { n: 'Deprem senaryosuna göre kapanan raylı sistem kesimleri (Raylisis_BlockedParts_fintEQ)', v: true },
              { n: 'PGA temelli köprü hasar sonuçları', v: true },
              { n: 'Havayolu ve denizyolu hizmet kesintisi verileri', v: false },
              { n: 'Lojistik odaklara ve terminallere erişim bağlantıları', v: false },
              { n: 'Tesis bazında yük akımı, kapasite, alternatif bağlantı ve yedekleme verileri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLER',
        code: '4.2',
        title: 'Sel ve Taşkın Riski',
        entries: [
          {
            sartname: 'Sel ve taşkının ulaşım ağı, lojistik odakları ve lojistik terminaller üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Q500 taşkın tehlikesi–lojistik sistem maruziyet analizi',
            veri: [
              { n: '500 yıllık tekerrür periyotlu su derinliği temelli taşkın tehlike haritası (İSKİ ve TUCBS verileri)', v: true },
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v: true },
              { n: 'Havayolu ve denizyolu lojistik bağlantıları envanteri', v: false },
              { n: 'Lojistik odakları envanteri', v: false },
              { n: 'Lojistik terminaller envanteri', v: false }
            ]
          },
          {
            sartname: 'Q500 taşkın senaryosunda lojistik ulaşım bağlantılarının kapanması ve tesis erişilebilirliğinin azalmasının değerlendirilmesi',
            analiz: 'Q500 lojistik erişilebilirlik ve hizmet sürekliliği analizi',
            veri: [
              { n: 'İstanbul SKUP Projesi Q500 karayolu kapanma ve su altında kalma sonuçları', v: true },
              { n: 'Q500 taşkın senaryosuna göre kapanan raylı sistem kesimleri (RailwayNetwork_Closed_Parts_Q500)', v: true },
              { n: 'Havayolu ve denizyolu taşkın kaynaklı kapanma/hizmet kesintisi verileri', v: false },
              { n: 'Lojistik odaklara ve terminallere erişim bağlantıları', v: false },
              { n: 'Tesis bazında kapasite, yük akımı ve alternatif erişim verileri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLER',
        code: '4.3',
        title: 'Heyelan',
        entries: [
          {
            sartname: 'Heyelan ve kütle hareketlerinin yük koridorları ve depo alanları üzerindeki etkileri',
            analiz: 'Heyelan maruziyeti ve yük koridoru kesinti analizi',
            veri: [
              { n: 'Heyelan duyarlılık haritası ve yük koridorları kesişimi', v: true },
              { n: 'Depo ve antrepo tesisleri zemin kayma ve şev duraylılığı riski', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '4',
        chapterTitle: 'DOĞA KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLER',
        code: '4.4',
        title: 'Tsunami',
        entries: [
          {
            sartname: 'Tsunami dalgalarının limanlar, iskeleler, konteyner sahaları ve kıyı antrepolarındaki hasarları',
            analiz: 'Tsunami liman ve kıyı lojistiği su basma / hasar analizi',
            veri: [
              { n: 'Ambarlı, Tuzla, Haydarpaşa liman sahaları tsunami su basma katmanı', v: true },
              { n: 'Konteyner ve tehlikeli madde sürüklenme / yangın riski', v: false }
            ]
          }
        ]
      },

      // 5. İNSAN VE TEKNOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.1',
        title: 'Pandemi',
        entries: [
          {
            sartname: 'Pandemi döneminde tedarik zinciri darboğazları, kargo hacmi patlaması ve personel kısıtları',
            analiz: 'Tedarik zinciri dayanıklılığı ve e-ticaret lojistiği stres analizi',
            veri: [
              { n: 'Pandemi dönemi gıda ve temel tüketim maddesi sevkiyat verileri', v: false },
              { n: 'Kritik tıbbi malzeme ve aşı soğuk zincir lojistiği operasyon planı', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.2',
        title: 'Yangın',
        entries: [
          {
            sartname: 'Yangının ulaşım ağı, lojistik odakları, terminaller, yükler ve hizmet sürekliliği üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Yangın maruziyeti ve lojistik operasyon kesintisi analizi',
            veri: [
              { n: 'Normalize edilmiş yangın tehlikesi katmanı (Yangin_Tehlike_Normalizasyon)', v: true },
              { n: 'Deprem sonrası yangın tehlike katmanı (Deprem Sonrası Yangın)', v: true },
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v: true },
              { n: 'Lojistik odakları ve terminaller envanteri', v: false },
              { n: 'Depolanan yük türü, yanıcılık ve tehlikeli madde bilgileri', v: false },
              { n: 'Yangın nedeniyle oluşan tesis ve güzergâh kapanma kayıtları', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.3',
        title: 'Patlama ve Endüstriyel Kazalar',
        entries: [
          {
            sartname: 'Patlama ve endüstriyel kazaların ulaşım ağı, lojistik odakları, terminaller ve tehlikeli madde taşımacılığı üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Endüstriyel tehlike ve tehlikeli madde lojistiği maruziyet analizi',
            veri: [
              { n: 'Normalize edilmiş endüstriyel tehlike katmanı (Endustriyel_Tehlikeler_Normalizasyon)', v: true },
              { n: 'Normalize edilmiş kimyasal tehlike katmanı (Kimyasal_Tehlikeler_Normalizasyon)', v: true },
              { n: 'Sanayi alanları, organize sanayi bölgeleri ve riskli tesis envanteri', v: false },
              { n: 'Tehlikeli madde depolama ve taşıma güzergâhları', v: false },
              { n: 'Lojistik odakları ve terminaller envanteri', v: false },
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v: true },
              { n: 'Havayolu ve denizyolu lojistik bağlantıları envanteri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '5',
        chapterTitle: 'İNSAN ve TEKNOLOJİ KAYNAKLI AFETLERİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '5.4',
        title: 'Savaş ve Terör Saldırıları',
        entries: [
          {
            sartname: 'Stratejik limanlar, gümrük kapıları ve yakıt depolama tesisleri güvenlik ve süreklilik planları',
            analiz: 'Stratejik ikmal koridorları güvenliği ve ağ esnekliği analizi',
            veri: [
              { n: 'Liman ve gümrük kapıları ISPS güvenlik kodu uyumluluk verileri', v: false },
              { n: 'Kritik gıda ve akaryakıt arzı alternatif sevkiyat koridorları', v: false }
            ]
          }
        ]
      },

      // 6. İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.1',
        title: 'Aşırı Sıcaklıklar',
        climate: true,
        entries: [
          {
            sartname: 'İklim krizine bağlı aşırı sıcaklıkların soğuk zincir ve gıda lojistiği üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Soğuk zincir enerji yükü ve gıda bozulma riski analizi',
            veri: [
              { n: 'Pik yaz sıcaklıklarında soğuk depolama enerji tüketim ve bozulma riski verileri', v: true },
              { n: 'Ağır taşıt asfalt deformasyonu nedeniyle uygulanan tonaj ve hız kısıtları', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.2',
        title: 'Deniz Seviyesinin Yükselmesi',
        climate: true,
        entries: [
          {
            sartname: 'Deniz seviyesinin yükselmesinin liman rıhtımları ve kıyı depolama sahaları üzerindeki potansiyel etkilerinin değerlendirilmesi',
            analiz: 'Kıyı lojistiği ve liman sahası deniz seviyesi yükselmesi analizi',
            veri: [
              { n: 'Liman rıhtım kotları ve taşkın dalga yüksekliği projeksiyonları', v: true },
              { n: 'Kıyı depoları ve konteyner istif alanları tuzlu su korozyon etkisi', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.3',
        title: 'Fırtına ve Aşırı Hava Olayları',
        climate: true,
        entries: [
          {
            sartname: 'Fırtına ve şiddetli rüzgârların liman vinç operasyonları, hava kargo ve tır taşımacılığına etkileri',
            analiz: 'Aşırı hava olayları lojistik operasyon durması analizi',
            veri: [
              { n: 'Limanlarda rüzgâr hızı nedeniyle vinç durdurma ve gemi yanaşma iptal istatistikleri', v: true },
              { n: 'Hava kargo fırtına kaynaklı rötarlar ve kar fırtınalarında otoban tır kısıtları', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '6',
        chapterTitle: 'İKLİM KRİZİ ETKİLERİNİN LOJİSTİK SİSTEMLERİ ÜZERİNDEKİ POTANSİYEL ETKİLERİ',
        code: '6.4',
        title: 'Kıtlık ve Kaynak Stresi',
        climate: true,
        entries: [
          {
            sartname: 'Küresel ve bölgesel kuraklık/kıtlık durumlarında temel gıda ve hammadde tedarik zinciri kırılganlığı',
            analiz: 'Tedarik zinciri hammadde ve gıda güvenliği dayanıklılık analizi',
            veri: [
              { n: 'İstanbul tahıl, et ve bakliyat tedarik koridorları ve stratejik stok verileri', v: true }
            ]
          }
        ]
      },

      // 7. AFET VE İKLİM KRİZİ KARŞISINDA LOJİSTİK SİSTEMLERİNE YÖNELİK İYİ UYGULAMA ÖRNEKLERİ
      {
        chapterNum: '7',
        chapterTitle: 'AFET VE İKLİM KRİZİ KARŞISINDA LOJİSTİK SİSTEMLERİNE YÖNELİK İYİ UYGULAMA ÖRNEKLERİ',
        code: '7.1',
        title: 'Afetlere ve İklim Değişikliğine Dayanıklı Lojistik Sistemleri: Uluslararası Uygulama Örnekleri',
        entries: [
          {
            sartname: 'Rotterdam Limanı taşkın uyumu, Japonya acil lojistik koridorları ve New York uygulamaları',
            analiz: 'Uluslararası dirençli lojistik uygulamaları analizi',
            veri: [
              { n: 'Rotterdam Limanı iklim adaptasyon planı ve yükseltilmiş rıhtım tasarımları', v: true },
              { n: 'Japonya afet dayanıklı lojistik koridorları ve acil durum depoları ağı', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '7',
        chapterTitle: 'AFET VE İKLİM KRİZİ KARŞISINDA LOJİSTİK SİSTEMLERİNE YÖNELİK İYİ UYGULAMA ÖRNEKLERİ',
        code: '7.2',
        title: 'Afetlere ve İklim Değişikliğine Dayanıklı Lojistik Sistemleri: Ulusal Uygulama Örnekleri',
        entries: [
          {
            sartname: 'Kızılay ve AFAD ana lojistik merkezleri ile İstanbul acil lojistik dağıtım planları',
            analiz: 'Ulusal afet lojistiği ve acil dağıtım merkezleri analizi',
            veri: [
              { n: 'İstanbul AFAD lojistik depoları ve acil toplanma/dağıtım alanları entegrasyonu', v: true }
            ]
          }
        ]
      },

      // 8. ÇOKLU RİSK DEĞERLENDİRMESİ
      {
        chapterNum: '8',
        chapterTitle: 'ÇOKLU RİSK DEĞERLENDİRMESİ',
        code: '8.1',
        title: 'Çoklu Risk Değerlendirmesi ve Sentez',
        entries: [
          {
            sartname: 'Lojistik sistemler üzerinde doğa, insan ve iklim risklerinin kümülatif sentezi',
            analiz: 'Lojistik çoklu risk sentezi ve öncelikli koridorlar haritası',
            veri: [
              { n: 'Lojistik odaklar ve koridorlar kümülatif risk endeksi katmanı', v: true }
            ]
          }
        ]
      },

      // 9. KAYNAKÇA
      {
        chapterNum: '9',
        chapterTitle: 'KAYNAKÇA',
        code: '9.1',
        title: 'Kaynakça ve Referanslar',
        entries: [
          {
            sartname: 'Lojistik bölümünde yararlanılan kaynaklar, uluslararası anlaşmalar ve veriler',
            analiz: 'Kaynakça listesi',
            veri: [
              { n: 'Ulaştırma ve Altyapı Bakanlığı, TAMP, İBB Halleri ve uluslararası lojistik raporları', v: true }
            ]
          }
        ]
      }
    ]
  }
};

export const STATUS_LABEL: Record<string, string> = {
  todo: 'Beklemede', 
  progress: 'Veri Toplanıyor', 
  gis: 'ArcGIS’te Analiz', 
  done: 'Tamamlandı'
};
