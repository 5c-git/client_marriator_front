import { useMemo } from "react";

type Org = { uuid: string; name: string };
type Cert = { id: number; key: string; value: string };

export function useCertificatesHooks(
  organizations: Org[],
  certificates: Cert[],
) {
  const organizationOptions = useMemo(() => {
    return organizations.map((item) => ({
      value: item.uuid,
      label: item.name,
      disabled: false,
    }));
  }, [organizations]);

  const certificateOptions = useMemo(() => {
    return certificates.map((item) => ({
      value: item.value,
      label: item.key,
      disabled: false,
    }));
  }, [certificates]);

  return { organizationOptions, certificateOptions };
}

