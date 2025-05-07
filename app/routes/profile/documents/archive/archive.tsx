import { useNavigation, useNavigate } from "react-router";
import type { Route } from "./+types/archive";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { Typography, List, ListItem, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";
import { getDocumentArchive } from "~/requests/getDocumentArchive/getDocumentArchive";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getDocumentArchive(accessToken);

    return data.result;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Archive({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("documentsArchive");
  const navigation = useNavigation();
  const navigate = useNavigate();

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
          height: "calc(100% - 56px)",
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
                key={item.uuid}
                secondaryAction={
                  <IconButton
                    LinkComponent="a"
                    href={item.path}
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
                }
                disablePadding
                sx={{
                  "& .MuiListItemSecondaryAction-root": {
                    right: 0,
                  },
                }}
              >
                {item.name}
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
    </>
  );
}
