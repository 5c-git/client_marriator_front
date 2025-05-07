import { useState } from "react";
import {
  useSubmit,
  useNavigation,
  useNavigate,
  redirect,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/createPin";

// import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import { Typography, Snackbar, Alert, Divider } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledOptField } from "~/shared/ui/StyledOtpField/StyledOtpField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { postSetUserPin } from "~/requests/postSetUserPin/postSetUserPin";

import { useStore } from "~/store/store";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const type = currentURL.searchParams.get("type");

  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await postSetUserPin(accessToken, fields.pin);

    if ("status" in data) {
      if (type && type === "restore") {
        throw redirect(withLocale("/signin/pin"));
      } else {
        throw redirect(withLocale("/registration/step1"));
      }
    } else {
      currentURL.searchParams.set("error", "unAuth");
      throw redirect(currentURL.toString());
    }
  } else {
    currentURL.searchParams.set("error", "noToken");
    throw redirect(currentURL.toString());
  }
}

export default function CreatePin() {
  const { t } = useTranslation("createPin");
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const error = searchParams.get("error");

  const [step, setStep] = useState<1 | 2>(1);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        pin: Yup.string().min(4).max(4).required(),
        confirmPin: Yup.string().oneOf([Yup.ref("pin")], "Pins must match"),
      })
    ),
  });

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
            if (step === 2) {
              setStep(1);
              reset();
            } else {
              navigate(withLocale("/signin/createPin"), {
                viewTransition: true,
              });
            }
          }}
        />

        <Box
          sx={{
            paddingTop: "24px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_18"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              textAlign: "center",
              paddingBottom: "24px",
            })}
          >
            {t("intro")}
          </Typography>

          <Divider />

          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              textAlign: "center",
              paddingTop: "24px",
              paddingBottom: "20px",
            })}
          >
            {step === 1 ? t("text") : t("text_step2")}
          </Typography>

          <form
            style={{
              display: "grid",
              rowGap: "4px",
            }}
            onSubmit={handleSubmit(() => {
              submit(JSON.stringify({ pin: getValues("confirmPin") }), {
                method: "POST",
                encType: "application/json",
              });
            })}
          >
            {step === 1 ? (
              <Controller
                name="pin"
                control={control}
                render={({ field }) => (
                  <StyledOptField
                    error={errors.pin ? true : false}
                    style={{
                      margin: "0 auto",
                    }}
                    onComplete={() => {
                      setStep(2);
                    }}
                    {...field}
                  />
                )}
              />
            ) : null}

            {step === 2 ? (
              <Controller
                name="confirmPin"
                control={control}
                render={({ field }) => (
                  <StyledOptField
                    error={errors.confirmPin ? true : false}
                    style={{
                      margin: "0 auto",
                    }}
                    onComplete={(value) => {
                      handleSubmit(() => {
                        submit(JSON.stringify({ pin: value }), {
                          method: "POST",
                          encType: "application/json",
                        });
                      })();
                    }}
                    {...field}
                  />
                )}
              />
            ) : null}
          </form>
        </Box>
      </Box>

      <Snackbar
        open={errors.confirmPin || errors.pin ? true : false}
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
          {t("error")}
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
          {error === "noToken" ? t("error_token") : t("error_auth")}
        </Alert>
      </Snackbar>
    </>
  );
}
