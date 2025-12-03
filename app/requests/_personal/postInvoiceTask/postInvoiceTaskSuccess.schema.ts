import { z } from "zod";

export const postInvoiceTaskSuccessSchema = z.object({
  data: z.object({ success: z.boolean() }),
});

export type PostInvoiceTaskSuccess = z.infer<
  typeof postInvoiceTaskSuccessSchema
>;
