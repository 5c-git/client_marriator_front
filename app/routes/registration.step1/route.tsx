import { useLoaderData } from "@remix-run/react";
import { queryClient } from "~/root";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

import {
  getRegStep1,
  getRegStep1Keys,
} from "~/requests/getRegStep1/getRegStep1";

import { useTheme, Box, Typography, Button } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

export async function clientLoader() {
  const data = await queryClient.fetchQuery({
    queryKey: getRegStep1Keys,
    queryFn: getRegStep1,
  });

  return data;
}

export default function Step1() {
  const theme = useTheme();
  const data = useLoaderData<typeof clientLoader>();

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: generateDefaultValues(data.inputs),
    resolver: yupResolver(Yup.object(generateValidationSchema(data.inputs))),
    mode: "onChange",
  });

  return (
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
          variant="Reg_18"
          sx={{
            color: theme.palette["Black"],
            paddingBottom: "24px",
          }}
        >
          Подумай и{" "}
          <Typography
            component="span"
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
          console.log(values);
          alert("Форма корректно заполнена");
        })}
        style={{
          display: "grid",
          rowGap: "16px",
        }}
      >
        {generateInputsMarkup(data.inputs, errors, control, setValue, trigger)}

        <Box
          sx={{
            position: "fixed",
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
  );
}
