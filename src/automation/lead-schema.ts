import { z } from "zod";
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.email("Enter a valid email.").max(254),
  company: z.string().trim().min(2, "Enter your company.").max(160),
  industry: z.string().max(100),
  message: z
    .string()
    .trim()
    .min(20, "Please describe your process in at least 20 characters.")
    .max(3000),
  consent: z.literal(true, {
    error: "Please agree to being contacted about this request.",
  }),
  website: z.string().max(0),
  source: z.enum(["audit", "contact", "consultation"]),
});
export type LeadInput = z.infer<typeof leadSchema>;
