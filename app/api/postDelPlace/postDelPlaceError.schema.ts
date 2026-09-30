import { z } from "zod";

export const postDelPlaceErrorSchema = z.object({
  message: z.string(),
  errors: z.object({ placeId: z.array(z.string()) }),
});

export type PostDelPlaceError = z.infer<typeof postDelPlaceErrorSchema>;
