import { z } from "zod";

export const photo = z.object({
  inputType: z.literal("photo"),
  name: z.string(),
  value: z.string(),
  validation: z.enum(["none", "default"]),
  url: z.string(),
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
  additionalProperties: z.unknown().optional(),
});
