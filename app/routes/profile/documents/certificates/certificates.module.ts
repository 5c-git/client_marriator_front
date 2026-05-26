import { Container } from "brandi";

import { getDocumentInquiries } from "~/api/_personal/_documents/getDocumentInquiries/getDocumentInquiries";
import { getCompanyAndCertificatesInquiries } from "~/api/_personal/_documents/getCompanyAndCertificatesInquiries/getCompanyAndCertificatesInquiries";
import { postRequestInquiries } from "~/api/_personal/_documents/postRequestInquiries/postRequestInquiries";

import { CertificatesService } from "./certificates.service";
import { certificatesPrivateTokens } from "./certificates.private-tokens";
import { certificatesTokens } from "./certificates.tokens";

import { appContainer } from "~/shared/container/container";

export const certificatesContainer = new Container().extend(appContainer)

certificatesContainer
  .bind(certificatesPrivateTokens.getDocumentInquiries)
  .toConstant(getDocumentInquiries);
certificatesContainer
  .bind(certificatesPrivateTokens.getCompanyAndCertificatesInquiries)
  .toConstant(getCompanyAndCertificatesInquiries);
certificatesContainer
  .bind(certificatesPrivateTokens.postRequestInquiries)
  .toConstant(postRequestInquiries);

certificatesContainer
  .bind(certificatesTokens.certificatesService)
  .toInstance(CertificatesService)
  .inSingletonScope();

