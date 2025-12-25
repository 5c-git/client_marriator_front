import { z } from "zod";

export const postSetSupervisorsSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetSupervisorsSuccess = z.infer<
  typeof postSetSupervisorsSuccessSchema
>;
