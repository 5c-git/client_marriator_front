import { useState } from "react";
import {
  useNavigate,
  useNavigation,
  useSubmit,
  ClientActionFunctionArgs,
  redirect,
  json,
  useLoaderData,
} from "@remix-run/react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { t } from "i18next";
import { withLocale } from "~/shared/withLocale";

import { Box, Button, Divider, Dialog, DialogTitle } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledAccountField } from "~/shared/ui/StyledAccountField/StyledAccountField";
import { StyledCardField } from "~/shared/ui/StyledCardField/StyledCardField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { StyledMonthField } from "~/shared/ui/StyledMonthField/StyledMonthField";
import { StyledAutocomplete } from "~/shared/ui/StyledAutocomplete/StyledAutocomplete";

import { getAccessToken } from "~/preferences/token/token";
import { getBik } from "~/requests/getBik/getBik";
import { postSaveRequisitesData } from "~/requests/postSaveRequisitesData/postSaveRequisitesData";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const bik = await getBik(accessToken);

    return json({ bikOptions: bik.result.bankData });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const fields = await request.json();
  const accessToken = await getAccessToken();

  if (accessToken) {
    await postSaveRequisitesData(accessToken, fields, -1);

    throw redirect(withLocale(`/profile/billing`));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function BillingAdd() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { bikOptions } = useLoaderData<typeof clientLoader>();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confidant: false,
      fio: "",
      bik: "",
      account: "",
      card: "",
      payWithCard: "yes",
      // @ts-expect-error wrong automatic type narroing
      cardDue: null,
    },
    resolver: yupResolver(
      Yup.object({
        confidant: Yup.boolean().required(),
        fio: Yup.string().required(t("Constructor.text")),
        bik: Yup.string().required(t("Constructor.autocomplete")),
        account: Yup.string()
          .default("")
          .length(20, t("Constructor.account_wrongValue"))
          .required(t("Constructor.account")),
        card: Yup.string()
          .test(
            "is-card",
            () => t("Constructor.card", { context: "wrongValue" }),
            (value) => {
              // accept only digits, dashes or spaces
              // if (/[^0-9-\s]+/.test(value)) return false;

              const arr = `${value}`
                .split("")
                .reverse()
                .map((x) => Number.parseInt(x));
              const lastDigit = arr.shift();
              let sum = arr.reduce(
                (acc, val, i) =>
                  i % 2 !== 0
                    ? acc + val
                    : acc + ((val *= 2) > 9 ? val - 9 : val),
                0
              );
              // @ts-expect-error value is always present
              sum += lastDigit;
              return sum % 10 === 0;
            }
          )
          .required(t("Constructor.card")),
        payWithCard: Yup.string().required(t("Constructor.radio")),
        cardDue: Yup.string().nullable().required(t("Constructor.date")),
      })
    ),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingBottom: "54px",
        }}
      >
        <TopNavigation
          header={{
            text: t("BillingAdd.header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/billing"));
          }}
        />

        <form
          onSubmit={handleSubmit((values) => {
            submit(JSON.stringify(values), {
              method: "POST",
              encType: "application/json",
            });
          })}
        >
          <Box
            sx={{
              display: "grid",
              rowGap: "8px",
              paddingTop: "14px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Controller
              name="confidant"
              control={control}
              render={({ field }) => (
                <StyledCheckbox
                  inputType="checkbox"
                  label={t("BillingAdd.placeholder_checkbox")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.confidant?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="fio"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  inputType="text"
                  placeholder={t("BillingAdd.placeholder_fio")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.fio?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="bik"
              control={control}
              render={({ field }) => (
                <StyledAutocomplete
                  inputType="autocomplete"
                  placeholder={t("BillingAdd.placeholder_bik")}
                  onImmediateChange={() => {}}
                  validation="none"
                  options={bikOptions}
                  error={errors.bik?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="account"
              control={control}
              render={({ field }) => (
                <StyledAccountField
                  inputType="account"
                  placeholder={t("BillingAdd.placeholder_account")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.account?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="card"
              control={control}
              render={({ field }) => (
                <StyledCardField
                  inputType="card"
                  placeholder={t("BillingAdd.placeholder_card")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.card?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="payWithCard"
              control={control}
              render={({ field }) => (
                <StyledRadioButton
                  inputType="radio"
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.payWithCard?.message}
                  heading={t("BillingAdd.placeholder_payWithCard")}
                  options={[
                    {
                      disabled: false,
                      label: t("BillingAdd.button_yes"),
                      value: "yes",
                    },
                    {
                      disabled: false,
                      label: t("BillingAdd.button_no"),
                      value: "no",
                    },
                  ]}
                  {...field}
                />
              )}
            />
            <Controller
              name="cardDue"
              control={control}
              render={({ field }) => (
                <StyledMonthField
                  inputType="month"
                  placeholder={t("BillingAdd.placeholder_cardDue")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.cardDue?.message}
                  {...field}
                />
              )}
            />
          </Box>

          <Divider
            sx={{
              marginTop: "16px",
              marginBottom: "16px",
            }}
          />

          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              {t("BillingAdd.button_cancel")}
            </Button>

            <Button type="submit" variant="contained">
              {t("BillingAdd.button_save")}
            </Button>
          </Box>
        </form>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        sx={{
          "& .MuiDialog-paper": {
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: 0,
          }}
        >
          {t("BillingAdd.dialog_title")}
        </DialogTitle>

        <Box
          sx={{
            display: "flex",
            columnGap: "8px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDialog(false);
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("BillingAdd.button_no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              reset();
              setOpenDialog(false);
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("BillingAdd.button_yes")}
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
