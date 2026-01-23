import { z } from "zod";

export const postSetProjectSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetProjectSuccess = z.infer<typeof postSetProjectSuccessSchema>;
