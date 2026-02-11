import { z } from "zod";

export const postSetPlaceSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetPlaceSuccess = z.infer<typeof postSetPlaceSuccessSchema>;
