import { z } from "zod";

export const postChangeUserPhoneErrorSchema = z.object({
  error: z.string(),
  status: z.literal("error"),
});

export type PostChangeUserPhoneError = z.infer<
  typeof postChangeUserPhoneErrorSchema
>;
