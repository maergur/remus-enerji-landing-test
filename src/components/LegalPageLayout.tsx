import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = {
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
};

const LegalPageLayout: React.FC<Props> = ({ title, updatedAt, children }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
            {updatedAt && (
              <p className="text-sm text-gray-500 mt-2">Son güncelleme: {updatedAt}</p>
            )}
          </div>
          <article className="prose-legal text-gray-700 leading-relaxed space-y-5 text-[15px]">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
