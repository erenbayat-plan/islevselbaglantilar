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
            sartname: 'Karayolu ana arterleri, otoyollar, köprüler, tüneller ve acil ulaşım yollarının envanteri',
            analiz: 'Kritik karayolu ağı hiyerarşisi ve kapasite analizi',
            veri: [
              { n: 'Karayolu ulaşım ağı (SoV_RoadNetwork)', v: true },
              { n: 'Acil ulaşım yolları ağı (SoV_EARoutes)', v: true },
              { n: 'Köprü ve viyadük envanteri (İBB ve KGM)', v: true },
              { n: 'Karayolu tünelleri ve alt geçitler envanteri', v: true },
              { n: 'Otoyol gişeleri, katılım kolları ve ana arter kesişimleri', v: true }
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
            sartname: 'Ulaşım aktarma merkezleri, istasyonlar, iskeleler ve terminallerin mekânsal envanteri',
            analiz: 'Ulaşım odakları erişilebilirlik ve yolcu yoğunluk analizi',
            veri: [
              { n: 'Ulaşım aktarma merkezleri envanteri (Yenikapı, Üsküdar, Mecidiyeköy vb.)', v: true },
              { n: 'Raylı sistem istasyonları ve giriş-çıkış noktaları', v: true },
              { n: 'Şehir Hatları, İDO ve BUDO yolcu iskeleleri envanteri', v: true },
              { n: 'Şehirlerarası otogarlar ve ana cep terminalleri (Esenler, Harem, Alibeyköy)', v: true }
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
            sartname: 'Lastik tekerlekli, raylı sistem ve deniz toplu taşıma hatları ile filo/depo tesisleri',
            analiz: 'Toplu taşıma ağ yapısı ve operasyonel kapasite analizi',
            veri: [
              { n: 'Otobüs ve metrobüs güzergâhları ağı (SoV_BusNetwork)', v: true },
              { n: 'Raylı sistem hatları ağı (Metro, Tramvay, Marmaray, Füniküler) (SoV_RailwayNetwork)', v: true },
              { n: 'Deniz toplu taşıma hatları ve sefer tarifeleri', v: true },
              { n: 'İETT garajları, metro depo alanları ve bakım-onarım atölyeleri', v: true }
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
            sartname: 'Elektrik iletim ve dağıtım şebekesi, trafo merkezleri ve doğalgaz boru hatları',
            analiz: 'Kritik enerji altyapısı kapasite ve ağ yapısı analizi',
            veri: [
              { n: 'İstanbul doğal gaz iletim ve dağıtım altyapısı (İGDAŞ / BOTAŞ)', v: true },
              { n: 'Elektrik iletim hatları, yüksek gerilim trafoları ve dağıtım merkezleri (TEİAŞ, BEDAŞ, AYEDAŞ)', v: false },
              { n: 'Akaryakıt ve LPG depolama ve boru hattı tesisleri', v: false }
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
            sartname: 'Barajlar, arıtma tesisleri, ana isale hatları, terfi merkezleri ve su depoları',
            analiz: 'İçme suyu tedarik ve dağıtım zinciri kritiklik analizi',
            veri: [
              { n: 'İSKİ barajları, göletler ve regülatörler envanteri', v: true },
              { n: 'İçme suyu ana isale hatları güzergâhları (isale_hatti_l6)', v: true },
              { n: 'İçme suyu arıtma tesisleri ve ana terfi merkezleri', v: true },
              { n: 'Kentsel su depoları ve şebeke dağıtım zonları', v: true }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.3',
        title: 'Kritik Atık Altyapıları',
        entries: [
          {
            sartname: 'Atıksu arıtma tesisleri, kolektörler, yağmur suyu kanalları ve katı/tehlikeli atık tesisleri',
            analiz: 'Atıksu ve katı atık bertaraf altyapısı analizi',
            veri: [
              { n: 'Atıksu arıtma tesisleri ve ana derin deşarj hatları (İSKİ)', v: true },
              { n: 'Atıksu kolektörleri ve ana yağmur suyu drenaj hatları', v: true },
              { n: 'Katı atık aktarma istasyonları ve düzenli depolama sahaları (İSTAÇ Seymen, Odayeri vb.)', v: false },
              { n: 'Tıbbi ve tehlikeli atık yakma/sterilizasyon tesisleri', v: false }
            ]
          }
        ]
      },
      {
        chapterNum: '3',
        chapterTitle: 'TEKNİK ALTYAPI SİSTEMLERİ VE KRİTİK BİLEŞENLERİ',
        code: '3.4',
        title: 'Kritik Bilgi ve İletişim Altyapıları',
        entries: [
          {
            sartname: 'Fiber optik hatlar, veri merkezleri, baz istasyonları ve acil haberleşme sistemleri',
            analiz: 'İletişim omurgası ve yedeklilik analizi',
            veri: [
              { n: 'Fiber optik ana iletim hatları ve telekomünikasyon santralleri', v: false },
              { n: 'Veri merkezleri (Data Center) ve bulut altyapı tesisleri', v: false },
              { n: 'GSM baz istasyonları kuleleri ve acil durum telsiz şebekesi (Jandarma/AFAD/AKOM)', v: false }
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
            sartname: 'Ağır taşıt yük koridorları, demiryolu iltisak hatları, hava kargo ve liman bağlantıları',
            analiz: 'Çok modlu lojistik ağ ve koridor hiyerarşisi analizi',
            veri: [
              { n: 'Karayolu yük taşımacılığı ana arterleri (TEM, Kuzey Marmara Otoyolu, D-100)', v: true },
              { n: 'Demiryolu yük koridorları ve lojistik merkez iltisak hatları (TCDD)', v: true },
              { n: 'İstanbul Havalimanı ve Sabiha Gökçen Hava Kargo Terminalleri bağlantıları', v: false },
              { n: 'Ambarlı, Haydarpaşa, Tuzla ve Zeytinburnu Ro-Ro/Konteyner liman bağlantıları', v: false }
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
            sartname: 'Lojistik merkezler, serbest bölgeler, toptancı halleri ve büyük dağıtım merkezleri',
            analiz: 'Kritik lojistik odakları mekânsal dağılım ve yük debisi analizi',
            veri: [
              { n: 'İstanbul Toptancı Halleri (Bayrampaşa, Ataşehir Yaş Meyve/Sebze ve Su Ürünleri Halleri)', v: true },
              { n: 'Hadımköy, Tuzla ve Çatalca Lojistik İhtisas Bölgeleri ve depoları', v: true },
              { n: 'İstanbul Atatürk ve Trakya Serbest Bölgeleri', v: false },
              { n: 'E-ticaret ve kargo ayrıştırma ana transfer merkezleri', v: false }
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
            sartname: 'Antrepolar, soğuk hava depoları, tehlikeli madde dolum alanları ve TIR parkları',
            analiz: 'Terminal depolama kapasitesi ve tehlikeli madde konsantrasyonu analizi',
            veri: [
              { n: 'Gümrüklü antrepolar ve soğuk hava depolama tesisleri envanteri', v: false },
              { n: 'LPG, akaryakıt ve kimyasal dolum terminalleri (Haramidere, Çekmece vb.)', v: false },
              { n: 'Konteyner depolama sahaları ve gümrük TIR parkları', v: false }
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
