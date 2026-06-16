import { withLocale } from "~/shared/withLocale";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { DocumentsView } from "./_views/DocumentsView";

export default function Documents() {
  const navigate = useNavigate();
  const { t } = useTranslation("m_profile_documents");

  return (
    <DocumentsView
      backAction={() => {
        navigate(withLocale("/profile"), { viewTransition: true });
      }}
      sections={[
        {
          path: withLocale("/profile/documents/sign"),
          label: t("item_sign"),
        },
        {
          path: withLocale("/profile/documents/sign-a-deal"),
          label: t("item_deal"),
        },
        {
          path: withLocale("/profile/documents/terminate-a-deal"),
          label: t("item_break"),
        },
        {
          path: withLocale("/profile/documents/archive"),
          label: t("item_archive"),
        },
        {
          path: withLocale("/profile/documents/archive"),
          label: t("item_archive"),
        },
        {
          path: withLocale("/profile/documents/certificates"),
          label: t("item_certificates"),
        },
      ]}
    />
  );
}
