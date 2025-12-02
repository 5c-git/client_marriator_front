import { z } from "zod";

export const postCancelOrderSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostCancelOrderSuccess = z.infer<
  typeof postCancelOrderSuccessSchema
>;
