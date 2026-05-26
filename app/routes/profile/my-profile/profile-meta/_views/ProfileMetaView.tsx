import { Controller } from "react-hook-form";
import type { Control, FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledPhotoInput } from "~/shared/ui/StyledPhotoInput/StyledPhotoInput";
import { StyledEmailField } from "~/shared/ui/StyledEmailField/StyledEmailField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";

import type {
  ProfileMetaActionError,
  ProfileMetaFormValues,
  ProfileMetaLoaderData,
} from "../profile-meta.service";

type ProfileMetaViewProps = {
  loaderData: ProfileMetaLoaderData;
  control: Control<ProfileMetaFormValues>;
  errors: FieldErrors<ProfileMetaFormValues>;
  setValue: UseFormSetValue<ProfileMetaFormValues>;
  trigger: UseFormTrigger<ProfileMetaFormValues>;
  fetcherData?: ProfileMetaActionError | null;
  openPhoneDialog: boolean;
  openEmailDialog: boolean;
  onBack: () => void;
  onPhotoChange: () => void;
  onPhoneBlur: (value: string) => void;
  onEmailBlur: (value: string) => void;
  onConfirmPhone: () => void;
  onConfirmEmail: () => void;
  onClosePhoneDialog: () => void;
  onCloseEmailDialog: () => void;
  onResetFetcherError: () => void;
};

export function ProfileMetaView(props: ProfileMetaViewProps) {
  const { t } = useTranslation("profileMeta");

  return (
    <>
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
          backAction={props.onBack}
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
              control={props.control}
              render={({ field }) => (
                <StyledPhotoInput
                  inputType="photo"
                  {...field}
                  // @ts-expect-error wrong automatic type narroing
                  onChange={props.setValue}
                  onImmediateChange={props.onPhotoChange}
                  validation="default"
                  url={import.meta.env.VITE_SEND_PERSONAL_PHOTO}
                  token={props.loaderData.accessToken}
                  // @ts-expect-error wrong automatic type narroing
                  triggerValidation={props.trigger}
                  error={props.errors.metaPhoto?.message}
                />
              )}
            />
          </Box>

          {props.loaderData.id ? (
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={{ color: (theme) => theme.vars.palette["Grey_2"] }}
              >
                {t("id")}
              </Typography>

              <Typography
                component="p"
                variant="Reg_14"
                sx={{ color: (theme) => theme.vars.palette["Black"] }}
              >
                {props.loaderData.id}
              </Typography>
            </Stack>
          ) : null}

          <Controller
            name="metaPhone"
            control={props.control}
            render={({ field }) => (
              <StyledPhoneField
                inputType="phone"
                placeholder={t("field_phone")}
                onImmediateChange={() => {}}
                validation="default"
                inputStyle={{
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}
                error={props.errors.metaPhone?.message}
                {...field}
                onBlur={props.onPhoneBlur}
              />
            )}
          />

          <Controller
            name="metaEmail"
            control={props.control}
            render={({ field }) => (
              <StyledEmailField
                inputType="email"
                placeholder="E-mail"
                onImmediateChange={() => {}}
                validation="default"
                inputStyle={{
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}
                error={props.errors.metaEmail?.message}
                {...field}
                onBlur={(evt) => {
                  props.onEmailBlur(evt.target.value);
                }}
              />
            )}
          />
        </form>
      </Box>

      <Dialog
        open={props.openPhoneDialog}
        onClose={props.onClosePhoneDialog}
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
          onClick={props.onConfirmPhone}
          sx={{
            marginTop: "16px",
          }}
        >
          {t("dialog_button")}
        </Button>
      </Dialog>

      <Dialog
        open={props.openEmailDialog}
        onClose={props.onCloseEmailDialog}
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
          onClick={props.onConfirmEmail}
          sx={{
            marginTop: "16px",
          }}
        >
          {t("dialog_button")}
        </Button>
      </Dialog>

      <Snackbar
        open={props.fetcherData?.error ? true : false}
        autoHideDuration={3000}
        onClose={props.onResetFetcherError}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {props.fetcherData?.error === "emailAlreadyExists"
            ? t("error_emailAlreadyExists")
            : t("error_phoneAlreadyExists")}
        </Alert>
      </Snackbar>
    </>
  );
}
