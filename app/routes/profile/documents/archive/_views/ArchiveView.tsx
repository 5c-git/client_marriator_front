import { useFetcher } from "react-router";

import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import { Typography, List, ListItem, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

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
  translation: "archive";
  data: ArchiveItem[];
  backAction: () => void;
  assetBasePath: string;
  downloadRequestAction: (id: number) => void;
};

export function ArchiveView(props: Props) {
  const { t } = useTranslation("ArchiveView");

  return (
    <>
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
          bold: false,
        }}
        backAction={props.backAction}
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
          {t(`${props.translation}.archive_header`)}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Grey_2"],
            paddingBottom: "18px",
          })}
        >
          {t(`${props.translation}.archive_text`)}
        </Typography>

        <List
          sx={{
            padding: 0,
            display: "grid",
            rowGap: "4px",
          }}
        >
          {props.data.length !== 0 ? (
            props.data.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  item.file_path_signed ? (
                    <IconButton
                      LinkComponent="a"
                      href={`${props.assetBasePath}${item.file_path_signed}`}
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
                        props.downloadRequestAction(item.id);
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
                  {t(`${props.translation}.signed`)}{" "}
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
              {t(`${props.translation}.archive_nothing`)}
            </ListItem>
          )}
        </List>
      </Box>
    </>
  );
}
