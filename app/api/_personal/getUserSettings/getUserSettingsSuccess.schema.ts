import { z } from "zod";

export const getUserSettingsSuccessSchema = z.object({
  data: z.object({ notificationNewBids: z.number() }),
});

export type GetUserSettingsSuccess = z.infer<typeof getUserSettingsSuccessSchema>;
