import React, { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, HelpCircle } from 'lucide-react';
// TODO: Özel FAQ arka plan görseli eklenebilir - örn: faq-banner.jpg
import FaqBanner from '@/assets/about-us-banner.jpg';

type FaqItem = {
  id: string;
  q: string;
  a: React.ReactNode;
  tags?: string[];
};

const turkishFaq: FaqItem[] = [
  {
    id: '1-serbest-tuketici',
    q: 'Serbest tüketici kimdir ve kimler olabilir?',
    a: (
      <div className="space-y-2">
        <p>EPDK kararı ile yıllık 750 kWh üzerinde elektrik tüketimi bulunan tüketiciler, serbest tüketici olarak belirlenmiştir. Serbest tüketiciler kendi tedarikçilerini seçerek daha avantajlı fiyatlarla sözleşme yapabilirler.</p>
      </div>
    ),
    tags: ['serbest tüketici','kWh']
  },
  {
    id: '2-sktt-tuketicileri',
    q: 'Son Kaynak Tedarik Tarifesi (SKTT) Tüketicileri kimlerdir ve kimler olabilir?',
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Mesken aboneleri: Yıllık 5.000 kWh'ın üzerinde</li>
        <li>Ticarethane ve sanayi aboneleri: Yıllık 15.000 kWh'ın üzerinde</li>
        <li>Diğer tüketiciler ve tarımsal faaliyet aboneleri: Yıllık 100.000.000 kWh'ın üzerinde</li>
      </ul>
    ),
    tags: ['SKTT','kWh']
  },
  {
    id: '3-baska-tedarikci',
    q: 'Görevli elektrik tedarikçisinden başka bir firmadan elektrik alabilir miyim?',
    a: 'Evet. Serbest tüketici iseniz, görevli tedarikçi dışında Remus Enerji gibi alternatif tedarikçilerden elektrik alabilirsiniz.',
    tags: ['tedarikçi değişimi']
  },
  {
    id: '4-kesinti-olur-mu',
    q: 'Elektrik tedarikçimi değiştirirsem elektrik kesintisi olur mu?',
    a: 'Hayır. Tedarikçi değişikliği sırasında altyapınız aynı kalır, elektrik kesintisi yaşanmaz.',
    tags: ['kesinti','altyapı']
  },
  {
    id: '5-tedarikci-dagitim-farki',
    q: 'Elektrik tedarikçisi ile dağıtım şirketi arasındaki fark nedir?',
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-gray-900">Tedarikçi</strong>: Elektriği size uygun fiyatlarla sağlayan şirkettir.</li>
        <li><strong className="text-gray-900">Dağıtım şirketi</strong>: Elektriği şebeke üzerinden ulaştırır, bakım ve arızadan sorumludur.</li>
      </ul>
    ),
    tags: ['dağıtım','tedarikçi']
  },
  {
    id: '6-ariza-icin-kim',
    q: 'Elektrik tedarikçim değiştiğinde arıza durumunda kime başvurmalıyım?',
    a: 'Her zaman dağıtım şirketinize başvurmalısınız. Arıza, kesinti ve bakım sorumluluğu dağıtım şirketlerine aittir.',
    tags: ['ariza','dağıtım']
  },
  {
    id: '7-faturada-ne-degir',
    q: 'Tedarikçi değişikliğinde faturamda ne değişir?',
    a: 'Faturanız artık seçtiğiniz tedarikçi tarafından düzenlenir. Altyapı ve dağıtım bedelleri aynı kalır; dağıtım bedeli tedarikçi tarafından dağıtım şirketine ödenir, bu nedenle elektrik hizmetinizde herhangi bir kesinti yaşanmaz.',
    tags: ['fatura']
  },
  {
    id: '8-faydalari',
    q: 'Tedarikçi değiştirmenin bana ne faydası olur?',
    a: 'Remus Enerji ile avantajlı fiyatlarla elektrik maliyetlerinizi düşürebilir, %100 Yeşil Enerji tedariki ile karbon ayak izinizi azaltabilir, ücretsiz dijital enerji yönetimi hizmetlerinden faydalanabilirsiniz.',
    tags: ['yeşil enerji','tasarruf']
  },
  {
    id: '9-sayac-gerekir-mi',
    q: 'Elektrik tedarikçisi değiştirmek için sayaç veya altyapı değişikliği gerekir mi?',
    a: 'Hayır. Mevcut altyapı üzerinden işlem yapılır, sayaç veya kablolarda değişiklik olmaz.',
    tags: ['altyapı','sayaç']
  },
  {
    id: '10-sktt-nedir-neden-maliyetli',
    q: 'Son Kaynak Tedarik Tarifesi (SKTT) nedir ve neden maliyetlidir?',
    a: 'SKTT, Enerji Piyasası Düzenleme Kurumu (EPDK) tarafından belirlenen tüketim limitlerini aşan kullanıcıların ulusal tarifeden çıkarılarak, serbest piyasa fiyatları üzerinden elektrik tedarik etmelerini zorunlu kılan bir tarifedir. Ulusal tarifesinin dışında kalan tüketiciler enerji piyasası maliyetinden kullanım yapacağı için dönemsel daha yüksek faturalandırmalarla karşılaşacaktır.',
    tags: ['SKTT']
  },
  {
    id: '11-ucret-var-mi',
    q: 'Elektrik tedarikçisi değiştirmek için ek ücret öder miyim?',
    a: 'Hayır. Tedarikçi değişikliği ücretsizdir.',
    tags: ['ücret']
  },
  {
    id: '12-teklif-nasil',
    q: "Remus Enerji'den teklif almak için ne yapmalıyım?",
    a: 'Tüketim bilgilerinizi paylaşarak hızlıca size özel teklif alabilirsiniz.',
    tags: ['teklif']
  },
  {
    id: '13-yesil-enerji',
    q: "Remus Enerji'den elektrik alırsam %100 yeşil enerji kullanabilir miyim?",
    a: 'Evet. Remus Enerji size %100 yenilenebilir kaynaklardan üretilmiş elektrik sunar.',
    tags: ['yeşil enerji']
  },
  {
    id: '14-sozlesme-suresi',
    q: 'Elektrik sözleşmesi ne kadar süreli olur?',
    a: 'Sözleşme süresi, ihtiyaçlarınıza göre aylık veya yıllık olarak belirlenebilir, en fazla 3 yıllık süre ile yapılabilir.',
    tags: ['sözleşme']
  },
  {
    id: '15-dijital-enerji-yonetimi',
    q: 'İşletmem için dijital enerji yönetimi hizmetlerinden nasıl faydalanabilirim?',
    a: "Remus Enerji müşterisi olduğunuzda, OSOS'a sahip kullanıcılarda Dijital Enerji İzleme Platformu ücretsiz tanımlanır. Platform üzerinden gerçek zamanlı tüketim takibi, otomatik fatura kontrolü ve verimlilik analizlerine erişebilirsiniz.",
    tags: ['dijital','OSOS']
  },
  {
    id: '16-abonelik-sozlesmesi',
    q: 'Abonelik sözleşmesi ne işe yarar?',
    a: 'Tedarikçi ile kullanıcı arasındaki hak ve yükümlülükleri, fiyat tarifesini ve süresini belirleyen resmi anlaşmadır.',
    tags: ['abonelik','sözleşme']
  },
  {
    id: '17-abone-olmak',
    q: 'Elektrik abonesi olmak için nelere dikkat etmeliyim?',
    a: 'Kimlik belgesi, sayaç bilgileri, abone numarası gibi belgelerle başvuru yapılır; tüketim profili ve kriterler değerlendirilir.',
    tags: ['abonelik']
  },
  {
    id: '18-tuketimi-azaltma',
    q: 'Elektrik tüketimimi azaltmak için ne yapabilirim?',
    a: 'Enerji verimli cihazlar kullanmak, gece tarifesinden faydalanmak, gereksiz kullanımı sınırlamak gibi yöntemlerle tüketimi azaltabilirsiniz. Bu önerileri Dijital Enerji Verimliliği Platformumuz üzerinden görüntüleyebilirsiniz.',
    tags: ['tasarruf','verimlilik']
  },
  {
    id: '19-kayip-kacak',
    q: 'Kayıp ve kaçak bedeli nedir?',
    a: 'Şebekede meydana gelen enerji kaybı ve kaçak kullanımdan kaynaklanan maliyetin tüketiciye yansıtılmasıdır.',
    tags: ['kayıp kaçak']
  },
  {
    id: '20-baglanti-gucu',
    q: 'Elektrik bağlantı gücü nedir?',
    a: 'Abonenin kullanabileceği maksimum elektrik kapasitesidir; tesis tipine göre belirlenir.',
    tags: ['bağlantı gücü']
  },
  {
    id: '21-faizsiz-odeme',
    q: 'Faizsiz ödeme veya taksitlendirme mümkün müdür?',
    a: 'Bazı dönemlerde tedarikçilerin veya kampanyaların özel ödeme kolaylıkları olabilir.',
    tags: ['ödeme','taksit']
  },
  {
    id: '22-sinir-asimi',
    q: 'Elektrik tüketim sınırı aşılırsa ne olur?',
    a: 'Tesis kapasite sınırlarını aşan elektrik talebinde altyapıya zarar riski vardır; aşırı yük uyarıları ve ek ücretlendirme uygulanabilir. Remus Dijital Enerji Verimliliği Platformu önceden alarm ve uyarılar gönderir.',
    tags: ['kapasite','alarm']
  },
  {
    id: '23-fatura-itiraz',
    q: 'Fatura itirazı nasıl yapılır?',
    a: 'Faturada yanlışlık gördüğünüzde tedarikçiye resmi başvuru yapabilir, doğruluk kontrolü talep edebilirsiniz. Ayrıca OSOS verileri olan tüketiciler Remus Dijital Enerji Verimliliği Platformu üzerinden fatura doğrulama yapabilirler.',
    tags: ['fatura','itiraz']
  },
  {
    id: '24-tarifeler',
    q: 'Tarifeler nedir ve tarifeler arası geçiş yapılabilir mi?',
    a: 'Tarife, elektrik birim fiyatını ve sözleşme koşullarını belirler. Uygunluk durumuna göre tarife değişikliği talep edilebilir.',
    tags: ['tarife']
  },
  {
    id: '25-profil-belirleme',
    q: 'Elektrik tüketim profili (günlük, saatlik) nasıl belirlenir?',
    a: 'Sayaçlardan alınan verilerle tüketim davranışı ölçülür ve saatlik, günlük veya aylık raporlanabilir.',
    tags: ['profil','sayaç']
  },
  {
    id: '26-abonelik-iptal',
    q: 'Abonelik iptali veya kapatma işlemi nasıl yapılır?',
    a: 'Kimlik ve sayaç bilgileriyle görevli tedarikçiye başvurarak yapılır; kapama işlemleri dağıtım şirketi tarafından uygulanır.',
    tags: ['abonelik','iptal']
  },
  {
    id: '27-yeniden-baglanti',
    q: 'Elektrik bağlantısı kesildiğinde yeniden bağlatma işlemi nasıl olur?',
    a: 'Borç ödemesi veya gerekli başvuru sonrası dağıtım şirketi tarafından yeniden bağlantı sağlanır.',
    tags: ['bağlantı','kesinti']
  },
  {
    id: '28-izleme',
    q: 'Elektrik tüketimimi nasıl izleyebilirim?',
    a: 'Remus Dijital Enerji İzleme Platformu üzerinden anlık tüketim takibi ve rapor alabilirsiniz.',
    tags: ['izleme','platform']
  },
  {
    id: '29-fatura-sayac-hatasi',
    q: 'Fatura okuma hatası veya sayaç hatası durumunda ne yapılır?',
    a: 'Önce tedarikçiye başvurulur; gerekli kontroller sonrası fatura düzeltilir.',
    tags: ['fatura','sayaç']
  },
  {
    id: '30-devredilebilir-mi',
    q: 'Elektrik aboneliği devredilebilir mi?',
    a: 'Evet. Yeni kullanıcı kimlik ve sayaç bilgileri ile başvurarak abonelik devralabilir.',
    tags: ['abonelik devir']
  },
  {
    id: '31-tarife-degisikligi-bildirim',
    q: 'Tarifem değişirse nasıl haberdar olurum?',
    a: 'Tedarikçi, tarife değişikliklerini SMS, e-posta veya resmi bildirim ile iletmekle yükümlüdür.',
    tags: ['tarife','bildirim']
  },
];

