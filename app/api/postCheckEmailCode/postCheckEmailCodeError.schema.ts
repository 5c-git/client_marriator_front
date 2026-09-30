import { z } from "zod";

export const postCheckEmailCodeErrorSchema = z.object({
  status: z.literal("error"),
  result: z.object({
    code: z.object({ status: z.enum(["error", "notExists"]) }),
  }),
});

export type PostCheckEmailCodeError = z.infer<
  typeof postCheckEmailCodeErrorSchema
>;
