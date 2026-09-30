import { z } from "zod";

export const postDelSupervisorSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type postDelSupervisorSuccess = z.infer<
  typeof postDelSupervisorSuccessSchema
>;
