import React from 'react';

export const GlobeLogo = ({ className = "tw-w-10 tw-h-10" }) => (
  <img 
    src="/logo_book_transparent.png" 
    alt="Globe Logo" 
    className={`${className} tw-object-contain tw-drop-shadow-sm`}
  />
);

export const BookLogo = ({ className = "tw-w-10 tw-h-10" }) => (
  <img 
    src="/logo_globe_transparent.png" 
    alt="Book Logo" 
    className={`${className} tw-object-contain tw-drop-shadow-sm`}
  />
);
