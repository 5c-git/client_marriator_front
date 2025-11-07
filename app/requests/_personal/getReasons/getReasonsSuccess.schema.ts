import { z } from "zod";

export const getReasonsSuccessSchema = z.object({
  data: z.array(z.object({ id: z.number(), value: z.string() })),
});

export type GetReasonsSuccess = z.infer<typeof getReasonsSuccessSchema>;
