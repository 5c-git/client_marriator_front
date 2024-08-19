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

import { t } from "i18next";
import { withLocale } from "~/shared/withLocale";

import { emailRegExp } from "~/shared/validators";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { StyledPhotoInput } from "~/shared/ui/StyledPhotoInput/StyledPhotoInput";
import { StyledEmailField } from "~/shared/ui/StyledEmailField/StyledEmailField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";

import { setUserEmail } from "~/preferences/userEmail/userEmail";
import { setUserPhone } from "~/preferences/userPhone/userPhone";
import { getAccessToken } from "~/preferences/token/token";

import { getUserInfo } from "~/requests/getUserInfo/getUserInfo";
import { postChangeUserPhone } from "~/requests/postChangeUserPhone/postChangeUserPhone";
import { postPersonalSetUserEmail } from "~/requests/postPersonalSetUserEmail/postPersonalSetUserEmail";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const userInfo = await getUserInfo(accessToken);

    return json({
      accessToken,
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
  const accessToken = await getAccessToken();

  if (_action === "reset") {
    return null;
  }

  if (accessToken) {
    if (_action === "changePhoto") {
      return null;
    } else if (_action === "confirmEmail") {
      await setUserEmail(fields.email);
      const newEmailData = await postPersonalSetUserEmail(
        accessToken,
        fields.email,
      );
      if (newEmailData.status === "error") {
        return json({ error: "emailAlreadyExists" });
      } else {
        params.set("ttl", "120");
        throw redirect(withLocale(`/profile/confirm-personal-email?${params}`));
      }
    } else if (_action === "confirmPhone") {
      await setUserPhone(fields.phone);
      const newPhoneData = await postChangeUserPhone(accessToken, fields.phon);
      if (newPhoneData.status === "error") {
        return json({ error: "phoneAlreadyExists" });
      } else {
        params.set("ttl", "120");
        throw redirect(withLocale(`/profile/confirm-personal-phone?${params}`));
      }
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function ProfileMeta() {
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [openPhoneDialog, setOpenPhoneDialog] = useState<boolean>(false);
  const [openEmailDialog, setOpenEmailDialog] = useState<boolean>(false);

  const { accessToken, photo, phone, email } =
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
        metaPhoto: Yup.string().required(t("Constructor.photo")),
        metaPhone: Yup.string().required(t("Constructor.phone")),
        metaEmail: Yup.string()
          .default("")
          .matches(emailRegExp, t("Constructor.email_wrongValue"))
          .required(t("Constructor.email")),
      }),
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
        },
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
            text: t("ProfileMeta.header"),
            bold: false,
          }}
          backAction={() => {
            navigate(-1);
          }}
        />

        <form
          style={{
            display: "grid",
            rowGap: "16px",
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
                      },
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

          <Controller
            name="metaPhone"
            control={control}
            render={({ field }) => (
              <StyledPhoneField
                inputType="phone"
                placeholder="Phone"
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
          {t("ProfileMeta.dialog", { context: "phone" })}
        </DialogTitle>

        <Button
          variant="contained"
          onClick={() => {
            fetcher.submit(
              JSON.stringify({
                _action: "confirmPhone",
                email: getValues("metaPhone"),
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
            setOpenPhoneDialog(false);
          }}
          sx={{
            marginTop: "16px",
          }}
        >
          {t("ProfileMeta.dialog", { context: "button" })}
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
          {t("ProfileMeta.dialog", { context: "email" })}
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
              },
            );
            setOpenEmailDialog(false);
          }}
          sx={{
            marginTop: "16px",
          }}
        >
          {t("ProfileMeta.dialog", { context: "button" })}
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
            },
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
            ? t("ProfileMeta.error_emailAlreadyExists")
            : t("ProfileMeta.error_phoneAlreadyExists")}
        </Alert>
      </Snackbar>
    </>
  );
}
