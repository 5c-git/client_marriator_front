import { z } from "zod";

export const postSetUserSettingsSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostSetUserSettingsSuccess = z.infer<typeof postSetUserSettingsSuccessSchema>;
