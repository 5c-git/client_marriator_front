export class CertificatesMapper {
  static orgsToOptions(organizations: { uuid: string; name: string }[]) {
    return organizations.map((item) => ({
      value: item.uuid,
      label: item.name,
      disabled: false,
    }));
  }

  static certsToOptions(
    certificates: { id: number; key: string; value: string }[],
  ) {
    return certificates.map((item) => ({
      value: item.value,
      label: item.key,
      disabled: false,
    }));
  }
}
