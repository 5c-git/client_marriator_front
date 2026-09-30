import { z } from "zod";

export const getCounterpartyForOrderSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      ogrn: z.string(),
      legal_address: z.string(),
      legal_email: z.string(),
      active: z.boolean(),
    }),
  ),
});

export type GetCounterpartyForOrderSuccess = z.infer<
  typeof getCounterpartyForOrderSchema
>;
