import { z } from "zod";

export const getBikSuccessSchema = z.object({
  result: z.object({
    bankData: z.array(
      z.object({
        value: z.string(),
        bic: z.string(),
        label: z.string(),
        disabled: z.boolean(),
      }),
    ),
  }),
  status: z.literal("success"),
});

export type GetBikSuccess = z.infer<typeof getBikSuccessSchema>;