const glossary = [
  { term: 'PTF', desc: 'Piyasa Takas Fiyatı: Elektrik piyasasında gün öncesi planlamada arz ve talebin eşleşmesi sonucu oluşan elektrik fiyatıdır.' },
  { term: 'YEKDEM', desc: "Yenilenebilir Enerji Kaynakları Destekleme Mekanizması: Türkiye'de yenilenebilir enerji kaynaklarına dayalı üretim yapan santrallerin desteklendiği, alım garantisi ve sabit fiyat uygulamalarını içeren mekanizmadır." },
  { term: 'KBK', desc: 'Kurulca Belirlenen Katsayı: Enerji Piyasası Düzenleme Kurumu (EPDK) tarafından belirlenen katsayıdır; faturalandırma ve tarife hesaplamalarında baz alınır.' },
  { term: 'OSOS', desc: 'Otomatik Sayaç Okuma Sistemi: Tesislerdeki elektrik tüketimini uzaktan ve gerçek zamanlı olarak takip etmeye yarayan dijital izleme sistemidir; tüketim verileri platform üzerinden raporlanabilir.' },
];

const englishGlossary = [
  { term: 'PTF', desc: 'Day-Ahead Market Clearing Price: the electricity price formed where supply and demand are matched in the day-ahead market.' },
  { term: 'YEKDEM', desc: 'Renewable Energy Support Mechanism in Türkiye: a scheme that supports plants generating from renewable sources, including purchase guarantees and fixed price practices.' },
  { term: 'KBK', desc: 'Board-Determined Coefficient (EPDK): used as a basis in billing and tariff calculations.' },
  { term: 'OSOS', desc: 'Automatic Meter Reading System: a digital monitoring system enabling remote, real-time tracking of electricity consumption; data can be reported via the platform.' },
];

