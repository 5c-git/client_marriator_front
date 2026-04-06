import { z } from "zod";

export const selectMultiple = z.object({
  inputType: z.literal("selectMultiple"),
  name: z.string(),
  value: z.array(z.string()),
  placeholder: z.string(),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string().min(1),
        disabled: z.boolean(),
      }),
    )
    .min(1),
  disabled: z.boolean().optional(),
  validation: z.enum(["none", "default"]),
  heading: z.string().optional(),
  error: z.string().optional(),
  status: z.literal("warning").optional(),
  dividerTop: z.literal(true).optional(),
  dividerBottom: z.literal(true).optional(),
  helperInfo: z
    .object({
      text: z.string().optional(),
      link: z
        .object({
          text: z.string(),
          path: z.string(),
          type: z.enum(["internal", "external"]),
        })
        .optional(),
    })
    .strict()
    .optional(),
  pregValue: z.string().optional(),
  pregText: z.string().optional(),
});
