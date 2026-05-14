import { z } from "zod";

export const postSetUserDataErrorSchema = z.object({
  message: z.string(),
  errors: z.object({ placeId: z.array(z.string()) }),
});

export type PostSetUserDataError = z.infer<typeof postSetUserDataErrorSchema>;