const englishFaq: FaqItem[] = [
  { id: '1-serbest-tuketici', q: 'Who is a free consumer and who can qualify?', a: (
    <div className="space-y-2">
      <p>According to EPDK, consumers with annual electricity consumption above 750 kWh are defined as free consumers. Free consumers can choose their supplier and sign contracts at more advantageous prices.</p>
    </div>
  ) },
  { id: '2-sktt-tuketicileri', q: 'Who are the Last Resort Supply Tariff (SKTT) consumers?', a: (
    <ul className="list-disc pl-5 space-y-1">
      <li>Residential subscribers: Above 5,000 kWh per year</li>
      <li>Commercial and industrial subscribers: Above 15,000 kWh per year</li>
      <li>Other consumers and agricultural activities: Above 100,000,000 kWh per year</li>
    </ul>
  ) },
  { id: '3-baska-tedarikci', q: 'Can I buy electricity from a supplier other than the incumbent?', a: 'Yes. If you are a free consumer, you can buy electricity from alternative suppliers such as Remus Energy.' },
  { id: '4-kesinti-olur-mu', q: 'Will there be a power cut if I switch my supplier?', a: 'No. Your infrastructure remains the same during switching; no power outage occurs.' },
  { id: '5-tedarikci-dagitim-farki', q: 'What is the difference between a supplier and a distribution company?', a: (
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-gray-900">Supplier</strong>: Provides electricity to you at competitive prices.</li>
      <li><strong className="text-gray-900">Distribution company</strong>: Delivers electricity over the grid and is responsible for maintenance and faults.</li>
    </ul>
  ) },
  { id: '6-ariza-icin-kim', q: 'Who do I contact for outages after switching?', a: 'Always contact your distribution company. They handle faults, outages, and maintenance.' },
  { id: '7-faturada-ne-degir', q: 'What changes on my bill when I switch?', a: 'Your bill will now be issued by your chosen supplier. Infrastructure and distribution charges remain the same; the supplier pays the distribution fee to the distribution company, therefore your electricity service is not interrupted.' },
  { id: '8-faydalari', q: 'What are the benefits of switching?', a: 'With Remus Energy, you can reduce electricity costs with competitive prices, use 100% Green Energy to lower your carbon footprint, and benefit from free digital energy management services.' },
  { id: '9-sayac-gerekir-mi', q: 'Do I need meter or infrastructure changes to switch?', a: 'No. It is done over your existing infrastructure; no changes to meters or cables.' },
  { id: '10-sktt-nedir-neden-maliyetli', q: 'What is SKTT and why is it costly?', a: 'SKTT is the tariff that requires users exceeding the consumption limits set by EPDK to procure electricity at market prices rather than the national tariff. Since consumption is billed based on market costs outside the national tariff, higher invoices may occur periodically.' },
  { id: '11-ucret-var-mi', q: 'Is there an additional fee to switch suppliers?', a: 'No. Switching is free.' },
  { id: '12-teklif-nasil', q: 'How can I get an offer from Remus Energy?', a: 'Share your consumption information to quickly receive a tailored offer.' },
  { id: '13-yesil-enerji', q: 'Can I use 100% green energy with Remus?', a: 'Yes. Remus Energy supplies electricity generated from 100% renewable sources.' },
  { id: '14-sozlesme-suresi', q: 'How long is the electricity contract?', a: 'Depending on your needs, it can be monthly or yearly, up to 3 years.' },
  { id: '15-dijital-enerji-yonetimi', q: 'How can my business benefit from digital energy management?', a: 'If you are a Remus Energy customer and have OSOS, the Digital Energy Monitoring Platform is assigned free of charge. You can access real-time consumption tracking, automatic bill verification, and efficiency analyses on the platform.' },
  { id: '16-abonelik-sozlesmesi', q: 'What is a subscription contract for?', a: 'It is the official agreement that defines the rights and obligations, price tariff, and duration between the supplier and the user.' },
  { id: '17-abone-olmak', q: 'What should I consider to become an electricity subscriber?', a: 'Apply with your ID, meter information, and subscriber number; your consumption profile and criteria are evaluated.' },
  { id: '18-tuketimi-azaltma', q: 'How can I reduce my electricity consumption?', a: 'Use energy-efficient devices, take advantage of night tariffs, and limit unnecessary usage. You can view these recommendations via our Digital Energy Efficiency Platform.' },
  { id: '19-kayip-kacak', q: 'What is the loss and theft fee?', a: 'It is the cost reflected to the consumer due to energy losses and illegal usage in the grid.' },
  { id: '20-baglanti-gucu', q: 'What is connection capacity?', a: 'The maximum electrical capacity that a subscriber can use; determined by the type of facility.' },
  { id: '21-faizsiz-odeme', q: 'Is interest-free payment or installments possible?', a: 'In some periods, suppliers or campaigns may offer special payment facilities.' },
  { id: '22-sinir-asimi', q: 'What happens if the consumption limit is exceeded?', a: 'Exceeding facility capacity limits risks damaging infrastructure; overload warnings and additional charges may apply. The Remus Digital Energy Efficiency Platform sends alerts and warnings in advance.' },
  { id: '23-fatura-itiraz', q: 'How to dispute a bill?', a: 'If you see an error on your bill, you can make an official application to your supplier and request verification. Consumers with OSOS data can also verify bills via the Remus Digital Energy Efficiency Platform.' },
  { id: '24-tarifeler', q: 'What are tariffs and can I switch between them?', a: 'A tariff determines the unit price of electricity and contract conditions. A change can be requested subject to eligibility.' },
  { id: '25-profil-belirleme', q: 'How is the consumption profile (daily, hourly) determined?', a: 'Consumption behavior is measured through meter data and can be reported hourly, daily, or monthly.' },
  { id: '26-abonelik-iptal', q: 'How to cancel or close a subscription?', a: 'Apply to the incumbent supplier with your ID and meter information; disconnection is carried out by the distribution company.' },
  { id: '27-yeniden-baglanti', q: 'How is reconnection handled after disconnection?', a: 'After debt payment or the necessary application, reconnection is provided by the distribution company.' },
  { id: '28-izleme', q: 'How can I monitor my consumption?', a: 'You can track your consumption in real time and get reports via the Remus Digital Energy Monitoring Platform.' },
  { id: '29-fatura-sayac-hatasi', q: 'What to do in case of bill reading or meter errors?', a: 'First apply to your supplier; the bill will be corrected after necessary checks.' },
  { id: '30-devredilebilir-mi', q: 'Can an electricity subscription be transferred?', a: 'Yes. The new user can take over the subscription by applying with ID and meter information.' },
  { id: '31-tarife-degisikligi-bildirim', q: 'How will I be informed if my tariff changes?', a: 'The supplier is obliged to notify tariff changes via SMS, email, or official notice.' },
];

