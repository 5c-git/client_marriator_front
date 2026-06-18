import { injected } from "brandi";

import type {
  GetDocumentInquiries,
  GetCompanyAndCertificatesInquiries,
  PostRequestInquiries,
} from "./certificates.private-tokens";
import { certificatesPrivateTokens } from "./certificates.private-tokens";

import { CertificatesMapper } from "./certificates.mapper";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

export class CertificatesService {
  constructor(
    private readonly appService: AppService,
    private readonly getDocumentInquiries: GetDocumentInquiries,
    private readonly getCompanyAndCertificatesInquiries: GetCompanyAndCertificatesInquiries,
    private readonly postRequestInquiries: PostRequestInquiries,
  ) {}

  async loadData() {
    const accessToken = this.appService.getToken();
    const certificatesData = await this.getDocumentInquiries(accessToken);
    const fieldsData =
      await this.getCompanyAndCertificatesInquiries(accessToken);

    return {
      certificates: certificatesData.result,
      certificateOptions: CertificatesMapper.certsToOptions(
        fieldsData.result.certificates,
      ),
      organizationOptions: CertificatesMapper.orgsToOptions(
        fieldsData.result.organization,
      ),
    };
  }

  async submitRequest(organization: string, certificate: string) {
    const accessToken = this.appService.getToken();
    await this.postRequestInquiries(accessToken, organization, certificate);
    return null;
  }
}

injected(
  CertificatesService,
  appTokens.appService,
  certificatesPrivateTokens.getDocumentInquiries,
  certificatesPrivateTokens.getCompanyAndCertificatesInquiries,
  certificatesPrivateTokens.postRequestInquiries,
);
