import { z } from "zod";

export const postSaveFormErrorSchema = z.object({
  status: z.string(),
  error: z.string(),
});

export type PostSaveFormError = z.infer<typeof postSaveFormErrorSchema>;
