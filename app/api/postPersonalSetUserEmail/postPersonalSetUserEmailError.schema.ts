import { z } from "zod";

export const postPersonalSetUserEmailErrorSchema = z.object({
  error: z.string(),
  status: z.literal("error"),
});

export type PostPersonalSetUserEmailError = z.infer<
  typeof postPersonalSetUserEmailErrorSchema
>;
