import { z } from "zod";

export const postRetriesSmsErrorSchema = z.object({
  data: z.object({ error: z.boolean() }),
});

export type PostRetriesSmsError = z.infer<typeof postRetriesSmsErrorSchema>;
