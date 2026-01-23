import { z } from "zod";

export const postSetConcludeSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostSetConcludeSuccess = z.infer<
  typeof postSetConcludeSuccessSchema
>;
