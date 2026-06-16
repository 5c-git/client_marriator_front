import { useNavigate } from "react-router";
import type { Route } from "./+types/certificates";

import { withLocale } from "~/shared/withLocale";
import { CertificatesView } from "./_views/CertificatesView";
import { useCertificatesHooks } from "./certificates.hooks";
import { certificatesContainer } from "./certificates.module";
import { certificatesTokens } from "./certificates.tokens";

export async function clientLoader() {
  return await certificatesContainer
    .get(certificatesTokens.certificatesService)
    .loadData();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();
  await certificatesContainer
    .get(certificatesTokens.certificatesService)
    .submitRequest(fields.organization, fields.certificate);
  return null;
}

export default function Certificates({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const { organizationOptions, certificateOptions } = useCertificatesHooks(
    loaderData.fields.organization,
    loaderData.fields.certificates,
  );

  return (
    <CertificatesView
      data={loaderData}
      backAction={() => {
        navigate(withLocale("/profile/documents"), {
          viewTransition: true,
        });
      }}
      organizationOptions={organizationOptions}
      certificateOptions={certificateOptions}
    />
  );
}
