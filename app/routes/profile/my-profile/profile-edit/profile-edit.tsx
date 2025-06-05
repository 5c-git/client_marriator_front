import { useEffect } from "react";
import { useFetcher, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/profile-edit";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

import { useStore } from "~/store/store";

import { getUserFields } from "~/requests/_personal/getUserFields/getUserFields";
import { postSaveUserFields } from "~/requests/_personal/postSaveUserFields/postSaveUserFields";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await loadNamespaces("profileEdit");

  const currentURL = new URL(request.url);

  const accessToken = useStore.getState().accessToken;

  const section = currentURL.searchParams.get("section");

  if (accessToken && section) {
    const data = await getUserFields(accessToken, section);

    const curentSection = data.result.section.find(
      (item) => item.value === Number(section)
    );

    return {
      accessToken,
      formFields: data.result.formData,
      currentSection:
        curentSection !== undefined
          ? curentSection.name
          : t("sectionHeader", { ns: "profileEdit" }),
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await postSaveUserFields(accessToken, fields);

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function ProfileEdit({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("profileEdit");
  const navigate = useNavigate();
  const navigation = useNavigation();

  const fetcher = useFetcher();

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
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
          paddingBottom: "92px",
        }}
      >
        <TopNavigation
          header={{
            text: loaderData.currentSection,
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/my-profile"), {
              viewTransition: true,
            });
          }}
        />

        {loaderData.formFields.length > 0 ? (
          <form
            style={{
              display: "grid",
              rowGap: "16px",
              paddingTop: "26px",
            }}
            onSubmit={handleSubmit(() => {
              fetcher.submit(JSON.stringify(getValues()), {
                method: "POST",
                encType: "application/json",
              });
            })}
          >
            {generateInputsMarkup(
              loaderData.formFields,
              errors,
              control,
              setValue,
              trigger,
              () => {},
              loaderData.accessToken
            )}

            <Box
              style={{
                "--opacity": isDirty ? 1 : 0,
                "--pointerEvents": isDirty ? "auto" : "none",
              }}
              sx={(theme) => ({
                position: "fixed",
                display: "flex",
                columnGap: "8px",
                zIndex: 1,
                width: "100%",
                bottom: "54px",
                left: "0",
                padding: "21px 16px 21px 16px",
                backgroundColor: theme.vars.palette["White"],
                transition: "0.3s",
                opacity: "var(--opacity)",
                pointerEvents: "var(--pointerEvents)",
              })}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  reset(generateDefaultValues(loaderData.formFields));
                }}
              >
                {t("button_cancel")}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  trigger();
                  handleSubmit(() => {
                    fetcher.submit(JSON.stringify(getValues()), {
                      method: "POST",
                      encType: "application/json",
                    });
                  })();
                }}
              >
                {t("button_confirm")}
              </Button>
            </Box>
          </form>
        ) : (
          <Typography
            component="p"
            variant="Reg_18"
            sx={{
              color: (theme) => theme.vars.palette["Black"],
              textAlign: "center",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "16px",
            }}
          >
            {t("emptyFields")}
          </Typography>
        )}
      </Box>
    </>
  );
}
