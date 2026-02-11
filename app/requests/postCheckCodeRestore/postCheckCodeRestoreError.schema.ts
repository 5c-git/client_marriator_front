import { z } from "zod";

export const postCheckCodeRestoreErrorSchema = z.object({
  status: z.literal("error"),
  result: z.object({
    code: z.object({ status: z.enum(["error", "notExists"]) }),
  }),
});

export type PostCheckCodeRestoreError = z.infer<
  typeof postCheckCodeRestoreErrorSchema
>;
