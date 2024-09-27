import { useState } from "react";
import {
  useNavigate,
  useNavigation,
  useSubmit,
  ClientActionFunctionArgs,
  redirect,
  json,
  useLoaderData,
  useLocation,
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
import { postDeleteRequisite } from "~/requests/postDeleteRequisite/postDeleteRequisite";

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
  const { _action, dataId, ...fields } = await request.json();
  const accessToken = await getAccessToken();

  if (accessToken) {
    if (_action === "saveChanges") {
      await postSaveRequisitesData(accessToken, fields, dataId);

      throw redirect(withLocale(`/profile/billing`));
    } else if (_action === "delete") {
      await postDeleteRequisite(accessToken, dataId);

      throw redirect(withLocale(`/profile/billing`));
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

type BillingInfo = {
  dataId: number;
  bik: string;
  fio: string;
  card: string;
  account: string;
  cardDue: string;
  confidant: boolean;
  payWithCard: string;
};

export default function BillingEdit() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();

  const { bikOptions } = useLoaderData<typeof clientLoader>();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const passedBillingInfo: BillingInfo = location.state;

  console.log(location.state);

  const bikMatch = bikOptions.find(
    (item) => item.value === passedBillingInfo.bik
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confidant: passedBillingInfo.confidant,
      fio: passedBillingInfo.fio,
      bik: bikMatch ? bikMatch.value : "",
      account: passedBillingInfo.account,
      card: passedBillingInfo.card,
      payWithCard: passedBillingInfo.payWithCard,
      cardDue: passedBillingInfo.cardDue,
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
            text: t("BillingEdit.header"),
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
                  label={t("BillingEdit.placeholder_checkbox")}
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
                  placeholder={t("BillingEdit.placeholder_fio")}
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
                  placeholder={t("BillingEdit.placeholder_bik")}
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
                  placeholder={t("BillingEdit.placeholder_account")}
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
                  placeholder={t("BillingEdit.placeholder_card")}
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
                  heading={t("BillingEdit.placeholder_payWithCard")}
                  options={[
                    {
                      disabled: false,
                      label: t("BillingEdit.button_yes"),
                      value: "yes",
                    },
                    {
                      disabled: false,
                      label: t("BillingEdit.button_no"),
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
                  placeholder={t("BillingEdit.placeholder_cardDue")}
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
              {t("BillingEdit.button_cancel")}
            </Button>

            <Button
              type="button"
              onClick={handleSubmit((values) => {
                submit(
                  JSON.stringify({
                    _action: "saveChanges",
                    dataId: passedBillingInfo.dataId,
                    ...values,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  }
                );
              })}
              variant="contained"
            >
              {t("BillingEdit.button_save")}
            </Button>
          </Box>

          <Button
            onClick={() => {
              setOpenDelete(true);
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("BillingEdit.button_delete")}
          </Button>
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
          {t("BillingEdit.dialog_title")}
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
            {t("BillingEdit.button_no")}
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
            {t("BillingEdit.button_yes")}
          </Button>
        </Box>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
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
          {t("BillingEdit.delete_title")}
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
              setOpenDelete(false);
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("BillingEdit.button_no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDelete(false);

              submit(
                JSON.stringify({
                  _action: "delete",
                  dataId: passedBillingInfo.dataId,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("BillingEdit.button_yes")}
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
