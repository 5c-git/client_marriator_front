import { z } from "zod";

export const postInvoiceBidSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostInvoiceBidSuccess = z.infer<typeof postInvoiceBidSuccessSchema>;
