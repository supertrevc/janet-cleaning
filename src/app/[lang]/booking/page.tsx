import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BookingCalendar } from "@/components/sections/BookingCalendar";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/booking">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.booking.title,
    description: dict.meta.booking.description,
    alternates: buildAlternates(lang, "/booking"),
  };
}

export default async function BookingPage({
  params,
}: PageProps<"/[lang]/booking">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.booking.hero.eyebrow}
        title={dict.booking.hero.title}
        subtitle={dict.booking.hero.subtitle}
      />

      {/* Generic section wrapper — the inner widget can be swapped for a Cal.com
          embed without touching this layout. */}
      <Section tone="white" size="lg">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <BookingCalendar locale={locale} dict={dict} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
