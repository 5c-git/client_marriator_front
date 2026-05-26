import { Container } from "brandi";

import { profileMetaContainer } from "../profile-meta.module";
import { profileMetaPrivateTokens } from "../profile-meta.private-tokens";
import { ConfirmPersonalPhoneService } from "./confirm-personal-phone.service";
import { confirmPersonalPhonePrivateTokens } from "./confirm-personal-phone.private-tokens";
import { confirmPersonalPhoneTokens } from "./confirm-personal-phone.tokens";

import { postConfirmChangeUserPhone } from "~/api/_personal/postConfirmChangeUserPhone/postConfirmChangeUserPhone";
import { useStore } from "~/store/store";

export const confirmPersonalPhoneContainer = new Container().extend(
  profileMetaContainer,
);

confirmPersonalPhoneContainer
  .bind(confirmPersonalPhonePrivateTokens.changeUserPhone)
  .toConstant(profileMetaContainer.get(profileMetaPrivateTokens.changeUserPhone));

confirmPersonalPhoneContainer
  .bind(confirmPersonalPhonePrivateTokens.confirmChangeUserPhone)
  .toConstant((accessToken, phone, code) =>
    postConfirmChangeUserPhone(accessToken, phone, code),
  );

confirmPersonalPhoneContainer
  .bind(confirmPersonalPhonePrivateTokens.getUserPhone)
  .toConstant(() => useStore.getState().userPhone);

confirmPersonalPhoneContainer
  .bind(confirmPersonalPhoneTokens.confirmPersonalPhoneService)
  .toInstance(ConfirmPersonalPhoneService)
  .inSingletonScope();
