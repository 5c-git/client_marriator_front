import { Container } from "brandi";

import { postSendPhone } from "~/api/postSendPhone/postSendPhone";
import { postCheckCode } from "~/api/postCheckCode/postCheckCode";
import { useStore } from "~/store/store";

import { SmsService } from "./sms.service";
import { smsPrivateTokens } from "./sms.private-tokens";
import { smsTokens } from "./sms.tokens";

export const smsContainer = new Container();

smsContainer.bind(smsPrivateTokens.sendPhone).toConstant(postSendPhone);
smsContainer.bind(smsPrivateTokens.checkCode).toConstant(postCheckCode);
smsContainer
  .bind(smsPrivateTokens.getUserPhone)
  .toConstant(() => useStore.getState().userPhone);
smsContainer
  .bind(smsPrivateTokens.rememberAccessToken)
  .toConstant(useStore.getState().setAccessToken);
smsContainer
  .bind(smsPrivateTokens.rememberRefreshToken)
  .toConstant(useStore.getState().setRefreshToken);

smsContainer
  .bind(smsTokens.smsService)
  .toInstance(SmsService)
  .inSingletonScope();
