import { z } from "zod";

export const postDelPlaceSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostDelPlaceSuccess = z.infer<typeof postDelPlaceSuccessSchema>;
