"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Phone, Send, PartyPopper, CircleAlert } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { business, serviceSlugs } from "@/lib/business";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Props = { dict: Dictionary };

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  frequency: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteForm({ dict }: Props) {
  const f = dict.quote.form;
  const e = dict.quote.errors;
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      service: "",
      frequency: "",
      message: "",
      consent: false,
      company: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitState("idle");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitState("success");
        reset();
        return;
      }
      const data = await res.json().catch(() => null);
      if (data?.fieldErrors) {
        for (const [key, code] of Object.entries(
          data.fieldErrors as Record<string, string>
        )) {
          const msg =
            (e as Record<string, string>)[code] ?? e.generic;
          setError(key as keyof FormValues, { message: msg });
        }
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-600 text-white">
          <PartyPopper className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-bold text-ink">
          {dict.quote.success.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          {dict.quote.success.message}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={business.phoneHref} variant="secondary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            {business.phoneDisplay}
          </Button>
          <Button variant="ghost" onClick={() => setSubmitState("idle")}>
            {dict.quote.success.again}
          </Button>
        </div>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold text-ink">{f.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{f.subtitle}</p>
      </div>

      {/* Honeypot (visually hidden, off-screen) */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <Field label={f.name} required error={errors.name?.message} className="sm:col-span-2">
          <input
            type="text"
            autoComplete="name"
            placeholder={f.namePlaceholder}
            aria-invalid={!!errors.name}
            className={cn(inputBase, errors.name ? "border-rose-300" : "border-slate-200")}
            {...register("name", {
              required: e.name,
              minLength: { value: 2, message: e.name },
            })}
          />
        </Field>

        {/* Phone */}
        <Field label={f.phone} required error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder={f.phonePlaceholder}
            aria-invalid={!!errors.phone}
            className={cn(inputBase, errors.phone ? "border-rose-300" : "border-slate-200")}
            {...register("phone", {
              validate: (v) =>
                Boolean(v?.trim()) ||
                Boolean(getValues("email")?.trim()) ||
                e.contact,
            })}
          />
        </Field>

        {/* Email */}
        <Field label={f.email} error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder={f.emailPlaceholder}
            aria-invalid={!!errors.email}
            className={cn(inputBase, errors.email ? "border-rose-300" : "border-slate-200")}
            {...register("email", {
              validate: (v) =>
                !v?.trim() || emailRe.test(v.trim()) || e.email,
            })}
          />
        </Field>

        {/* Address / ZIP */}
        <Field
          label={f.address}
          required
          error={errors.address?.message}
          className="sm:col-span-2"
        >
          <input
            type="text"
            autoComplete="address-level2"
            placeholder={f.addressPlaceholder}
            aria-invalid={!!errors.address}
            className={cn(inputBase, errors.address ? "border-rose-300" : "border-slate-200")}
            {...register("address", { required: e.address, minLength: { value: 2, message: e.address } })}
          />
        </Field>

        {/* Service */}
        <Field label={f.service} required error={errors.service?.message}>
          <select
            aria-invalid={!!errors.service}
            defaultValue=""
            className={cn(inputBase, "appearance-none", errors.service ? "border-rose-300" : "border-slate-200")}
            {...register("service", { required: e.service })}
          >
            <option value="" disabled>
              {f.servicePlaceholder}
            </option>
            {serviceSlugs.map((slug) => (
              <option key={slug} value={slug}>
                {f.serviceOptions[slug]}
              </option>
            ))}
            <option value="notSure">{f.serviceOptions.notSure}</option>
          </select>
        </Field>

        {/* Frequency */}
        <Field label={f.frequency} error={errors.frequency?.message}>
          <select
            defaultValue=""
            className={cn(inputBase, "appearance-none border-slate-200")}
            {...register("frequency")}
          >
            <option value="" disabled>
              {f.frequencyPlaceholder}
            </option>
            {(
              ["weekly", "biweekly", "monthly", "oneTime", "notSure"] as const
            ).map((key) => (
              <option key={key} value={key}>
                {f.frequencyOptions[key]}
              </option>
            ))}
          </select>
        </Field>

        {/* Message */}
        <Field label={f.message} error={errors.message?.message} className="sm:col-span-2">
          <textarea
            rows={4}
            placeholder={f.messagePlaceholder}
            className={cn(inputBase, "resize-y border-slate-200")}
            {...register("message")}
          />
        </Field>
      </div>

      {/* Consent */}
      <label className="mt-5 flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          aria-invalid={!!errors.consent}
          {...register("consent", { required: e.consent })}
        />
        <span>{f.consent}</span>
      </label>
      {errors.consent && (
        <p className="mt-1.5 text-sm text-rose-600">{errors.consent.message}</p>
      )}

      {submitState === "error" && (
        <p className="mt-5 flex items-start gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {e.generic}
        </p>
      )}

      <div className="mt-6">
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          <Send className="h-5 w-5" aria-hidden="true" />
          {isSubmitting ? f.submitting : f.submit}
        </Button>
      </div>

      {/* Fast path: call */}
      <p className="mt-4 text-center text-sm text-slate-500">
        <a href={business.phoneHref} className="font-semibold text-brand-700 hover:underline">
          {dict.common.callForQuote}
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
