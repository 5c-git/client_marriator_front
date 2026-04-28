import { z } from "zod";

export const getUserSettingsSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type GetUserSettingsSuccess = z.infer<typeof getUserSettingsSuccessSchema>;
