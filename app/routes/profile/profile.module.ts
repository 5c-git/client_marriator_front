import { Container } from "brandi";

import { queryClient } from "~/shared/queryClient";
import { useStore } from "~/store/store";

import { appContainer } from "~/shared/container/container";

import { ProfileService } from "./profile.service";
import { profilePrivateTokens } from "./profile.private-tokens";
import { profileTokens } from "./profile.tokens";

import {
  getUserInfo,
  getUserInfoKeys,
} from "~/api/_personal/getUserInfo/getUserInfo";
import { getData } from "~/api/_personal/getData/getData";

export const profileContainer = new Container().extend(appContainer);

profileContainer
  .bind(profilePrivateTokens.fetchUserInfoCached)
  .toConstant((accessToken) =>
    queryClient.fetchQuery({
      queryKey: [getUserInfoKeys[0]],
      queryFn: () => getData(accessToken),
      staleTime: 5000,
    }),
  );

profileContainer
  .bind(profilePrivateTokens.clearAppStore)
  .toConstant(useStore.getState().clearStore);

profileContainer
  .bind(profilePrivateTokens.invalidateUserInfoQueries)
  .toConstant(() => {
    queryClient.invalidateQueries({
      queryKey: [getUserInfoKeys[0]],
      refetchType: "none",
    });
  });

profileContainer
  .bind(profileTokens.profileService)
  .toInstance(ProfileService)
  .inSingletonScope();
