import { z } from "zod";

export const getDocumentConcludeSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    organization: z.array(z.object({ uuid: z.string(), name: z.string() })),
  }),
});

export type GetDocumentConcludeSuccess = z.infer<
  typeof getDocumentConcludeSuccessSchema
>;
