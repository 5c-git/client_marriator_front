import { z } from "zod";

export const postSetBrandImgErrorSchema = z.object({
  message: z.string(),
  errors: z.object({ brandId: z.array(z.string()) }),
});

export type PostSetBrandImgError = z.infer<typeof postSetBrandImgErrorSchema>;
