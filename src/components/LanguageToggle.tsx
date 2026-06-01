"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  // segments[0] === "" because pathname starts with "/"
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    segments[1] = target;
  } else {
    segments.splice(1, 0, target);
  }
  return segments.join("/") || `/${target}`;
}

export function LanguageToggle({
  current,
  className,
}: {
  current: Locale;
  className?: string;
}) {
  const pathname = usePathname() || `/${current}`;

  function persist(locale: Locale) {
    // Remember the choice for one year so the proxy honors it next visit.
    // (Legitimate DOM side effect in an event handler; the compiler immutability
    // rule misfires on document.cookie assignment.)
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-sm font-semibold",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            onClick={() => persist(locale)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1 transition-colors",
              active
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:text-brand-700"
            )}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
