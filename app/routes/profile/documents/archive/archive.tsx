import { useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/archive";

import { withLocale } from "~/shared/withLocale";

import { useTranslation } from "react-i18next";

import type { ArchiveActionData } from "./_views/ArchiveView";
import { ArchiveView } from "./_views/ArchiveView";
import { archiveContainer } from "./archive.module";
import { archiveTokens } from "./archive.tokens";
import { Alert, Snackbar } from "@mui/material";

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
  const { t } = useTranslation("ArchiveView");
  const navigate = useNavigate();
  const fetcher = useFetcher<ArchiveActionData>();

  return (
    <>
      <ArchiveView
        translation="archive"
        data={loaderData}
        backAction={() => {
          navigate(withLocale("/profile/documents"), { viewTransition: true });
        }}
        assetBasePath={import.meta.env.VITE_ASSET_PATH}
        downloadRequestAction={(id) => {
          fetcher.submit(id, {
            method: "POST",
            encType: "application/json",
          });
        }}
      />
      <Snackbar
        open={fetcher.data && fetcher.data.isError === true ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          fetcher.reset();
        }}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t("archive.error")}
        </Alert>
      </Snackbar>
    </>
  );
}
