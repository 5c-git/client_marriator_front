import { useState, useEffect } from "react";
import { useFetcher, useNavigate, useNavigation, redirect } from "react-router";
import type { Route } from "./+types/step4";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  useTheme,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { StyledPhotoInput } from "~/shared/ui/StyledPhotoInput/StyledPhotoInput";
import { StyledEmailField } from "~/shared/ui/StyledEmailField/StyledEmailField";

import { useStore } from "~/store/store";

import { getForm } from "~/requests/getForm/getForm";
import { transformBikOptions } from "~/requests/getForm/getFormHooks";
import { getStaticUserInfo } from "~/requests/getStaticUserInfo/getStaticUserInfo";
import { postSaveForm } from "~/requests/postSaveForm/postSaveForm";
import { postSetUserEmail } from "~/requests/postSetUserEmail/postSetUserEmail";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const rawData = await getForm(accessToken, 4);

    const data = transformBikOptions(rawData);

    const staticFields = await getStaticUserInfo(accessToken);

    return {
      accessToken,
      staticFields: staticFields.result.userData,
      formFields: data.result.formData,
      formStatus: data.result.type,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const params = new URLSearchParams();
  const { _action, ...fields } = await request.json();
  const accessToken = useStore.getState().accessToken;
  const setUserEmail = useStore.getState().setUserEmail;

  if (_action && _action === "reset") {
    return null;
  }

  if (accessToken) {
    if (_action && _action === "confirmEmail") {
      setUserEmail(fields.email);
      const newEmailData = await postSetUserEmail(accessToken, fields.email);

      if (newEmailData.status === "error") {
        return { error: "alreadyExists" };
      } else {
        params.set("ttl", "120");

        throw redirect(withLocale(`/registration/confirm-email?${params}`));
      }
    } else {
      const data = await postSaveForm(accessToken, 4, fields);

      return data;
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Step4({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("registrationStep4");
  const theme = useTheme();
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      staticPhoto: loaderData.staticFields.img,
      staticEmail: loaderData.staticFields.email,
      ...generateDefaultValues(loaderData.formFields),
    },
    resolver: yupResolver(
      Yup.object({
        staticPhoto: Yup.string().required(
          t("photo", { ns: "constructorFields" })
        ),
        staticEmail: Yup.string()
          .default("")
          .matches(
            emailRegExp,
            t("email_wrongValue", { ns: "constructorFields" })
          )
          .required(t("email", { ns: "constructorFields" })),
        ...generateValidationSchema(loaderData.formFields),
      })
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(
        {
          staticPhoto: loaderData.staticFields.img,
          staticEmail: loaderData.staticFields.email,
          ...generateDefaultValues(loaderData.formFields),
        },
        {
          keepErrors: false,
        }
      );
    });
  }, [loaderData.staticFields, loaderData.formFields, reset, getValues]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

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
            sx={{
              color: theme.palette["Black"],
              paddingBottom: "14px",
            }}
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
                inputStyles={{
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
            loaderData.accessToken
          )}

          <Box
            sx={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              bottom: "0",
              left: "0",
              padding: "10px 16px 24px 16px",
              backgroundColor: theme.palette["White"],
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                trigger();
                handleSubmit(() => {
                  if (loaderData.formStatus === "allowedNewStep") {
                    navigate(withLocale("/registration/step5"), {
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
              }
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
            }
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
