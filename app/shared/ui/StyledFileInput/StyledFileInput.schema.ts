import { z } from "zod";

export const file = z.object({
  inputType: z.literal("file"),
  name: z.string(),
  value: z.string(),
  placeholder: z.string(),
  validation: z.enum(["none", "default"]),
  url: z.string(),
  disabled: z.boolean().optional(),
  heading: z.string().optional(),
  error: z.string().optional(),
  status: z.literal("warning").optional(),
  dividerTop: z.literal(true).optional(),
  dividerBottom: z.literal(true).optional(),
  drawerInfo: z
    .object({
      text: z.string().optional(),
      images: z.array(z.string()).optional(),
    })
    .strict()
    .optional(),
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
  moreData: z
    .array(z.object({ name: z.string(), value: z.string() }))
    .optional(),
  pregValue: z.string().optional(),
  pregText: z.string().optional(),
});
