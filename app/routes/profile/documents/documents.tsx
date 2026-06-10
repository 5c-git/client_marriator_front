import { withLocale } from "~/shared/withLocale";
import { useNavigate } from "react-router";

import { t } from "i18next";

import { DocumentsView } from "./_views/DocumentsView";

export default function Documents() {
  const navigate = useNavigate();

  return (
    <DocumentsView
      translation="documents"
      backAction={() => {
        navigate(withLocale("/profile"), { viewTransition: true });
      }}
      sections={[
        {
          path: withLocale("/profile/documents/sign"),
          label: t("documents.item_sign", { ns: "DocumentsView" }),
        },
        {
          path: withLocale("/profile/documents/sign-a-deal"),
          label: t("documents.item_deal", { ns: "DocumentsView" }),
        },
        {
          path: withLocale("/profile/documents/terminate-a-deal"),
          label: t("documents.item_break", { ns: "DocumentsView" }),
        },
        {
          path: withLocale("/profile/documents/archive"),
          label: t("documents.item_archive", { ns: "DocumentsView" }),
        },
        {
          path: withLocale("/profile/documents/archive"),
          label: t("documents.item_archive", { ns: "DocumentsView" }),
        },
        {
          path: withLocale("/profile/documents/certificates"),
          label: t("documents.item_certificates", { ns: "DocumentsView" }),
        },
      ]}
    />
  );
}
