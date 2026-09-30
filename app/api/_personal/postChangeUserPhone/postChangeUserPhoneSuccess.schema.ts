import { z } from "zod";

export const postChangeUserPhoneSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    code: z.union([
      z.object({
        status: z.literal("exists"),
        ttl: z.number(),
      }),
      z.object({
        status: z.literal("success"),
        code: z.number(),
        ttl: z.number(),
      }),
    ]),
  }),
});

export type PostChangeUserPhoneSuccess = z.infer<
  typeof postChangeUserPhoneSuccessSchema
>;
