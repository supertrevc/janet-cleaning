import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "white" | "muted" | "brand" | "ink";
  size?: "sm" | "md" | "lg";
  containerClassName?: string;
};

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  white: "bg-white",
  muted: "bg-brand-50/60",
  brand: "bg-brand-600 text-white",
  ink: "bg-ink text-slate-200",
};

const sizes: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-14 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
};

export function Section({
  tone = "white",
  size = "md",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(tones[tone], sizes[size], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  className,
}: HeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-wider",
            tone === "dark" ? "text-brand-600" : "text-brand-200"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold sm:text-4xl",
          tone === "light" && "text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-[color:var(--color-muted)]" : "text-slate-300"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
