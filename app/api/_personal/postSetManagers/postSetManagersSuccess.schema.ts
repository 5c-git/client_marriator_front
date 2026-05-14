import { z } from "zod";

export const postSetManagersSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetManagersSuccess = z.infer<
  typeof postSetManagersSuccessSchema
>;