const Faq: React.FC = () => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);

  const englishSlug = (id: string) => `en-${id}`;

  const scrollTo = (targetId: string) => {
    const header = document.querySelector('header') as HTMLElement | null;
    const headerHeight = header?.offsetHeight ?? 0;
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
    try { history.replaceState(null, '', `#${targetId}`); } catch {}
  };

  useEffect(() => {
    const onHash = () => {
      const raw = window.location.hash.replace('#', '');
      if (!raw) return;
      const isEn = raw.startsWith('en-');
      const targetId = isEn ? raw.substring(3) : raw;
      const existsFaq = turkishFaq.find((f) => f.id === targetId);
      const header = document.querySelector('header') as HTMLElement | null;
      const headerHeight = header?.offsetHeight ?? 0;
      const el = document.getElementById(raw) || (existsFaq ? document.getElementById(targetId) : null);
      if (existsFaq) setExpanded([targetId]);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shouldExpand = params.get('expand') === 'all';
    if (shouldExpand) {
      const data = (document.documentElement.lang || navigator.language || 'tr').startsWith('en') ? englishFaq : turkishFaq;
      setExpanded(data.map((f) => f.id));
    }
  }, []);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const hasHash = !!window.location.hash;
    const params = new URLSearchParams(window.location.search);
    const shouldExpandAll = params.get('expand') === 'all';
    if (hasHash || shouldExpandAll) return;
    const firstId = (i18n.language === 'en' ? englishFaq : turkishFaq)[0]?.id;
    if (firstId) setExpanded([firstId]);
  }, [i18n.language]);

  const data = i18n.language === 'en' ? englishFaq : turkishFaq;
  const glossaryData = i18n.language === 'en' ? englishGlossary : glossary;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => {
      const haystack = `${item.q} ${typeof item.a === 'string' ? item.a : ''} ${(item.tags||[]).join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, data]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />
      
      {/* Hero Header - Subtle background image */}
      <section className="pt-12 pb-12 relative overflow-hidden mt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={FaqBanner} 
            alt="" 
            className="w-full h-full object-cover object-[40%_60%]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-primary/70 rounded-full text-primary font-medium text-sm shadow-sm mb-6 animate-fade-in">
              <HelpCircle className="w-4 h-4" />
              <span>{t('faq.badge')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
              {t('faq.title')}
            </h1>
            <p className="text-gray-600 text-lg animate-slide-up delay-100">
              {t('faq.hint')}
            </p>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 pb-20">
        <section className="max-w-4xl mx-auto">
          {/* Search and Glossary */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 animate-slide-up delay-200">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t('faq.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-12 bg-white border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl focus:ring-primary focus:border-primary"
              />
            </div>
            <a
              href="#glossary"
              onClick={(e) => { e.preventDefault(); scrollTo('glossary'); }}
              className="cta-button-outline flex items-center justify-center gap-2 shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              {t('faq.glossaryCta')}
            </a>
          </div>

          {/* FAQ Accordion */}
          <div className="animate-slide-up delay-300">
            <Accordion type="multiple" value={expanded} onValueChange={(v) => setExpanded(v as string[])}>
              {filtered.map((item, index) => (
                <AccordionItem 
                  key={item.id} 
                  value={item.id} 
                  id={item.id} 
                  className="scroll-mt-28 border-gray-200 mb-2"
                >
                  <div id={englishSlug(item.id)} className="scroll-mt-28" />
                  <AccordionTrigger className="text-left text-base md:text-lg text-gray-900 hover:text-primary py-5 px-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 transition-all [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                    <span className="flex items-start gap-3">
                      <span className="text-primary font-mono text-sm mt-0.5">{String(index + 1).padStart(2, '0')}</span>
                      <span>{item.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 border border-t-0 border-gray-200 rounded-b-xl px-4 pb-4 pt-2">
                    <div className="text-gray-600 pl-8">
                      {item.a}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
              {filtered.length === 0 && (
                <div className="text-gray-500 py-12 text-center">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  {t('faq.noResults')}
                </div>
              )}
            </Accordion>
          </div>

          {/* Glossary */}
          <div id="glossary" className="mt-20 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-container">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('faq.glossaryTitle')}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {glossaryData.map((g) => (
                <div key={g.term} className="feature-card card-hover">
                  <div className="font-semibold text-primary mb-2">{g.term}</div>
                  <div className="text-gray-600 text-sm">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Faq;
