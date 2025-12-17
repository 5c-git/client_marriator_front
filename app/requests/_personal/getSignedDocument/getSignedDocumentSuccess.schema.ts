import { z } from "zod";

export const getSignedDocumentSuccessSchema = z.object({
  data: z.object({
    id: z.number(),
    file_path: z.string(),
    file_name: z.string(),
    status_signature: z.enum(["signed", "rejected", "process", "noSend"]),
    date_signature: z.string(),
    file_path_signed: z.string(),
  }),
});

export type GetSignedDocumentSuccess = z.infer<
  typeof getSignedDocumentSuccessSchema
>;
