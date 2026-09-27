const DEFAULT_SITE_URL = "https://aemcicd-yt.github.io/braillelab-web";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

export const SOCIAL_IMAGE = `${SITE_URL}/social/braillelab-brailletech-2027.png`;
export const FAVICON_URL = `${SITE_URL}/favicon.svg`;

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

export function buildMetadata({
  title = siteMetadata.defaultTitle,
  description = siteMetadata.defaultDescription,
  path = "/",
  keywords = [],
}) {
  const canonical = absoluteUrl(path);
  const pageTitle = title === siteMetadata.defaultTitle ? title : `${title} · BrailleLab Ecuador`;

  return {
    title: pageTitle,
    description,
    applicationName: siteMetadata.applicationName,
    keywords: [...siteMetadata.keywords, ...keywords],
    authors: [{ name: "BrailleLab Ecuador" }],
    creator: "BrailleLab Ecuador",
    publisher: "AEMCiCD · Universidad Yachay Tech",
    category: "technology",
    alternates: {
      canonical,
    },
    icons: {
      icon: [{ url: FAVICON_URL, type: "image/svg+xml" }],
      shortcut: [{ url: FAVICON_URL, type: "image/svg+xml" }],
    },
    openGraph: {
      type: "website",
      locale: "es_EC",
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
