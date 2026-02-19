import { z } from "zod";

export const postSendPhoneRegisterSchema = z.object({
  result: z.object({
    type: z.literal("register"),
    code: z.object({
      status: z.literal("success"),
      code: z.number(),
      ttl: z.number(),
    }),
  }),
  status: z.literal("success"),
});

export type PostSendPhoneRegister = z.infer<typeof postSendPhoneRegisterSchema>;
