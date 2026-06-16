import type { Route } from "./+types/profile-edit";
import { useFetcher, useNavigate } from "react-router";

import { loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";

import { ProfileEditView } from "./_views/ProfileEditView";

import { profileEditContainer } from "./profile-edit.module";
import { profileEditTokens } from "./profile-edit.tokens";

import { withLocale } from "~/shared/withLocale";

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
  const { t } = useTranslation("m_profile_myProfile_profileEdit");
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const headerText = loaderData.currentSection ?? t("sectionHeader");

  return (
    <ProfileEditView
      headerText={headerText}
      formFields={loaderData.formFields}
      accessToken={loaderData.accessToken}
      onBack={() => {
        navigate(withLocale("/profile/my-profile"));
      }}
      onSubmit={(values) => {
        fetcher.submit(JSON.stringify(values), {
          method: "POST",
          encType: "application/json",
        });
      }}
    />
  );
}
