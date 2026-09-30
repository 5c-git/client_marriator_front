import { z } from "zod";

export const postStartDaySuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostStartDaySuccess = z.infer<typeof postStartDaySuccessSchema>;
