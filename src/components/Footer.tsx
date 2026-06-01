import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { business, serviceSlugs } from "@/lib/business";
import { Container } from "@/components/ui/Container";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = 2026; // Static build year; Date is unavailable during prerender constraints.

  const quickLinks = [
    { href: base, label: dict.nav.home },
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/contact`, label: dict.nav.contact },
    { href: `${base}/quote`, label: dict.nav.quote },
  ];

  return (
    <footer className="bg-ink text-slate-300">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-xl font-bold text-white">
                {business.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {dict.footer.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-brand-200">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {dict.common.bilingual}
            </p>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-2" aria-label={dict.footer.quickLinks}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`${base}/services`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {dict.services.list[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center gap-2.5 font-semibold text-white hover:text-brand-200"
                >
                  <Phone className="h-4 w-4 text-brand-300" aria-hidden="true" />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={business.emailHref}
                  className="inline-flex items-center gap-2.5 break-all text-slate-400 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <span>{dict.common.servingArea}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={`${base}/privacy`} className="hover:text-slate-300">
              {dict.footer.privacy}
            </Link>
            <Link href={`${base}/terms`} className="hover:text-slate-300">
              {dict.footer.terms}
            </Link>
            <span className="text-slate-600">{dict.footer.builtNote}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
