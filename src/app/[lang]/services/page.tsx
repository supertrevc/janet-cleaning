import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.services.title,
    description: dict.meta.services.description,
    alternates: buildAlternates(lang, "/services"),
  };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.services.hero.eyebrow}
        title={dict.services.hero.title}
        subtitle={dict.services.hero.subtitle}
      />
      <ServicesDetail locale={locale} dict={dict} />
      <CtaBand locale={locale} content={dict.services.ctaBand} />
    </>
  );
}
