import { token } from "brandi";

import type { getDocumentInquiries } from "~/api/_personal/_documents/getDocumentInquiries/getDocumentInquiries";
import type { getCompanyAndCertificatesInquiries } from "~/api/_personal/_documents/getCompanyAndCertificatesInquiries/getCompanyAndCertificatesInquiries";
import type { postRequestInquiries } from "~/api/_personal/_documents/postRequestInquiries/postRequestInquiries";

export type GetDocumentInquiries = typeof getDocumentInquiries;
export type GetCompanyAndCertificatesInquiries =
  typeof getCompanyAndCertificatesInquiries;
export type PostRequestInquiries = typeof postRequestInquiries;

export const certificatesPrivateTokens = {
  getDocumentInquiries: token<GetDocumentInquiries>(
    "documents-certificates-private:getDocumentInquiries",
  ),
  getCompanyAndCertificatesInquiries: token<GetCompanyAndCertificatesInquiries>(
    "documents-certificates-private:getCompanyAndCertificatesInquiries",
  ),
  postRequestInquiries: token<PostRequestInquiries>(
    "documents-certificates-private:postRequestInquiries",
  ),
};

