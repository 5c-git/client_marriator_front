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

import {
  useTheme,
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { Loader } from "~/shared/ui/Loader/Loader";

import marriator from "./marriator.svg";

// export async function clientAction({ request }: Route.ClientActionArgs) {
//   // const currentURL = new URL(request.url);
//   // currentURL.searchParams.set("error", "error");
//   // throw redirect(currentURL.toString());
//   // throw redirect(withLocale(`/signin/client/meta`));
// }

export default function Phone() {
  const { t } = useTranslation("clientPhone");
  const theme = useTheme();

  const submit = useSubmit();
  const navigation = useNavigation();

  const [searchParams, setSearchParams] = useSearchParams();

  const error = searchParams.get("error");

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
          paddingTop: "16px",
        }}
      >
        <Typography
          component="p"
          variant="Reg_18"
          sx={{
            color: (theme) => theme.palette["Black"],
            paddingBottom: "58px",
          }}
        >
          {t("header")}
        </Typography>
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
                styles={{
                  paddingBottom: "16px",
                  paddingTop: "38px",
                }}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              paddingTop: "14px",
              paddingBottom: "14px",
              ...theme.typography.Bold_16,
            }}
          >
            {t("submitButton")}
          </Button>
        </form>
      </Box>

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
