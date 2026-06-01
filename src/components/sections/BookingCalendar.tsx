"use client";

// DEMO booking widget — visual only. Replace with Cal.com embed
// (@calcom/embed-react) when client activates paid booking.
//
// Everything here is self-contained client-side React state: no backend, no real
// availability, no external scripts, no localStorage. "Confirm Booking" only
// flips local state to a success view — it never sends anything. To go live,
// swap this whole component for the Cal.com <Cal /> embed; the parent <Section>
// wrapper on the /booking page is generic and won't need to change.

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Check,
  Phone,
  PartyPopper,
  CircleAlert,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const intlLocale: Record<Locale, string> = { en: "en-US", es: "es-ES" };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function BookingCalendar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.booking;
  const fmtLocale = intlLocale[locale];

  // Compute "today" on the client only. This keeps the visible month accurate to
  // the visitor's current date (rather than the build date) and avoids an
  // SSR/CSR hydration mismatch from build-time vs. view-time clocks.
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setToday(d);
  }, []);

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  // Before the client mounts, reserve height with a stable placeholder so the
  // page doesn't shift when the calendar appears.
  if (!today) {
    return (
      <div
        className="min-h-[40rem] rounded-3xl border border-slate-100 bg-white shadow-card"
        aria-hidden="true"
      />
    );
  }

  const dateFmt = new Intl.DateTimeFormat(fmtLocale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Success view ---------------------------------------------------------------
  if (confirmed && selectedDay && selectedTime) {
    const message = t.success.message
      .replace("{date}", dateFmt.format(selectedDay))
      .replace("{time}", selectedTime);

    return (
      <div className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-600 text-white">
          <PartyPopper className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-bold text-ink">
          {t.success.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-slate-600" role="status">
          {message}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={business.phoneHref} variant="secondary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            {business.phoneDisplay}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setConfirmed(false);
              setSelectedDay(null);
              setSelectedTime(null);
              setForm({ name: "", phone: "", email: "" });
              setError(null);
            }}
          >
            {t.success.again}
          </Button>
        </div>
      </div>
    );
  }

  // Month math -----------------------------------------------------------------
  const year = today.getFullYear();
  const month = today.getMonth();
  const startWeekday = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Intl.DateTimeFormat(fmtLocale, {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));

  // Short weekday headers, anchored to a known Sunday (Sept 1, 2024).
  const weekdayNames = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(fmtLocale, { weekday: "short" }).format(
      new Date(2024, 8, 1 + i)
    )
  );

  const days: Array<Date | null> = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    ),
  ];

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDay || !selectedTime) return setError(t.errors.slot);
    if (!form.name.trim()) return setError(t.errors.name);
    if (!form.phone.trim()) return setError(t.errors.phone);
    if (!emailRe.test(form.email.trim())) return setError(t.errors.email);
    setError(null);
    setConfirmed(true); // DEMO ONLY — no network request is made.
  }

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500";

  const summary =
    selectedDay && selectedTime
      ? t.selectionSummary
          .replace("{date}", dateFmt.format(selectedDay))
          .replace("{time}", selectedTime)
      : null;

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
      <h2 className="font-heading text-2xl font-bold text-ink">{t.heading}</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">
        {t.subtext}
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Calendar */}
        <div>
          <div className="mb-4 flex items-center gap-2 text-brand-700">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
            <p className="font-heading font-bold text-ink">{monthLabel}</p>
          </div>

          <div
            role="grid"
            aria-label={`${t.calendarLabel} — ${monthLabel}`}
            className="grid grid-cols-7 gap-1.5"
          >
            {weekdayNames.map((name, i) => (
              <div
                key={`wd-${i}`}
                role="columnheader"
                className="pb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                {name}
              </div>
            ))}

            {days.map((date, i) => {
              if (!date) return <div key={`empty-${i}`} aria-hidden="true" />;

              const isPast = date < today;
              const isSunday = date.getDay() === 0;
              const disabled = isPast || isSunday;
              const isSelected = selectedDay
                ? sameDay(date, selectedDay)
                : false;

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  role="gridcell"
                  disabled={disabled}
                  aria-pressed={isSelected}
                  aria-label={dateFmt.format(date)}
                  onClick={() => {
                    setSelectedDay(date);
                    setSelectedTime(null);
                    setError(null);
                  }}
                  className={cn(
                    "relative grid aspect-square place-items-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
                    disabled &&
                      "cursor-not-allowed text-slate-300 line-through decoration-slate-200",
                    !disabled &&
                      !isSelected &&
                      "text-ink ring-1 ring-inset ring-brand-100 hover:bg-brand-50 hover:ring-brand-300",
                    isSelected &&
                      "bg-brand-600 font-bold text-white ring-2 ring-brand-700 ring-offset-1"
                  )}
                >
                  {date.getDate()}
                  {isSelected && (
                    <Check
                      className="absolute right-1 top-1 h-3 w-3"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div>
          <div className="mb-4 flex items-center gap-2 text-brand-700">
            <Clock className="h-5 w-5" aria-hidden="true" />
            <p className="font-heading font-bold text-ink">{t.timesHeading}</p>
          </div>

          {selectedDay ? (
            <div
              className="flex flex-wrap gap-2.5"
              role="group"
              aria-label={t.timesHeading}
            >
              {t.timeSlots.map((slot) => {
                const isSelected = slot === selectedTime;
                return (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedTime(slot);
                      setError(null);
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
                      isSelected
                        ? "bg-brand-600 text-white ring-2 ring-brand-700 ring-offset-1"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50"
                    )}
                  >
                    {isSelected && (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    )}
                    {slot}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
              {t.selectDayFirst}
            </p>
          )}
        </div>
      </div>

      {/* Details form */}
      <form onSubmit={handleConfirm} noValidate className="mt-8 border-t border-slate-100 pt-8">
        <h3 className="font-heading text-lg font-bold text-ink">
          {t.form.title}
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="booking-name"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              {t.form.name}
            </label>
            <input
              id="booking-name"
              type="text"
              autoComplete="name"
              placeholder={t.form.namePlaceholder}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputBase}
            />
          </div>
          <div>
            <label
              htmlFor="booking-phone"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              {t.form.phone}
            </label>
            <input
              id="booking-phone"
              type="tel"
              autoComplete="tel"
              placeholder={t.form.phonePlaceholder}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputBase}
            />
          </div>
          <div>
            <label
              htmlFor="booking-email"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              {t.form.email}
            </label>
            <input
              id="booking-email"
              type="email"
              autoComplete="email"
              placeholder={t.form.emailPlaceholder}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputBase}
            />
          </div>
        </div>

        {summary && (
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">
            <CalendarDays className="h-4 w-4 text-brand-600" aria-hidden="true" />
            {summary}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}

        <div className="mt-6">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            <Check className="h-5 w-5" aria-hidden="true" />
            {t.form.submit}
          </Button>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          <a
            href={business.phoneHref}
            className="font-semibold text-brand-700 hover:underline"
          >
            {dict.common.callForQuote}
          </a>
        </p>
      </form>
    </div>
  );
}
