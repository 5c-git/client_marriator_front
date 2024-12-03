import {
  useNavigation,
  useNavigate,
  useLoaderData,
  useSubmit,
  ClientActionFunctionArgs,
} from "react-router";

import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { useTheme, Box, Button, Typography } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";
import { getDocumentConclude } from "~/requests/getDocumentConclude/getDocumentConclude";
import { postSetConclude } from "~/requests/postSetConclude/postSetConclude";

export const generateDefaultValues = (
  items: { uuid: string; name: string }[]
) => {
  const defaultValues: {
    [key: string]: boolean;
  } = {};

  items.forEach((item) => {
    defaultValues[item.uuid] = false;
  });

  return defaultValues;
};

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getDocumentConclude(accessToken);

    return data.result.organization;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    await postSetConclude(accessToken, fields);

    return null;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function SignADeal() {
  const { t } = useTranslation("signADeal");
  const theme = useTheme();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();

  const data = useLoaderData<typeof clientLoader>();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: generateDefaultValues(data),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          height: "100%",
        }}
      >
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/documents"));
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingRight: "16px",
            paddingLeft: "16px",
            height: "calc(100% - 56px)",
          }}
        >
          <Typography
            component="h1"
            variant="Reg_18"
            sx={{
              color: theme.palette["Black"],
              paddingBottom: "8px",
            }}
          >
            {t("sign_header")}
          </Typography>

          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Grey_2"],
              paddingBottom: "18px",
            }}
          >
            {t("sign_text")}
          </Typography>

          <form
            onSubmit={handleSubmit((values) => {
              const chekedValues: string[] = [];

              for (const key in values) {
                if (values[key] === true) {
                  chekedValues.push(key);
                }
              }

              submit(JSON.stringify(chekedValues), {
                method: "POST",
                encType: "application/json",
              });
            })}
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              overflow: "auto",
              position: "relative",
              paddingBottom: "45px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                // height: "100%",
                overflow: "auto",
              }}
            >
              {" "}
              {data.map((item) => (
                <Controller
                  key={item.name}
                  name={item.uuid}
                  control={control}
                  render={({ field }) => (
                    <StyledCheckbox
                      inputType="checkbox"
                      validation="none"
                      onImmediateChange={() => {}}
                      label={item.name}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              ))}
            </Box>

            <Button
              sx={{
                marginTop: "auto",
                position: "absolute",
                bottom: 0,
              }}
              variant="contained"
              type="submit"
              disabled={!isDirty}
            >
              {t("button_action")}
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
