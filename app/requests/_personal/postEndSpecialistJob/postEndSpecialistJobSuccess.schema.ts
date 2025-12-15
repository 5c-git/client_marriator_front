import { z } from "zod";

export const postEndSpecialistJobSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostEndSpecialistJobSuccess = z.infer<
  typeof postEndSpecialistJobSuccessSchema
>;
