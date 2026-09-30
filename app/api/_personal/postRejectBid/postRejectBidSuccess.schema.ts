import { z } from "zod";

export const postRejectBidSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostRejectBidSuccess = z.infer<typeof postRejectBidSuccessSchema>;
