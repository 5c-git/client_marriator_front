import { z } from "zod";

export const postSetCounterpartySuccessSchema = z.strictObject({
  data: z.strictObject({ success: z.boolean() }),
});

export type PostSetCounterpartySuccess = z.infer<
  typeof postSetCounterpartySuccessSchema
>;
