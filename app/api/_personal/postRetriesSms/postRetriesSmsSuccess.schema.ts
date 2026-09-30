import { z } from "zod";

export const postRetriesSmsSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostRetriesSmsSuccess = z.infer<typeof postRetriesSmsSuccessSchema>;
