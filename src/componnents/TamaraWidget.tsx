import React, { useEffect, useRef } from 'react';

interface TamaraWidgetProps {
  price: number;
  lang?: 'en' | 'ar';
  currency?: 'SAR' | 'UED';
  publicKey: string;
  paymentType?: 'installment' | 'paylater' | 'pay-next-month';
}

const TamaraWidget: React.FC<TamaraWidgetProps> = ({
  price,
  lang = 'en',
  currency = 'SAR',
  publicKey,
  paymentType = 'installment',
}) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scriptSrc = 'https://cdn.tamara.co/widget/product-widget.min.js';

    // Load the script if not already present
    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${scriptSrc}"]`)) {
          return resolve(); // already loaded
        }

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Tamara script failed to load'));
        document.head.appendChild(script);
      });
    };

    loadScript().then(() => {
      if (window.TamaraProductWidget) {
        window.TamaraProductWidget.init({
          lang,
          currency,
          publicKey,
        });

        window.TamaraProductWidget.render();
      }
    });
  }, [lang, currency, publicKey]);

  return (
    <div
      ref={widgetRef}
      className="tamara-product-widget"
      data-lang={lang}
      data-price={price}
      data-currency={currency}
      data-payment-type={paymentType}
      data-disable-installment="false"
      data-disable-paylater="false"
      data-installment-minimum-amount="99"
      data-installment-maximum-amount="3000"
      data-installment-available-amount="99"
      data-pay-later-max-amount="0"
    />
  );
};

export default TamaraWidget;
