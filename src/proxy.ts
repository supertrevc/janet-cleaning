import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

// Lightweight Accept-Language negotiation (no external deps). Returns the best
// supported locale, falling back to the default. Heavily Spanish-speaking
// audience, so Spanish browsers land on /es automatically.
function detectLocale(request: NextRequest): string {
  // 1. Explicit preference saved when a visitor uses the language toggle.
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Browser Accept-Language header, ordered by quality.
  const header = request.headers.get("accept-language");
  if (header) {
    const ordered = header
      .split(",")
      .map((part) => {
        const [tag, q = "q=1"] = part.trim().split(";");
        return { tag: tag.toLowerCase(), q: parseFloat(q.replace("q=", "")) || 0 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { tag } of ordered) {
      const base = tag.split("-")[0];
      if ((locales as readonly string[]).includes(base)) return base;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals, API routes, files with extensions, and the special
  // metadata routes (which live at the app root, outside the [lang] segment).
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname === "/manifest.webmanifest" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If the path already starts with a supported locale, let it through.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Otherwise redirect to the locale-prefixed equivalent.
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, metadata files, and static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.[\\w]+$).*)",
  ],
};
