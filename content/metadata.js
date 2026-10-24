import { localizePath } from "../lib/i18n.mjs";

const DEFAULT_SITE_URL = "https://braillelab.org";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

export const PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SOCIAL_IMAGE = `${SITE_URL}/social/braillelab-brailletech-2027.png`;
export const FAVICON_URL = `${PUBLIC_BASE_PATH}/favicon.svg`;

export function absoluteUrl(path = "/") {
  const normalized = path === "/" ? "/" : `/${String(path).replace(/^\/+|\/+$/g, "")}/`;
  return `${SITE_URL}${normalized}`;
}

export const siteMetadata = {
  applicationName: "BrailleLab Ecuador",
  siteName: "BrailleLab Ecuador · BrailleTech Challenge Ecuador 2027",
  defaultTitle: "BrailleTech Challenge Ecuador 2027",
  defaultDescription:
    "BrailleTech Challenge Ecuador 2027, una iniciativa de BrailleLab Ecuador para aprender, diseñar, construir y documentar tecnología Braille electrónica refrescable.",
  keywords: [
    "BrailleLab Ecuador",
    "BrailleTech Challenge Ecuador 2027",
    "Braille",
    "accesibilidad",
    "tecnología asistiva",
    "hardware abierto",
    "Universidad Yachay Tech",
    "Ecuador",
  ],
};

const siteMetadataEn = {
  defaultDescription:
    "BrailleTech Challenge Ecuador 2027, a BrailleLab Ecuador initiative to learn, design, build and document refreshable electronic Braille technology.",
  keywords: [
    "BrailleLab Ecuador",
    "BrailleTech Challenge Ecuador 2027",
    "Braille",
    "accessibility",
    "assistive technology",
    "open hardware",
    "Yachay Tech University",
    "Ecuador",
  ],
};

/** `path` es siempre la ruta en español; la versión en inglés se deriva con `locale: "en"`. */
export function buildMetadata({
  title = siteMetadata.defaultTitle,
  description,
  path = "/",
  keywords = [],
  locale = "es",
}) {
  const localized = locale === "en" ? siteMetadataEn : siteMetadata;
  description ??= localized.defaultDescription;
  const canonical = absoluteUrl(localizePath(path, locale));
  const pageTitle = title === siteMetadata.defaultTitle || title === siteMetadata.applicationName ? title : `${title} · BrailleLab Ecuador`;

  return {
    title: pageTitle,
    description,
    applicationName: siteMetadata.applicationName,
    keywords: [...localized.keywords, ...keywords],
    authors: [{ name: "BrailleLab Ecuador" }],
    creator: "BrailleLab Ecuador",
    publisher: "AEMCiCD · Universidad Yachay Tech",
    category: "technology",
    alternates: {
      canonical,
      languages: {
        es: absoluteUrl(path),
        en: absoluteUrl(localizePath(path, "en")),
        "x-default": absoluteUrl(path),
      },
    },
    icons: {
      icon: [{ url: FAVICON_URL, type: "image/svg+xml" }],
      shortcut: [{ url: FAVICON_URL, type: "image/svg+xml" }],
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_EC",
      alternateLocale: locale === "en" ? ["es_EC"] : ["en_US"],
      url: canonical,
      siteName: siteMetadata.siteName,
      title: pageTitle,
      description,
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: "BrailleLab Ecuador · BrailleTech Challenge Ecuador 2027",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
