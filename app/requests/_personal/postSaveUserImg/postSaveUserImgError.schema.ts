import { z } from "zod";

export const postSaveUserImgErrorSchema = z.object({
  status: z.literal("error"),
  error: z.string(),
});

export type PostSaveUserImgError = z.infer<typeof postSaveUserImgErrorSchema>;
