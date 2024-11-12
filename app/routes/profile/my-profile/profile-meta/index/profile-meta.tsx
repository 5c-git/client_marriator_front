import { useState, useEffect } from "react";
import {
  useLoaderData,
  useFetcher,
  useNavigate,
  useNavigation,
  ClientActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { emailRegExp } from "~/shared/validators";

import {
  Box,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { StyledPhotoInput } from "~/shared/ui/StyledPhotoInput/StyledPhotoInput";
import { StyledEmailField } from "~/shared/ui/StyledEmailField/StyledEmailField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";

import { useStore } from "~/store/store";

import { getUserInfo } from "~/requests/getUserInfo/getUserInfo";
import { postChangeUserPhone } from "~/requests/postChangeUserPhone/postChangeUserPhone";
import { postPersonalSetUserEmail } from "~/requests/postPersonalSetUserEmail/postPersonalSetUserEmail";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const userInfo = await getUserInfo(accessToken);

    return json({
      accessToken,
      id:
        userInfo.result.userData.uuid !== ""
          ? userInfo.result.userData.uuid
          : null,
      photo: userInfo.result.userData.img,
      phone: userInfo.result.userData.phone.toString(),
      email: userInfo.result.userData.email,
    });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const params = new URLSearchParams();
  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;
  const setUserEmail = useStore.getState().setUserEmail;
  const setUserPhone = useStore.getState().setUserPhone;

  if (_action === "reset") {
    return null;
  }

  if (accessToken) {
    if (_action === "changePhoto") {
      return null;
    } else if (_action === "confirmEmail") {
      setUserEmail(fields.email);
      const newEmailData = await postPersonalSetUserEmail(
        accessToken,
        fields.email
      );
      if (newEmailData.status === "error") {
        return json({ error: "emailAlreadyExists" });
      } else {
        params.set("ttl", "120");
        throw redirect(
          withLocale(
            `/profile/my-profile/profile-meta/confirm-personal-email?${params}`
          )
        );
      }
    } else if (_action === "confirmPhone") {
      setUserPhone(fields.phone);
      const newPhoneData = await postChangeUserPhone(accessToken, fields.phone);
      if (newPhoneData.status === "error") {
        return json({ error: "phoneAlreadyExists" });
      } else {
        params.set("ttl", "120");
        throw redirect(
          withLocale(
            `/profile/my-profile/profile-meta/confirm-personal-phone?${params}`
          )
        );
      }
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function ProfileMeta() {
  const { t } = useTranslation("profileMeta");
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [openPhoneDialog, setOpenPhoneDialog] = useState<boolean>(false);
  const [openEmailDialog, setOpenEmailDialog] = useState<boolean>(false);

  const { accessToken, id, photo, phone, email } =
    useLoaderData<typeof clientLoader>();

  const {
    control,
    setValue,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      metaPhoto: photo,
      metaPhone: phone,
      metaEmail: email,
    },
    resolver: yupResolver(
      Yup.object({
        metaPhoto: Yup.string().required(
          t("photo", { ns: "constructorFields" })
        ),
        metaPhone: Yup.string().required(
          t("phone", { ns: "constructorFields" })
        ),
        metaEmail: Yup.string()
          .default("")
          .matches(
            emailRegExp,
            t("email_wrongValue", { ns: "constructorFields" })
          )
          .required(t("email", { ns: "constructorFields" })),
      })
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(
        {
          metaPhoto: photo,
          metaPhone: phone,
          metaEmail: email,
        },
        {
          keepErrors: false,
        }
      );
    });
  }, [photo, phone, email, reset, getValues]);

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
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/my-profile"));
          }}
        />

        <form
          style={{
            display: "grid",
            rowGap: "16px",
          }}
          onSubmit={(evt) => {
            evt.preventDefault();
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "16px",
            }}
          >
            <Controller
              name="metaPhoto"
              control={control}
              render={({ field }) => (
                <StyledPhotoInput
                  inputType="photo"
                  {...field}
                  // @ts-expect-error wrong automatic type narroing
                  onChange={setValue}
                  onImmediateChange={() => {
                    fetcher.submit(
                      JSON.stringify({
                        _action: "changePhoto",
                        email: getValues("metaPhoto"),
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      }
                    );
                  }}
                  validation="default"
                  url={import.meta.env.VITE_SEND_PERSONAL_PHOTO}
                  token={accessToken}
                  // @ts-expect-error wrong automatic type narroing
                  triggerValidation={trigger}
                  error={errors.metaPhoto?.message}
                />
              )}
            />
          </Box>

          {id ? (
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={{ color: (theme) => theme.palette["Grey_2"] }}
              >
                {t("id")}
              </Typography>

              <Typography
                component="p"
                variant="Reg_14"
                sx={{ color: (theme) => theme.palette["Black"] }}
              >
                {id}
              </Typography>
            </Stack>
          ) : null}

          <Controller
            name="metaPhone"
            control={control}
            render={({ field }) => (
              <StyledPhoneField
                inputType="phone"
                placeholder={t("field_phone")}
                onImmediateChange={() => {}}
                validation="default"
                inputStyles={{
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}
                error={errors.metaPhone?.message}
                {...field}
                onBlur={(value) => {
                  if (
                    value !== "" &&
                    value !== phone &&
                    errors.metaPhone === undefined
                  )
                    setOpenPhoneDialog(true);
                }}
              />
            )}
          />

          <Controller
            name="metaEmail"
            control={control}
            render={({ field }) => (
              <StyledEmailField
                inputType="email"
                placeholder="E-mail"
                onImmediateChange={() => {}}
                validation="default"
                inputStyles={{
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}
                error={errors.metaEmail?.message}
                {...field}
                onBlur={(evt) => {
                  if (
                    evt.target.value !== "" &&
                    evt.target.value !== email &&
                    errors.metaEmail === undefined
                  )
                    setOpenEmailDialog(true);
                }}
              />
            )}
          />
        </form>
      </Box>

      <Dialog
        open={openPhoneDialog}
        onClose={() => {
          setOpenPhoneDialog(false);
          setValue("metaPhone", "");
        }}
        sx={{
          "& .MuiDialog-paper": {
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: 0,
          }}
        >
          {t("dialog_phone")}
        </DialogTitle>

        <Button
          variant="contained"
          onClick={() => {
            fetcher.submit(
              JSON.stringify({
                _action: "confirmPhone",
                phone: getValues("metaPhone"),
              }),
              {
                method: "POST",
                encType: "application/json",
              }
            );
            setOpenPhoneDialog(false);
          }}
          sx={{
            marginTop: "16px",
          }}
        >
          {t("dialog_button")}
        </Button>
      </Dialog>

      <Dialog
        open={openEmailDialog}
        onClose={() => {
          setOpenEmailDialog(false);
          setValue("metaEmail", "");
        }}
        sx={{
          "& .MuiDialog-paper": {
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: 0,
          }}
        >
          {t("dialog_email")}
        </DialogTitle>

        <Button
          variant="contained"
          onClick={() => {
            fetcher.submit(
              JSON.stringify({
                _action: "confirmEmail",
                email: getValues("metaEmail"),
              }),
              {
                method: "POST",
                encType: "application/json",
              }
            );
            setOpenEmailDialog(false);
          }}
          sx={{
            marginTop: "16px",
          }}
        >
          {t("dialog_button")}
        </Button>
      </Dialog>

      <Snackbar
        open={fetcher.data?.error ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          fetcher.submit(
            JSON.stringify({
              _action: "reset",
            }),
            {
              method: "POST",
              encType: "application/json",
            }
          );
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
          {fetcher.data?.error === "emailAlreadyExists"
            ? t("error_emailAlreadyExists")
            : t("error_phoneAlreadyExists")}
        </Alert>
      </Snackbar>
    </>
  );
}
