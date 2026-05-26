import { useFetcher, useNavigation, useNavigate } from "react-router";
import type { Route } from "./+types/archive";

import { withLocale } from "~/shared/withLocale";

import type { ArchiveActionData } from "./_views/ArchiveView";
import { ArchiveView } from "./_views/ArchiveView";
import { archiveContainer } from "./archive.module";
import { archiveTokens } from "./archive.tokens";

export async function clientLoader() {
  return await archiveContainer.get(archiveTokens.archiveService).loadArchive();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const documentId = await request.json();
  const archiveService = archiveContainer.get(archiveTokens.archiveService);
  const filePath = await archiveService.getSignedFilePath(documentId);

  if (filePath) {
    window.open(`${import.meta.env.VITE_ASSET_PATH}${filePath}`, "_blank");
    return null;
  }

  return { data: null, isError: true, error: "error" };
}

export default function Archive({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const fetcher = useFetcher<ArchiveActionData>();

  return (
    <ArchiveView
      loaderData={loaderData}
      isLoading={navigation.state !== "idle" || fetcher.state !== "idle"}
      backAction={() => {
        navigate(withLocale("/profile/documents"), { viewTransition: true });
      }}
      fetcher={fetcher}
      assetBasePath={import.meta.env.VITE_ASSET_PATH}
      downloadRequestAction={(id) => {
        fetcher.submit(id, {
          method: "POST",
          encType: "application/json",
        });
      }}
    />
  );
}
