import { z } from "zod";

export const getUserPersonalMenuSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    section: z
      .array(
        z.object({
          name: z.string(),
          value: z.number(),
          notification: z.boolean(),
        }),
      )
      .min(1),
  }),
});

export type GetUserPersonalMenuSuccess = z.infer<
  typeof getUserPersonalMenuSuccessSchema
>;
