import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/step1";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { getForm } from "~/api/getForm/getForm";
import { transformBikOptions } from "~/api/getForm/getFormHooks";
import { postSaveForm } from "~/api/postSaveForm/postSaveForm";

import { useStore } from "~/store/store";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const rawData = await getForm(accessToken, 1);

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
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await postSaveForm(accessToken, 1, fields);

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Step1({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("registrationStep1");

  const fetcher = useFetcher();
  const navigate = useNavigate();

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: generateDefaultValues(loaderData.formFields),
    resolver: zodResolver(generateValidationSchema(loaderData.formFields)),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(generateDefaultValues(loaderData.formFields));
    });
  }, [loaderData.formFields, reset]);

  return (
    <Box
      sx={{
        paddingBottom: "80px",
      }}
    >
      <TopNavigation
        header={{
          text: t("header"),
          bold: true,
        }}
        label={t("step")}
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
          {t("intro")}{" "}
          <Typography
            component="span"
            variant="Reg_18"
            sx={(theme) => ({
              color: theme.vars.palette["Corp_2"],
            })}
          >
            {t("intro_marker")}
          </Typography>{" "}
          {t("intro_end")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Grey_2"],
            paddingBottom: "24px",
          })}
        >
          {t("text")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
            paddingBottom: "24px",
          })}
        >
          {t("action")}{" "}
          <Typography
            component="span"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Corp_2"],
            })}
          >
            {t("action_marker")}
          </Typography>
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
          loaderData.accessToken,
        )}

        <Box
          sx={(theme) => ({
            position: "fixed",
            zIndex: 1,
            width: "100%",
            bottom: "0",
            left: "0",
            padding: "10px 16px 24px 16px",
            backgroundColor: theme.vars.palette["White"],
          })}
        >
          <Button
            variant="contained"
            onClick={() => {
              trigger();
              handleSubmit(() => {
                if (loaderData.formStatus === "allowedNewStep") {
                  navigate(withLocale("/registration/step2"), {
                    viewTransition: true,
                  });
                }
              })();
            }}
          >
            {t("finishButton")}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
