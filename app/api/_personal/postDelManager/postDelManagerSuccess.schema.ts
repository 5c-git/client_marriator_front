import { z } from "zod";

export const postDelManagerSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostDelManagerSuccess = z.infer<typeof postDelManagerSuccessSchema>;
