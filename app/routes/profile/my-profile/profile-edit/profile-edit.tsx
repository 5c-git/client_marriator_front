import { useEffect } from "react";
import {
  useLoaderData,
  useFetcher,
  useNavigate,
  useNavigation,
  ClientActionFunctionArgs,
} from "@remix-run/react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { useTheme, Box, Button, Typography } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

import { useStore } from "~/store/store";

import { getUserFields } from "~/requests/getUserFields/getUserFields";
import { postSaveUserFields } from "~/requests/postSaveUserFields/postSaveUserFields";

export async function clientLoader({ request }: ClientActionFunctionArgs) {
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

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await postSaveUserFields(accessToken, fields);

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function ProfileEdit() {
  const { t } = useTranslation("profileEdit");
  const theme = useTheme();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const fetcher = useFetcher();

  const { accessToken, formFields, currentSection } =
    useLoaderData<typeof clientLoader>();

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
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
          paddingBottom: "92px",
        }}
      >
        <TopNavigation
          header={{
            text: currentSection,
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/my-profile"));
          }}
        />

        {formFields.length > 0 ? (
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
              formFields,
              errors,
              control,
              setValue,
              trigger,
              () => {},
              accessToken
            )}

            <Box
              sx={{
                position: "fixed",
                display: "flex",
                columnGap: "8px",
                zIndex: 1,
                width: "100%",
                bottom: "54px",
                left: "0",
                padding: "21px 16px 21px 16px",
                backgroundColor: theme.palette["White"],
                transition: "0.3s",
                opacity: isDirty ? 1 : 0,
                pointerEvents: isDirty ? "auto" : "none",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  reset(generateDefaultValues(formFields));
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
              color: (theme) => theme.palette["Black"],
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
