import { useEffect } from "react";
import {
  json,
  useLoaderData,
  useFetcher,
  useNavigate,
  useNavigation,
  ClientActionFunctionArgs,
} from "@remix-run/react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { t } from "i18next";

import { useTheme, Box, Button } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

import { getAccessToken } from "~/preferences/token/token";

import { getUserFields } from "~/requests/getUserFields/getUserFields";
import { postSaveUserFields } from "~/requests/postSaveUserFields/postSaveUserFields";

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);

  const accessToken = await getAccessToken();

  const section = currentURL.searchParams.get("section");

  if (accessToken && section) {
    const data = await getUserFields(accessToken, section);

    const curentSection = data.result.section.find(
      (item) => item.value === Number(section)
    );

    return json({
      accessToken,
      formFields: data.result.formData,
      currentSection:
        curentSection !== undefined
          ? curentSection.name
          : t("ProfileEdit.sectionHeader"),
    });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const fields = await request.json();
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await postSaveUserFields(accessToken, fields);

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function ProfileEdit() {
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
            navigate(-1);
          }}
        />

        <form
          style={{
            display: "grid",
            rowGap: "16px",
            paddingTop: "26px",
          }}
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
              {t("ProfileEdit.button_cancel")}
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
              {t("ProfileEdit.button_confirm")}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}