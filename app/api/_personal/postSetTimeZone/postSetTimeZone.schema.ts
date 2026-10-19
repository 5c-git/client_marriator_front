import { z } from "zod";

export const postSetTimeZoneSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetTimeZoneSuccess = z.infer<
  typeof postSetTimeZoneSuccessSchema
>;
