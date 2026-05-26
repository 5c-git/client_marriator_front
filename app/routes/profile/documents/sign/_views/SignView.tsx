import { useEffect } from "react";
import { useFetcher } from "react-router";

import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  Button,
  Typography,
  Dialog,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";

import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { S_OrderedList, S_OrderedItem } from "../sign.styled";

type SignDocument = { id: number; file_name: string };

export type SignActionData =
  | null
  | undefined
  | {
      data: null;
      isError: boolean;
      error: string;
    };

type Props = {
  loaderData: SignDocument[];
  isLoading: boolean;

  popupOpen: boolean;
  seconds: number;

  fetcher: ReturnType<typeof useFetcher<SignActionData>>;

  backAction: () => void;
  signAction: () => void;
  sendAgainAction: () => void;
  sendCodeAction: (code: string) => void;
  closePopupAction: () => void;
};

export function SignView({
  loaderData,
  isLoading,
  popupOpen,
  seconds,
  fetcher,
  backAction,
  signAction,
  sendAgainAction,
  sendCodeAction,
  closePopupAction,
}: Props) {
  const { t } = useTranslation("SignView");

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      sms: "",
    },
    resolver: zodResolver(
      z.object({
        sms: z.string().length(4, { error: t("smsError") }),
      }),
    ),
  });

  useEffect(() => {
    if (!popupOpen) {
      reset();
      fetcher.reset();
    }
  }, [popupOpen, reset, fetcher]);

  return (
    <>
      {isLoading ? <Loader /> : null}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={backAction}
        />

        <Box
          sx={{
            display: "grid",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingRight: "16px",
            paddingLeft: "16px",
            flexGrow: 1,
          }}
        >
          {loaderData.length === 0 ? (
            <Typography
              component="h1"
              variant="Reg_18"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
                paddingBottom: "8px",
              })}
            >
              {t("sign_header")}
            </Typography>
          ) : (
            <S_OrderedList>
              {loaderData.map((item) => (
                <S_OrderedItem key={item.id}>{item.file_name}</S_OrderedItem>
              ))}
            </S_OrderedList>
          )}

          {loaderData.length > 0 ? (
            <Button
              sx={{
                marginTop: "auto",
              }}
              variant="contained"
              onClick={signAction}
            >
              {t("button_action")}
            </Button>
          ) : null}
        </Box>
      </Box>

      <Dialog
        open={popupOpen}
        onClose={() => {}}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "8px",
            padding: "16px",
            display: "grid",
            rowGap: "8px",
          },
        }}
      >
        <form
          style={{
            display: "grid",
            rowGap: "4px",
          }}
          onSubmit={handleSubmit((values) => {
            sendCodeAction(values.sms);
          })}
        >
          <Controller
            name="sms"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(evt) => {
                  field.onChange(evt);
                  if (evt.target.value.length === 6) {
                    sendCodeAction(evt.target.value);
                  }
                }}
                label={t("smsPlaceholder")}
                slotProps={{
                  input: {
                    inputComponent: MaskedField as never,
                    inputProps: {
                      mask: "000000",
                    },
                    inputMode: "numeric",
                    type: "tel",
                  },
                }}
              />
            )}
          />
        </form>

        {seconds !== 0 ? (
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              textAlign: "center",
            })}
          >
            {t("timerText")}{" "}
            <Typography
              component="span"
              variant="Bold_12"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {Math.floor(seconds / 60) < 10
                ? `0${Math.floor(seconds / 60)}`
                : Math.floor(seconds / 60)}
              {""}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
            </Typography>
          </Typography>
        ) : null}

        <Button
          type="button"
          variant="text"
          disabled={seconds > 0}
          sx={{
            fontSize: "1rem",
            lineHeight: "1.25rem",
          }}
          onClick={sendAgainAction}
        >
          {t("sendAgainAction")}
        </Button>

        {seconds === 0 ? (
          <Button variant="outlined" onClick={closePopupAction}>
            {t("cancelAction")}
          </Button>
        ) : null}
      </Dialog>

      <Snackbar
        open={fetcher.data && fetcher.data.isError === true ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          fetcher.reset();
        }}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {fetcher.data?.error}
        </Alert>
      </Snackbar>
    </>
  );
}

