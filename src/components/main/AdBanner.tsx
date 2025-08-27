'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  adSlot: string;
  adFormat?: string;
  adLayoutKey?: string;
}

export const AdBanner = ({ adSlot, adFormat = 'auto', adLayoutKey = '' }: AdBannerProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="w-full text-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-0000000000000000" // TODO: Replace with your AdSense client ID
        data-ad-slot={adSlot} // Passed as a prop
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        data-ad-layout-key={adLayoutKey}
      ></ins>
    </div>
  );
};
