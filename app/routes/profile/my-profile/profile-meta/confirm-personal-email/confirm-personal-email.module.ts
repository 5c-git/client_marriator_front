import { Container } from "brandi";

import { profileMetaContainer } from "../profile-meta.module";
import { profileMetaPrivateTokens } from "../profile-meta.private-tokens";
import { ConfirmPersonalEmailService } from "./confirm-personal-email.service";
import { confirmPersonalEmailPrivateTokens } from "./confirm-personal-email.private-tokens";
import { confirmPersonalEmailTokens } from "./confirm-personal-email.tokens";

import { postPersonalCheckEmailCode } from "~/api/_personal/postPersonalCheckEmailCode/postPersonalCheckEmailCode";
import { useStore } from "~/store/store";

export const confirmPersonalEmailContainer = new Container().extend(
  profileMetaContainer,
);

confirmPersonalEmailContainer
  .bind(confirmPersonalEmailPrivateTokens.setPersonalUserEmail)
  .toConstant(profileMetaContainer.get(profileMetaPrivateTokens.setPersonalUserEmail));

confirmPersonalEmailContainer
  .bind(confirmPersonalEmailPrivateTokens.checkPersonalEmailCode)
  .toConstant((accessToken, code) =>
    postPersonalCheckEmailCode(accessToken, code),
  );

confirmPersonalEmailContainer
  .bind(confirmPersonalEmailPrivateTokens.getUserEmail)
  .toConstant(() => useStore.getState().userEmail);

confirmPersonalEmailContainer
  .bind(confirmPersonalEmailTokens.confirmPersonalEmailService)
  .toInstance(ConfirmPersonalEmailService)
  .inSingletonScope();
