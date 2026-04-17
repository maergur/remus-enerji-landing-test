import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{children}</h2>
);

const MesafeliSatis: React.FC = () => {
  return (
    <LegalPageLayout title="Mesafeli Satış Sözleşmesi" updatedAt="17.04.2026">
      <p>
        İşbu Mesafeli Satış Sözleşmesi ("Sözleşme"), 6502 sayılı Tüketicinin Korunması
        Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümlerine uygun olarak
        aşağıdaki taraflar arasında elektronik ortamda düzenlenmiştir.
      </p>

      <H>1. Taraflar</H>
      <p>
        <strong>Satıcı:</strong> Remus Enerji Elektrik Tedarik A.Ş. — Osmangazi Mah.
        Sanayi Cad. No: 33 İç Kapı No: A Darıca / Kocaeli. Tel: +90 (850) 360 71 25,
        E-posta: hello@remusenerji.com
      </p>
      <p>
        <strong>Alıcı:</strong> Ödeme sayfasında bilgilerini beyan eden ve işbu Sözleşmeyi
        kabul eden kart hamili müşteri.
      </p>

      <H>2. Sözleşmenin Konusu</H>
      <p>
        Sözleşmenin konusu, Alıcı'nın Remus Enerji tarafından tedarik edilen elektrik
        enerjisi için düzenlenmiş fatura bedelini, Satıcı'nın web sitesi üzerinden
        İş Bankası Sanal POS altyapısı kullanılarak kredi/banka kartı ile ödemesine
        ilişkin tarafların hak ve yükümlülüklerinin belirlenmesidir.
      </p>

      <H>3. Ödeme Konusu Hizmetin Tanımı ve Bedeli</H>
      <p>
        Hizmet: Remus Enerji tarafından sunulan elektrik enerjisi tedariği kapsamında
        düzenlenen aylık fatura bedelinin tahsilatı. Bedel, Alıcı'nın seçtiği fatura
        tutarı olup ödeme Türk Lirası (TRY) cinsinden gerçekleştirilir.
      </p>

      <H>4. Ödeme Şekli</H>
      <p>
        Ödeme, İş Bankası 3D Secure altyapısı üzerinden kredi/banka kartı ile
        gerçekleştirilir. Kart bilgileri Remus Enerji tarafından kaydedilmez; işlem
        doğrudan bankanın güvenli sayfasında tamamlanır.
      </p>

      <H>5. Cayma Hakkı ve İade</H>
      <p>
        Tüketilen elektrik enerjisine ilişkin fatura ödemeleri, niteliği gereği anında
        ifa edilen ve iade edilemeyen bir hizmete karşılık yapılan ödeme niteliğindedir.
        Mesafeli Sözleşmeler Yönetmeliği md. 15 kapsamında cayma hakkı istisnaları
        arasında yer alır. Hatalı ya da mükerrer ödemelerde iade ve iptal koşulları
        için{' '}
        <a href="/iade-iptal" className="text-primary hover:underline">
          İade ve İptal Politikası
        </a>{' '}
        sayfası esas alınır.
      </p>

      <H>6. Teslimat</H>
      <p>
        Ödeme karşılığı elektronik tahsilat makbuzu, işlem tamamlandıktan sonra
        Alıcı'nın beyan ettiği e-posta adresine elektronik ortamda iletilir. Elektrik
        enerjisi tedariği kesintisiz şekilde devam eder; ayrıca bir teslimat süreci
        öngörülmez. Detaylar için{' '}
        <a href="/teslimat" className="text-primary hover:underline">
          Teslimat Politikası
        </a>{' '}
        sayfasına bakınız.
      </p>

      <H>7. Gizlilik ve Bilgi Güvenliği</H>
      <p>
        Alıcı'nın kişisel verileri KVKK ve ilgili mevzuat çerçevesinde işlenir. Kart
        bilgileri PCI DSS standartlarına uygun altyapı üzerinden işlenir ve Satıcı
        tarafından saklanmaz.
      </p>

      <H>8. Uyuşmazlıkların Çözümü</H>
      <p>
        İşbu Sözleşme'den doğan uyuşmazlıklarda, Gümrük ve Ticaret Bakanlığı'nca her
        yıl ilan edilen parasal sınırlar dâhilinde Alıcı'nın ikametgâhının bulunduğu
        yerdeki Tüketici Hakem Heyetleri, bu sınırların üzerinde ise Tüketici
        Mahkemeleri yetkilidir.
      </p>

      <H>9. Yürürlük</H>
      <p>
        Alıcı, ödeme sayfasında ilgili kutucuğu işaretlemek suretiyle işbu Sözleşme'yi
        okuduğunu, anladığını ve tüm hükümlerini kabul ettiğini beyan eder. Sözleşme
        ödemenin başarıyla tamamlanması ile yürürlüğe girer.
      </p>
    </LegalPageLayout>
  );
};

export default MesafeliSatis;
