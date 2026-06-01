import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/metadata";
import { faqJsonLd, jsonLdScript } from "@/lib/structured-data";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyUs } from "@/components/sections/WhyUs";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: { absolute: `${dict.meta.home.title} · Janet's Cleaning` },
    description: dict.meta.home.description,
    alternates: buildAlternates(lang),
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(dict.home.faq.items))}
      />
      <Hero locale={locale} dict={dict} />
      <TrustBar dict={dict} />
      <ProblemSolution dict={dict} />
      <ServicesOverview locale={locale} dict={dict} />
      <WhyUs dict={dict} />
      <TrustSignals dict={dict} />
      <HowItWorks dict={dict} />
      <Testimonials dict={dict} />
      <ServiceArea locale={locale} dict={dict} />
      <Faq dict={dict} />
      <CtaBand locale={locale} content={dict.home.ctaBand} />
    </>
  );
}
