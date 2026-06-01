import type { Dictionary } from "@/lib/dictionaries";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

// Dark contrast band with headline trust stats. The last item is a clearly
// marked placeholder for the owner to confirm insured/bonded status.
export function TrustSignals({ dict }: { dict: Dictionary }) {
  const t = dict.home.trustSignals;

  return (
    <section className="bg-ink py-16 sm:py-20">
      <Container>
        <h2 className="text-center font-heading text-2xl font-bold text-white sm:text-3xl">
          {t.title}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const isPlaceholder = "placeholder" in item && item.placeholder;
            return (
              <Reveal
                key={item.label}
                delay={i * 0.08}
                className={cn(
                  "rounded-2xl border p-6 text-center",
                  isPlaceholder
                    ? "border-dashed border-amber-400/50 bg-amber-400/5"
                    : "border-white/10 bg-white/5"
                )}
              >
                <p
                  className={cn(
                    "font-heading font-bold leading-tight",
                    isPlaceholder
                      ? "text-base text-amber-300"
                      : "text-3xl text-brand-200 sm:text-4xl"
                  )}
                >
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-slate-400">{item.label}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
