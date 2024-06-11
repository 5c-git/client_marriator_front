import { useEffect } from "react";
import {
  useLoaderData,
  useFetcher,
  useSubmit,
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

import { getRegStep1 } from "~/requests/getRegStep1/getRegStep1";
import { postRegStep1 } from "~/requests/postRegStep1/postRegStep1";

import { useTheme, Box, Typography, Button } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

export async function clientLoader() {
  const data = await getRegStep1();
  return data;
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const fields = await request.json();

  const data = await postRegStep1(fields);

  // if (data) {
  //   throw redirect("/");
  // }

  return data;
}

export default function Step1() {
  const theme = useTheme();

  const submit = useSubmit();
  const fetcher = useFetcher();
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
