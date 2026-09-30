import { z } from "zod";

export const postConfirmChangeUserPhoneErrorSchema = z.object({
  status: z.literal("error"),
  result: z.object({
    code: z.object({ status: z.enum(["error", "notExists"]) }),
  }),
});

export type PostConfirmChangeUserPhoneError = z.infer<
  typeof postConfirmChangeUserPhoneErrorSchema
>;
