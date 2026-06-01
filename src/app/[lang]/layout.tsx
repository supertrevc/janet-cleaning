import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";

import { locales, isLocale, localeHrefLang, siteUrl, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/metadata";
import { business } from "@/lib/business";
import {
  localBusinessJsonLd,
  websiteJsonLd,
  jsonLdScript,
} from "@/lib/structured-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0d9488",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${business.name} — ${dict.meta.home.title}`,
      template: `%s · ${business.name}`,
    },
    description: dict.meta.home.description,
    applicationName: business.name,
    alternates: buildAlternates(lang),
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: localeHrefLang[lang],
      alternateLocale: lang === "en" ? "es_US" : "en_US",
      url: `/${lang}`,
      title: `${business.name} — ${dict.meta.home.title}`,
      description: dict.meta.home.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} — ${dict.meta.home.title}`,
      description: dict.meta.home.description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    // Icons are auto-wired from the app-dir file conventions
    // (src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico).
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={localeHrefLang[locale]}
      className={`${inter.variable} ${jakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-[color:var(--color-body)] antialiased">
        {/* Structured data: LocalBusiness + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd(locale))}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd(locale))}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.common.skipToContent}
        </a>

        <Header locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
