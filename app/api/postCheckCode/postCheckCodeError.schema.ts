import { z } from "zod";

export const postCheckCodeErrorSchema = z.object({
  status: z.literal("error"),
  result: z.object({
    code: z.object({ status: z.enum(["success", "error", "notExists"]) }),
  }),
});

export type PostCheckCodeError = z.infer<typeof postCheckCodeErrorSchema>;
