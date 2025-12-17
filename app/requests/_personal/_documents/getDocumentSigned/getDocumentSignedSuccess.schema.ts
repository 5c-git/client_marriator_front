import { z } from "zod";

export const getDocumentSignedSuccessSchema = z.object({
  status: z.string(),
  result: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      status_signature: z.union([z.literal("noSend")]),
    }),
  ),
});

export type GetDocumentSignedSuccess = z.infer<
  typeof getDocumentSignedSuccessSchema
>;
