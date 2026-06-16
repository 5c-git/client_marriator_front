import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
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
  data: ProfileMetaLoaderData;
  form: UseFormReturn<ProfileMetaFormValues>;
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
  const { t } = useTranslation("m_profile_myProfile_profileMeta");

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
              control={props.form.control}
              render={({ field }) => (
                <StyledPhotoInput
                  inputType="photo"
                  {...field}
                  // @ts-expect-error wrong automatic type narroing
                  onChange={props.form.setValue}
                  onImmediateChange={props.onPhotoChange}
                  validation="default"
                  url={import.meta.env.VITE_SEND_PERSONAL_PHOTO}
                  token={props.data.accessToken}
                  // @ts-expect-error wrong automatic type narroing
                  triggerValidation={props.trigger}
                  error={props.form.formState.errors.metaPhoto?.message}
                />
              )}
            />
          </Box>

          {props.data.id ? (
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
                {props.data.id}
              </Typography>
            </Stack>
          ) : null}

          <Controller
            name="metaPhone"
            control={props.form.control}
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
                error={props.form.formState.errors.metaPhone?.message}
                {...field}
                onBlur={props.onPhoneBlur}
              />
            )}
          />

          <Controller
            name="metaEmail"
            control={props.form.control}
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
                error={props.form.formState.errors.metaEmail?.message}
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
    </>
  );
}
