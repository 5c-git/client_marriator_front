import { useState, useEffect } from "react";
import {
  useSubmit,
  useNavigation,
  useNavigate,
  // ClientActionFunctionArgs,
} from "@remix-run/react";

import { t } from "i18next";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

const validationSchema = Yup.object().shape({
  sms: Yup.string()
    .default("")
    .length(5, t("Sms.inputValidation", { context: "lenght" }))
    .required(t("Sms.inputValidation")),
});

// export async function clientAction({ request }: ClientActionFunctionArgs) {
//   const fields = await request.json();

//   const data = await request(fields);

//   // if (data) {
//   //   throw redirect("/");
//   // }

//   return data;
// }

export default function Sms() {
  const theme = useTheme();
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState<number>(59);
  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sms: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("Sms.header"),
            bold: false,
          }}
          backAction={() => {
            navigate(-1);
          }}
        />

        <Box
          sx={{
            padding: "20px 16px",
          }}
        >
          <form
            style={{
              display: "grid",
              rowGap: "4px",
            }}
          >
            <Controller
              name="sms"
              control={control}
              render={({ field }) => (
                <StyledSmsField
                  inputType="sms"
                  error={errors.sms?.message}
                  placeholder={t("Sms.inputPlaceholder")}
                  onImmediateChange={handleSubmit((values) => {
                    submit(JSON.stringify(values), {
                      method: "POST",
                      encType: "application/json",
                    });
                  })}
                  {...field}
                />
              )}
            />

            <Button
              type="button"
              variant="text"
              disabled={seconds > 0 ? true : false}
              sx={{
                fontSize: "1rem",
                lineHeight: "1.25rem",
              }}
              onClick={() => {
                setSeconds(59);
              }}
            >
              {t("Sms.sendAgain")}
            </Button>

            {seconds !== 0 ? (
              <Typography
                component="p"
                variant="Reg_12"
                sx={{
                  color: theme.palette["Black"],
                  textAlign: "center",
                }}
              >
                {t("Sms.timer")}{" "}
                <Typography
                  component="span"
                  variant="Bold_12"
                  sx={{
                    color: theme.palette["Black"],
                  }}
                >
                  00:{seconds < 10 ? "0" : null}
                  {seconds}
                </Typography>
              </Typography>
            ) : null}
          </form>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          severity="info"
          variant="normal"
          color="Corp_2"
          sx={{
            width: "100%",
          }}
        >
          {t("Sms.notification")}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => {
          setError(false);
        }}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t("Sms.errorNotifivation")}
        </Alert>
      </Snackbar>
    </>
  );
}
