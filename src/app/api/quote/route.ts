import { NextResponse, type NextRequest } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";
import { business } from "@/lib/business";

// Quote requests are short-lived form posts — never cache.
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "validation", fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot tripped — silently accept so bots don't learn they were caught.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  // ---------------------------------------------------------------------------
  // DELIVERY: Wire this to a real channel before launch. The recommended setup
  // is an email service (e.g. Resend) sending the lead to:
  //   ${business.email}
  // Add the provider SDK + RESEND_API_KEY, then send here. Until then we log the
  // lead server-side so nothing is lost during development.
  // ---------------------------------------------------------------------------
  console.info("[quote] New lead for %s:", business.name, {
    name: data.name,
    phone: data.phone || "(none)",
    email: data.email || "(none)",
    address: data.address,
    service: data.service,
    frequency: data.frequency || "(unspecified)",
    message: data.message || "",
  });

  return NextResponse.json({ ok: true });
}
