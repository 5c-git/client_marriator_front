import { useEffect } from "react";
import { useFetcher, useNavigate, useNavigation, redirect } from "react-router";
import type { Route } from "./+types/step7";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { getForm } from "~/requests/getForm/getForm";
import { transformBikOptions } from "~/requests/getForm/getFormHooks";
import { postSaveForm } from "~/requests/postSaveForm/postSaveForm";
import { postFinishRegister } from "~/requests/postFinishRegister/postFinishRegister";

import { useStore } from "~/store/store";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const rawData = await getForm(accessToken, 7);

    const data = transformBikOptions(rawData);

    return {
      accessToken,
      formFields: data.result.formData,
      formStatus: data.result.type,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const accessToken = useStore.getState().accessToken;
  const { _action, ...fields } = await request.json();

  if (accessToken) {
    if (_action === "finishRegister") {
      const data = await postFinishRegister(accessToken);

      useStore.getState().setAccessToken(data.result.token.access_token);
      useStore.getState().setRefreshToken(data.result.token.refresh_token);

      throw redirect(withLocale("/registration/registration-complete"));
    } else {
      const data = await postSaveForm(accessToken, 7, fields);

      return data;
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Step7({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("registrationStep7");

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: generateDefaultValues(loaderData.formFields),
    resolver: yupResolver(
      Yup.object(generateValidationSchema(loaderData.formFields))
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(generateDefaultValues(loaderData.formFields));
    });
  }, [loaderData.formFields, reset]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingBottom: "21px",
        }}
      >
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          label={t("step")}
          backAction={() => {
            navigate(withLocale("/registration/step6"), {
              viewTransition: true,
            });
          }}
        />

        <Box
          sx={{
            padding: "24px 16px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_18"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              paddingBottom: "14px",
            })}
          >
            {t("intro")}
          </Typography>
        </Box>

        <form
          style={{
            display: "grid",
            rowGap: "16px",
          }}
          onSubmit={(evt) => {
            evt.preventDefault();
          }}
        >
          {generateInputsMarkup(
            loaderData.formFields,
            errors,
            control,
            setValue,
            trigger,
            () => {
              fetcher.submit(JSON.stringify(getValues()), {
                method: "POST",
                encType: "application/json",
              });
            },
            loaderData.accessToken
          )}

          <Box
            sx={{
              display: "grid",
              rowGap: "10px",
              paddingTop: "14px",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() => {
                trigger();
                handleSubmit(() => {
                  fetcher.submit(
                    JSON.stringify({ _action: "finishRegister" }),
                    {
                      method: "POST",
                      encType: "application/json",
                    }
                  );
                })();
              }}
            >
              {t("finishButton")}
            </Button>

            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t("deal")}{" "}
              <Typography
                component="a"
                title="legal"
                href="/legal"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Corp_1"],
                  textDecoration: "underline",
                })}
              >
                {t("deal_personal")}
              </Typography>{" "}
              {t("deal_and")}{" "}
              <Typography
                component="a"
                variant="Reg_12"
                title="agreement"
                href="/agreement"
                sx={(theme) => ({
                  color: theme.vars.palette["Corp_1"],
                  textDecoration: "underline",
                })}
              >
                {t("deal_agreement")}
              </Typography>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
}
