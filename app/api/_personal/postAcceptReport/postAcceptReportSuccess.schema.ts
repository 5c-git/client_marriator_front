import { z } from "zod";

export const postAcceptReportSuccess = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostAcceptReportSuccess = z.infer<typeof postAcceptReportSuccess>;
