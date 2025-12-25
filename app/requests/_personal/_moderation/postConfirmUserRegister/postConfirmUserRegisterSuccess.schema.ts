import { z } from "zod";

export const postConfirmUserRegisterSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostConfirmUserRegisterSuccess = z.infer<
  typeof postConfirmUserRegisterSuccessSchema
>;
