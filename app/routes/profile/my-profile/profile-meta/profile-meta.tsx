import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/profile-meta";

import { useTranslation } from "react-i18next";

import { ProfileMetaView } from "./_views/ProfileMetaView";

import { profileMetaContainer } from "./profile-meta.module";
import { profileMetaTokens } from "./profile-meta.tokens";
import { useProfileMetaHooks } from "./profile-meta.hooks";
import { withLocale } from "~/shared/withLocale";
import { Alert, Snackbar } from "@mui/material";

export const PROFILE_META_ACTIONS = {
  changePhoto: "changePhoto",
  confirmPhone: "confirmPhone",
  confirmEmail: "confirmEmail",
  reset: "reset",
} as const;

export async function clientLoader() {
  return await profileMetaContainer
    .get(profileMetaTokens.profileMetaService)
    .loadProfileMeta();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const profileMetaService = profileMetaContainer.get(
    profileMetaTokens.profileMetaService,
  );

  if (
    _action === PROFILE_META_ACTIONS.reset ||
    _action === PROFILE_META_ACTIONS.changePhoto
  ) {
    return null;
  }

  if (_action === PROFILE_META_ACTIONS.confirmEmail) {
    const result = await profileMetaService.confirmEmail(fields.email);

    if (result && "redirectPath" in result) {
      throw redirect(withLocale(result.redirectPath));
    }

    return result;
  }

  if (_action === PROFILE_META_ACTIONS.confirmPhone) {
    const result = await profileMetaService.confirmPhone(fields.phone);

    if (result && "redirectPath" in result) {
      throw redirect(withLocale(result.redirectPath));
    }

    return result;
  }

  return null;
}

export default function ProfileMeta({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_profile_myProfile_profileMeta");
  const navigate = useNavigate();
  const hooks = useProfileMetaHooks(loaderData);

  return (
    <>
      <ProfileMetaView
        data={loaderData}
        form={hooks.form}
        fetcherData={hooks.fetcherData}
        openPhoneDialog={hooks.openPhoneDialog}
        openEmailDialog={hooks.openEmailDialog}
        onBack={() => {
          navigate(withLocale("/profile/my-profile"));
        }}
        onPhotoChange={hooks.submitPhotoChange}
        onPhoneBlur={hooks.onPhoneBlur}
        onEmailBlur={hooks.onEmailBlur}
        onConfirmPhone={hooks.confirmPhone}
        onConfirmEmail={hooks.confirmEmail}
        onClosePhoneDialog={hooks.closePhoneDialog}
        onCloseEmailDialog={hooks.closeEmailDialog}
        onResetFetcherError={hooks.resetFetcherError}
      />

      <Snackbar
        open={hooks.fetcherData?.error ? true : false}
        autoHideDuration={3000}
        onClose={hooks.resetFetcherError}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {hooks.fetcherData?.error === "emailAlreadyExists"
            ? t("error_emailAlreadyExists")
            : t("error_phoneAlreadyExists")}
        </Alert>
      </Snackbar>
    </>
  );
}
