import { z } from "zod";

export const postSetTerminateSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostSetTerminateSuccess = z.infer<
  typeof postSetTerminateSuccessSchema
>;
