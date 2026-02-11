import { z } from "zod";

export const postCheckPinErrorSchema = z.object({ status: z.literal("error") });

export type PostCheckPinError = z.infer<typeof postCheckPinErrorSchema>;
