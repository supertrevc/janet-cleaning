"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/LanguageToggle";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const base = `/${locale}`;
  const nav = [
    { href: base, label: dict.nav.home },
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  function isActive(href: string) {
    if (href === base) return pathname === base;
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Utility top bar */}
      <div className="bg-ink text-white">
        <div className="container-page flex h-9 items-center justify-between text-xs sm:text-[0.8rem]">
          <p className="truncate text-slate-300">{dict.header.topBarText}</p>
          <span className="ml-3 hidden shrink-0 items-center gap-1.5 font-semibold text-brand-200 sm:inline-flex">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.common.bilingual}
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-slate-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          {/* Logo */}
          <Link
            href={base}
            className="flex items-center gap-2.5"
            aria-label={`${business.name} — ${dict.nav.home}`}
          >
            <Image
              src="/janets-logo.svg"
              alt="Janet's Cleaning logo"
              width={40}
              height={40}
              priority
              className="h-10 w-auto"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-lg font-bold text-ink">
                {business.name}
              </span>
              <span className="text-[0.7rem] font-medium uppercase tracking-wide text-brand-600">
                {dict.common.denverMetro}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle current={locale} />
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-brand-700"
            >
              <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
              {business.phoneDisplay}
            </a>
            <Button href={`${base}/quote`} size="sm">
              {dict.common.getFreeQuote}
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={business.phoneHref}
              aria-label={dict.common.callNow}
              className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.common.close : dict.common.openMenu}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-ink"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-[6.25rem] bottom-0 z-40 overflow-y-auto bg-white animate-fade-up"
        >
          <div className="container-page py-6">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {[...nav, { href: `${base}/quote`, label: dict.nav.quote }].map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors",
                      isActive(item.href)
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6">
              <Button
                href={`${base}/quote`}
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {dict.common.requestQuote}
              </Button>
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2 text-base font-bold text-ink"
              >
                <Phone className="h-5 w-5 text-brand-600" aria-hidden="true" />
                {business.phoneDisplay}
              </a>
              <div className="flex justify-center pt-2">
                <LanguageToggle current={locale} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
