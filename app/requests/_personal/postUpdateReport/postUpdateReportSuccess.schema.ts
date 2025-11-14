import { z } from "zod";

export const postUpdateReportSuccess = z.object({
  data: z.object({
    id: z.number(),
    dateStart: z.string(),
    dateEnd: z.string(),
    report: z.null(),
    dayActivityId: z.number(),
    status: z.number(),
    hours: z.number(),
    reasons: z.array(
      z.object({ id: z.number(), value: z.string(), amount: z.number() })
    ),
  }),
});

export type PostUpdateReportSuccess = z.infer<typeof postUpdateReportSuccess>;
