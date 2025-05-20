import * as z from "zod";

export const formSuperAgentSchema = z.object({
  agent_name: z.string(),
  short_code: z.string().min(3, {
    message: "short code must be at least 3 characters.",
  }),
  email: z.string().email(),
  phone_number: z.string(),
  account_number: z.string(),
});

export type FormSuperAgentSchema = z.infer<typeof formSuperAgentSchema>;
