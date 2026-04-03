import { z } from "zod";

export const date = z.object({
  inputType: z.literal("date"),
  name: z.string(),
  value: z.union([z.string(), z.null()]),
  placeholder: z.string(),
  validation: z.enum(["none", "default", "16years"]),
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
  default: z.string().optional(),
  pregValue: z.string().optional(),
  pregText: z.string().optional(),
});
