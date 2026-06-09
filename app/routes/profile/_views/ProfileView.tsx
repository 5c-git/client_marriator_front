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

import type { ProfileData } from "../profile.mapper";

type ProfileViewProps = {
  translation: "profile";
  data: ProfileData;
  userRole: "admin" | "manager" | "supervisor" | "client" | "specialist";
  openDialog: boolean;
  onOpenLogoutDialog: () => void;
  onCloseDialog: () => void;
  onConfirmLogout: () => void;
};

export function ProfileView(props: ProfileViewProps) {
  const { t } = useTranslation("ProfileView");

  return (
    <>
      <Box>
        <TopNavigation
          header={{
            text: t(`${props.translation}.header`),
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
                label={t(`${props.translation}.profile`)}
                to={withLocale("my-profile")}
                showBullet={props.data.hasProfileErrors}
              />
              <ProfileMenuItem
                icon={<SettingsIcon />}
                label={t(`${props.translation}.settings`)}
                to={withLocale("settings")}
              />
              <ProfileMenuItem
                icon={<DocumentsIcon />}
                label={t(`${props.translation}.documents`)}
                to={withLocale("documents")}
              />
            </>
          ) : null}

          <ProfileMenuItem
            icon={<ExitIcon />}
            label={t(`${props.translation}.exit`)}
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
        <DialogTitle>{t(`${props.translation}.dialog_title`)}</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={props.onCloseDialog}>
            {t(`${props.translation}.dialog_no`)}
          </Button>
          <Button variant="contained" onClick={props.onConfirmLogout}>
            {t(`${props.translation}.dialog_yes`)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
