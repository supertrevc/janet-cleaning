import { Container } from "@/components/ui/Container";

// Compact hero used at the top of inner pages.
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-brand-50/50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-20 -top-16 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent-400/15 blur-3xl" />
      </div>
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--color-muted)] text-pretty">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
