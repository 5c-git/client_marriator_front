import { z } from "zod";

export const radio = z.object({
  inputType: z.literal("radio"),
  name: z.string(),
  value: z.string(),
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
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string().min(1),
        disabled: z.boolean(),
        icon: z.enum(["telegram", "viber", "whatsapp"]).optional(),
      }),
    )
    .min(1),
  default: z.string().optional(),
  pregValue: z.string().optional(),
  pregText: z.string().optional(),
});
