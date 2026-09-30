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

import { registrationContainer } from "../registration.module";
import { registrationTokens } from "../registration.tokens";

export async function clientLoader() {
  const RegistrationService = registrationContainer.get(
    registrationTokens.registrationService,
  );

  const accessToken = RegistrationService.getUserToken();
  const data = await RegistrationService.getFieldsForRegistrationStep(1);

  return {
    accessToken,
    formFields: data.result.formData,
    formStatus: data.result.type,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();

  await registrationContainer
    .get(registrationTokens.registrationService)
    .sendFields(1, fields);
}

export default function Step1({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_registration_step1");

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
        position: "relative",
        paddingBottom: "80px",
        flexGrow: 1,
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
        onSubmit={handleSubmit(() => {
          if (loaderData.formStatus === "allowedNewStep") {
            navigate(withLocale("/registration/step2"), {
              viewTransition: true,
            });
          }
        })}
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
            position: "absolute",
            zIndex: 1,
            width: "100%",
            bottom: "0",
            left: "0",
            padding: "10px 16px 24px 16px",
            backgroundColor: theme.vars.palette["White"],
          })}
        >
          <Button variant="contained" type="submit">
            {t("finishButton")}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
