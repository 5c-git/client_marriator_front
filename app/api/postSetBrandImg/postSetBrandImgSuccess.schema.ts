import { z } from "zod";

export const postSetBrandImgSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetBrandImgSuccess = z.infer<
  typeof postSetBrandImgSuccessSchema
>;
