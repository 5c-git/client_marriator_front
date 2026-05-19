
import type { Route } from "./+types/my-profile";

import { MyProfileView } from "./_views/MyProfileView";
import { Loader } from "~/shared/ui/Loader/Loader";

import { myProfileContainer } from "./my-profile.module";
import { myProfileTokens } from "./my-profile.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";

export async function clientLoader() {
  return await myProfileContainer
    .get(myProfileTokens.myProfileService)
    .loadMyProfile();
}

export default function MyProfile({ loaderData }: Route.ComponentProps) {
  const { isLoading, navigateTo } = useAppHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <MyProfileView
        translation="myProfile"
        loaderData={loaderData}
        onBack={() => {
          navigateTo("/profile");
        }}
      />
    </>
  );
}
