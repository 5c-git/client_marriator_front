import { z } from "zod";

export const checkbox = z.object({
  inputType: z.literal("checkbox"),
  name: z.string(),
  value: z.boolean(),
  label: z.string().min(1),
  validation: z.enum(["none", "checked", "unchecked"]),
  heading: z.string().optional(),
  error: z.string().optional(),
  status: z.literal("warning").optional(),
  disabled: z.boolean().optional(),
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
  default: z.boolean().optional(),
  pregValue: z.boolean().optional(),
  pregText: z.string().optional(),
});
