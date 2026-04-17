import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{children}</h2>
);

const OnBilgilendirme: React.FC = () => {
  return (
    <LegalPageLayout title="Ön Bilgilendirme Formu" updatedAt="17.04.2026">
      <p>
        6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler
        Yönetmeliği uyarınca, mesafeli satış sözleşmesi kurulmadan önce aşağıdaki
        hususlar hakkında bilgilendirildiğinizi kabul edersiniz.
      </p>

      <H>Satıcı Bilgileri</H>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Unvan:</strong> Remus Enerji Elektrik Tedarik A.Ş.
        </li>
        <li>
          <strong>Adres:</strong> Osmangazi Mah. Sanayi Cad. No: 33 İç Kapı No: A
          Darıca / Kocaeli / Türkiye
        </li>
        <li>
          <strong>Telefon:</strong> +90 (850) 360 71 25
        </li>
        <li>
          <strong>E-posta:</strong> hello@remusenerji.com
        </li>
      </ul>

      <H>Hizmetin Temel Nitelikleri ve Bedeli</H>
      <p>
        Ödeme konusu hizmet, Remus Enerji tarafından tedarik edilen elektrik
        enerjisine ilişkin aylık fatura tutarının ödenmesidir. Ödenecek toplam tutar
        Alıcı'nın faturasında yer alan KDV ve tüm vergiler dâhil tutardır. Ödeme para
        birimi Türk Lirası (TRY)'dır.
      </p>

      <H>Ödeme Bilgileri</H>
      <p>
        Ödeme, İş Bankası 3D Secure altyapısı üzerinden kredi/banka kartı
        (Visa, Mastercard, American Express, Troy) ile yapılır. Kart bilgileriniz
        Satıcı tarafından saklanmaz.
      </p>

      <H>Teslimat</H>
      <p>
        Dijital bir hizmet bedelinin ödenmesi söz konusu olduğundan fiziksel teslimat
        yapılmaz. Ödemeye ilişkin elektronik tahsilat makbuzu işlem tamamlandıktan
        hemen sonra beyan ettiğiniz e-posta adresine iletilir.
      </p>

      <H>Cayma Hakkı İstisnası</H>
      <p>
        Mesafeli Sözleşmeler Yönetmeliği md. 15 uyarınca, anında ifa edilen ve
        niteliği itibariyle iadesi mümkün olmayan hizmetlerin ödemesi için cayma hakkı
        kullanılamaz. Tüketilen elektrik enerjisine ilişkin fatura ödemesi bu kapsamda
        değerlendirilir. Hatalı ya da mükerrer ödemelere ilişkin süreç{' '}
        <a href="/iade-iptal" className="text-primary hover:underline">
          İade ve İptal Politikası
        </a>{' '}
        sayfasında belirtilmiştir.
      </p>

      <H>Şikayet ve İtirazlar</H>
      <p>
        Her türlü şikayet ve itirazınızı müşteri hizmetleri hattımız üzerinden
        (+90 850 360 71 25) ya da hello@remusenerji.com adresine e-posta yoluyla
        iletebilirsiniz. Yasal yollar için Tüketici Hakem Heyetleri ve Tüketici
        Mahkemeleri yetkilidir.
      </p>
    </LegalPageLayout>
  );
};

export default OnBilgilendirme;
