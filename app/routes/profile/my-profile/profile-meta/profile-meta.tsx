import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/profile-meta";

import { ProfileMetaView } from "./_views/ProfileMetaView";

import { profileMetaContainer } from "./profile-meta.module";
import { profileMetaTokens } from "./profile-meta.tokens";
import { useProfileMetaHooks } from "./profile-meta.hooks";
import { withLocale } from "~/shared/withLocale";

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

  if (_action === "reset" || _action === "changePhoto") {
    return null;
  }

  if (_action === "confirmEmail") {
    const result = await profileMetaService.confirmEmail(fields.email);

    if (result && "redirectPath" in result) {
      throw redirect(withLocale(result.redirectPath));
    }

    return result;
  }

  if (_action === "confirmPhone") {
    const result = await profileMetaService.confirmPhone(fields.phone);

    if (result && "redirectPath" in result) {
      throw redirect(withLocale(result.redirectPath));
    }

    return result;
  }

  return null;
}

export default function ProfileMeta({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const {
    control,
    setValue,
    trigger,
    errors,
    fetcherData,
    openPhoneDialog,
    openEmailDialog,
    submitPhotoChange,
    confirmPhone,
    confirmEmail,
    resetFetcherError,
    closePhoneDialog,
    closeEmailDialog,
    onPhoneBlur,
    onEmailBlur,
  } = useProfileMetaHooks(loaderData);

  return (
    <ProfileMetaView
      loaderData={loaderData}
      control={control}
      errors={errors}
      setValue={setValue}
      trigger={trigger}
      fetcherData={fetcherData}
      openPhoneDialog={openPhoneDialog}
      openEmailDialog={openEmailDialog}
      onBack={() => {
        navigate(withLocale("/profile/my-profile"));
      }}
      onPhotoChange={submitPhotoChange}
      onPhoneBlur={onPhoneBlur}
      onEmailBlur={onEmailBlur}
      onConfirmPhone={confirmPhone}
      onConfirmEmail={confirmEmail}
      onClosePhoneDialog={closePhoneDialog}
      onCloseEmailDialog={closeEmailDialog}
      onResetFetcherError={resetFetcherError}
    />
  );
}
