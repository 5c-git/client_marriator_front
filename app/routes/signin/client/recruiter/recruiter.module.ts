import { Container } from "brandi";

import { getPlace } from "~/api/getPlace/getPlace";
import { postSetUserData } from "~/api/postSetUserData/postSetUserData";
import { postFinishRegister } from "~/api/postFinishRegister/postFinishRegister";
import { useStore } from "~/store/store";

import { RecruiterService } from "./recruiter.service";
import { recruiterPrivateTokens } from "./recruiter.private-tokens";
import { recruiterTokens } from "./recruiter.tokens";

import { appContainer } from "~/shared/container/container";

export const recruiterContainer = new Container().extend(appContainer);

recruiterContainer.bind(recruiterPrivateTokens.getPlace).toConstant(getPlace);
recruiterContainer
  .bind(recruiterPrivateTokens.setUserData)
  .toConstant(postSetUserData);
recruiterContainer
  .bind(recruiterPrivateTokens.postFinishRegister)
  .toConstant(postFinishRegister);
recruiterContainer
  .bind(recruiterPrivateTokens.clearAppStore)
  .toConstant(() => useStore.getState().clearStore);

recruiterContainer
  .bind(recruiterTokens.recruiterService)
  .toInstance(RecruiterService)
  .inSingletonScope();
