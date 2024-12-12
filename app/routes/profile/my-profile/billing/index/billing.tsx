import { useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/billing";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { format } from "date-fns";

import { Box, Button, Typography, Stack, Divider } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";

import { getRequisitesData } from "~/requests/getRequisitesData/getRequisitesData";
import { theme } from "~/theme/theme";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const requisitesData = await getRequisitesData(accessToken);

    return { billingArray: requisitesData.result };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Billing({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("billing");
  const navigate = useNavigate();
  const navigation = useNavigation();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}
      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          buttonAction={{
            text: t("header_action"),
            action: () => {
              navigate(withLocale("/profile/my-profile/billing/billing-add"), {
                viewTransition: true,
              });
            },
          }}
          backAction={() => {
            navigate(withLocale("/profile/my-profile"), {
              viewTransition: true,
            });
          }}
        />

        {loaderData.billingArray.length <= 0 ? (
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
            {t("empty_text")}
          </Typography>
        ) : (
          loaderData.billingArray.map((item, index) => (
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
                    {t("field_fio")}
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
                    {t("field_bik")}
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
                    {t("field_account")}
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
                    {t("field_card")}
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
                    {t("field_payWithCard")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{ color: theme.palette["Black"] }}
                  >
                    {item.payWithCard === "yes" ? t("yes") : t("no")}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={{ color: theme.palette["Grey_2"] }}
                  >
                    {t("field_cardDue")}
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
                  {t("button_edit")}
                </Button>
              </Stack>
              {index < loaderData.billingArray.length ? <Divider /> : null}
            </Stack>
          ))
        )}
      </Box>
    </>
  );
}
