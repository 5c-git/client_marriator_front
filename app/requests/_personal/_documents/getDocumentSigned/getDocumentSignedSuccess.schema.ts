import { z } from "zod";

export const getDocumentSignedSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      file_path: z.string(),
      file_name: z.string(),
      status_signature: z.union([z.literal("noSend")]),
      file_path_signed: z.union([z.null(), z.string()]),
    }),
  ),
});

export type GetDocumentSignedSuccess = z.infer<
  typeof getDocumentSignedSuccessSchema
>;
