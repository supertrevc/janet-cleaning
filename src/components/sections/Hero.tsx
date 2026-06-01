import Image from "next/image";
import { Phone, Star, ShieldCheck, Clock, Sparkles, CircleCheck, CalendarDays } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { business } from "@/lib/business";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.hero;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* soft brand background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" />
      </div>

      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
        {/* Copy */}
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-accent-500" aria-hidden="true" />
            {t.eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[color:var(--color-muted)] text-pretty">
            {t.subtitle}
          </p>

          {/* Reliability hero badge */}
          <p className="mt-6 inline-flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm font-medium text-brand-800">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
            <span>{t.reliabilityBadge}</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={`/${locale}/quote`} size="lg">
              {t.primaryCta}
            </Button>
            <Button href={`/${locale}/booking`} size="lg" variant="secondary">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
              {t.bookCta}
            </Button>
            <Button href={business.phoneHref} size="lg" variant="outline">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {t.secondaryCta}
            </Button>
          </div>

          {/* Rating row */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-accent-500 text-accent-500"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-600">{t.rating}</p>
          </div>
        </div>

        {/* Visual — hero photo */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-card">
            <Image
              src="/hero.jpg"
              alt={
                locale === "es"
                  ? "Limpiadora profesional ordenando una casa luminosa en Denver."
                  : "Professional cleaner tidying a bright Denver home"
              }
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 28rem"
              className="object-cover"
            />
            {/* readability overlay: faint teal tint + subtle dark gradient so the
                white floating cards stay legible regardless of the photo */}
            <div aria-hidden="true" className="absolute inset-0 bg-brand-900/10" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15"
            />
          </div>

          {/* Floating stat card: reliability */}
          <div className="absolute -left-3 top-8 hidden rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 sm:block">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-xl font-bold text-ink">{business.yearsInBusiness}</p>
                <p className="text-xs text-slate-500">
                  {locale === "es" ? "años de servicio" : "years of service"}
                </p>
              </div>
            </div>
          </div>

          {/* Floating stat card: family-owned */}
          <div className="absolute -bottom-4 -right-2 hidden rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 sm:block">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-500/15 text-accent-600">
                <CircleCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-ink">
                  {dict.common.familyOwned}
                </p>
                <p className="text-xs text-slate-500">
                  {locale === "es" ? "las mismas personas" : "the same people"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
