import { z } from "zod";

export const getRequisitesDataSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.array(
    z.object({
      bik: z.string(),
      fio: z.string(),
      card: z.string(),
      account: z.string(),
      cardDue: z.string(),
      confidant: z.boolean(),
      payWithCard: z.string(),
    }),
  ),
});

export type GetRequisitesDataSuccess = z.infer<
  typeof getRequisitesDataSuccessSchema
>;
