import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import { Button, Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import type { BillingItem, BillingLoaderData } from "../billing.service";

type BillingViewProps = {
  data: BillingLoaderData;
  onBack: () => void;
  onAdd: () => void;
  onEdit: (index: number, item: BillingItem) => void;
};

export function BillingView(props: BillingViewProps) {
  const { t } = useTranslation("m_profile_myProfile_billing");

  return (
    <Box>
      <TopNavigation
        header={{
          text: t(`header`),
          bold: false,
        }}
        buttonAction={{
          text: t(`header_action`),
          action: props.onAdd,
        }}
        backAction={props.onBack}
      />

      {props.data.billingItems.length <= 0 ? (
        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Grey_2"],
            textAlign: "center",
            paddingTop: "125px",
            paddingLeft: "16px",
            paddingRight: "16px",
          })}
        >
          {t(`empty_text`)}
        </Typography>
      ) : (
        props.data.billingItems.map((item, index) => (
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
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {t(`field_fio`)}
                </Typography>

                {item.fio !== "" ? (
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={(theme) => ({ color: theme.vars.palette["Grey_2"] })}
                  >
                    {item.fio}
                  </Typography>
                ) : null}
              </Stack>
              <Stack>
                <Typography
                  component="p"
                  variant="Reg_12"
                  sx={(theme) => ({ color: theme.vars.palette["Grey_2"] })}
                >
                  {t(`field_bik`)}
                </Typography>
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {item.bik}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  component="p"
                  variant="Reg_12"
                  sx={(theme) => ({ color: theme.vars.palette["Grey_2"] })}
                >
                  {t(`field_account`)}
                </Typography>
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {item.account}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  component="p"
                  variant="Reg_12"
                  sx={(theme) => ({ color: theme.vars.palette["Grey_2"] })}
                >
                  {t(`field_card`)}
                </Typography>
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {item.card.replace(/\d{4}(?=.)/g, "$& ")}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  component="p"
                  variant="Reg_12"
                  sx={(theme) => ({ color: theme.vars.palette["Grey_2"] })}
                >
                  {t(`field_payWithCard`)}
                </Typography>
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {item.payWithCard === "yes" ? t(`yes`) : t(`no`)}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  component="p"
                  variant="Reg_12"
                  sx={(theme) => ({ color: theme.vars.palette["Grey_2"] })}
                >
                  {t(`field_cardDue`)}
                </Typography>
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {format(item.cardDue, "LL.yy")}
                </Typography>
              </Stack>

              <Button
                variant="outlined"
                onClick={() => {
                  props.onEdit(index, item);
                }}
              >
                {t(`button_edit`)}
              </Button>
            </Stack>
            {index < props.data.billingItems.length - 1 ? <Divider /> : null}
          </Stack>
        ))
      )}
    </Box>
  );
}
