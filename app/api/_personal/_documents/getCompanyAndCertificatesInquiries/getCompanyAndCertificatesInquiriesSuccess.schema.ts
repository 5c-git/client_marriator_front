import { z } from "zod";

export const getCompanyAndCertificatesInquiriesSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    organization: z.array(z.object({ uuid: z.string(), name: z.string() })),
    certificates: z.array(
      z.object({ id: z.number(), key: z.string(), value: z.string() })
    ),
  }),
});

export type GetCompanyAndCertificatesInquiriesSuccess = z.infer<
  typeof getCompanyAndCertificatesInquiriesSuccessSchema
>;
