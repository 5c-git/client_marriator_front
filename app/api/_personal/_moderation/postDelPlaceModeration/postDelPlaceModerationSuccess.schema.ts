import { z } from "zod";

export const postDelPlaceModerationSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostDelPlaceModerationSuccess = z.infer<
  typeof postDelPlaceModerationSuccessSchema
>;
