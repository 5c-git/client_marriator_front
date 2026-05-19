import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { withLocale } from "~/shared/withLocale";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { BulletIcon } from "~/shared/icons/BulletIcon";

import { ProfileIcon } from "../_icons/ProfileIcon";
import { SettingsIcon } from "../_icons/SettingsIcon";
import { DocumentsIcon } from "../_icons/DocumentsIcon";
import { ExitIcon } from "../_icons/ExitIcon";

import type { ProfileLoaderData } from "../profile.service";

type ProfileViewProps = {
  translation: "profile";
  loaderData: ProfileLoaderData;
  userRole: "admin" | "manager" | "supervisor" | "client" | "specialist";
  openDialog: boolean;
  onOpenLogoutDialog: () => void;
  onCloseDialog: () => void;
  onConfirmLogout: () => void;
};

type ProfileMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  to?: string;
  showBullet?: boolean;
  onClick?: () => void;
};

function ProfileMenuItem({
  icon,
  label,
  to,
  showBullet,
  onClick,
}: ProfileMenuItemProps) {

  const content = (
    <>
      <ListItemIcon sx={(theme) => ({
          minWidth: "24px",
          color: theme.vars.palette["Grey_2"],
          })}>{icon}</ListItemIcon>
      <Typography sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          columnGap: "12px",
          color: theme.vars.palette["Black"],
        })} 
        component="p" 
        variant="Reg_16">
        {label}{" "}
        {showBullet ? (
          <BulletIcon
            sx={(theme) => ({
              width: "6px",
              height: "6px",
              color: theme.vars.palette["Red"],
            })}
          />
        ) : null}
      </Typography>
    </>
  );

  return (
    <ListItem disableGutters disablePadding sx={{
      display: "block",
      paddingRight: "16px",
      paddingLeft: "16px",
    }}>
      {to ? (
        <ListItemButton
          component={Link}
          viewTransition
          to={to}
          sx={{
            padding: "16px 0px",
            columnGap: "12px",
          }}
        >
          {content}
        </ListItemButton>
      ) : (
        <ListItemButton onClick={onClick} sx={{
          padding: "16px 0px",
          columnGap: "12px",
        }}>
          {content}
        </ListItemButton>
      )}
      {to ? <Divider sx={(theme) => ({backgroundColor: theme.vars.palette["Grey_4"]})} /> : null}
    </ListItem>
  );
}

export function ProfileView(props: ProfileViewProps) {
  const { t } = useTranslation("ProfileView");
  const { loaderData, userRole } = props;

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
            src={loaderData.avatarUrl}
          />

          {loaderData.displayName ? (
            <Typography component="p" variant="Bold_18">
              {loaderData.displayName}
            </Typography>
          ) : null}
        </Stack>

        <List>
          {userRole === "specialist" ? (
            <>
              <ProfileMenuItem
                icon={<ProfileIcon />}
                label={t(`${props.translation}.profile`)}
                to={withLocale("my-profile")}
                showBullet={loaderData.hasProfileErrors}
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
