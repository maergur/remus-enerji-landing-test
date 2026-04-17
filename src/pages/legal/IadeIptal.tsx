import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{children}</h2>
);

const IadeIptal: React.FC = () => {
  return (
    <LegalPageLayout title="İade ve İptal Politikası" updatedAt="17.04.2026">
      <p>
        Bu sayfa, Remus Enerji Elektrik Tedarik A.Ş. web sitesi üzerinden yapılan
        elektrik faturası ödemelerine ilişkin iade ve iptal koşullarını açıklar.
      </p>

      <H>1. Cayma Hakkı İstisnası</H>
      <p>
        Tüketilen elektrik enerjisine ilişkin fatura ödemeleri, 6502 sayılı Kanun ve
        Mesafeli Sözleşmeler Yönetmeliği md. 15 kapsamında anında ifa edilen ve iadesi
        mümkün olmayan hizmet niteliğindedir. Bu nedenle kural olarak cayma hakkı
        kullanılamaz.
      </p>

      <H>2. Hatalı ve Mükerrer Ödemeler</H>
      <p>
        Aşağıdaki hâllerde yapılan ödemelerin iadesi mümkündür:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Aynı faturaya mükerrer yapılan ödeme,</li>
        <li>Yanlış abonelik numarası ile yapılan ödeme,</li>
        <li>Fatura tutarından yüksek yapılan ödeme (fark iadesi),</li>
        <li>Sistemsel hata nedeniyle alınan ödeme.</li>
      </ul>

      <H>3. Başvuru Yöntemi</H>
      <p>
        İade talepleri, işlem tarihinden itibaren <strong>14 gün içinde</strong>{' '}
        aşağıdaki kanallardan biri üzerinden iletilmelidir:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>E-posta:</strong> hello@remusenerji.com
        </li>
        <li>
          <strong>Telefon:</strong> +90 (850) 360 71 25
        </li>
      </ul>
      <p>
        Başvuruda; ad-soyad, TCKN, abonelik/tesisat numarası, ödeme tarihi, ödeme
        tutarı ve iade gerekçesinin belirtilmesi gerekmektedir.
      </p>

      <H>4. İade Süreci</H>
      <p>
        Talepler en geç <strong>14 iş günü</strong> içinde değerlendirilir. Uygun
        bulunan iadeler, ödemenin yapıldığı kredi/banka kartına yapılır. İade
        tutarının kart hesabına yansıma süresi ilgili bankanın iş akışına bağlı olup
        genellikle 2–10 iş günü sürer. Bu süreden Remus Enerji sorumlu değildir.
      </p>

      <H>5. İptal</H>
      <p>
        Ödeme talimatı İş Bankası Sanal POS'a iletildikten sonra işlem anında
        sonuçlanır. Bu sebeple başarılı işlem iptali mümkün değildir; hatalı ödemeler
        için yukarıdaki iade sürecine başvurulur.
      </p>

      <H>6. İletişim</H>
      <p>
        Soru ve şikayetleriniz için hello@remusenerji.com / +90 (850) 360 71 25.
      </p>
    </LegalPageLayout>
  );
};

export default IadeIptal;
