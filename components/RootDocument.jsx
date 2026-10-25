import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import GoogleAdsTag from "./GoogleAdsTag";
import MotionEffects from "./MotionEffects";
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

const MOTION_SCRIPT = "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}";

export const viewport = {
  themeColor: "#0B132B",
  colorScheme: "light",
};

// Documento común a los dos layouts raíz: (es) en la raíz del sitio y /en.
export default function RootDocument({ lang, children }) {
  return (
    <html lang={lang} className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <head>
        {/* Activa el movimiento antes de pintar, salvo que el usuario pida movimiento reducido. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body><GoogleAdsTag />{children}<MotionEffects /></body>
    </html>
  );
}
