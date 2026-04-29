import { useNavigation, useNavigate, useSubmit } from "react-router";
import type { Route } from "./+types/settings";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import {useStore} from "~/store/store";

import {
  List,
  ListItem,
  Divider,
} from "@mui/material";

import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { getUserSettings } from "~/requests/_personal/getUserSettings/getUserSettings";
import { postSetUserSettings } from "~/requests/_personal/postSetUserSettings/postSetUserSettings";

export async function clientLoader() {
    const accessToken = useStore.getState().accessToken;
  
    if (accessToken) {
      const data = await getUserSettings(accessToken);
      return data;
    } else {
      throw new Response("Токен авторизации не обнаружен!", { status: 401 });
    }
  }
  
  export async function clientAction({ request }: Route.ClientActionArgs) {
    
    const accessToken = useStore.getState().accessToken;
    const { notificationNewBids } = await request.json();

    if (accessToken) {
      const data = await postSetUserSettings(accessToken, notificationNewBids);
      return data;
    } else {
      throw new Response("Токен авторизации не обнаружен!", { status: 401 });
    }
  }

export default function Settings({loaderData}: Route.ComponentProps) {
  const { t } = useTranslation("settings");
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();

  const valueNotificationNewBids = Boolean(loaderData.data.notificationNewBids);

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
            <StyledCheckbox
              inputType="checkbox"
              validation="none"
              name="notificationNewBids"
              value={valueNotificationNewBids}
              label={t("notificationNewBids")}
              onImmediateChange={() => {}}
              onChange={() => {
                submit(JSON.stringify({
                  notificationNewBids: !valueNotificationNewBids,
                }), {
                  method: "POST",
                  encType: "application/json",
                });
              }}
              
            />
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
