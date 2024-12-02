import { useEffect } from "react";
import {
  useLoaderData,
  useFetcher,
  useNavigation,
  ClientActionFunctionArgs,
  useNavigate,
  useSearchParams,
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

import { getFormActivities } from "~/requests/getFormActivities/getFormActivities";
import { postSaveUserFieldsActivities } from "~/requests/postSaveUserFieldsActivities/postSaveUserFieldsActivities";

import { useStore } from "~/store/store";

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);

  const accessToken = useStore.getState().accessToken;
  const step = currentURL.searchParams.get("step");

  if (accessToken && step) {
    const data = await getFormActivities(accessToken, Number(step));

    return {
      accessToken,
      formFields: data.result.formData,
      formStatus: data.result.type,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  const step = currentURL.searchParams.get("step");

  if (accessToken && step) {
    const data = await postSaveUserFieldsActivities(
      accessToken,
      Number(step),
      fields
    );

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function UserActivities() {
  const { t } = useTranslation("userActivities");
  const theme = useTheme();

  const fetcher = useFetcher();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const { accessToken, formFields, formStatus } =
    useLoaderData<typeof clientLoader>();

  const [searchParams, setSearchParams] = useSearchParams();

  const stepParams = searchParams.get("step");

  const step = stepParams ? Number(stepParams) : 1;

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
          label={`${t("step")} ${step}`}
          backAction={() => {
            if (step === 1) {
              navigate(withLocale("/profile/my-profile"));
            } else {
              setSearchParams((prev) => {
                prev.set("step", (step - 1).toString());
                return prev;
              });
            }
          }}
        />

        {step === 3 ? (
          <Box
            sx={{
              padding: "20px 16px",
              paddingBottom: "0",
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
              {t("additional")}{" "}
            </Typography>
          </Box>
        ) : null}

        <form
          style={{
            display: "grid",
            rowGap: "16px",
            marginTop: "16px",
          }}
          onSubmit={handleSubmit(() => {
            if (formStatus === "allowedNewStep" && step !== 3) {
              setSearchParams((prev) => {
                prev.set("step", (step + 1).toString());
                return prev;
              });
            } else if (formStatus === "allowedNewStep") {
              navigate(withLocale("/profile/my-profile"));
            }
          })}
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
              padding: "10px 16px 64px 16px",
              backgroundColor: theme.palette["White"],
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                trigger();
                handleSubmit(() => {
                  if (formStatus === "allowedNewStep" && step !== 3) {
                    setSearchParams((prev) => {
                      prev.set("step", (step + 1).toString());
                      return prev;
                    });
                  } else if (formStatus === "allowedNewStep") {
                    navigate(withLocale("/profile/my-profile"));
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
