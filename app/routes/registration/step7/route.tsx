import { useEffect } from "react";
import {
  useLoaderData,
  useFetcher,
  useSubmit,
  useNavigate,
  useNavigation,
  ClientActionFunctionArgs,
} from "@remix-run/react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

import { getRegStep2 } from "~/requests/getRegStep2/getRegStep2";
import { postRegStep2 } from "~/requests/postRegStep2/postRegStep2";

import { useTheme, Box, Typography, Button } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

export async function clientLoader() {
  const data = await getRegStep2();
  return data;
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const fields = await request.json();

  const data = await postRegStep2(fields);

  // if (data) {
  //   throw redirect("/");
  // }

  return data;
}

export default function Step7() {
  const theme = useTheme();

  const submit = useSubmit();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const data = useLoaderData<typeof clientLoader>();

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: generateDefaultValues(data.inputs),
    resolver: yupResolver(Yup.object(generateValidationSchema(data.inputs))),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    reset(generateDefaultValues(data.inputs));
  }, [data.inputs, reset]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingBottom: "21px",
        }}
      >
        <TopNavigation
          header={{
            text: "Подпиши договор",
            bold: false,
          }}
          label="Шаг 7"
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
            Оформи отношения и начни получать задания
          </Typography>
        </Box>

        <form
          onSubmit={handleSubmit((values) => {
            submit(JSON.stringify(values), {
              method: "POST",
              encType: "application/json",
            });
            alert("Форма корректно заполнена");
          })}
          style={{
            display: "grid",
            rowGap: "16px",
          }}
        >
          {generateInputsMarkup(
            data.inputs,
            errors,
            control,
            setValue,
            trigger,
            () => {
              fetcher.submit(JSON.stringify(getValues()), {
                method: "POST",
                encType: "application/json",
              });
            }
          )}

          <Box
            sx={{
              display: "grid",
              rowGap: "10px",
              paddingTop: "14px",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <Button type="submit" variant="contained">
              Подписать договор
            </Button>

            <Typography
              component="p"
              variant="Reg_12"
              sx={{
                color: theme.palette["Black"],
              }}
            >
              Нажатие кнопки «Подписать договор» означает согласие с политикой в
              отношении{" "}
              <Typography
                component="a"
                title="legal"
                href="/legal"
                variant="Reg_12"
                sx={{
                  color: theme.palette["Corp_1"],
                  textDecoration: "underline",
                }}
              >
                персональных данных
              </Typography>{" "}
              и{" "}
              <Typography
                component="a"
                variant="Reg_12"
                title="agreement"
                href="/agreement"
                sx={{
                  color: theme.palette["Corp_1"],
                  textDecoration: "underline",
                }}
              >
                пользовательским соглашением
              </Typography>
              .
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
}
