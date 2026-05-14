import { z } from "zod";

export const getDocumentTerminateSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    organization: z.array(z.object({ uuid: z.string(), name: z.string() })),
  }),
});

export type GetDocumentTerminateSuccess = z.infer<
  typeof getDocumentTerminateSuccessSchema
>;
