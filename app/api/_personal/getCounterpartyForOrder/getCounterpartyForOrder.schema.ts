import { z } from "zod";

export const getCounterpartyForOrderSchema = z.object({
  data: z.array(z.unknown()),
});

export type GetCounterpartyForOrderSuccess = z.infer<
  typeof getCounterpartyForOrderSchema
>;
