import {
  useSubmit,
  useNavigation,
  useSearchParams,
  redirect,
} from "react-router";
import type { Route } from "./+types/phone";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneRegExp } from "~/shared/validators";

import { useForm, Controller } from "react-hook-form";

import { Alert, Button, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { Loader } from "~/shared/ui/Loader/Loader";

import marriator from "./marriator.svg";

import { useStore } from "~/store/store";

import { postSendPhone } from "~/requests/postSendPhone/postSendPhone";

const setUserPhone = useStore.getState().setUserPhone;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const params = new URLSearchParams();

  const fields = await request.json();
  setUserPhone(fields.phone);

  const data = await postSendPhone(fields.phone);

  if (data.status === "success") {
    if (data.result.type === "moderation") {
      throw redirect(withLocale("/signin/client/registration-complete"));
    }

    if (data.result.code.status !== "errorSend") {
      params.set("ttl", data.result.code.ttl.toString());
      params.set("type", data.result.type);

      throw redirect(withLocale(`/signin/sms?${params}`));
    } else {
      currentURL.searchParams.set("error", "error");

      throw redirect(currentURL.toString());
    }
  } else {
    currentURL.searchParams.set("timer", data.result.code.ttl.toString());

    throw redirect(currentURL.toString());
  }
}

export default function Phone() {
  const { t } = useTranslation("phone");

  const submit = useSubmit();
  const navigation = useNavigation();

  const [searchParams, setSearchParams] = useSearchParams();

  const error = searchParams.get("error");
  const timer = searchParams.get("timer");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        phone: Yup.string()
          .matches(phoneRegExp, t("inputValidation_regExp"))
          .required(t("inputValidation")),
      })
    ),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "60px",
        }}
      >
        <Box
          sx={{
            width: "164px",
            height: "78px",
            margin: "0 auto",
          }}
        >
          <img
            src={marriator}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            alt="marriator"
          />
        </Box>

        <form
          onSubmit={handleSubmit((values) => {
            submit(JSON.stringify(values), {
              method: "POST",
              encType: "application/json",
            });
          })}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <StyledPhoneField
                inputType="phone"
                error={errors.phone?.message}
                placeholder={t("inputPlaceholder")}
                onImmediateChange={() => {}}
                style={{
                  paddingBottom: "16px",
                  paddingTop: "38px",
                }}
                {...field}
              />
            )}
          />

          <Button type="submit" variant="outlined">
            {t("submitButton")}
          </Button>
        </form>
      </Box>

      <Snackbar
        open={timer !== null ? true : false}
        onClose={() => {
          setSearchParams("");
        }}
        autoHideDuration={3000}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t("timerError", { seconds: timer })}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error !== null ? true : false}
        onClose={() => {
          setSearchParams("");
        }}
        autoHideDuration={3000}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
