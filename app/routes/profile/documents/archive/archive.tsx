import { useNavigation, useNavigate, useFetcher } from "react-router";
import type { Route } from "./+types/archive";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { format } from "date-fns";

import { useStore } from "~/store/store";

import {
  Typography,
  List,
  ListItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { getDocumentArchive } from "~/requests/_personal/_documents/getDocumentArchive/getDocumentArchive";
import { getSignedDocument } from "~/requests/_personal/getSignedDocument/getSignedDocument";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getDocumentArchive(accessToken);

    return data.data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const accessToken = useStore.getState().accessToken;
  const documentId = await request.json();

  if (accessToken) {
    const signedDocData = await getSignedDocument(accessToken, documentId);

    if ("data" in signedDocData) {
      if (signedDocData.data.file_path_signed) {
        window.open(
          `${import.meta.env.VITE_ASSET_PATH}${signedDocData.data.file_path_signed}`,
          "_blank"
        );
      } else {
        return { data: null, isError: true, error: "error" };
      }
    }
  }
}

export default function Archive({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("documentsArchive");
  const navigation = useNavigation();
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof clientAction>();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/profile/documents"), { viewTransition: true });
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "20px",
          paddingBottom: "20px",
          paddingRight: "16px",
          paddingLeft: "16px",
        }}
      >
        <Typography
          component="h1"
          variant="Reg_18"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
            paddingBottom: "8px",
          })}
        >
          {t("archive_header")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Grey_2"],
            paddingBottom: "18px",
          })}
        >
          {t("archive_text")}
        </Typography>

        <List
          sx={{
            padding: 0,
            display: "grid",
            rowGap: "4px",
          }}
        >
          {loaderData.length !== 0 ? (
            loaderData.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  item.file_path_signed ? (
                    <IconButton
                      LinkComponent="a"
                      href={`${import.meta.env.VITE_ASSET_PATH}${item.file_path_signed}`}
                      target="_blank"
                      rel="noreferrer"
                      edge="end"
                      aria-label="download file"
                    >
                      <FileDownloadOutlinedIcon
                        sx={(theme) => ({
                          color: theme.vars.palette["Black"],
                        })}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      edge="end"
                      onClick={() => {
                        fetcher.submit(item.id, {
                          method: "POST",
                          encType: "application/json",
                        });
                      }}
                    >
                      <FileDownloadOutlinedIcon
                        sx={(theme) => ({
                          color: theme.vars.palette["Black"],
                        })}
                      />
                    </IconButton>
                  )
                }
                disablePadding
                sx={{
                  display: "grid",
                  "& .MuiListItemSecondaryAction-root": {
                    right: 0,
                  },
                }}
              >
                <Typography>{item.file_name}</Typography>
                <Typography
                  component="p"
                  variant="Reg_12"
                  sx={(theme) => ({
                    color: theme.vars.palette["Grey_1"],
                  })}
                >
                  {t("signed")}{" "}
                  {format(item.date_signature, "dd.LL.yyyy HH:mm")}
                </Typography>
              </ListItem>
            ))
          ) : (
            <ListItem
              sx={{
                justifyContent: "center",
              }}
            >
              {t("archive_nothing")}
            </ListItem>
          )}
        </List>
      </Box>

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
          {t("error")}
        </Alert>
      </Snackbar>
    </>
  );
}
