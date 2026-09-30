import { z } from "zod";

export const postRequestInquiriesSuccessSchema = z.object({
  status: z.literal("success"),
});

export type PostRequestInquiriesSuccess = z.infer<
  typeof postRequestInquiriesSuccessSchema
>;
