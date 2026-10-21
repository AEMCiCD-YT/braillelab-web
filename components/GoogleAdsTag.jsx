import Script from "next/script";
import { GOOGLE_ADS_ID } from "../lib/google-ads.mjs";

export default function GoogleAdsTag() {
  return (
    <>
      <Script id="braillelab-google-ads-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('set', 'linker', {domains: ['aemcicd.org', 'braillelab.org']});
window.gtag('config', ${JSON.stringify(GOOGLE_ADS_ID)});`}
      </Script>
      <Script
        id="braillelab-google-ads-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
