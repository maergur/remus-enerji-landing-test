import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{children}</h2>
);

const Teslimat: React.FC = () => {
  return (
    <LegalPageLayout title="Teslimat Politikası" updatedAt="17.04.2026">
      <p>
        Remus Enerji web sitesi üzerinden yapılan ödemeler, elektrik enerjisi
        tedariğine ilişkin fatura tahsilatı niteliğindedir. Bu nedenle fiziki
        teslimat söz konusu değildir.
      </p>

      <H>1. Elektronik Tahsilat Belgesi</H>
      <p>
        Ödemeniz başarıyla tamamlandığında, e-satış/ tahsilat belgeniz Alıcı'nın
        beyan ettiği e-posta adresine otomatik olarak iletilir. Belgenin iletim
        süresi normal koşullarda birkaç dakikayı aşmaz.
      </p>

      <H>2. Elektrik Enerjisi Tedariği</H>
      <p>
        Remus Enerji abonesi olan Alıcı'ya elektrik enerjisi tedariği kesintisiz
        şekilde sürdürülür. Ödeme işlemi, aktif aboneliğin devamlılığını sağlar;
        ayrı bir teslimat süreci yoktur.
      </p>

      <H>3. Kapsam ve İthalat Kısıtlamaları</H>
      <p>
        Hizmet yalnızca Türkiye Cumhuriyeti sınırları içinde sunulmaktadır.
        Yurt dışına herhangi bir fiziksel ürün ya da dijital ürün teslimatı
        yapılmaz. İthalat/ihracat konusu bir işlem söz konusu değildir.
      </p>

      <H>4. Ödeme Belgesinin Ulaşmaması</H>
      <p>
        Elektronik tahsilat belgesinin e-posta kutunuza ulaşmaması durumunda lütfen
        önce istenmeyen (spam) klasörünü kontrol ediniz. Sorun devam ederse
        hello@remusenerji.com adresi ya da +90 (850) 360 71 25 numarası üzerinden
        müşteri hizmetlerimizle iletişime geçebilirsiniz.
      </p>
    </LegalPageLayout>
  );
};

export default Teslimat;
