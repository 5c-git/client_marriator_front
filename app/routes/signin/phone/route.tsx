import {
  useSubmit,
  useNavigation,
  // ClientActionFunctionArgs,
} from "@remix-run/react";

import { t } from "i18next";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneRegExp } from "~/shared/validators";

import { useForm, Controller } from "react-hook-form";

import { Box, Button } from "@mui/material";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { Loader } from "~/shared/ui/Loader/Loader";

import marriator from "./marriator.svg";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, t("Phone.inputValidation", { context: "regExp" }))
    .required(t("Phone.inputValidation")),
});

// export async function clientAction({ request }: ClientActionFunctionArgs) {
//   const fields = await request.json();

//   const data = await request(fields);

//   // if (data) {
//   //   throw redirect("/");
//   // }

//   return data;
// }

export default function Phone() {
  // const theme = useTheme();
  const submit = useSubmit();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "60px",
        }}
      >
        <Box
          sx={{
            width: "164px",
            height: "78px",
            margin: "0 auto",
          }}
        >
          <img
            src={marriator}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            alt="marriator"
          />
        </Box>
        <form
          onSubmit={handleSubmit((values) => {
            submit(JSON.stringify(values), {
              method: "POST",
              encType: "application/json",
            });
          })}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <StyledPhoneField
                inputType="phone"
                error={errors.phone?.message}
                placeholder={t("Phone.inputPlaceholder")}
                onImmediateChange={() => {}}
                styles={{
                  paddingBottom: "16px",
                  paddingTop: "38px",
                }}
                {...field}
              />
            )}
          />

          <Button type="submit" variant="outlined">
            {t("Phone.submitButton")}
          </Button>
        </form>
      </Box>
    </>
  );
}
