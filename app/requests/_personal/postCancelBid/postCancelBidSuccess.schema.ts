import { z } from "zod";

export const postCancelBidSuccesSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostCancelBidSucces = z.infer<typeof postCancelBidSuccesSchema>;
