import { z } from "zod";

export const postDeleteCounterpartySuccessSchema = z.strictObject({
  data: z.strictObject({ success: z.boolean() }),
});

export type PostDeleteCounterpartySuccess = z.infer<
  typeof postDeleteCounterpartySuccessSchema
>;
