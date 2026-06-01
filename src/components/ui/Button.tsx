import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "white" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  // Amber accent — the primary conversion CTA.
  primary:
    "bg-accent-500 text-ink shadow-[0_8px_24px_-8px_rgba(245,158,11,0.6)] hover:bg-accent-400 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-accent-500",
  secondary:
    "bg-brand-600 text-white shadow-[0_8px_24px_-10px_rgba(15,118,110,0.7)] hover:bg-brand-700 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-brand-600",
  outline:
    "border-2 border-brand-600 text-brand-700 bg-white hover:bg-brand-50 focus-visible:outline-brand-600",
  white:
    "bg-white text-brand-700 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] hover:bg-brand-50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-white",
  ghost:
    "text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-600",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<React.ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    void _v;
    void _s;
    void _c;
    void _ch;
    return (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props;
  void _v;
  void _s;
  void _c;
  void _ch;
  void _h;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
