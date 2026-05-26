import { withLocale } from "~/shared/withLocale";
import { useNavigation, useNavigate } from "react-router";

import { DocumentsView } from "./_views/DocumentsView";

export default function Documents() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <DocumentsView
      isLoading={navigation.state !== "idle"}
      backAction={() => {
        navigate(withLocale("/profile"), { viewTransition: true });
      }}
    />
  );
}
