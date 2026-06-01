import { CalendarCheck, Users, BadgeDollarSign, Languages } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const icons = [CalendarCheck, Users, BadgeDollarSign, Languages];

export function TrustBar({ dict }: { dict: Dictionary }) {
  const items = dict.home.trustBar.items;

  return (
    <section className="border-y border-slate-100 bg-white py-10">
      <Container>
        <h2 className="sr-only">{dict.home.trustBar.title}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i] ?? CalendarCheck;
            return (
              <Reveal
                key={item.title}
                delay={i * 0.08}
                className="flex items-start gap-3.5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading font-bold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
