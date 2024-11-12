import { useEffect } from "react";
import {
  useLoaderData,
  useFetcher,
  useNavigation,
  ClientActionFunctionArgs,
  json,
  useNavigate,
  // redirect,
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
import { transformBikOptions } from "~/requests/getForm/getFormHooks";
import { postSaveForm } from "~/requests/postSaveForm/postSaveForm";

import { useStore } from "~/store/store";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const rawData = await getForm(accessToken, 1);

    const data = transformBikOptions(rawData);

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
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await postSaveForm(accessToken, 1, fields);

    return json(data);
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Step1() {
  const { t } = useTranslation("registrationStep1");
  const theme = useTheme();

  const fetcher = useFetcher();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const { accessToken, formFields, formStatus } =
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
            sx={{
              color: theme.palette["Black"],
              paddingBottom: "14px",
            }}
          >
            {t("intro")}{" "}
            <Typography
              component="span"
              variant="Reg_18"
              sx={{
                color: theme.palette["Corp_2"],
              }}
            >
              {t("intro_marker")}
            </Typography>{" "}
            {t("intro_end")}
          </Typography>

          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Grey_2"],
              paddingBottom: "24px",
            }}
          >
            {t("text")}
          </Typography>

          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Black"],
              paddingBottom: "24px",
            }}
          >
            {t("action")}{" "}
            <Typography
              component="span"
              variant="Reg_14"
              sx={{
                color: theme.palette["Corp_2"],
              }}
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
                    navigate(withLocale("/registration/step2"));
                  }
                })();
              }}
            >
              {t("finishButton")}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
