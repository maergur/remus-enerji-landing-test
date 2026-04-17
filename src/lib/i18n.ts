import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        features: "Features",
        about: "About",
        faq: "FAQ",
        blog: "Blog",
        join_us: "Login",
        pay_bill: "Pay Bill"
      },
      hero: {
        badge: "Turkey's Next Generation Energy Platform",
        title: "Your Digital Energy Supplier",
        description: "We offer electricity for homes and businesses with the most advantageous options.",
        greenEnergy: "Green Energy",
        savingsOpportunity: "Up to 30% Savings",
        freeSoftware: "Free Tracking Software",
        noContract: "No Binding Contract",
        cta: "Switch Now!",
        learnMore: "Learn More",
        stats: {
          customers: "Happy Customers",
          green: "Green Energy",
          savings: "Savings",
          support: "Support"
        }
      },
      features: {
        title: "Features",
        subtitle: "Our technology-driven approach offers the best prices without compromising sustainability or reliability.",
        cards: [
          {
            title: "Dynamic Tariff Options",
            description: "AI-powered consumption analysis offers discounted, prepaid, deferred, interest-based variable profit, or fixed price tariff options."
          },
          {
            title: "Smart Energy Management",
            description: "Our software tracks your energy consumption in real time and suggests the best electricity tariffs."
          },
          {
            title: "Transparent Billing",
            description: "Pay only for what you use, with no hidden fees. Easily track your simplified bills."
          },
          {
            title: "Green Energy",
            description: "Protect nature and reduce your carbon footprint with energy from wind, solar, and hydro sources."
          }
        ],
        new_era: "A New Era in Energy Supply",
        comparison: {
          remus: "Remus Energy",
          traditional: "Traditional Energy Suppliers",
          how_billing: "How is Billing Done?",
          pay_only: "You only pay for what you use each month.",
          guarantee_none: "No Guarantee",
          hourly_pricing: "Hourly dynamic pricing",
          cancel_anytime: "Monthly subscription cancellation option",
          manage_everything: "Manage everything via digital app",
          fast_ui: "Fast and user-friendly interface",
          support: "How do we support?",
          smart_device: "Smart device integration",
          smart_meter: "Smart meter installation support",
          what_else: "What Else Do We Offer?"
        }
      },
      trusted_by: "Trusted By",
      cookies: {
        message: "This website uses cookies to improve user experience and make the website more effective. Cookies help us understand how users use the website and personalize future visits. To learn more, please read the Personal Data Protection Authority text",
        learn_more: "Learn more",
        learn_more_url: "https://kvkk.gov.tr/",
        accept: "Accept",
        reject: "Reject",
        preferences: "Preferences",
        preferences_title: "Cookie Preferences",
        preferences_desc: "You can control optional cookies below. Essential cookies are always enabled.",
        analytics: "Analytics cookies",
        analytics_desc: "Help us understand usage to improve the product.",
        marketing: "Marketing cookies",
        marketing_desc: "Used to personalize content and measure campaigns.",
        save_preferences: "Save preferences"
      },
      kvkk: {
        title: "Personal Data Protection Information Text",
        paragraphs: [
          "Remus Elektrik Tedarik ve Teknoloji A.Ş. takes the highest level of security measures to ensure that your personal data is collected, stored, and shared in compliance with the law and to protect your privacy.",
          "Our aim is to transparently inform you, in line with your satisfaction and pursuant to Article 10 of the Law on the Protection of Personal Data No. 6698, about the methods of obtaining your personal data, purposes of processing, parties with whom it is shared, legal reasons, and your rights."
        ],
        sections: {
          controller: {
            heading: "a) Data Controller",
            body: "Pursuant to the Law on the Protection of Personal Data No. 6698 (the 'Law No. 6698'), your personal data may be collected and processed by Remus Elektrik Tedarik ve Teknoloji A.Ş. (the 'COMPANY') within the scope explained below."
          },
          purposes: {
            heading: "b) Purposes of Processing Personal Data",
            desc: "The COMPANY may collect personal data from parties such as customers, employees, potential customers, employee candidates, business partners, and suppliers, in categories such as identity, contact, customer, customer transaction, transaction security, legal transaction and compliance, and marketing-sales information.",
            lead: "Your personal data may be processed for the following purposes:",
            bullets: [
              "Provision of COMPANY products and services to you, compliance with legal obligations, and the arrangement of records and documents",
              "Offering personalized advertisements, campaigns, advantages, and benefits within the scope of sales and marketing activities",
              "Compliance with internal policies and procedures; execution of audit, finance and accounting, invoicing, and collection processes",
              "Contacting you for information technology requirements",
              "Execution of traffic measurement, statistics, segmentation/profiling, and CRM activities",
              "Execution of customer satisfaction, complaint management, and information processes",
              "Execution of order, payment, logistics, marketing, and communication processes",
              "Use for product/service development, modeling, and compliance with legislation",
              "Fulfillment of obligations to official institutions and compliance with legal processes"
            ],
            footer: "within the scope of Articles 5 and 6 of the Law No. 6698."
          },
          sharing: {
            heading: "c) Recipients and Purposes of Transfer of Processed Personal Data",
            body: "Your personal data may be transferred, limited to the purposes stated above, to the COMPANY's business partners, suppliers, shareholders and affiliates; persons and institutions permitted by legislation; authorized public institutions/organizations; overseas companies and affiliates; business partners and cargo companies from which we receive services, within the scope of Articles 8 and 9 of the Law No. 6698."
          },
          methodLegal: {
            heading: "ç) Method and Legal Reason for Collecting Personal Data",
            body: "Your personal data is collected verbally, in writing, or electronically from channels such as the headquarters, websites, relevant institutions, web and mobile applications, call centers, and social media, within the scope of the performance of the contract and legislation."
          },
          rights: {
            heading: "d) Rights Listed in Article 11 of the Law No. 6698",
            body: "Data subjects have the right to learn whether their personal data is processed, to request information if it is processed, to learn whether it is used in accordance with the purpose, to know the third parties to whom it is transferred domestically/abroad, to request correction and/or deletion if it is incomplete/incorrect, to object to automated processing, and to demand compensation for the damage. Applications can be made in writing or via KEP, secure e-signature, mobile signature, or the e-mail registered in our system. The Company reserves the right to verify identity."
          },
          application: {
            heading: "Application Information",
            address_label: "Address",
            address: "Osmangazi Mah. Sanayi Cad. No: 33 İç Kapı No: A Darıca/ Kocaeli",
            email_label: "E-mail",
            email: "hello@remusenerji.com",
            phone_label: "Phone",
            phone: "+90 (850) 360 71 25"
          }
        }
      },
      mobileApp: {
        badge: "Mobile App",
        title: "Manage Your Energy on the Go",
        subtitle: "Download our mobile app to monitor your energy consumption, track savings, and manage your account from anywhere.",
        comingSoonTitle: "Our Mobile App is Coming Soon!",
        comingSoonBody1: "We're putting the finishing touches on the Remus mobile app to bring your energy data, savings insights, and account management to your pocket.",
        comingSoonBody2: "Here’s a glimpse of what you’ll get at launch:",
        comingSoonBullet1: "Real-time consumption analytics and personalized insights",
        comingSoonBullet2: "Tariff comparisons tailored to your usage profile",
        comingSoonBullet3: "Bill tracking, notifications, and goal-based savings",
        carousel: {
          dashboard: "Dashboard",
          analytics: "Energy Analytics",
          goals: "Daily Energy Goal",
          bill: "Current Bill",
          settings: "App Settings"
        },
        features: {
          realTime: {
            title: "Real-time Monitoring",
            description: "Track your energy consumption in real-time with detailed analytics and insights."
          },
          savings: {
            title: "Smart Savings",
            description: "Get personalized recommendations to optimize your energy usage and reduce costs."
          },
          secure: {
            title: "Secure & Private",
            description: "Your data is protected with bank-level security and privacy controls."
          }
        },
        download: {
          ios: "Download for iOS",
          android: "Download for Android"
        }
      },
      join: {
        title: "Join Remus Energy Now!",
        subtitle: "Switch to Turkey's most technological electricity supplier.",
        email_label: "Your Email Address",
        email_placeholder: "your@email.com",
        start_saving: "Start Saving Energy",
        no_credit_card: "No credit card required.",
        cancel_anytime: "You can cancel anytime.",
        no_switch_fee: "No switching fee.",
        first_name_label: "Name",
        last_name_label: "Surname",
        phone_label: "Phone Number",
        usage_type_label: "Usage Type",
        usage_type_placeholder: "Select usage type",
        usage_type: {
          mesken: "Residential",
          ticari: "Commercial"
        },
        missing_fields_title: "Missing information",
        missing_fields_desc: "Please fill out all fields",
        testimonials_title: "What Our Customers Say?",
        testimonials: [
          {
            name: "BLR Balorman",
            text: "Since switching to Remus Energy, we've saved an average of 150,000₺ per month on our factory's electricity bill. We can analyze our consumption easily through a simple and user-friendly software."
          },
          {
            name: "Melike Mermercioğlu",
            text: "It's great to know I'm using green energy while getting the best electricity prices for my home. The app makes it easy to track my consumption and suggests savings opportunities."
          }
        ],
        success_title: "Welcome to Remus Energy's Advantageous Prices!",
        success_desc: "Dear user, we will contact you as soon as possible.",
        close: "Close"
      },
      footer: {
        contact: "Contact Us",
        address: "Osmangazi Mah. Sanayi Cad. No: 33 İç Kapı No: A Darıca/ Kocaeli",
        text: "All rights reserved.",
        copyright: "© 2025 Remus Energy. All rights reserved.",
        slogan: "Your digital energy supplier.",
        privacy: "KVKK Information Text",
        quick_links: "Quick Links"
      },
      about: {
        title: "About Us",
        badge: "Meet Us",
        subtitle: "Turkey's next-generation digital energy supplier combining technology with sustainability.",
        description: "Remus Energy is an energy fintech company that combines electricity supply with a strong digital infrastructure. Our fully digital processes deliver a fast, simple, transparent, and sustainable electricity supply experience. With a <bold>'pay-as-you-use'</bold> model, transparent billing, and certified green energy options, we serve both residential and business customers—helping them save and contribute to a sustainable future. Through AI‑assisted dynamic pricing, day‑ahead price forecasting, and smart device integration, energy becomes not just something consumed, but a managed and value‑creating asset.",
        vision: {
          title: "Vision",
          body: "We aim to lead digitalization in the energy sector and build a future based on sustainability, efficiency, and transparency—making energy usage accessible, measurable, traceable, and optimizable for homes, businesses, and industrial facilities."
        },
        mission: {
          title: "Mission",
          items: [
            {
              title: "Digital Operational Excellence",
              body: "Make electricity supply processes more flexible, lower‑cost, and controllable through systems built entirely on digital infrastructure."
            },
            {
              title: "Energy Management & Efficiency",
              body: "Help customers optimize energy usage with real‑time data monitoring, consumption analytics, and savings recommendations—encouraging smarter energy use, not just supply."
            },
            {
              title: "Sustainability & Green Energy",
              body: "Increase green energy sources to support environmental sustainability, reduce carbon footprint, and popularize climate‑friendly energy solutions."
            },
            {
              title: "Transparency, Trust & Customer Focus",
              body: "Ensure maximum transparency in supply and billing; listen to needs and expectations; act with reliability and accountability."
            },
            {
              title: "Innovation & Technology",
              body: "Adopt AI, data analytics, and advanced digital technologies to build innovative business models and establish data‑driven decision‑making as a cultural foundation."
            }
          ]
        },
        certificates: {
          title: "Certificates & Licenses",
          iso9001: "ISO 9001:2015",
          iso14001: "ISO 14001:2015",
          iso45001: "ISO 45001:2018",
          iso27001: "ISO/IEC 27001:2022",
          iso10002: "ISO 10002:2018",
          epdk: "EPDK Electricity Supply License"
        }
      },
      notFound: {
        title: "404",
        message: "Oops! Page not found",
        description: "The page you're looking for doesn't exist or may have been moved.",
        returnHome: "Return to Home"
      },
      faq: {
        title: "Frequently Asked Questions",
        hint: "Find what you need fast: filter by keyword; browse topics.",
        badge: "Help Center",
        glossaryCta: "Browse Glossary",
        glossaryTitle: "Terms & Abbreviations",
        searchPlaceholder: "e.g., free consumer, SKTT, green energy...",
        noResults: "No results found. Try different keywords."
      },
      blog: {
        title: "Blog",
        badge: "Latest in Energy",
        subtitle: "Stay updated with the latest news, insights, and tips about energy management and sustainability.",
        featured: "Featured",
        allPosts: "All Posts",
        filterByTag: "Filter by tag",
        readMore: "Read more",
        backToBlog: "Back to Blog",
        share: "Share",
        shareOn: "Share on",
        sharePost: "Share this post",
        copyLink: "Copy link",
        linkCopied: "Link copied!",
        minRead: "min read",
        noPosts: "No blog posts yet. Check back soon!",
        postNotFound: "Blog post not found.",
        error: "Something went wrong. Please try again later.",
        comingSoon: "Blog Coming Soon!",
        comingSoonDesc: "We're preparing exciting content about energy management, sustainability, and industry insights. Stay tuned!",
        notifyMe: "Notify Me When Ready",
        relatedPosts: "Related Posts",
        newsletter: {
          title: "Stay Updated",
          desc: "Get the latest energy insights, tips, and news delivered to your inbox.",
          cta: "Subscribe"
        }
      },
      login: {
        title: "Customer Portal",
        subtitle: "Log in to access your energy account and manage your consumption.",
        email_tab: "Email",
        phone_tab: "Phone",
        email_label: "Email Address",
        email_placeholder: "your@email.com",
        phone_label: "Phone Number",
        phone_placeholder: "05xx xxx xx xx",
        password_label: "Password",
        password_placeholder: "Enter your password",
        forgot_password: "Forgot password?",
        submit: "Log In",
        or: "or",
        no_account: "Don't have an account yet?",
        register: "Register Now"
      },
      general: {
        loading: "Loading...",
        invalid_email: "Invalid email",
        invalid_email_desc: "Please enter a valid email address",
        success: "Success!"
      }
    }
  },
  tr: {
    translation: {
      navbar: {
        home: "Ana Sayfa",
        features: "Özellikler",
        about: "Hakkımızda",
        faq: "SSS",
        blog: "Blog",
        join_us: "Giriş Yap",
        pay_bill: "Fatura Öde"
      },
      hero: {
        badge: "Türkiye'nin Yeni Nesil Enerji Platformu",
        title: "Dijital Enerji Tedarikçiniz",
        description: "Evler ve işletmeler için elektriği en avantajlı seçenekler ile sunuyoruz.",
        greenEnergy: "Yeşil Enerji",
        savingsOpportunity: "%30'a Varan Tasarruf İmkanı",
        freeSoftware: "Ücretsiz Takip Yazılımı",
        noContract: "Bağlayıcı Sözleşme Yok",
        cta: "Şimdi Geçiş Yapın!",
        learnMore: "Daha Fazla Bilgi",
        stats: {
          customers: "Mutlu Müşteri",
          green: "Yeşil Enerji",
          savings: "Tasarruf",
          support: "Destek"
        }
      },
      features: {
        title: "Özellikler",
        subtitle: "Teknoloji odaklı yaklaşımımız, sürdürülebilirlik veya güvenilirlikten ödün vermeden en uygun fiyatları sunar.",
        cards: [
          {
            title: "Dinamik Tarife Seçenekleri",
            description: "Yapay zeka destekli tüketim analizleri ile indirimli, ön ödemeli, vadeli, faize göre değişken kar oranlı veya sabit fiyatlı tarife seçenekleri sunar."
          },
          {
            title: "Akıllı Enerji Yönetimi",
            description: "Yazılımımız, enerji tüketiminizi gerçek zamanlı olarak takip eder ve en uygun elektrik tarifelerini önerir."
          },
          {
            title: "Şeffaf Faturalandırma",
            description: "Hiçbir gizli ücret olmadan, kullandığınız kadar ödeyin ve karmaşık faturalarınızı basitleştirilmiş haliyle kolaylıkla takip edin."
          },
          {
            title: "Yeşil Enerji",
            description: "Rüzgar, güneş ve hidroelektrik kaynaklarından gelen enerji ile doğayı koruyun ve karbon ayak izinizi azaltın."
          }
        ],
        new_era: "Enerji Tedariğinde Yeni Dönem",
        comparison: {
          remus: "Remus Enerji",
          traditional: "Geleneksel Tedarik Firmaları",
          how_billing: "Faturalandırma Nasıl Yapılır?",
          pay_only: "Her ay yalnızca kullandığınız kadar ödersiniz.",
          guarantee_none: "Garanti Vermez",
          hourly_pricing: "Saatlik değişen, dinamik fiyatlandırma",
          cancel_anytime: "Aylık abonelik iptal edebilme özelliği",
          manage_everything: "Dijital uygulama üzerinden her şeyi yönetebilme özelliği",
          fast_ui: "Hızlı ve kullanıcı dostu arayüz",
          support: "Nasıl Destek Oluyoruz?",
          smart_device: "Akıllı cihazlara entegre olabilme özelliği",
          smart_meter: "Akıllı sayaç kurulumu desteği",
          what_else: "Başka Neler Sunuyoruz?"
        }
      },
      trusted_by: "Bize Güvenenler",
      cookies: {
        message: "Bu web sitesi, kullanıcı deneyimini geliştirmek ve web sitesini daha etkili hale getirmek için çerezler kullanır. Çerezler, kullanıcıların web sitesini nasıl kullandığını anlamamıza ve gelecekteki ziyaretleri kişiselleştirmemize yardımcı olur. Daha fazla bilgi için Kişisel Verileri Koruma Kurumu metnini okuyun",
        learn_more: "Daha fazla bilgi",
        learn_more_url: "https://kvkk.gov.tr/",
        accept: "Kabul Et",
        reject: "Reddet",
        preferences: "Tercihler",
        preferences_title: "Çerez Tercihleri",
        preferences_desc: "Zorunlu çerezler her zaman etkindir. Aşağıdan isteğe bağlı çerezleri yönetebilirsiniz.",
        analytics: "Analitik çerezler",
        analytics_desc: "Kullanımı anlayarak ürünü geliştirmemize yardımcı olur.",
        marketing: "Pazarlama çerezleri",
        marketing_desc: "İçerikleri kişiselleştirmek ve kampanyaları ölçmek için kullanılır.",
        save_preferences: "Tercihleri kaydet"
      },
      kvkk: {
        title: "Kişisel Verilerin Korunması Aydınlatma Metni",
        paragraphs: [
          "Remus Elektrik Tedarik ve Teknoloji A.Ş. kişisel verilerinizin hukuka uygun olarak toplanması, saklanması ve paylaşılmasını sağlamak ve gizliliğinizi korumak amacıyla mümkün olan en üst seviyede güvenlik tedbirlerini almaktadır.",
          "Amacımız; 6698 sayılı Kişisel Verilerin Korunması Kanununun 10. maddesi gereğince ve sizlerin memnuniyeti doğrultusunda, kişisel verilerinizin alınma şekilleri, işlenme amaçları, paylaşılan kişiler, hukuki nedenleri ve haklarınız konularında sizi en şeffaf şekilde bilgilendirmektir."
        ],
        sections: {
          controller: {
            heading: "a) Veri Sorumlusu",
            body: "6698 sayılı Kişisel Verilerin Korunması Kanunu (“6698 sayılı Kanun”) uyarınca, kişisel verileriniz; veri sorumlusu olarak Remus Elektrik Tedarik ve Teknoloji A.Ş. (“ŞİRKET”) tarafından aşağıda açıklanan kapsamda toplanacak ve işlenebilecektir."
          },
          purposes: {
            heading: "b) Kişisel Verilerin Hangi Amaçla İşleneceği",
            desc: "ŞİRKET tarafından, müşterileri, çalışanları, potansiyel müşterileri, çalışan adayları, iş ortakları ve tedarikçileri gibi taraflardan, kimlik bilgisi, iletişim bilgisi, müşteri bilgisi, müşteri işlem bilgisi, işlem güvenliği bilgisi, hukuki işlem ve uyum bilgisi ile pazarlama satış bilgisi gibi kategorilerde kişisel veri toplanabilmektedir.",
            lead: "Toplanan kişisel verileriniz;",
            bullets: [
              "ŞİRKET ürün ve hizmetlerinin sizlere sunulabilmesi, yasal yükümlülüklere uyum, kayıt ve belgelerin düzenlenmesi,",
              "Satış ve pazarlama faaliyetleri kapsamında size özel reklam, kampanya, avantaj ve faydaların sunulması,",
              "İç politika ve prosedürlere uyum; denetim, finans ve muhasebe, faturalama ve tahsilat süreçlerinin yürütülmesi,",
              "Bilgi işlem gereksinimleri doğrultusunda sizinle iletişim kurulması,",
              "Trafik ölçümleme, istatistik, segmentasyon/profilleme ve CRM çalışmalarının yürütülmesi,",
              "Müşteri memnuniyeti, şikayet yönetimi ve bilgilendirme süreçlerinin yürütülmesi,",
              "Sipariş, ödeme, lojistik, pazarlama ve iletişim süreçlerinin yürütülmesi,",
              "Ürün/hizmet geliştirme, modelleme ve mevzuata uyum amacıyla kullanılması,",
              "Resmî kurum yükümlülüklerinin yerine getirilmesi ve hukuki süreçlere uyum,"
            ],
            footer: "amaçlarıyla 6698 sayılı Kanun’un 5. ve 6. maddeleri kapsamında işlenecektir."
          },
          sharing: {
            heading: "c) İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği",
            body: "Toplanan kişisel verileriniz; yukarıda belirtilen amaçlarla sınırlı olmak üzere; ŞİRKET’in iş ortaklarına, tedarikçilerine, hissedarlarına ve iştiraklerine; mevzuatın izin verdiği kişi ve kuruluşlara; yetkili kamu kurum/kuruluşlarına; yurt dışı şirketlerine ve iştiraklerine; hizmet aldığımız iş ortaklarına ve kargo şirketlerine, 6698 sayılı Kanun’un 8. ve 9. maddeleri çerçevesinde aktarılabilecektir."
          },
          methodLegal: {
            heading: "ç) Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi",
            body: "Kişisel verileriniz; genel müdürlük, internet siteleri, ilgili kurumlar, web ve mobil uygulamalar, çağrı merkezleri, sosyal medya gibi mecralardan sözlü, yazılı veya elektronik ortamda, sözleşmenin ifası ve mevzuat kapsamında toplanmaktadır."
          },
          rights: {
            heading: "d) 6698 sayılı Kanun’un 11. Maddesinde Sayılan Haklar",
            body: "Veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içi/dışı aktarılan üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini ve/veya silinmesini isteme, otomatik işleme itiraz etme ve zararın giderilmesini talep etme haklarına sahiptir. Başvurular; yazılı olarak veya KEP, güvenli e-imza, mobil imza ya da sistemimizde kayıtlı e-posta ile yapılabilir. Şirket, kimlik doğrulama hakkını saklı tutar."
          },
          application: {
            heading: "Başvuru Bilgileri",
            address_label: "Adres",
            address: "Osmangazi Mah. Sanayi Cad. No: 33 İç Kapı No: A Darıca/ Kocaeli",
            email_label: "E-posta",
            email: "hello@remusenerji.com",
            phone_label: "Telefon",
            phone: "+90 (850) 360 71 25"
          }
        }
      },
      mobileApp: {
        badge: "Mobil Uygulama",
        title: "Enerji Tüketiminizi Gerçek Zamanlı Takip Edin.",
        subtitle: "Mobil uygulamamızla enerji verilerinizi anlık analiz edin, tasarruf hedeflerinizi yönetin ve hesabınıza her yerden erişin.",
        comingSoonTitle: "Mobil Uygulamamız Çok Yakında Sizlerle!",
        comingSoonBody1: "Enerji verilerinizi, tasarruf analizlerini ve hesap yönetimini cebinize getirmek için Remus mobil uygulamasının son dokunuşlarını yapıyoruz.",
        comingSoonBody2: "Lansmanda sunacaklarımızdan bazıları:",
        comingSoonBullet1: "Gerçek zamanlı tüketim analizi ve kişiselleştirilmiş içgörüler",
        comingSoonBullet2: "Kullanım profilinize özel tarife karşılaştırmaları",
        comingSoonBullet3: "Fatura takibi, bildirimler ve hedef odaklı tasarruf",
        carousel: {
          dashboard: "Kontrol Paneli",
          analytics: "Enerji Analizi",
          goals: "Günlük Enerji Hedefi",
          bill: "Güncel Fatura",
          settings: "Uygulama Ayarları"
        },
        features: {
          realTime: {
            title: "Gerçek Zamanlı İzleme",
            description: "Kullanım alışkanlıklarınıza göre şekillenen önerilerle enerji harcamalarınızı azaltın."
          },
          savings: {
            title: "Akıllı Tasarruf",
            description: "Enerji kullanımınızı optimize etmek ve maliyetleri düşürmek için kişiselleştirilmiş öneriler alın."
          },
          secure: {
            title: "Güvenli ve Özel",
            description: "Tüm verileriniz, bankacılık standartlarında güvenlik önlemleriyle korunur."
          }
        },
        download: {
          ios: "iOS için İndir",
          android: "Android için İndir"
        }
      },
      join: {
        title: "Remus Enerji'ye Hemen Katılın!",
        subtitle: "Türkiye'nin en teknolojik elektrik tedarik firmasına geçiş yapın.",
        email_label: "E-posta Adresiniz",
        email_placeholder: "e-posta@adresiniz.com",
        start_saving: "Enerji Tasarrufuna Başlayın",
        no_credit_card: "Kredi kartı gerektirmez.",
        cancel_anytime: "Dilediğiniz zaman iptal edebilirsiniz.",
        no_switch_fee: "Geçiş ücreti bulunmamaktadır.",
        first_name_label: "Ad",
        last_name_label: "Soyad",
        phone_label: "Telefon Numarası",
        usage_type_label: "Kullanım Türü",
        usage_type_placeholder: "Kullanım türünü seçin",
        usage_type: {
          mesken: "Mesken",
          ticari: "Ticari"
        },
        missing_fields_title: "Eksik bilgi",
        missing_fields_desc: "Lütfen tüm alanları doldurun",
        testimonials_title: "Müşterilerimiz Ne Diyor?",
        testimonials: [
          {
            name: "BLR Balorman",
            text: "Remus Enerji'ye geçtiğimizden beri fabrikamıza gelen elektrik faturalamızda aylık ortalama 150.000₺ tasarruf ettik. Basit ve kullanıcı dostu bir yazılım üzerinden tüketimlerimizi analiz edebiliyoruz."
          },
          {
            name: "Melike Mermercioğlu",
            text: "Evim için en uygun elektrik fiyatlarını alırken aynı zamanda yeşil enerji kullandığımı bilmek harika. Uygulama tüketimimi takip etmemi kolaylaştırıyor ve tasarruf fırsatları öneriyor."
          }
        ],
        success_title: "Remus Enerji'nin Avantajlı Fiyatlarına Hoş Geldiniz!",
        success_desc: "Sayın kullanıcımız, sizinle en kısa sürede iletişime geçeceğiz.",
        close: "Kapat"
      },
      footer: {
        contact: "Bize Ulaşın",
        address: "Osmangazi Mah. Sanayi Cad. No: 33 İç Kapı No: A Darıca/ Kocaeli",
        text: "Tüm hakları saklıdır.",
        copyright: "© 2025 Remus Enerji. Tüm hakları saklıdır.",
        slogan: "Dijital enerji tedarikçiniz.",
        privacy: "KVKK Aydınlatma Metni",
        quick_links: "Hızlı Linkler"
      },
      about: {
        title: "Hakkımızda",
        badge: "Bizi Tanıyın",
        subtitle: "Teknolojiyi sürdürülebilirlikle birleştiren Türkiye'nin yeni nesil dijital enerji tedarikçisi.",
        description: "Remus Enerji, elektrik tedariğini güçlü dijital altyapı ile birleştiren bir enerji fintech şirketidir. Tamamen dijital süreçlere dayalı yapımız sayesinde, geleneksel tedarikçilerin aksine müşterilerimize hızlı, kolay, şeffaf ve sürdürülebilir bir elektrik tedarik deneyimi sunuyoruz. <bold>“Kullandığın kadar öde”</bold> modeli, şeffaf faturalandırma ve sertifikalı yeşil enerji seçenekleri ile hem bireysel hem de kurumsal müşterilerimizin enerji ihtiyaçlarını karşılıyor, aynı zamanda tasarruf etmelerine ve sürdürülebilir bir geleceğe katkı sağlamalarına imkân tanıyoruz. Yapay zekâ destekli dinamik fiyatlandırma, PTF tahminleme ve akıllı cihaz entegrasyonu sayesinde enerjiyi sadece tüketilen bir ürün olmaktan çıkarıyor, yönetilen ve değer yaratan bir varlık haline getiriyoruz.",
        vision: {
          title: "Vizyon",
          body: "Remus Enerji olarak vizyonumuz, enerji sektöründe dijitalleşmenin öncüsü olma misyonunu üstlenerek, sürdürülebilirlik, verimlilik ve şeffaflık temelli bir gelecek inşa etmektir. Amacımız; evler, işletmeler ve endüstriyel tesisler için enerji kullanımının sadece erişilebilir değil, aynı zamanda ölçülebilir, izlenebilir ve optimize edilebilir olmasını sağlamaktır."
        },
        mission: {
          title: "Misyon",
          items: [
            {
              title: "Dijital Operasyonel Mükemmellik",
              body: "Tamamen dijital altyapı üzerine kurulu sistemler ile elektrik tedarik süreçlerini daha esnek, daha düşük maliyetli ve daha kontrol edilebilir hale getirmek."
            },
            {
              title: "Enerji Yönetimi & Verimlilik",
              body: "Müşterilerimize anlık veri izleme, tüketim analizleri ve tasarruf önerileri sunarak enerji kullanımını optimize etmelerine yardımcı olmak; böylece sadece enerji sağlamak değil, enerjiyi daha akıllıca kullanmalarını sağlamak."
            },
            {
              title: "Sürdürülebilirlik ve Yeşil Enerji",
              body: "Yeşil enerji kaynaklarını artırarak çevresel sürdürülebilirliği desteklemek, karbon ayak izini azaltmak ve iklim dostu enerji çözümlerini yaygınlaştırmak."
            },
            {
              title: "Şeffaflık, Güven ve Müşteri Odaklılık",
              body: "Tedarik ve faturalandırma süreçlerinde maksimum şeffaflık sağlamak; müşteri ihtiyaçlarını ve beklentilerini dinlemek, çözüm odaklı yaklaşmak; güvenilirlik ve hesap verebilirlik ilkeleriyle hareket etmek."
            },
            {
              title: "Yenilikçilik ve Teknoloji",
              body: "Yapay zeka, veri analitiği ve ileri dijital teknolojileri benimseyerek enerji sektöründe yenilikçi iş modelleri oluşturmak; veriye dayalı karar alma süreçlerini kurumsal kültürün temel taşı haline getirmek."
            }
          ]
        },
        certificates: {
          title: "Sertifikalar ve Lisanslar",
          iso9001: "ISO 9001:2015",
          iso14001: "ISO 14001:2015",
          iso45001: "ISO 45001:2018",
          iso27001: "ISO/IEC 27001:2022",
          iso10002: "ISO 10002:2018",
          epdk: "EPDK Elektrik Tedarik Lisansı"
        }
      },
      notFound: {
        title: "404",
        message: "Oops! Sayfa bulunamadı",
        description: "Aradığınız sayfa bulunamadı veya taşınmış olabilir.",
        returnHome: "Ana Sayfaya Dön"
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        hint: "Aradığını hızlıca bul: Anahtar kelimelerle filtrele, başlıklara göre göz at.",
        badge: "Yardım Merkezi",
        glossaryCta: "Sözlüğe Göz At",
        glossaryTitle: "Terimler & Kısaltmalar",
        searchPlaceholder: "Örn: serbest tüketici, SKTT, yeşil enerji...",
        noResults: "Sonuç bulunamadı. Başka anahtar kelimeler deneyin."
      },
      blog: {
        title: "Blog",
        badge: "Enerji Dünyasındaki Son Gelişmeler",
        subtitle: "Enerji yönetimi ve sürdürülebilirlik hakkında en son haberler, içgörüler ve ipuçlarıyla güncel kalın.",
        featured: "Öne Çıkan",
        allPosts: "Tüm Yazılar",
        filterByTag: "Etikete göre filtrele",
        readMore: "Devamını oku",
        backToBlog: "Blog'a Dön",
        share: "Paylaş",
        shareOn: "Paylaş:",
        sharePost: "Bu yazıyı paylaş",
        copyLink: "Bağlantıyı kopyala",
        linkCopied: "Bağlantı kopyalandı!",
        minRead: "dk okuma",
        noPosts: "Henüz blog yazısı yok. Yakında tekrar kontrol edin!",
        postNotFound: "Blog yazısı bulunamadı.",
        error: "Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyin.",
        comingSoon: "Blog Çok Yakında!",
        comingSoonDesc: "Enerji yönetimi, sürdürülebilirlik ve sektör içgörüleri hakkında heyecan verici içerikler hazırlıyoruz. Takipte kalın!",
        notifyMe: "Hazır Olduğunda Haber Ver",
        relatedPosts: "İlgili Yazılar",
        newsletter: {
          title: "Güncel Kalın",
          desc: "En son enerji içgörülerini, ipuçlarını ve haberleri e-postanıza alın.",
          cta: "Abone Ol"
        }
      },
      login: {
        title: "Müşteri Portalı",
        subtitle: "Enerji hesabınıza erişmek ve tüketiminizi yönetmek için giriş yapın.",
        email_tab: "E-posta",
        phone_tab: "Telefon",
        email_label: "E-posta Adresi",
        email_placeholder: "e-posta@adresiniz.com",
        phone_label: "Telefon Numarası",
        phone_placeholder: "05xx xxx xx xx",
        password_label: "Şifre",
        password_placeholder: "Şifrenizi girin",
        forgot_password: "Şifremi unuttum",
        submit: "Giriş Yap",
        or: "veya",
        no_account: "Henüz hesabınız yok mu?",
        register: "Hemen Kayıt Olun"
      },
      general: {
        loading: "Yükleniyor...",
        invalid_email: "Geçersiz e-posta",
        invalid_email_desc: "Lütfen geçerli bir e-posta adresi girin",
        success: "Başarılı!"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 