/* eslint-disable @typescript-eslint/no-explicit-any */
// types/global.d.ts
import "react";

declare global {
  interface Window {
    TamaraWidgetV2: {
      refresh: () => void;
      initialize?: (config: any) => void;
    };
    TamaraProductWidget: {
      refresh: () => void;
      initialize?: (config: any) => void;
      init: (config: any) => void;
      destroy: () => void;
      render: () => void;
    };
  }
}
