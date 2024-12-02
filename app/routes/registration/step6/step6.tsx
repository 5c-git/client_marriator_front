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
    const rawData = await getForm(accessToken, 6);

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
  const accessToken = useStore.getState().accessToken;
  const fields = await request.json();

  if (accessToken) {
    const data = await postSaveForm(accessToken, 6, fields);

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Step6() {
  const { t } = useTranslation("registrationStep6");
  const theme = useTheme();

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();

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
          onSubmit={(evt) => {
            evt.preventDefault();
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
                    navigate(withLocale("/registration/step7"));
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
