import { z } from "zod";

export const postEndDaySuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostEndDaySuccess = z.infer<typeof postEndDaySuccessSchema>;
