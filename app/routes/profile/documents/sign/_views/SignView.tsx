import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button, Typography, Dialog, TextField } from "@mui/material";
import Box from "@mui/material/Box";

import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

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
  data: SignDocument[];
  popupOpen: boolean;
  seconds: number;

  backAction: () => void;
  signAction: () => void;
  sendAgainAction: () => void;
  sendCodeAction: (code: string) => void;
  closePopupAction: () => void;
};

export function SignView(props: Props) {
  const { t } = useTranslation("m_profile_documents_sign");

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      sms: "",
    },
    resolver: zodResolver(
      z.object({
        sms: z.string().length(6, { error: t("smsError") }),
      }),
    ),
  });

  return (
    <>
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
          backAction={props.backAction}
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
          {props.data.length === 0 ? (
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
              {props.data.map((item) => (
                <S_OrderedItem key={item.id}>{item.file_name}</S_OrderedItem>
              ))}
            </S_OrderedList>
          )}

          {props.data.length > 0 ? (
            <Button
              sx={{
                marginTop: "auto",
              }}
              variant="contained"
              onClick={props.signAction}
            >
              {t("button_action")}
            </Button>
          ) : null}
        </Box>
      </Box>

      <Dialog
        open={props.popupOpen}
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
            props.sendCodeAction(values.sms);
            reset();
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
                    props.sendCodeAction(evt.target.value);
                    reset();
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

        {props.seconds !== 0 ? (
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
              {Math.floor(props.seconds / 60) < 10
                ? `0${Math.floor(props.seconds / 60)}`
                : Math.floor(props.seconds / 60)}
              {""}:
              {props.seconds % 60 < 10
                ? `0${props.seconds % 60}`
                : props.seconds % 60}
            </Typography>
          </Typography>
        ) : null}

        <Button
          type="button"
          variant="text"
          disabled={props.seconds > 0}
          sx={{
            fontSize: "1rem",
            lineHeight: "1.25rem",
          }}
          onClick={props.sendAgainAction}
        >
          {t("sendAgainAction")}
        </Button>

        {props.seconds === 0 ? (
          <Button variant="outlined" onClick={props.closePopupAction}>
            {t("cancelAction")}
          </Button>
        ) : null}
      </Dialog>
    </>
  );
}
