import { useFetcher } from "react-router";

import { useTranslation } from "react-i18next";

import { format } from "date-fns";

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

export type ArchiveItem = {
  id: number;
  file_name: string;
  date_signature: string | number | Date;
  file_path_signed: string | null;
};

export type ArchiveActionData =
  | null
  | undefined
  | {
      data: null;
      isError: boolean;
      error: string;
    };

type Props = {
  loaderData: ArchiveItem[];
  isLoading: boolean;
  backAction: () => void;
  fetcher: ReturnType<typeof useFetcher<ArchiveActionData>>;
  assetBasePath: string;
  downloadRequestAction: (id: number) => void;
};

export function ArchiveView({
  loaderData,
  isLoading,
  backAction,
  fetcher,
  assetBasePath,
  downloadRequestAction,
}: Props) {
  const { t } = useTranslation("ArchiveView");

  return (
    <>
      {isLoading ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={backAction}
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
                      href={`${assetBasePath}${item.file_path_signed}`}
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
                        downloadRequestAction(item.id);
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
                  {t("signed")} {format(item.date_signature, "dd.LL.yyyy HH:mm")}
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

