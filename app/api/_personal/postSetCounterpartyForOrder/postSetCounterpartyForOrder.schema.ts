import { z } from "zod";

export const postSetCounterpartyForOrderSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetCounterpartyForOrderSuccess = z.infer<
  typeof postSetCounterpartyForOrderSchema
>;
