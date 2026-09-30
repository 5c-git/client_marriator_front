import { z } from "zod";

export const postEndJobSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostEndJobSuccess = z.infer<typeof postEndJobSuccessSchema>;
