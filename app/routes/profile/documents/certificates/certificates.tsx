import { useNavigate } from "react-router";
import type { Route } from "./+types/certificates";

import { withLocale } from "~/shared/withLocale";
import { CertificatesView } from "./_views/CertificatesView";
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

  return (
    <CertificatesView
      certificates={loaderData.certificates}
      organizationOptions={loaderData.organizationOptions}
      certificateOptions={loaderData.certificateOptions}
      backAction={() => {
        navigate(withLocale("/profile/documents"), {
          viewTransition: true,
        });
      }}
    />
  );
}
