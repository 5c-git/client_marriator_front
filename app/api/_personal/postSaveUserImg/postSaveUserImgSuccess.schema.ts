import { z } from "zod";

export const postSaveUserImgSuccessSchema = z.object({
  status: z.literal("success"),
  resFile: z.string(),
});

export type PostSaveUserImgSuccess = z.infer<
  typeof postSaveUserImgSuccessSchema
>;
