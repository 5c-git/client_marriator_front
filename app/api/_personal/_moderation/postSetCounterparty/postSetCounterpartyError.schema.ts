import { z } from "zod";

export const postSetCounterpartyErrorSchema = z.strictObject({
  data: z.strictObject({ error: z.boolean() }),
});

export type PostSetCounterpartyError = z.infer<
  typeof postSetCounterpartyErrorSchema
>;
