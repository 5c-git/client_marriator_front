import { useState } from "react";
import { useFetcher, useNavigation, Link } from "react-router";
import type { Route } from "./+types/profile";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

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
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { ProfileIcon } from "./icons/ProfileIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { DocumentsIcon } from "./icons/DocumentsIcon";
import { ExitIcon } from "./icons/ExitIcon";
import { BulletIcon } from "~/shared/icons/BulletIcon";

import { queryClient } from "~/shared/queryClient";
import { useStore } from "~/store/store";
import {
  getUserInfo,
  getUserInfoKeys,
} from "~/requests/getUserInfo/getUserInfo";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await queryClient.fetchQuery({
      queryKey: [getUserInfoKeys[0]],
      queryFn: () => getUserInfo(accessToken),
      staleTime: 5000,
    });
    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction() {
  useStore.getState().clearStore();

  return { status: "ok" };
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("profile");
  const navigation = useNavigation();

  const fetcher = useFetcher();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("header"),
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
            src={loaderData.result.userData.img}
          />

          {loaderData.result.userData.name ? (
            <Typography component="p" variant="Bold_18">
              {loaderData.result.userData.name}
            </Typography>
          ) : null}
        </Stack>

        <List>
          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              component={Link}
              viewTransition
              to={withLocale("my-profile")}
              sx={{
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <ListItemIcon
                // color={theme.vars.palette["Grey_2"]}
                sx={(theme) => ({
                  minWidth: "24px",
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                <ProfileIcon />
              </ListItemIcon>
              <Typography
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                  color: theme.vars.palette["Black"],
                })}
                component="p"
                variant="Reg_16"
              >
                {t("profile")}{" "}
                {loaderData.result.userData.errorData ? (
                  <BulletIcon
                    sx={(theme) => ({
                      width: "6px",
                      height: "6px",
                      color: theme.vars.palette["Red"],
                    })}
                  />
                ) : null}
              </Typography>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>
          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              disabled
              component={Link}
              viewTransition
              to="/"
              sx={{
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <ListItemIcon
                // color={theme.vars.palette["Grey_2"]}
                sx={(theme) => ({
                  minWidth: "24px",
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                <SettingsIcon />
              </ListItemIcon>
              <Typography
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                  color: theme.vars.palette["Black"],
                })}
                component="p"
                variant="Reg_16"
              >
                {t("settings")}{" "}
                {/* <BulletIcon
                  sx={{
                    width: "6px",
                    height: "6px",
                    color: theme.vars.palette["Red"],
                  }}
                /> */}
              </Typography>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>
          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              component={Link}
              viewTransition
              to={withLocale("documents")}
              sx={{
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <ListItemIcon
                // color={theme.vars.palette["Grey_2"]}
                sx={(theme) => ({
                  minWidth: "24px",
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                <DocumentsIcon />
              </ListItemIcon>
              <Typography
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                  color: theme.vars.palette["Black"],
                })}
                component="p"
                variant="Reg_16"
              >
                {t("documents")}{" "}
                {/* <BulletIcon
                  sx={{
                    width: "6px",
                    height: "6px",
                    color: theme.vars.palette["Red"],
                  }}
                /> */}
              </Typography>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>
          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              // component={Link}
              // to="/"
              onClick={() => {
                setOpenDialog(true);
              }}
              sx={{
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <ListItemIcon
                // color={theme.vars.palette["Grey_2"]}
                sx={(theme) => ({
                  minWidth: "24px",
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                <ExitIcon />
              </ListItemIcon>
              <Typography
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                  color: theme.vars.palette["Black"],
                })}
                component="p"
                variant="Reg_16"
              >
                {t("exit")}{" "}
                {/* <BulletIcon
                  sx={{
                    width: "6px",
                    height: "6px",
                    color: theme.vars.palette["Red"],
                  }}
                /> */}
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle>{t("dialog_title")}</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            {t("dialog_no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(JSON.stringify({ logout: "logout" }), {
                method: "POST",
                encType: "application/json",
              });
            }}
          >
            {t("dialog_yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
