import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import GoogleAdsTag from "./GoogleAdsTag";
import "../app/globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const viewport = {
  themeColor: "#0B132B",
  colorScheme: "light",
};

// Documento común a los dos layouts raíz: (es) en la raíz del sitio y /en.
export default function RootDocument({ lang, children }) {
  return (
    <html lang={lang} className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body><GoogleAdsTag />{children}</body>
    </html>
  );
}
