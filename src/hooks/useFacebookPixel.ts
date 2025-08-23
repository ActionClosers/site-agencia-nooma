import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const useFacebookPixel = (pixelId: string) => {
  useEffect(() => {
    // Verifica se o fbq já existe
    if (!window.fbq) {
      // Cria o script dinamicamente
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);

      // Inicializa o fbq
      window._fbq = window._fbq || [];
      window.fbq = function () {
        window._fbq.push(arguments);
      };
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');

      // Adiciona o noscript como fallback
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.body.appendChild(noscript);
    }

    // Limpeza (opcional, mas boa prática)
    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, [pixelId]);

  // Função para rastrear eventos personalizados
  const trackCustomEvent = (eventName: string, data?: Record<string, any>) => {
    if (window.fbq) {
      window.fbq('track', eventName, data);
    }
  };

  return { trackCustomEvent };
};
