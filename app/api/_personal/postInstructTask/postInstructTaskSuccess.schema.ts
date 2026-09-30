import { z } from "zod";

export const postInstructTaskSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostInstructTaskSuccess = z.infer<
  typeof postInstructTaskSuccessSchema
>;
