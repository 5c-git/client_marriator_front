import { z } from "zod";

export const account = z.object({
  inputType: z.literal("account"),
  name: z.string(),
  value: z.string(),
  placeholder: z.string(),
  validation: z.enum(["none", "default"]),
  disabled: z.boolean().optional(),
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
