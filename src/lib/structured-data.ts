import { business } from "./business";
import { siteUrl, type Locale, localeHrefLang } from "./i18n";

// Builds LocalBusiness JSON-LD. Home-based business: areaServed only, NO street
// address is exposed.
export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    description:
      locale === "es"
        ? "Servicio de limpieza familiar y bilingüe, residencial y comercial, en el área de Denver."
        : "Family-owned, bilingual residential and commercial cleaning service in the Denver metro.",
    url: `${siteUrl}/${locale}`,
    telephone: business.phoneHref.replace("tel:", ""),
    email: business.email,
    priceRange: business.priceRange,
    foundingDate: business.foundingDate,
    knowsLanguage: ["en", "es"],
    image: `${siteUrl}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: "US",
    },
    areaServed: business.serviceCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    founder: {
      "@type": "Person",
      name: business.owner,
    },
    makesOffer: [
      "recurring",
      "deep",
      "moveInOut",
      "office",
    ].map((slug) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        serviceType: slug,
        provider: { "@id": `${siteUrl}/#business` },
      },
    })),
    inLanguage: localeHrefLang[locale],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: `${siteUrl}/${locale}`,
    name: business.name,
    inLanguage: localeHrefLang[locale],
    publisher: { "@id": `${siteUrl}/#business` },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

// Renders a JSON-LD object as a <script> tag, escaping `<` to prevent XSS.
export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
