'use client';

import { useEffect } from 'react';

export default function LiveChat() {
  useEffect(() => {
    // Tawk.to Live Chat Integration
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
      console.log('Live chat not configured. Add Tawk.to credentials to .env');
      return;
    }

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const tawkScript = document.querySelector(
        `script[src*="tawk.to"]`
      );
      if (tawkScript) {
        document.body.removeChild(tawkScript);
      }
    };
  }, []);

  return null;
}
