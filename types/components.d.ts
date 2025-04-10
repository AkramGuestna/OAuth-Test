// types/components.d.ts
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tamara-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type: string;
          amount?: string | number;
          'inline-type'?: string | number;
          'inline-variant'?: string;
        },
        HTMLElement
      >;
    }
  }

  interface Window {
    TamaraWidgetV2: {
      refresh: () => void;
    };
  }
}