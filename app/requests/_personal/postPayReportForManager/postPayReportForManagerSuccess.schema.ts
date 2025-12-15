import { z } from "zod";

export const postPayReportForManagerSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostPayReportForManagerSuccess = z.infer<
  typeof postPayReportForManagerSuccessSchema
>;
