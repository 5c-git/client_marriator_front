import { useEffect } from "react";
import { useFetcher, useNavigate, useNavigation, redirect } from "react-router";
import type { Route } from "./+types/step6";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { registrationContainer } from "../registration.module";
import { registrationTokens } from "../registration.tokens";

const REGISTRATION_STEP_6_ACTIONS = {
  finishRegister: "finishRegister",
} as const;

export async function clientLoader() {
  const RegistrationService = registrationContainer.get(
    registrationTokens.registrationService,
  );

  const accessToken = RegistrationService.getUserToken();
  const data = await RegistrationService.getFieldsForRegistrationStep(6);

  return {
    accessToken,
    formFields: data.result.formData,
    formStatus: data.result.type,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const RegistrationService = registrationContainer.get(
    registrationTokens.registrationService,
  );

  if (_action === REGISTRATION_STEP_6_ACTIONS.finishRegister) {
    await RegistrationService.finishRegistration();
    await RegistrationService.logout();
    throw redirect(withLocale("/registration/registration-complete"));
  } else {
    const data = await RegistrationService.sendFields(6, fields);
    return data;
  }
}

export default function Step6({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_registration_step6");

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
    watch,
  } = useForm({
    defaultValues: {
      isTermsAccepted: false,
      ...generateDefaultValues(loaderData.formFields),
    },
    resolver: zodResolver(
      z.object({
        isTermsAccepted: z.boolean().refine((value) => value === true),
        ...generateValidationSchema(loaderData.formFields).shape,
      }),
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        isTermsAccepted: false,
        ...generateDefaultValues(loaderData.formFields),
      });
    });
  }, [loaderData.formFields, reset]);

  return (
    <Box
      sx={{
        paddingBottom: "180px",
      }}
    >
      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        label={t("step")}
        backAction={() => {
          navigate(withLocale("/registration/step5"), {
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
          fetcher.submit(JSON.stringify({ _action: "finishRegister" }), {
            method: "POST",
            encType: "application/json",
          });
        })}
      >
        {generateInputsMarkup(
          loaderData.formFields,
          errors,
          // @ts-expect-error wrong automatic type narroing
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
            display: "grid",
            rowGap: "14px",
            zIndex: 1,
            width: "100%",
            bottom: "0",
            left: "0",
            padding: "10px 16px 24px 16px",
            backgroundColor: theme.vars.palette["White"],
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ textAlign: "center" }}
              variant="Reg_14"
              color="Black"
            >
              {t("terms_start")}
              <Typography
                variant="Reg_14"
                color="Corp_1"
                component="a"
                href="../../public/client_marriator_front/file-sample_150kB.pdf"
                target="_blank"
                rel="noreferrer"
              >
                {t("terms_personal")}
              </Typography>
              {t("terms_and")}
              <Typography
                sx={{ textAlign: "center" }}
                variant="Reg_14"
                color="Corp_1"
                component="a"
                href="../../public/client_marriator_front/file-sample_150kB.pdf"
                target="_blank"
                rel="noreferrer"
              >
                {t("terms_security")}
              </Typography>
            </Typography>
            <Controller
              name="isTermsAccepted"
              control={control}
              render={({ field }) => (
                <StyledCheckbox
                  inputType="checkbox"
                  {...field}
                  validation="none"
                  label={t("terms_button")}
                  onImmediateChange={() => {}}
                />
              )}
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            disabled={watch("isTermsAccepted") === false}
          >
            {t("finishButton")}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
