import { z } from "zod";

export const getSettingsFromKeySuccessSchema = z.object({
  data: z.object({
    key: z.string(),
    value: z.string(),
  }),
});

export type GetSettingsFromKeySuccess = z.infer<
  typeof getSettingsFromKeySuccessSchema
>;
