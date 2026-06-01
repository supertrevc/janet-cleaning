import { Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { business } from "@/lib/business";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({
  locale,
  content,
}: {
  locale: Locale;
  content: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
}) {
  return (
    <Section tone="white" size="md">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-600 to-brand-800 px-6 py-12 text-center shadow-card sm:px-12 sm:py-16">
        {/* decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-brand-50/90">{content.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={`/${locale}/quote`} size="lg" variant="primary">
              {content.primaryCta}
            </Button>
            <Button
              href={business.phoneHref}
              size="lg"
              variant="white"
              className="gap-2"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {content.secondaryCta}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
