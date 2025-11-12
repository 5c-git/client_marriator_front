import { z } from "zod";

export const postUpdateReportSuccess = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostUpdateReportSuccess = z.infer<typeof postUpdateReportSuccess>;
