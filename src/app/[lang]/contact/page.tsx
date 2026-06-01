import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/metadata";
import { business } from "@/lib/business";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: buildAlternates(lang, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const c = dict.contact;

  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      <Section tone="white" size="lg">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Phone (priority) */}
              <a
                href={business.phoneHref}
                className="group flex items-start gap-4 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-5 transition-shadow hover:shadow-card"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                  <Phone className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-heading font-bold text-ink">
                    {c.phoneCard.title}
                  </span>
                  <span className="mt-0.5 block text-lg font-bold text-brand-700">
                    {business.phoneDisplay}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-500">
                    {c.phoneCard.desc}
                  </span>
                </span>
              </a>

              {/* Email */}
              <a
                href={business.emailHref}
                className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-shadow hover:shadow-card"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-heading font-bold text-ink">
                    {c.emailCard.title}
                  </span>
                  <span className="mt-0.5 block break-all text-sm font-medium text-brand-700">
                    {business.email}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-500">
                    {c.emailCard.desc}
                  </span>
                </span>
              </a>

              {/* Service area */}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-heading font-bold text-ink">
                    {c.areaCard.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-500">
                    {c.areaCard.desc}
                  </span>
                </span>
              </div>

              {/* Hours (placeholder — exact hours unknown) */}
              <div className="flex items-start gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-brand-600">
                  <Clock className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-heading font-bold text-ink">
                    {c.hoursTitle}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-amber-600">
                    {c.hoursPlaceholder}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-500">
                    {c.hoursNote}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal>
              <QuoteForm dict={dict} />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
