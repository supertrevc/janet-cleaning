"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { locales, defaultLocale } from "@/lib/i18n";

const copy = {
  en: {
    code: "404",
    title: "Page not found",
    subtitle:
      "Sorry, we couldn't find the page you were looking for. Let's get you back on track.",
    cta: "Back to home",
  },
  es: {
    code: "404",
    title: "Página no encontrada",
    subtitle:
      "Lo sentimos, no pudimos encontrar la página que buscaba. Le ayudamos a volver al camino.",
    cta: "Volver al inicio",
  },
};

export default function NotFound() {
  const pathname = usePathname() || "/";
  const seg = pathname.split("/")[1];
  const locale = (locales as readonly string[]).includes(seg)
    ? (seg as keyof typeof copy)
    : defaultLocale;
  const t = copy[locale];

  return (
    <section className="grid min-h-[60vh] place-items-center px-6 py-20">
      <div className="text-center">
        <p className="font-heading text-7xl font-bold text-brand-200">{t.code}</p>
        <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{t.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500">{t.subtitle}</p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
