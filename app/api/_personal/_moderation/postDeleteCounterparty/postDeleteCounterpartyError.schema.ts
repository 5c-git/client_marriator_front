import { z } from "zod";

export const postDeleteCounterpartyErrorSchema = z.strictObject({
  data: z.strictObject({ error: z.boolean() }),
});

export type PostDeleteCounterpartyError = z.infer<
  typeof postDeleteCounterpartyErrorSchema
>;
