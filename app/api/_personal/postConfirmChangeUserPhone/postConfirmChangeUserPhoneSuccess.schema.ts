import { z } from "zod";

export const postConfirmChangeUserPhoneSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostConfirmChangeUserPhoneSuccess = z.infer<
  typeof postConfirmChangeUserPhoneSuccessSchema
>;
