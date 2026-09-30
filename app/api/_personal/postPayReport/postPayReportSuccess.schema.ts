import { z } from "zod";

export const postPayReportSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostPayReportSuccess = z.infer<typeof postPayReportSuccessSchema>;
