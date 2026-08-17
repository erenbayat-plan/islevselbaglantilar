export const DATA: Record<string, any> = {
  ulasim: { label:'Ulaşım', sections:[
    {code:'4.1', title:'Deprem Riski', entries:[
      {sartname:'Depremin karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Deprem tehlikesi–ulaşım sistemi maruziyet analizi', veri:[
        {n:'Deterministik deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'2475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Acil ulaşım yolları ağı (SoV_EARoutes)', v:true},
        {n:'Köprü envanteri', v:true},
        {n:'Ulaşım odakları envanteri (aktarma merkezleri, istasyonlar, iskeleler vb.)', v:false},
        {n:'Otobüs güzergâhları ağı (SoV_BusNetwork)', v:true},
        {n:'Raylı sistem ağı (SoV_RailwayNetwork)', v:true}
      ]},
      {sartname:'Deprem kaynaklı hasarların ulaşım ağında, ulaşım odaklarında ve toplu taşıma sisteminde oluşturabileceği kapanma ve hizmet kayıplarının değerlendirilmesi', analiz:'Deprem hasarı, yol/hat kapanması ve ulaşım bileşenleri bazında işlev kaybı analizi', veri:[
        {n:'JMA deprem senaryosu bina hasar sonucu (Sa02_BinaHasar_JmA_ba08)', v:true},
        {n:'JMC deprem senaryosu bina hasar sonucu (Sa02_BinaHasar_JmC_ba08)', v:true},
        {n:'YFB deprem senaryosu bina hasar sonucu (Sa02_BinaHasar_YfB_ba08 / ba082)', v:true},
        {n:'Üç deprem senaryosuna göre olası yol kapanma sonucu (Yol_Agi_3Sen_Kapanma_Olasi)', v:true},
        {n:'Kapalı yol alanları ve olası kapalı yol kesimleri (Kapali_Yol_Alani, Yol_Agi_Kapali_olasi)', v:true},
        {n:'PGA temelli köprü hasar sonuçları (PGA_KopruHasar_JmA_ba08, PGA_KopruHasar_JmC_ba08, PGA_KopruHasar_YfB_ba08)', v:true},
        {n:'Deprem senaryosuna göre kapanan acil ulaşım yolu kesimleri (Parts_of_Closure_AUY_fiEQ / AUY_Closure_fiEQ)', v:true},
        {n:'Deprem senaryosuna göre kapanan raylı sistem kesimleri (Raylisis_BlockedParts_fintEQ)', v:true},
        {n:'Deprem senaryosuna göre kapanan otobüs güzergâhı kesimleri (Bus_Routes_iEQ_just_posClosed_segments)', v:true},
        {n:'Ulaşım odaklarına ait deprem hasarı, kapanma ve işlev kaybı verileri', v:false}
      ]}
    ]},
    {code:'4.2', title:'Sel ve Taşkın Riski', entries:[
      {sartname:'Sel ve taşkının karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Q500 taşkın tehlikesi–ulaşım sistemi maruziyet analizi', veri:[
        {n:'500 yıllık tekerrür periyotlu su derinliği temelli taşkın tehlike haritası (İSKİ ve TUCBS verileri)', v:true},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Acil ulaşım yolları ağı (SoV_EARoutes)', v:true},
        {n:'Ulaşım odakları envanteri (aktarma merkezleri, istasyonlar, iskeleler vb.)', v:false},
        {n:'Otobüs güzergâhları ağı (SoV_BusNetwork)', v:true},
        {n:'Raylı sistem ağı (SoV_RailwayNetwork)', v:true}
      ]},
      {sartname:'Q500 taşkın senaryosunda ulaşım ağında, ulaşım odaklarında ve toplu taşıma sisteminde oluşabilecek kapanma ve işlev kayıplarının değerlendirilmesi', analiz:'Ulaşım bileşenleri bazında Q500 kapanma ve su altında kalma analizi', veri:[
        {n:'İstanbul SKUP Projesi Q500 karayolu kapanma ve su altında kalma sonuçları', v:true},
        {n:'Q500 taşkın senaryosuna göre kapanan acil ulaşım yolu kesimleri (Parts_of_Closure_AUY_fQ500 / AUY_Closure_fQ500)', v:true},
        {n:'Q500 taşkın senaryosuna göre kapanan ve su altında kalan raylı sistem kesimleri (RailwayNetwork_Closed_Parts_Q500, RailwayNetwork_Inundation_Q500)', v:true},
        {n:'Q500 taşkın senaryosunda su altında kalan otobüs güzergâhı kesimleri (BusRoutes_Inundated_Segments_Q500)', v:true},
        {n:'Ulaşım odaklarına ait Q500 su altında kalma ve işlev kaybı verileri', v:false}
      ]}
    ]},
    {code:'4.3', title:'Fırtına ve Aşırı Hava Olayları', entries:[
      {sartname:'Fırtına ve aşırı hava olaylarının karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Fırtına maruziyeti ve ulaşım hizmeti kesinti analizi', veri:[
        {n:'Fırtına ve şiddetli rüzgâr tehlike haritası', v:false},
        {n:'Aşırı hava olayı ve ulaşım kapanma kayıtları', v:false},
        {n:'Ağaç devrilmesi ve uçan cisim kaynaklı tehlike alanları', v:false},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Ulaşım odakları envanteri', v:false},
        {n:'Otobüs güzergâhları ve raylı sistem ağı (SoV_BusNetwork, SoV_RailwayNetwork)', v:true},
        {n:'Köprü envanteri ve açıkta kalan kritik ulaşım yapıları', v:true},
        {n:'Denizyolu ve havayolu işletim kesintisi kayıtları', v:false}
      ]}
    ]},
    {code:'5.1', title:'Yangın', entries:[
      {sartname:'Yangının karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Yangın maruziyeti ve ulaşım sistemi işlev kaybı analizi', veri:[
        {n:'Normalize edilmiş yangın tehlikesi katmanı (Yangin_Tehlike_Normalizasyon)', v:true},
        {n:'Deprem sonrası yangın tehlike katmanı (Deprem Sonrası Yangın)', v:true},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Ulaşım odakları envanteri', v:false},
        {n:'Otobüs güzergâhları ve raylı sistem ağı (SoV_BusNetwork, SoV_RailwayNetwork)', v:true},
        {n:'Yangın olayları nedeniyle gerçekleşen yol, hat ve odak kapanma kayıtları', v:false}
      ]}
    ]},
    {code:'5.2', title:'Patlama ve Endüstriyel Kazalar', entries:[
      {sartname:'Patlama ve endüstriyel kazaların karayolu ulaşım ağı, ulaşım odakları ve toplu taşıma sistemi üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Endüstriyel tehlike maruziyeti ve ulaşım bağlantısı kesinti analizi', veri:[
        {n:'Normalize edilmiş endüstriyel tehlike katmanı (Endustriyel_Tehlikeler_Normalizasyon)', v:true},
        {n:'Normalize edilmiş kimyasal tehlike katmanı (Kimyasal_Tehlikeler_Normalizasyon)', v:true},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Ulaşım odakları envanteri', v:false},
        {n:'Otobüs güzergâhları ve raylı sistem ağı (SoV_BusNetwork, SoV_RailwayNetwork)', v:true},
        {n:'Sanayi alanları, organize sanayi bölgeleri ve riskli tesis envanteri', v:false},
        {n:'Tehlikeli madde taşıma güzergâhları', v:false},
        {n:'Patlama ve endüstriyel kaza olay kayıtları', v:false}
      ]}
    ]},
    {code:'6.1', title:'Aşırı Sıcaklıklar', climate:true, sartname:'İklim krizine bağlı aşırı sıcaklıkların ulaşım altyapısı üzerindeki potansiyel etkilerinin değerlendirilmesi'},
    {code:'6.2', title:'Deniz Seviyesinin Yükselmesi', climate:true, sartname:'Deniz seviyesinin yükselmesinin kıyı ulaşım sistemleri üzerindeki potansiyel etkilerinin değerlendirilmesi'},
    {code:'6.3', title:'Fırtına ve Aşırı Hava Olayları (İklim Krizi)', climate:true, sartname:'İklim krizi bağlamında fırtına ve aşırı hava olaylarının ulaşım altyapısı üzerindeki potansiyel etkilerinin değerlendirilmesi'}
  ]},
  teknikaltyapi: { label:'Teknik Altyapı', sections:[
    {code:'4.1', title:'Deprem Riski', entries:[
      {sartname:'Depremin enerji altyapısı, su ve atıksu sistemleri, atık yönetimi sistemleri ve ICT üzerindeki fiziksel ve işlevsel etkilerinin değerlendirilmesi', analiz:'Deprem tehlikesi–teknik altyapı maruziyet analizi', veri:[
        {n:'Deterministik deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'2475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'İstanbul doğal gaz altyapısı deprem hasar sonucu (ist_dogalgaz_hasar)', v:true},
        {n:'İçme suyu isale hattı deprem hasar sonucu (isale_hatti_l6_hasar)', v:true},
        {n:'Elektrik ve enerji altyapısı envanteri ve deprem hasar sonuçları', v:false},
        {n:'Atıksu ve yağmur suyu altyapısı envanteri ve deprem hasar sonuçları', v:false},
        {n:'Atık yönetimi tesisleri envanteri ve yapısal durum verisi', v:false},
        {n:'Bilgi ve iletişim altyapısı envanteri ve deprem hasar sonuçları', v:false}
      ]}
    ]},
    {code:'4.2', title:'Sel ve Taşkın Riski', entries:[
      {sartname:'Sel ve taşkının enerji altyapısı, su ve atıksu sistemleri, atık yönetimi sistemleri ve ICT üzerindeki fiziksel ve işlevsel etkilerinin değerlendirilmesi', analiz:'Q500 taşkın tehlikesi–teknik altyapı maruziyet analizi', veri:[
        {n:'500 yıllık tekerrür periyotlu su derinliği temelli taşkın tehlike haritası (İSKİ ve TUCBS verileri)', v:true},
        {n:'Doğal gaz iletim ve dağıtım hattı güzergâhları', v:true},
        {n:'İçme suyu isale hattı güzergâhları', v:true},
        {n:'Elektrik iletim, dağıtım ve trafo sistemi', v:false},
        {n:'Atıksu ve yağmur suyu sistemi', v:false},
        {n:'Atık yönetimi tesisleri ve taşıma güzergâhları', v:false},
        {n:'Bilgi ve iletişim altyapısı', v:false}
      ]}
    ]},
    {code:'4.3', title:'Heyelan', entries:[
      {sartname:'Heyelanın enerji altyapısı, su ve atıksu sistemleri, atık yönetimi sistemleri ve ICT üzerindeki fiziksel ve işlevsel etkilerinin değerlendirilmesi', analiz:'Heyelan maruziyeti, hat deformasyonu ve hizmet kesintisi analizi', veri:[
        {n:'Heyelana maruz bölgeler haritası (İBB DEZİM verileri)', v:true},
        {n:'Heyelan duyarlılık haritası (İBB DEZİM verileri)', v:true},
        {n:'İçme suyu isale hattı güzergâhları', v:true},
        {n:'Doğal gaz iletim ve dağıtım hattı güzergâhları', v:true},
        {n:'Elektrik iletim ve dağıtım hatları', v:false},
        {n:'Atıksu ve yağmur suyu hatları', v:false},
        {n:'Atık yönetimi tesisleri ve taşıma güzergâhları', v:false},
        {n:'Fiber optik ve diğer bilgi-iletişim hatları', v:false}
      ]}
    ]},
    {code:'5.1', title:'Pandemi', entries:[
      {sartname:'Pandemi koşullarının teknik altyapı hizmetlerinin işletilmesi, bakımı ve sürekliliği üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'İş gücü bağımlılığı, işletme kapasitesi ve hizmet sürekliliği analizi', veri:[
        {n:'Kritik teknik altyapı tesisleri ve hizmet alanları envanteri', v:false},
        {n:'İşletme ve bakım personeli sayısı, uzmanlık ve vardiya verileri', v:false},
        {n:'Asgari personelle işletim ve acil durum planları', v:false},
        {n:'Uzaktan işletme, otomasyon ve kontrol kapasitesi', v:false},
        {n:'Pandemi dönemlerine ait hizmet kesintisi ve bakım-onarım kayıtları', v:false},
        {n:'Kritik yedek parça, ekipman ve tedarik bağımlılığı verileri', v:false}
      ]}
    ]},
    {code:'5.2', title:'Patlama ve Endüstriyel Kazalar', entries:[
      {sartname:'Patlama ve endüstriyel kazaların enerji, su ve atıksu, atık yönetimi ve ICT sistemlerinde oluşturabileceği doğrudan ve zincirleme etkilerin değerlendirilmesi', analiz:'Endüstriyel tehlike maruziyeti ve zincirleme altyapı hasarı analizi', veri:[
        {n:'Normalize edilmiş endüstriyel tehlike katmanı (Endustriyel_Tehlikeler_Normalizasyon)', v:true},
        {n:'Normalize edilmiş kimyasal tehlike katmanı (Kimyasal_Tehlikeler_Normalizasyon)', v:true},
        {n:'Doğal gaz iletim ve dağıtım altyapısı', v:true},
        {n:'Elektrik ve enerji üretim, iletim ve dağıtım tesisleri', v:false},
        {n:'Su ve atıksu tesisleri ile ana iletim hatları', v:false},
        {n:'Atık yönetimi ve tehlikeli atık tesisleri', v:false},
        {n:'Bilgi ve iletişim altyapısı tesisleri', v:false},
        {n:'Sanayi alanları, organize sanayi bölgeleri ve riskli tesis envanteri', v:false}
      ]}
    ]},
    {code:'6.1', title:'Aşırı Sıcaklıklar', climate:true, sartname:'İklim krizine bağlı aşırı sıcaklıkların teknik altyapı sistemleri üzerindeki potansiyel etkilerinin değerlendirilmesi'},
    {code:'6.2', title:'Deniz Seviyesinin Yükselmesi', climate:true, sartname:'Deniz seviyesinin yükselmesinin kıyı teknik altyapı sistemleri üzerindeki potansiyel etkilerinin değerlendirilmesi'},
    {code:'6.3', title:'Kıtlık ve Kaynak Stresi', climate:true, sartname:'İklim krizine bağlı kıtlık ve kaynak stresinin teknik altyapı hizmetleri üzerindeki potansiyel etkilerinin değerlendirilmesi'}
  ]},
  lojistik: { label:'Lojistik', sections:[
    {code:'4.1', title:'Deprem Riski', entries:[
      {sartname:'Depremin ulaşım ağı, lojistik odakları ve lojistik terminaller üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Deprem tehlikesi–lojistik sistem maruziyet analizi', veri:[
        {n:'Deterministik deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'2475 yıllık dönüş periyotlu olasılıksal deprem tehlike sentezi (İBB DEZİM verileri)', v:true},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v:true},
        {n:'Havayolu ve denizyolu lojistik bağlantıları envanteri', v:false},
        {n:'Lojistik odakları envanteri', v:false},
        {n:'Lojistik terminaller envanteri', v:false}
      ]},
      {sartname:'Deprem kaynaklı ulaşım kesintilerinin lojistik erişilebilirlik, yük hareketleri ve hizmet sürekliliği üzerindeki etkilerinin değerlendirilmesi', analiz:'Deprem kaynaklı lojistik bağlantı ve erişilebilirlik kaybı analizi', veri:[
        {n:'Üç deprem senaryosuna göre olası karayolu kapanma sonuçları (Yol_Agi_3Sen_Kapanma_Olasi)', v:true},
        {n:'Deprem senaryosuna göre kapanan raylı sistem kesimleri (Raylisis_BlockedParts_fintEQ)', v:true},
        {n:'PGA temelli köprü hasar sonuçları', v:true},
        {n:'Havayolu ve denizyolu hizmet kesintisi verileri', v:false},
        {n:'Lojistik odaklara ve terminallere erişim bağlantıları', v:false},
        {n:'Tesis bazında yük akımı, kapasite, alternatif bağlantı ve yedekleme verileri', v:false}
      ]}
    ]},
    {code:'4.2', title:'Sel ve Taşkın Riski', entries:[
      {sartname:'Sel ve taşkının ulaşım ağı, lojistik odakları ve lojistik terminaller üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Q500 taşkın tehlikesi–lojistik sistem maruziyet analizi', veri:[
        {n:'500 yıllık tekerrür periyotlu su derinliği temelli taşkın tehlike haritası (İSKİ ve TUCBS verileri)', v:true},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v:true},
        {n:'Havayolu ve denizyolu lojistik bağlantıları envanteri', v:false},
        {n:'Lojistik odakları envanteri', v:false},
        {n:'Lojistik terminaller envanteri', v:false}
      ]},
      {sartname:'Q500 taşkın senaryosunda lojistik ulaşım bağlantılarının kapanması ve tesis erişilebilirliğinin azalmasının değerlendirilmesi', analiz:'Q500 lojistik erişilebilirlik ve hizmet sürekliliği analizi', veri:[
        {n:'İstanbul SKUP Projesi Q500 karayolu kapanma ve su altında kalma sonuçları', v:true},
        {n:'Q500 taşkın senaryosuna göre kapanan raylı sistem kesimleri (RailwayNetwork_Closed_Parts_Q500)', v:true},
        {n:'Havayolu ve denizyolu taşkın kaynaklı kapanma/hizmet kesintisi verileri', v:false},
        {n:'Lojistik odaklara ve terminallere erişim bağlantıları', v:false},
        {n:'Tesis bazında kapasite, yük akımı ve alternatif erişim verileri', v:false}
      ]}
    ]},
    {code:'4.3', title:'Fırtına ve Aşırı Hava Olayları', entries:[
      {sartname:'Fırtına ve aşırı hava olaylarının ulaşım ağı, lojistik odakları, terminaller ve operasyonel süreklilik üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Fırtına maruziyeti ve lojistik operasyon kesintisi analizi', veri:[
        {n:'Fırtına ve şiddetli rüzgâr tehlike haritası', v:false},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v:true},
        {n:'Liman, hava kargo, lojistik odak ve açık depolama alanları envanteri', v:false},
        {n:'Lojistik terminaller envanteri', v:false},
        {n:'Lojistik operasyon ve hizmet kesintisi kayıtları', v:false},
        {n:'Yük türü, kapasite ve alternatif taşıma modu verileri', v:false}
      ]}
    ]},
    {code:'5.1', title:'Yangın', entries:[
      {sartname:'Yangının ulaşım ağı, lojistik odakları, terminaller, yükler ve hizmet sürekliliği üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Yangın maruziyeti ve lojistik operasyon kesintisi analizi', veri:[
        {n:'Normalize edilmiş yangın tehlikesi katmanı (Yangin_Tehlike_Normalizasyon)', v:true},
        {n:'Deprem sonrası yangın tehlike katmanı (Deprem Sonrası Yangın)', v:true},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v:true},
        {n:'Lojistik odakları ve terminaller envanteri', v:false},
        {n:'Depolanan yük türü, yanıcılık ve tehlikeli madde bilgileri', v:false},
        {n:'Yangın nedeniyle oluşan tesis ve güzergâh kapanma kayıtları', v:false}
      ]}
    ]},
    {code:'5.2', title:'Patlama ve Endüstriyel Kazalar', entries:[
      {sartname:'Patlama ve endüstriyel kazaların ulaşım ağı, lojistik odakları, terminaller ve tehlikeli madde taşımacılığı üzerindeki potansiyel etkilerinin değerlendirilmesi', analiz:'Endüstriyel tehlike ve tehlikeli madde lojistiği maruziyet analizi', veri:[
        {n:'Normalize edilmiş endüstriyel tehlike katmanı (Endustriyel_Tehlikeler_Normalizasyon)', v:true},
        {n:'Normalize edilmiş kimyasal tehlike katmanı (Kimyasal_Tehlikeler_Normalizasyon)', v:true},
        {n:'Sanayi alanları, organize sanayi bölgeleri ve riskli tesis envanteri', v:false},
        {n:'Tehlikeli madde depolama ve taşıma güzergâhları', v:false},
        {n:'Lojistik odakları ve terminaller envanteri', v:false},
        {n:'Karayolu ulaşım ağı (SoV_RoadNetwork)', v:true},
        {n:'Raylı sistem/demiryolu ağı (SoV_RailwayNetwork)', v:true},
        {n:'Havayolu ve denizyolu lojistik bağlantıları envanteri', v:false}
      ]}
    ]},
    {code:'6.1', title:'Aşırı Sıcaklıklar', climate:true, sartname:'İklim krizine bağlı aşırı sıcaklıkların lojistik sistemler üzerindeki potansiyel etkilerinin değerlendirilmesi'},
    {code:'6.2', title:'Deniz Seviyesinin Yükselmesi', climate:true, sartname:'Deniz seviyesinin yükselmesinin kıyı lojistik sistemleri üzerindeki potansiyel etkilerinin değerlendirilmesi'},
    {code:'6.3', title:'Fırtına ve Aşırı Hava Olayları (İklim Krizi)', climate:true, sartname:'İklim krizi bağlamında fırtına ve aşırı hava olaylarının lojistik sistemler üzerindeki potansiyel etkilerinin değerlendirilmesi'}
  ]}
};

export const STATUS_LABEL: Record<string, string> = {
  todo: 'Beklemede', 
  progress: 'Veri Toplanıyor', 
  gis: 'ArcGIS’te Analiz', 
  done: 'Tamamlandı'
};

