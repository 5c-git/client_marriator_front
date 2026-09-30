import { z } from "zod";

export const postSetUserImgSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetUserImgSuccess = z.infer<typeof postSetUserImgSuccessSchema>;
