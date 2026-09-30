import { z } from "zod";

export const postAcceptAllReportJobSuccess = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostAcceptAllReportJobSuccess = z.infer<
  typeof postAcceptAllReportJobSuccess
>;
