import {
  useNavigation,
  useNavigate,
  json,
  useLoaderData,
} from "@remix-run/react";

import { t } from "i18next";

import { withLocale } from "~/shared/withLocale";

import { useTheme, Box, Button, Typography } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { S_OrderedList, S_OrderedItem } from "./sign.styled";

import { Loader } from "~/shared/ui/Loader/Loader";

import { getAccessToken } from "~/preferences/token/token";
import { getDocumentSigned } from "~/requests/getDocumentSigned/getDocumentSigned";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await getDocumentSigned(accessToken);

    return json(data.result);
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Sign() {
  const theme = useTheme();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const data = useLoaderData<typeof clientLoader>();

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
            text: t("Sign.header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/documents"));
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
          {data.length === 0 ? (
            <Typography
              component="h1"
              variant="Reg_18"
              sx={{
                color: theme.palette["Black"],
                paddingBottom: "8px",
              }}
            >
              {t("Sign.sign_header")}
            </Typography>
          ) : (
            <S_OrderedList>
              {data.map((item) => (
                <S_OrderedItem key={item.uuid}>{item.name}</S_OrderedItem>
              ))}
            </S_OrderedList>
          )}

          {data.length > 0 ? (
            <Button
              sx={{
                marginTop: "auto",
              }}
              variant="contained"
            >
              {t("Sign.button_action")}
            </Button>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
