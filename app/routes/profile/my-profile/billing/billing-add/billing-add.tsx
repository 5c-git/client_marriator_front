import { useState } from "react";
import { useNavigate, useNavigation, useSubmit, redirect } from "react-router";
import type { Route } from "./+types/billing-add";

import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Button, Divider, Dialog, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledAccountField } from "~/shared/ui/StyledAccountField/StyledAccountField";
import { StyledCardField } from "~/shared/ui/StyledCardField/StyledCardField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { StyledMonthField } from "~/shared/ui/StyledMonthField/StyledMonthField";
import { StyledAutocomplete } from "~/shared/ui/StyledAutocomplete/StyledAutocomplete";

import { useStore } from "~/store/store";
import { getBik } from "~/requests/_personal/getBik/getBik";
import { postSaveRequisitesData } from "~/requests/_personal/postSaveRequisitesData/postSaveRequisitesData";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const bik = await getBik(accessToken);

    const bikOptions: {
      value: string;
      label: string;
      disabled: boolean;
    }[] = [
      // {
      //   value: "044525974",
      //   label: "ТИНЬКОФФ-TEST",
      //   disabled: false,
      // },
      // {
      //   value: "044525225",
      //   label: "СБЕРБАНК-TEST",
      //   disabled: false,
      // },
      // {
      //   value: "044525600",
      //   label: "МИНБАНК-TEST",
      //   disabled: false,
      // },
    ];

    bik.result.bankData.forEach((element) => {
      bikOptions.push({
        value: element.bic,
        label: element.label,
        disabled: element.disabled,
      });
    });

    return { bikOptions };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    await postSaveRequisitesData(accessToken, fields, -1);

    throw redirect(withLocale(`/profile/my-profile/billing`));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function BillingAdd({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("billingAdd");
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

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
      cardDue: null as unknown as string,
    },
    resolver: zodResolver(
      z.object({
        confidant: z.boolean(),
        fio: z.string({error: t("text", { ns: "constructorFields" })}).trim().min(1, {error: t("text", { ns: "constructorFields" })}),
        bik: z.string({error: t("autocomplete", { ns: "constructorFields" })}).trim().min(1, {error: t("autocomplete", { ns: "constructorFields" })}),

        account: z.string({error: t("account", { ns: "constructorFields" })})
          .length(20, {error: t("account_wrongValue", { ns: "constructorFields" })}),
        card: z.string({error: t("card", { ns: "constructorFields" })})
          .refine(
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
            }, {
              error: t("card_wrongValue", { ns: "constructorFields" }),
            }
          ),
        payWithCard: z.string().trim().min(1, {error: t("radio", { ns: "constructorFields" })}),
        cardDue: z.string().nullable(),
      }).superRefine((values, context) => {
        const bik = values.bik;
        if (bik) {
            // const bikRs = "0" + bik.slice(4, -3) + value;
            const bikRs = bik.slice(-3) + values.account;
            let checksum = 0;
            const coefficients = [
              7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3,
              7, 1,
            ];
            for (const i in coefficients) {
              checksum += coefficients[i] * (Number(bikRs[i]) % 10);
            }
            if (checksum % 10 !== 0) {
              context.addIssue({
                code: "custom",
                message: t("account_wrongAccount", { ns: "constructorFields" }),
                input: values.account,
                path: ["account"],
              });
            }
        }
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
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/my-profile/billing"), {
              viewTransition: true,
            });
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
                  label={t("placeholder_checkbox")}
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
                  placeholder={t("placeholder_fio")}
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
                  placeholder={t("placeholder_bik")}
                  onImmediateChange={() => {}}
                  validation="none"
                  options={loaderData.bikOptions}
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
                  placeholder={t("placeholder_account")}
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
                  placeholder={t("placeholder_card")}
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
                  heading={t("placeholder_payWithCard")}
                  options={[
                    {
                      disabled: false,
                      label: t("button_yes"),
                      value: "yes",
                    },
                    {
                      disabled: false,
                      label: t("button_no"),
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
                  placeholder={t("placeholder_cardDue")}
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
              {t("button_cancel")}
            </Button>

            <Button type="submit" variant="contained">
              {t("button_save")}
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
          {t("dialog_title")}
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
            {t("button_no")}
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
            {t("button_yes")}
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
