import { useNavigation, useNavigate } from "react-router";
import type { Route } from "./+types/sign";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { useTheme, Box, Button, Typography } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { S_OrderedList, S_OrderedItem } from "./sign.styled";

import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";
import { getDocumentSigned } from "~/requests/getDocumentSigned/getDocumentSigned";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getDocumentSigned(accessToken);

    return data.result;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Sign({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("sign");
  const theme = useTheme();
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          height: "100%",
        }}
      >
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/documents"), {
              viewTransition: true,
            });
          }}
        />

        <Box
          sx={{
            display: "grid",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingRight: "16px",
            paddingLeft: "16px",
            height: "calc(100% - 56px)",
          }}
        >
          {loaderData.length === 0 ? (
            <Typography
              component="h1"
              variant="Reg_18"
              sx={{
                color: theme.palette["Black"],
                paddingBottom: "8px",
              }}
            >
              {t("sign_header")}
            </Typography>
          ) : (
            <S_OrderedList>
              {loaderData.map((item) => (
                <S_OrderedItem key={item.uuid}>{item.name}</S_OrderedItem>
              ))}
            </S_OrderedList>
          )}

          {loaderData.length > 0 ? (
            <Button
              sx={{
                marginTop: "auto",
              }}
              variant="contained"
            >
              {t("button_action")}
            </Button>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
