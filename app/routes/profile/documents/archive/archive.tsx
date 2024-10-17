import {
  useNavigation,
  useNavigate,
  json,
  useLoaderData,
} from "@remix-run/react";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import {
  useTheme,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";
import { getDocumentArchive } from "~/requests/getDocumentArchive/getDocumentArchive";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getDocumentArchive(accessToken);

    return json(data.result);
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Archive() {
  const { t } = useTranslation("documentsArchive");
  const theme = useTheme();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const data = useLoaderData<typeof clientLoader>();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/profile/documents"));
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
          sx={{
            color: theme.palette["Black"],
            paddingBottom: "8px",
          }}
        >
          {t("archive_header")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={{
            color: theme.palette["Grey_2"],
            paddingBottom: "18px",
          }}
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
          {data.length !== 0 ? (
            data.map((item) => (
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
                      sx={{
                        color: theme.palette["Black"],
                      }}
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
