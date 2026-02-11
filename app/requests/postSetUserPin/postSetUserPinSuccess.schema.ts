import { z } from "zod";

export const postSetUserPinSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostSetUserPinSuccess = z.infer<typeof postSetUserPinSuccessSchema>;
