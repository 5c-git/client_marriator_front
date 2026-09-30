import { z } from "zod";

export const postSetPlaceModerationSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetPlaceModerationSuccess = z.infer<
  typeof postSetPlaceModerationSuccessSchema
>;
