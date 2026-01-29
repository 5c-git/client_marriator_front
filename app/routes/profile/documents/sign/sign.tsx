import { useNavigation, useNavigate, useFetcher, redirect } from "react-router";
import { useState, useEffect, useEffectEvent } from "react";
import type { Route } from "./+types/sign";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useStore } from "~/store/store";

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

import { S_OrderedList, S_OrderedItem } from "./sign.styled";

import { getDocumentSigned } from "~/requests/_personal/_documents/getDocumentSigned/getDocumentSigned";

import { postSignedDocument } from "~/requests/_personal/_documents/postSignedDocument/postSignedDocument";
import { postRetriesSms } from "~/requests/_personal/postRetriesSms/postRetriesSms";
import { postSendCode } from "~/requests/_personal/postSendCode/postSendCode";

import { postCreateTestDoc } from "./postCreateTestDoc/postCreateTestDoc";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getDocumentSigned(accessToken);

    return data.data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const accessToken = useStore.getState().accessToken;
  const { _action, ...fields } = await request.json();

  if (accessToken) {
    if (_action === "sign") {
      const data = await postSignedDocument(accessToken);

      if ("success" in data.data) {
        return { data: null, isError: false, error: "" };
      } else if ("error" in data.data) {
        return {
          data: null,
          isError: true,
          error: "Возникла ошибка! Попробуйще повторно позже.",
        };
      }
    } else if (_action === "sendAgain") {
      const data = await postRetriesSms(accessToken);

      if ("success" in data.data) {
        return { data: null, isError: false, error: "" };
      } else if ("error" in data.data) {
        return { data: null, isError: true, error: data.data.error };
      }
    } else if (_action === "sendCode") {
      const data = await postSendCode(accessToken, fields.code);

      if ("success" in data.data) {
        throw redirect(withLocale("/profile/documents/archive"));
      } else if ("error" in data.data) {
        return { data: null, isError: true, error: data.data.error };
      }
    } else if (_action === "test") {
      await postCreateTestDoc(accessToken);
    }
  }
}

export default function Sign({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("sign");
  const navigation = useNavigation();
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof clientAction>();

  const [seconds, setSeconds] = useState<number>(0);
  const [popup, setPopup] = useState<boolean>(false);

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
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const showDialog = useEffectEvent((data: typeof fetcher.data) => {
    if (data) {
      setPopup(true);
    }
  });
  useEffect(() => {
    showDialog(fetcher.data);
  }, [fetcher.data]);

  const startSeconds = useEffectEvent((data: typeof fetcher.data) => {
    if (data && data.isError === false) {
      setSeconds(60);
    }
  });
  useEffect(() => {
    startSeconds(fetcher.data);
  }, [fetcher.data]);

  return (
    <>
      {navigation.state !== "idle" || fetcher.state !== "idle" ? (
        <Loader />
      ) : null}

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
          backAction={() => {
            navigate(withLocale("/profile/documents"), {
              viewTransition: true,
            });
          }}
        />

        {/* <Button
          sx={{
            marginTop: "auto",
          }}
          variant="contained"
          onClick={() => {
            fetcher.submit(JSON.stringify({ _action: "test" }), {
              method: "POST",
              encType: "application/json",
            });
          }}
        >
          _create test doc
        </Button> */}

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
              onClick={() => {
                fetcher.submit(JSON.stringify({ _action: "sign" }), {
                  method: "POST",
                  encType: "application/json",
                });
              }}
            >
              {t("button_action")}
            </Button>
          ) : null}
        </Box>
      </Box>

      <Dialog
        open={popup}
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
            fetcher.submit(
              JSON.stringify({
                _action: "sendCode",
                code: values.sms,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          })}
        >
          <Controller
            name="sms"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  onChange={(evt) => {
                    field.onChange(evt);

                    if (evt.target.value.length === 6) {
                      fetcher.submit(
                        JSON.stringify({
                          _action: "sendCode",
                          code: evt.target.value,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        },
                      );
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
              </>
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
          disabled={seconds > 0 ? true : false}
          sx={{
            fontSize: "1rem",
            lineHeight: "1.25rem",
          }}
          onClick={() => {
            fetcher.submit(
              JSON.stringify({
                _action: "sendAgain",
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          }}
        >
          {t("sendAgainAction")}
        </Button>

        {seconds === 0 ? (
          <Button
            variant="outlined"
            onClick={() => {
              reset();
              fetcher.reset();
              setPopup(false);
            }}
          >
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
