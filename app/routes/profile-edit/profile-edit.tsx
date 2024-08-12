import { useEffect } from "react";
import {
  json,
  useLoaderData,
  useFetcher,
  useNavigate,
  useNavigation,
  // Link,
  ClientActionFunctionArgs,
} from "@remix-run/react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { t } from "i18next";

import { withLocale } from "~/shared/withLocale";

import {
  useTheme,
  Box,
  Button,
  // Typography,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // Divider,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { queryClient } from "~/root";
import { getAccessToken } from "~/preferences/token/token";

import {
  getUserFields,
  getUserFieldsKeys,
} from "~/requests/getUserFields/getUserFields";
import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);

  const accessToken = await getAccessToken();

  const section = currentURL.searchParams.get("section");

  if (accessToken && section) {
    const data = await queryClient.fetchQuery({
      queryKey: [getUserFieldsKeys[0]],
      queryFn: () => getUserFields(accessToken, section),
      staleTime: 60000,
    });

    return json({
      accessToken,
      formFields: data.result.formData,
      formStatus: data.result.type,
    });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function ProfileEdit() {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const fetcher = useFetcher();

  const { accessToken, formFields, formStatus } =
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

  console.log(isDirty);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingBottom: "74px",
        }}
      >
        <TopNavigation
          header={{
            text: "Страница редактирования",
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
              variant="outlined"
              onClick={() => {
                trigger();
                handleSubmit(() => {
                  if (formStatus === "allowedNewStep") {
                    navigate(withLocale("/registration/step4"));
                  }
                })();
              }}
            >
              Сохранить
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                trigger();
                handleSubmit(() => {
                  if (formStatus === "allowedNewStep") {
                    navigate(withLocale("/registration/step4"));
                  }
                })();
              }}
            >
              Сохранить
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
