import { z } from "zod";

export const getSettingsFromKeySuccessSchema = z.object({
  status: z.literal("success"),
  result: z.string(),
});

export type GetSettingsFromKeySuccess = z.infer<
  typeof getSettingsFromKeySuccessSchema
>;
