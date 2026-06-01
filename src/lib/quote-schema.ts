import { z } from "zod";
import { serviceSlugs } from "./business";

// Shared validation schema for the free-quote form (client + server).
// Phone is the priority channel, but we accept either phone or email as long as
// at least one usable contact method is provided.
export const quoteSchema = z
  .object({
    name: z.string().trim().min(2, "name").max(80),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    email: z
      .string()
      .trim()
      .max(120)
      .email("email")
      .optional()
      .or(z.literal("")),
    address: z.string().trim().min(2, "address").max(120),
    service: z.enum([...serviceSlugs, "notSure"]),
    frequency: z
      .enum(["weekly", "biweekly", "monthly", "oneTime", "notSure"])
      .optional()
      .or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    consent: z.literal(true),
    // Honeypot — must stay empty. Real users never fill this hidden field.
    company: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((data) => Boolean(data.phone) || Boolean(data.email), {
    message: "contact",
    path: ["phone"],
  });

export type QuoteInput = z.infer<typeof quoteSchema>;
