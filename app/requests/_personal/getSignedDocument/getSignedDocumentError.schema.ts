import { z } from "zod";

export const getSignedDocumentErrorSchema = z.object({
  message: z.string(),
  errors: z.object({ documentId: z.array(z.string()) }),
});

export type GetSignedDocumentError = z.infer<
  typeof getSignedDocumentErrorSchema
>;
