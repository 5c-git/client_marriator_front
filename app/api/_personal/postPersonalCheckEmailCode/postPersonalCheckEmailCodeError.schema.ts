import { z } from "zod";

export const postPersonalCheckEmailCodeErrorSchema = z.object({
  status: z.literal("error"),
  result: z.object({
    code: z.object({ status: z.enum(["error", "notExists"]) }),
  }),
});

export type PostPersonalCheckEmailCodeError = z.infer<
  typeof postPersonalCheckEmailCodeErrorSchema
>;
