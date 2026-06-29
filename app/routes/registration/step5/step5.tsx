import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/step5";

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
  const data = await RegistrationService.getFieldsForRegistrationStep(5);

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
    .sendFields(5, fields);
}

export default function Step5({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_registration_step5");

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
          bold: false,
        }}
        label={t("step")}
        backAction={() => {
          navigate(withLocale("/registration/step4"), {
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
        onSubmit={handleSubmit(() => {
          if (loaderData.formStatus === "allowedNewStep") {
            navigate(withLocale("/registration/step6"), {
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
            position: "fixed",
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
