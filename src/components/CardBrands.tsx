import React from 'react';
import visaLogo from '@/assets/card-brands/visa.svg';
import mastercardLogo from '@/assets/card-brands/mastercard.svg';
import amexLogo from '@/assets/card-brands/amex.svg';
import troyLogo from '@/assets/card-brands/troy.png';

const CardBrands: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <CardLogo src={visaLogo} alt="Visa" fill />
      <CardLogo src={mastercardLogo} alt="Mastercard" fill />
      <CardLogo src={amexLogo} alt="American Express" fill />
      <CardLogo src={troyLogo} alt="Troy" padded />
    </div>
  );
};

type CardLogoProps = {
  src: string;
  alt: string;
  fill?: boolean;
  padded?: boolean;
};

const CardLogo: React.FC<CardLogoProps> = ({ src, alt, fill, padded }) => (
  <div className="h-8 w-[50px] rounded-md border border-gray-200 bg-white overflow-hidden flex items-center justify-center shadow-sm">
    <img
      src={src}
      alt={alt}
      className={
        fill
          ? 'w-full h-full object-cover'
          : padded
          ? 'max-h-[60%] max-w-[80%] object-contain'
          : 'w-full h-full object-contain'
      }
    />
  </div>
);

export default CardBrands;
