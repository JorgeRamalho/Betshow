import {
  DEFAULT_DESCRIPTION,
  getCanonicalUrl,
  getOgImageUrl,
  LOGO_PATH,
  PRODUCTION_ORIGIN,
  SITE_NAME,
  SITE_TAGLINE,
} from "../data/seo";

type StructuredData = Record<string, unknown>;

function logoUrl(): string {
  return `${PRODUCTION_ORIGIN}${LOGO_PATH}`;
}

/** Schema global — Organization + WebSite (home e fallback) */
export function buildHomeStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${PRODUCTION_ORIGIN}/#organization`,
        name: SITE_NAME,
        url: PRODUCTION_ORIGIN,
        logo: {
          "@type": "ImageObject",
          url: logoUrl(),
        },
        description: DEFAULT_DESCRIPTION,
        sameAs: [
          "https://github.com/JorgeRamalho/Betshow",
          "https://www.linkedin.com/in/jorge-r-barbosa-aabb0417b/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${PRODUCTION_ORIGIN}/#website`,
        name: SITE_NAME,
        url: PRODUCTION_ORIGIN,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": `${PRODUCTION_ORIGIN}/#organization` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "WebPage",
        "@id": `${PRODUCTION_ORIGIN}/#webpage`,
        url: PRODUCTION_ORIGIN,
        name: `${SITE_NAME} — ${SITE_TAGLINE}`,
        description: DEFAULT_DESCRIPTION,
        isPartOf: { "@id": `${PRODUCTION_ORIGIN}/#website` },
        about: { "@id": `${PRODUCTION_ORIGIN}/#organization` },
        inLanguage: "pt-BR",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: getOgImageUrl(),
        },
      },
    ],
  };
}

/** Schema por página interna */
export function buildPageStructuredData(
  pathname: string,
  pageTitle: string,
  description: string
): StructuredData {
  const url = getCanonicalUrl(pathname);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: pageTitle,
        description,
        isPartOf: { "@id": `${PRODUCTION_ORIGIN}/#website` },
        about: { "@id": `${PRODUCTION_ORIGIN}/#organization` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: PRODUCTION_ORIGIN,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: pageTitle.replace(` | ${SITE_NAME}`, ""),
            item: url,
          },
        ],
      },
    ],
  };
}
