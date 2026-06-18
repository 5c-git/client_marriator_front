import { useTranslation } from "react-i18next";

import {
  Avatar,
  Typography,
  List,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { withLocale } from "~/shared/withLocale";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { ProfileMenuItem } from "../_components/ProfileMenuItem";

import { ProfileIcon } from "../_icons/ProfileIcon";
import { SettingsIcon } from "../_icons/SettingsIcon";
import { DocumentsIcon } from "../_icons/DocumentsIcon";
import { ExitIcon } from "../_icons/ExitIcon";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { State } from "~/store/store";
import type { ProfileData } from "../profile.mapper";

type ProfileViewProps = {
  data: ProfileData;
  userRole: State["userRole"];
  openDialog: boolean;
  onOpenLogoutDialog: () => void;
  onCloseDialog: () => void;
  onConfirmLogout: () => void;
};

export function ProfileView(props: ProfileViewProps) {
  const { t } = useTranslation("m_profile");

  return (
    <>
      <Box>
        <TopNavigation
          header={{
            text: t(`header`),
            bold: false,
          }}
        />

        <Stack
          sx={{
            paddingTop: "20px",
            alignItems: "center",
            rowGap: "12px",
          }}
        >
          <Avatar
            sx={{
              width: "90px",
              height: "90px",
            }}
            src={props.data.avatarUrl}
          />

          {props.data.displayName ? (
            <Typography component="p" variant="Bold_18">
              {props.data.displayName}
            </Typography>
          ) : null}
        </Stack>

        <List>
          {props.userRole === "specialist" ? (
            <>
              <ProfileMenuItem
                icon={<ProfileIcon />}
                label={t(`profile`)}
                to={withLocale("my-profile")}
                showBullet={props.data.hasProfileErrors}
              />
              <ProfileMenuItem
                icon={<SettingsIcon />}
                label={t(`settings`)}
                to={withLocale("settings")}
              />
              <ProfileMenuItem
                icon={<DocumentsIcon />}
                label={t(`documents`)}
                to={withLocale("documents")}
              />
              <ProfileMenuItem
                icon={<ReceiptLongIcon />}
                label={t(`requests`)}
                to={withLocale("requests")}
              />
            </>
          ) : null}

          <ProfileMenuItem
            icon={<ExitIcon />}
            label={t(`exit`)}
            onClick={props.onOpenLogoutDialog}
          />
        </List>
      </Box>

      <Dialog
        open={props.openDialog}
        onClose={props.onCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle>{t(`dialog_title`)}</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={props.onCloseDialog}>
            {t(`dialog_no`)}
          </Button>
          <Button variant="contained" onClick={props.onConfirmLogout}>
            {t(`dialog_yes`)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
