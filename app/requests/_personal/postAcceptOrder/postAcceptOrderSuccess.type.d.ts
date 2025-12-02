import { z } from "zod";

export const postAcceptOrderSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostAcceptOrderSuccess = z.infer<
  typeof postAcceptOrderSuccessSchema
>;
