import { z } from "zod";

export const postSetUserDataSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetUserDataSuccess = z.infer<
  typeof postSetUserDataSuccessSchema
>;
