import { useEffect } from "react";
import {
  useLoaderData,
  useFetcher,
  useNavigate,
  useNavigation,
  ClientActionFunctionArgs,
  json,
} from "@remix-run/react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { t } from "i18next";
import { withLocale } from "~/shared/withLocale";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";
import { emailRegExp } from "~/shared/validators";

import { useTheme, Box, Typography, Button } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { StyledPhotoInput } from "~/shared/ui/StyledPhotoInput/StyledPhotoInput";
import { StyledEmailField } from "~/shared/ui/StyledEmailField/StyledEmailField";

import { getForm } from "~/requests/getForm/getForm";
import { getStaticUserInfo } from "~/requests/getStaticUserInfo/getStaticUserInfo";
import { postSaveForm } from "~/requests/postSaveForm/postSaveForm";
import { getAccessToken } from "~/preferences/token/token";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await getForm(accessToken, 4);

    const staticFields = await getStaticUserInfo(accessToken);

    return json({
      accessToken,
      staticFields: staticFields.result.userData,
      formFields: data.result.formData,
      formStatus: data.result.type,
    });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const fields = await request.json();
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await postSaveForm(accessToken, 4, fields);

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Step4() {
  const theme = useTheme();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { accessToken, staticFields, formFields, formStatus } =
    useLoaderData<typeof clientLoader>();

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
      staticPhoto: staticFields.img,
      staticEmail: staticFields.email,
      ...generateDefaultValues(formFields),
    },
    resolver: yupResolver(
      Yup.object({
        staticPhoto: Yup.string().required(t("Constructor.photo")),
        staticEmail: Yup.string()
          .default("")
          // .email(t("Constructor.email", { context: "wrongVaue" }))
          .matches(emailRegExp, t("Constructor.email_wrongValue"))
          .required(t("Constructor.email")),
        ...generateValidationSchema(formFields),
      })
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(
        {
          // staticPhoto: getValues("staticPhoto"),
          // staticEmail: getValues("staticEmail"),
          staticPhoto: staticFields.img,
          staticEmail: staticFields.email,
          ...generateDefaultValues(formFields),
        },
        {
          keepErrors: false,
        }
      );
    });
  }, [staticFields, formFields, reset, getValues]);

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
            text: t("RegistrationStep4.header"),
            bold: false,
          }}
          label={t("RegistrationStep4.step")}
          backAction={() => {
            navigate(-1);
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
            {t("RegistrationStep4.intro")}
          </Typography>
        </Box>

        <form
          style={{
            display: "grid",
            rowGap: "16px",
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
                  token={accessToken}
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
                onImmediateChange={() => {
                  fetcher.submit(JSON.stringify(getValues()), {
                    method: "POST",
                    encType: "application/json",
                  });
                }}
                validation="default"
                inputStyles={{
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}
                error={errors.staticEmail?.message}
                {...field}
              />
            )}
          />

          {generateInputsMarkup(
            formFields,
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
            accessToken
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
                  if (formStatus === "allowedNewStep") {
                    navigate(withLocale("/registration/step5"));
                  }
                })();
              }}
            >
              {t("RegistrationStep4.finishButton")}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
