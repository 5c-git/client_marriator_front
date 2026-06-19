import { useState, useEffect } from "react";
import { useFetcher, useNavigate, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/step4";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";
import { emailRegExp } from "~/shared/validators";

import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { StyledPhotoInput } from "~/shared/ui/StyledPhotoInput/StyledPhotoInput";
import { StyledEmailField } from "~/shared/ui/StyledEmailField/StyledEmailField";

import { registrationContainer } from "../registration.module";
import { registrationTokens } from "../registration.tokens";

const REGISTRATION_STEP_4_ACTIONS = {
  reset: "reset",
  confirmEmail: "confirmEmail",
  finishRegister: "finishRegister",
} as const;

export async function clientLoader() {
  const RegistrationService = registrationContainer.get(
    registrationTokens.registrationService,
  );

  const accessToken = RegistrationService.getUserToken();
  const data = await RegistrationService.getFieldsForRegistrationStep(4);
  const staticFields = await RegistrationService.getUserStaticInfo();

  return {
    accessToken,
    staticFields: staticFields.result.userData,
    formFields: data.result.formData,
    formStatus: data.result.type,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const params = new URLSearchParams();
  const { _action, ...fields } = await request.json();

  const RegistrationService = registrationContainer.get(
    registrationTokens.registrationService,
  );

  if (_action && _action === REGISTRATION_STEP_4_ACTIONS.reset) {
    return null;
  }

  if (_action && _action === REGISTRATION_STEP_4_ACTIONS.confirmEmail) {
    RegistrationService.setUserEmail(fields.email);
    const newEmailData = await RegistrationService.sendUserEmail(fields.email);

    if (newEmailData.status === "error") {
      return { error: "alreadyExists" };
    } else {
      params.set("ttl", "120");

      throw redirect(withLocale(`/registration/confirm-email?${params}`));
    }
  } else if (_action === REGISTRATION_STEP_4_ACTIONS.finishRegister) {
    await RegistrationService.finishRegistration();

    RegistrationService.logout();

    throw redirect(withLocale("/registration/registration-complete"));
  } else {
    const data = await RegistrationService.sendFields(4, fields);

    return data;
  }
}

export default function Step4({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_registration_step4");
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();
  const submit = useSubmit();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
      staticPhoto: loaderData.staticFields.img,
      staticEmail: loaderData.staticFields.email,
      isTermsAccepted: false,
      ...generateDefaultValues(loaderData.formFields),
    },
    resolver: zodResolver(
      z.object({
        staticPhoto: z
          .string()
          .trim()
          .min(1, { error: t("photo", { ns: "constructorFields" }) }),
        staticEmail: z
          .string({ error: t("email", { ns: "constructorFields" }) })
          .regex(
            emailRegExp,
            t("email_wrongValue", { ns: "constructorFields" }),
          ),
        isTermsAccepted: z.boolean(),
        ...generateValidationSchema(loaderData.formFields).shape,
      }),
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(
        (values) => ({
          staticPhoto: loaderData.staticFields.img,
          staticEmail: loaderData.staticFields.email,
          isTermsAccepted: values.isTermsAccepted,
          ...generateDefaultValues(loaderData.formFields),
        }),
        {
          keepErrors: false,
        },
      );
    });
  }, [loaderData.staticFields, loaderData.formFields, reset, getValues]);

  return (
    <>
      <Box
        sx={{
          paddingBottom: "220px",
        }}
      >
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          label={t("step")}
          backAction={() => {
            navigate(withLocale("/registration/step3"), {
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
              navigate(withLocale("/registration/step5"), {
                viewTransition: true,
              });
            }
          })}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Controller
              name="staticPhoto"
              control={control}
              render={({ field }) => (
                <StyledPhotoInput
                  inputType="photo"
                  {...field}
                  // @ts-expect-error wrong automatic type narroing
                  onChange={setValue}
                  onImmediateChange={() => {
                    fetcher.submit(JSON.stringify(getValues()), {
                      method: "POST",
                      encType: "application/json",
                    });
                  }}
                  validation="default"
                  url={import.meta.env.VITE_SEND_PHOTO}
                  token={loaderData.accessToken}
                  // @ts-expect-error wrong automatic type narroing
                  triggerValidation={trigger}
                  error={errors.staticPhoto?.message}
                />
              )}
            />
          </Box>

          <Controller
            name="staticEmail"
            control={control}
            render={({ field }) => (
              <StyledEmailField
                inputType="email"
                placeholder="E-mail"
                // onImmediateChange={() => {
                //   fetcher.submit(JSON.stringify(getValues()), {
                //     method: "POST",
                //     encType: "application/json",
                //   });
                // }}
                onImmediateChange={() => {}}
                validation="default"
                inputStyle={{
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}
                error={errors.staticEmail?.message}
                {...field}
                onBlur={(evt) => {
                  if (
                    evt.target.value !== "" &&
                    evt.target.value !== loaderData.staticFields.email &&
                    errors.staticEmail === undefined
                  )
                    setOpenDialog(true);
                }}
              />
            )}
          />

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
              onClick={() => {
                trigger();
                handleSubmit(() => {
                  if (loaderData.formStatus === "allowedNewStep") {
                    submit(JSON.stringify({ _action: "finishRegister" }), {
                      method: "POST",
                      encType: "application/json",
                    });
                  }
                })();
              }}
              disabled={watch("isTermsAccepted") === false}
            >
              {t("endButton")}
            </Button>

            <Button variant="text" type="submit">
              {t("finishButton")}
            </Button>
          </Box>
        </form>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setValue("staticEmail", "");
        }}
        sx={{
          "& .MuiDialog-paper": {
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: 0,
          }}
        >
          {t("dialog_title")}
        </DialogTitle>

        <Button
          variant="contained"
          onClick={() => {
            fetcher.submit(
              JSON.stringify({
                _action: "confirmEmail",
                email: getValues("staticEmail"),
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
            setOpenDialog(false);
          }}
          sx={{
            marginTop: "16px",
          }}
        >
          {t("dialog_button")}
        </Button>
      </Dialog>

      <Snackbar
        open={
          fetcher.data &&
          "error" in fetcher.data &&
          fetcher.data.error === "alreadyExists"
            ? true
            : false
        }
        autoHideDuration={3000}
        onClose={() => {
          fetcher.submit(
            JSON.stringify({
              _action: "reset",
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
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
          {t("error_alreadyExists")}
        </Alert>
      </Snackbar>
    </>
  );
}
