import { useState } from "react";
import {
  useSubmit,
  useNavigation,
  useNavigate,
  ClientActionFunctionArgs,
  redirect,
  useSearchParams,
} from "@remix-run/react";

import { t } from "i18next";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import {
  Box,
  Typography,
  Snackbar,
  Alert,
  useTheme,
  Divider,
} from "@mui/material";
import { StyledOptField } from "~/shared/ui/StyledOtpField/StyledOtpField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { postSetUserPin } from "~/requests/postSetUserPin/postSetUserPin";
import { validateToken } from "~/preferences/token/token";

const validationSchema = Yup.object().shape({
  pin: Yup.string().min(4).max(4).required(),
  confirmPin: Yup.string().oneOf([Yup.ref("pin")], "Pins must match"),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);

  const fields = await request.json();
  const accessToken = await validateToken();

  if (accessToken) {
    const data = await postSetUserPin(accessToken, fields.pin);

    if ("status" in data) {
      throw redirect("/registration/step1");
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
  const theme = useTheme();
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
  } = useForm({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("CreatePin.header"),
            bold: false,
          }}
          backAction={() => {
            if (step === 2) {
              setStep(1);
              reset();
            } else {
              navigate(-1);
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
            sx={{
              color: theme.palette["Black"],
              textAlign: "center",
              paddingBottom: "24px",
            }}
          >
            {t("CreatePin.intro")}
          </Typography>

          <Divider />

          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Black"],
              textAlign: "center",
              paddingTop: "24px",
              paddingBottom: "20px",
            }}
          >
            {step === 1
              ? t("CreatePin.text")
              : t("CreatePin.text", { context: "step2" })}
          </Typography>

          <form
            style={{
              display: "grid",
              rowGap: "4px",
            }}
          >
            {step === 1 ? (
              <Controller
                name="pin"
                control={control}
                render={({ field }) => (
                  <StyledOptField
                    error={errors.pin ? true : false}
                    styles={{
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
                    styles={{
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
          {t("CreatePin.error")}
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
          {error === "noToken"
            ? t("CreatePin.error", { context: "token" })
            : t("CreatePin.error", { context: "auth" })}
        </Alert>
      </Snackbar>
    </>
  );
}
