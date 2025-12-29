import { z } from "zod";

export const getDocumentArchiveSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      file_path: z.string(),
      file_name: z.string(),
      status_signature: z.union([z.literal("signed")]),
      date_signature: z.string(),
      file_path_signed: z.union([z.null(), z.string()]),
    }),
  ),
});

export type GetDocumentArchiveSuccess = z.infer<
  typeof getDocumentArchiveSuccessSchema
>;
