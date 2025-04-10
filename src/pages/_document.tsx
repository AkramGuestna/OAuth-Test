import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <Script
          id="tamara-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.tamaraWidgetConfig = {
                lang: "en",
                country: "SA",
                publicKey: "f2f0be48-09de-47d7-aea4-257480336aad"
              }
            `,
          }}
        /> */}
         <Script
          strategy="beforeInteractive"
          src="https://cdn.tamara.co/widget-v1/tamara-widget.js" 
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}