import { useEffect } from "react";
import {
  useLoaderData,
  useFetcher,
  useNavigate,
  useNavigation,
  ClientActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/react";
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

import { useTheme, Box, Typography, Button } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { getForm } from "~/requests/getForm/getForm";
import { postSaveForm } from "~/requests/postSaveForm/postSaveForm";
import { postFinishRegister } from "~/requests/postFinishRegister/postFinishRegister";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "~/preferences/token/token";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await getForm(accessToken, 7);

    return json({
      accessToken,
      formFields: data.result.formData,
      formStatus: data.result.type,
    });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const accessToken = await getAccessToken();
  const { _action, ...fields } = await request.json();

  if (accessToken) {
    if (_action === "finishRegister") {
      const data = await postFinishRegister(accessToken);

      await setAccessToken(data.result.token.access_token);
      await setRefreshToken(data.result.token.refresh_token);

      throw redirect(withLocale("/registration/registration-complete"));
    } else {
      const data = await postSaveForm(accessToken, 7, fields);

      return data;
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Step7() {
  const { t } = useTranslation("registrationStep7");
  const theme = useTheme();

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { accessToken, formFields } = useLoaderData<typeof clientLoader>();

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: generateDefaultValues(formFields),
    resolver: yupResolver(Yup.object(generateValidationSchema(formFields))),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(generateDefaultValues(formFields));
    });
  }, [formFields, reset]);

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
            {t("intro")}
          </Typography>
        </Box>

        <form
          style={{
            display: "grid",
            rowGap: "16px",
          }}
        >
          {generateInputsMarkup(
            formFields,
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
            accessToken
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
              sx={{
                color: theme.palette["Black"],
              }}
            >
              {t("deal")}{" "}
              <Typography
                component="a"
                title="legal"
                href="/legal"
                variant="Reg_12"
                sx={{
                  color: theme.palette["Corp_1"],
                  textDecoration: "underline",
                }}
              >
                {t("deal_personal")}
              </Typography>{" "}
              {t("deal_and")}{" "}
              <Typography
                component="a"
                variant="Reg_12"
                title="agreement"
                href="/agreement"
                sx={{
                  color: theme.palette["Corp_1"],
                  textDecoration: "underline",
                }}
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
