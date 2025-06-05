import { useEffect } from "react";
import {
  useFetcher,
  useNavigation,
  useNavigate,
  // redirect,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/user-activities";
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

import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { getFormActivities } from "~/requests/_personal/getFormActivities/getFormActivities";
import { postSaveUserFieldsActivities } from "~/requests/_personal/postSaveUserFieldsActivities/postSaveUserFieldsActivities";

import { useStore } from "~/store/store";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
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

export async function clientAction({ request }: Route.ClientActionArgs) {
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

export default function UserActivities({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("userActivities");

  const fetcher = useFetcher();
  const navigation = useNavigation();
  const navigate = useNavigate();

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
    defaultValues: generateDefaultValues(loaderData.formFields),
    resolver: yupResolver(
      Yup.object(generateValidationSchema(loaderData.formFields))
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(generateDefaultValues(loaderData.formFields));
    });
  }, [loaderData.formFields, reset]);

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
              navigate(withLocale("/profile/my-profile"), {
                viewTransition: true,
              });
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
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
                paddingBottom: "14px",
              })}
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
            if (loaderData.formStatus === "allowedNewStep" && step !== 3) {
              setSearchParams((prev) => {
                prev.set("step", (step + 1).toString());
                return prev;
              });
            } else if (loaderData.formStatus === "allowedNewStep") {
              navigate(withLocale("/profile/my-profile"), {
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
            loaderData.accessToken
          )}

          <Box
            sx={(theme) => ({
              position: "fixed",
              zIndex: 1,
              width: "100%",
              bottom: "0",
              left: "0",
              padding: "10px 16px 64px 16px",
              backgroundColor: theme.vars.palette["White"],
            })}
          >
            <Button
              variant="contained"
              onClick={() => {
                trigger();
                handleSubmit(() => {
                  if (
                    loaderData.formStatus === "allowedNewStep" &&
                    step !== 3
                  ) {
                    setSearchParams((prev) => {
                      prev.set("step", (step + 1).toString());
                      return prev;
                    });
                  } else if (loaderData.formStatus === "allowedNewStep") {
                    navigate(withLocale("/profile/my-profile"), {
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
    </>
  );
}
