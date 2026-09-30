import { z } from "zod";

export const postSetUserEmailErrorSchema = z.object({
  error: z.string(),
  status: z.literal("error"),
});

export type PostSetUserEmailError = z.infer<typeof postSetUserEmailErrorSchema>;
