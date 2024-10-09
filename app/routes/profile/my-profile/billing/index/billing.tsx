import {
  useLoaderData,
  useNavigate,
  useNavigation,
  json,
} from "@remix-run/react";

import { t } from "i18next";
import { withLocale } from "~/shared/withLocale";

import { format } from "date-fns";

import { Box, Button, Typography, Stack, Divider } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { getAccessToken } from "~/preferences/token/token";

import { getRequisitesData } from "~/requests/getRequisitesData/getRequisitesData";
import { theme } from "~/theme/theme";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const requisitesData = await getRequisitesData(accessToken);

    return json({ billingArray: requisitesData.result });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Billing() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { billingArray } = useLoaderData<typeof clientLoader>();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("Billing.header"),
            bold: false,
          }}
          buttonAction={{
            text: t("Billing.header_action"),
            action: () => {
              navigate(withLocale("/profile/my-profile/billing/billing-add"));
            },
          }}
          backAction={() => {
            navigate(withLocale("/profile/my-profile"));
          }}
        />

        {billingArray.length <= 0 ? (
          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Grey_2"],
              textAlign: "center",
              paddingTop: "125px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {t("Billing.empty_text")}
          </Typography>
        ) : (
          billingArray.map((item, index) => (
            <Stack key={index}>
              <Stack
                sx={{
                  padding: "16px",
                  rowGap: "8px",
                }}
              >
                <Stack>
                  <Typography
                    component="p"
                    variant="Bold_14"
                    sx={{ color: theme.palette["Black"] }}
                  >
                    {t("Billing.field_fio")}
                  </Typography>

                  {item.fio !== "" ? (
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={{ color: theme.palette["Grey_2"] }}
                    >
                      {item.fio}
                    </Typography>
                  ) : null}
                </Stack>
                <Stack>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={{ color: theme.palette["Grey_2"] }}
                  >
                    {t("Billing.field_bik")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{ color: theme.palette["Black"] }}
                  >
                    {item.bik}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={{ color: theme.palette["Grey_2"] }}
                  >
                    {t("Billing.field_account")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{ color: theme.palette["Black"] }}
                  >
                    {item.account}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={{ color: theme.palette["Grey_2"] }}
                  >
                    {t("Billing.field_card")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{ color: theme.palette["Black"] }}
                  >
                    {item.card.replace(/\d{4}(?=.)/g, "$& ")}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={{ color: theme.palette["Grey_2"] }}
                  >
                    {t("Billing.field_payWithCard")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{ color: theme.palette["Black"] }}
                  >
                    {item.payWithCard === "yes"
                      ? t("Billing.yes")
                      : t("Billing.no")}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={{ color: theme.palette["Grey_2"] }}
                  >
                    {t("Billing.field_cardDue")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{ color: theme.palette["Black"] }}
                  >
                    {format(item.cardDue, "LL.yy")}
                  </Typography>
                </Stack>

                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate(
                      withLocale("/profile/my-profile/billing/billing-edit"),
                      {
                        state: {
                          dataId: index,
                          ...item,
                        },
                      }
                    );
                  }}
                >
                  {t("Billing.button_edit")}
                </Button>
              </Stack>
              {index < billingArray.length ? <Divider /> : null}
            </Stack>
          ))
        )}
      </Box>
    </>
  );
}