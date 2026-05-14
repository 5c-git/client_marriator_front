import { z } from "zod";

export const postAcceptBidSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostAcceptBidSuccess = z.infer<typeof postAcceptBidSuccessSchema>;
