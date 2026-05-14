import { z } from "zod";

export const postSignedDocumentSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSignedDocumentSuccess = z.infer<
  typeof postSignedDocumentSuccessSchema
>;
