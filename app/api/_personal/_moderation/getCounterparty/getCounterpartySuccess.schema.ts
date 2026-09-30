import { z } from "zod";

export const getCounterpartySuccessSchema = z.strictObject({
  data: z.array(
    z.strictObject({
      id: z.number(),
      name: z.string(),
      ogrn: z.string(),
      legal_address: z.string(),
      legal_email: z.string(),
    })
  ),
});

export type GetCounterpartySuccess = z.infer<
  typeof getCounterpartySuccessSchema
>;
