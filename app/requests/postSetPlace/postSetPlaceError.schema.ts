import { z } from "zod";

export const postSetPlaceErrorSchema = z.object({
  message: z.string(),
  errors: z.object({ placeId: z.array(z.string()) }),
});

export type PostSetPlaceError = z.infer<typeof postSetPlaceErrorSchema>;
