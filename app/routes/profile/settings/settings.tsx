import { useNavigation, useNavigate, Link } from "react-router";
import type { Route } from "./+types/settings";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import {useStore} from "~/store/store";

import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { BulletIcon } from "~/shared/icons/BulletIcon";

import {getUserSettings} from "~/requests/_settings/getUserSettings/getUserSettings";

export async function clientLoader() {
    const accessToken = useStore.getState().accessToken;
  
    if (accessToken) {
      const data = await getUserSettings(accessToken);
      return data;
    } else {
      throw new Response("Токен авторизации не обнаружен!", { status: 401 });
    }
  }
  
  export async function clientAction() {
  }

export default function Settings({loaderData}: Route.ComponentProps) {
  const { t } = useTranslation("documents");
  const navigation = useNavigation();
  const navigate = useNavigate();

  console.log(loaderData);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile"), { viewTransition: true });
          }}
        />

        <List
          sx={{
            paddingTop: "20px",
            alignItems: "center",
            rowGap: "12px",
          }}
        >
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
              to={`${withLocale("/profile/documents/sign")}`}
              sx={{
                display: "flex",
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <Typography
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                })}
                component="p"
                variant="Reg_16"
              >
                {t("item_sign")}
              </Typography>

              {/* <BulletIcon
                sx={{
                  width: "6px",
                  height: "6px",
                  color: theme.vars.palette["Red"],
                }}
              /> */}

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={"var(--mui-palette-Grey_2)"} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>

        </List>
      </Box>
    </>
  );
}
