import {
  useNavigation,
  useNavigate,
  useFetcher,
  redirect,
  useSearchParams,
} from "react-router";
import { useState, useEffect } from "react";
import type { Route } from "./+types/sign";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useStore } from "~/store/store";

import { Button, Typography, Dialog, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";

import { S_OrderedList, S_OrderedItem } from "./sign.styled";

import { getDocumentSigned } from "~/requests/_personal/_documents/getDocumentSigned/getDocumentSigned";

import { postSignedDocument } from "~/requests/_personal/_documents/postSignedDocument/postSignedDocument";
import { postRetriesSms } from "~/requests/_personal/postRetriesSms/postRetriesSms";
import { postSendCode } from "~/requests/_personal/postSendCode/postSendCode";
import { getSignedDocument } from "~/requests/_personal/getSignedDocument/getSignedDocument";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getDocumentSigned(accessToken);

    return data.result;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const accessToken = useStore.getState().accessToken;
  const currentURL = new URL(request.url);
  const { _action, ...fields } = await request.json();

  if (accessToken) {
    if (_action === "sign") {
      const data = await postSignedDocument(accessToken);

      if ("error" in data.data) {
        currentURL.searchParams.set("error", "error");
        throw redirect(currentURL.toString());
      }
    } else if (_action === "sendAgain") {
      const data = await postRetriesSms(accessToken);

      if ("error" in data.data) {
        currentURL.searchParams.set("error", "error");
        throw redirect(currentURL.toString());
      }
    } else if (_action === "sendCode") {
      const data = await postSendCode(accessToken, fields.code);

      if ("success" in data.data) {
        throw redirect(withLocale("/profile/documents/archive"));
      } else if ("error" in data.data) {
        currentURL.searchParams.set("error", "error");
        throw redirect(currentURL.toString());
      }
    }
  }
}

export default function Sign({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("sign");
  const navigation = useNavigation();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const error = searchParams.get("error");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

  useEffect(() => {
    if (error) {
      setSeconds(0);
    }
  }, [error]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          height: "100%",
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

        <Box
          sx={{
            display: "grid",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingRight: "16px",
            paddingLeft: "16px",
            height: "calc(100% - 56px)",
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
                <S_OrderedItem key={item.id}>{item.name}</S_OrderedItem>
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
                setOpenDialog(true);
                setSeconds(60);
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
        open={openDialog}
        onClose={() => {
          // setOpenDialog(false);
        }}
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
              <StyledSmsField
                inputType="sms"
                error={errors.sms?.message}
                placeholder={t("smsPlaceholder")}
                onImmediateChange={handleSubmit((values) => {
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
                {...field}
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
              setOpenDialog(false);
            }}
          >
            {t("cancelAction")}
          </Button>
        ) : null}
      </Dialog>

      <Snackbar
        open={error ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          setSearchParams((prev) => {
            prev.delete("error");
            return prev;
          });
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
          {t("error")}
        </Alert>
      </Snackbar>
    </>
  );
}
