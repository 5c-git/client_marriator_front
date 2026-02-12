import { z } from "zod";

export const autocomplete = z.object({
  inputType: z.literal("autocomplete"),
  name: z.string(),
  value: z.string(),
  placeholder: z.string(),
  options: z
    .array(
      z.object({
        value: z.string(),
        bic: z.string(),
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
  additionalProperties: z.unknown().optional(),
});
