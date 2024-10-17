import {
  useSubmit,
  ClientActionFunctionArgs,
  useSearchParams,
  redirect,
} from "@remix-run/react";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneRegExp } from "~/shared/validators";

import { useForm, Controller } from "react-hook-form";

import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import Box from "@mui/material-pigment-css/Box";

import marriator from "./marriator.svg";

import { useStore } from "~/store/store";

import { postSendPhone } from "~/requests/postSendPhone/postSendPhone";

const setUserPhone = useStore.getState().setUserPhone;

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);
  const params = new URLSearchParams();

  const fields = await request.json();
  setUserPhone(fields.phone);

  const data = await postSendPhone(fields.phone);

  if (data.result.code.status !== "errorSend") {
    params.set("ttl", data.result.code.ttl.toString());
    params.set("type", data.result.type);

    throw redirect(withLocale(`/signin/sms?${params}`));
  } else {
    currentURL.searchParams.set("error", "error");

    throw redirect(currentURL.toString());
  }
}

export default function Phone() {
  const { t } = useTranslation("phone");

  const submit = useSubmit();

  const [searchParams, setSearchParams] = useSearchParams();

  const error = searchParams.get("error");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        phone: Yup.string()
          .matches(phoneRegExp, t("inputValidation_regExp"))
          .required(t("inputValidation")),
      })
    ),
  });

  return (
    // <>
    //   <Box
    //     sx={{
    //       paddingRight: "16px",
    //       paddingLeft: "16px",
    //       paddingTop: "60px",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         width: "164px",
    //         height: "78px",
    //         margin: "0 auto",
    //       }}
    //     >
    //       <img
    //         src={marriator}
    //         style={{
    //           height: "100%",
    //           width: "100%",
    //           objectFit: "cover",
    //         }}
    //         alt="marriator"
    //       />
    //     </Box>

    //     <form
    //       onSubmit={handleSubmit((values) => {
    //         submit(JSON.stringify(values), {
    //           method: "POST",
    //           encType: "application/json",
    //         });
    //       })}
    //     >
    //       <Controller
    //         name="phone"
    //         control={control}
    //         render={({ field }) => (
    //           <TextField
    //             placeholder={t("inputPlaceholder")}
    //             sx={{
    //               paddingBottom: "16px",
    //               paddingTop: "38px",
    //             }}
    //             {...field}
    //           />
    //         )}
    //       />

    //       <Button type="submit" variant="outlined">
    //         {t("submitButton")}
    //       </Button>
    //     </form>
    //   </Box>

    //   <Snackbar
    //     open={error !== null ? true : false}
    //     onClose={() => {
    //       setSearchParams("");
    //     }}
    //     autoHideDuration={3000}
    //   >
    //     <Alert
    //       severity="info"
    //       variant="small"
    //       color="Banner_Error"
    //       sx={{
    //         width: "100%",
    //       }}
    //     >
    //       {error}
    //     </Alert>
    //   </Snackbar>
    // </>

    <>
      <Button variant="contained">button</Button>
      <p>this is test</p>
    </>
  );
}
