import { z } from "zod";

export const photoCheckbox = z.object({
  inputType: z.literal("photoCheckbox"),
  name: z.string(),
  value: z.array(z.string()),
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
        img: z.string(),
        text: z.string().optional(),
        details: z
          .object({
            text: z.string(),
            details: z.string(),
            img: z.string(),
            link: z
              .object({
                text: z.string(),
                path: z.string(),
                type: z.enum(["internal", "external"]),
              })
              .optional(),
          })
          .optional(),
      }),
    )
    .min(1),
  additionalProperties: z.unknown().optional(),
});
