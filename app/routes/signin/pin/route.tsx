import {
  useSubmit,
  useNavigation,
  Link,
  // ClientActionFunctionArgs,
} from "@remix-run/react";

import { t } from "i18next";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import { Box, Typography, Snackbar, Alert, useTheme } from "@mui/material";
import { StyledOptField } from "~/shared/ui/StyledOtpField/StyledOtpField";
import { Loader } from "~/shared/ui/Loader/Loader";

const validationSchema = Yup.object().shape({
  pin: Yup.string().min(4).max(4).required(),
});

// export async function clientAction({ request }: ClientActionFunctionArgs) {
//   const fields = await request.json();

//   const data = await request(fields);

//   // if (data) {
//   //   throw redirect("/");
//   // }

//   return data;
// }

export default function Pin() {
  const theme = useTheme();
  const submit = useSubmit();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pin: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingTop: "38px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <Typography
          component="p"
          variant="Bold_28"
          sx={{
            color: theme.palette["Black"],
            textAlign: "center",
            paddingBottom: "8px",
          }}
        >
          {t("Pin.header")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_18"
          sx={{
            color: theme.palette["Black"],
            textAlign: "center",
            paddingBottom: "37px",
          }}
        >
          {t("Pin.intro")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={{
            color: theme.palette["Black"],
            textAlign: "center",
            paddingBottom: "20px",
          }}
        >
          {t("Pin.text")}
        </Typography>

        <form
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Controller
            name="pin"
            control={control}
            render={({ field }) => (
              <StyledOptField
                error={errors.pin ? true : false}
                onComplete={() => {
                  handleSubmit((values) => {
                    submit(JSON.stringify(values), {
                      method: "POST",
                      encType: "application/json",
                    });
                  })();
                }}
                {...field}
              />
            )}
          />
        </form>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            columnGap: "10px",
            paddingTop: "20px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_16"
            sx={{
              color: theme.palette["Black"],
            }}
          >
            {t("Pin.forgetPin")}
          </Typography>

          <Link
            to="/signin/phone"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              component="p"
              variant="Bold_16"
              sx={{
                color: theme.palette["Corp_1"],
              }}
            >
              {t("Pin.restorePin")}
            </Typography>
          </Link>
        </Box>
      </Box>

      <Snackbar open={errors.pin ? true : false} autoHideDuration={3000}>
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t("Pin.pinError")}
        </Alert>
      </Snackbar>
    </>
  );
}
