import { z } from "zod";

export const postAcceptSpecialistSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostAcceptSpecialistSuccess = z.infer<
  typeof postAcceptSpecialistSuccessSchema
>;
