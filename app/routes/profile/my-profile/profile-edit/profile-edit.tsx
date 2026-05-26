import type { Route } from "./+types/profile-edit";

import { loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";

import { ProfileEditView } from "./_views/ProfileEditView";
import { Loader } from "~/shared/ui/Loader/Loader";

import { profileEditContainer } from "./profile-edit.module";
import { profileEditTokens } from "./profile-edit.tokens";
import { useProfileEditHooks } from "./profile-edit.hooks";
import { useAppHooks } from "~/shared/hooks/app.hooks";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await loadNamespaces("profileEdit");

  const section = new URL(request.url).searchParams.get("section");

  if (!section) {
    throw new Response("Секция не указана", { status: 400 });
  }

  return await profileEditContainer
    .get(profileEditTokens.profileEditService)
    .loadProfileEdit(section);
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();

  return await profileEditContainer
    .get(profileEditTokens.profileEditService)
    .saveProfileFields(fields);
}

export default function ProfileEdit({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("profileEdit");
  const { navigateTo, isLoading } = useAppHooks();
  const {
    control,
    setValue,
    trigger,
    errors,
    isDirty,
    handleSubmit,
    submitForm,
    resetForm,
    confirmForm,
  } = useProfileEditHooks(loaderData);

  const headerText = loaderData.currentSection ?? t("sectionHeader");

  return (
    <>
      {isLoading ? <Loader /> : null}

      <ProfileEditView
        headerText={headerText}
        formFields={loaderData.formFields}
        accessToken={loaderData.accessToken}
        errors={errors}
        control={control}
        isDirty={isDirty}
        setValue={setValue}
        trigger={trigger}
        onBack={() => {
          navigateTo("/profile/my-profile");
        }}
        onSubmit={handleSubmit(submitForm)}
        onCancel={resetForm}
        onConfirm={confirmForm}
      />
    </>
  );
}
