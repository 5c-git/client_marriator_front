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
import { getAccessToken } from "~/preferences/token/token";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await getForm(accessToken, 1);

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
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await postSaveForm(accessToken, 1, fields);

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Step1() {
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
    reset(generateDefaultValues(formFields));
  }, [formFields, reset]);

  console.log(errors);

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
            text: "Выбери своё направление",
            bold: true,
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
            Наши задания может выполнить{" "}
            <Typography
              component="span"
              variant="Reg_18"
              sx={{
                color: theme.palette["Corp_2"],
              }}
            >
              любой желающий
            </Typography>{" "}
            — они не требуют особых компетенций или опыта.
          </Typography>

          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Grey_2"],
              paddingBottom: "24px",
            }}
          >
            Набор сфер очень широкий — от маркетинга и аналитики до простых
            заданий в общепите и магазинах прямо рядом с вашим домом.
          </Typography>

          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Black"],
              paddingBottom: "24px",
            }}
          >
            Подумай и{" "}
            <Typography
              component="span"
              variant="Reg_14"
              sx={{
                color: theme.palette["Corp_2"],
              }}
            >
              сделай первый шаг.
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
                    navigate("/registration/step2");
                  }
                })();
              }}
            >
              Продолжить
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
