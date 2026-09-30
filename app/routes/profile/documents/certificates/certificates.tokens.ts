import { token } from "brandi";

import { CertificatesService } from "./certificates.service";

export const certificatesTokens = {
  certificatesService: token<CertificatesService>("documents:CertificatesService"),
};

