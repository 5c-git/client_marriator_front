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

export default function Step4() {
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
          paddingBottom: "80px",
        }}
      >
        <TopNavigation
          header={{
            text: "Заполни личные данные",
            bold: false,
          }}
          label="Шаг 4"
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
            Нам требуется минимум информации для заключения договора и
            продолжения общения
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
              position: "fixed",
              zIndex: 1,
              width: "100%",
              bottom: "0",
              left: "0",
              padding: "10px 16px 24px 16px",
              backgroundColor: theme.palette["White"],
            }}
          >
            <Button type="submit" variant="contained">
              Продолжить
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
