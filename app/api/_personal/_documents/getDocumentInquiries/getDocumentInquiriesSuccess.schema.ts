import { z } from "zod";

export const getDocumentInquiriesSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.array(
    z.object({ uuid: z.string(), name: z.string(), path: z.string() })
  ),
});

export type GetDocumentInquiriesSuccess = z.infer<
  typeof getDocumentInquiriesSuccessSchema
>;
