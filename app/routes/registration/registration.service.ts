import { injected } from "brandi";

import {
  GetRegistrationStep,
  PostFields,
  GetUserStaticInfo,
  SaveUserEmail,
  FinishRegistration,
  CheckEmailCode,
  SetUserEmail,
  GetUserEmail,
} from "./registration.private-tokens";

import { registrationPrivateTokens } from "./registration.private-tokens";

import type { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

export class RegistrationService {
  constructor(
    private readonly appService: AppService,
    private readonly getRegistrationStep: GetRegistrationStep,
    private readonly postFields: PostFields,
    private readonly getUserInfo: GetUserStaticInfo,
    private readonly saveUserEmail: SaveUserEmail,
    private readonly finishRegister: FinishRegistration,
    private readonly checkEmailCode: CheckEmailCode,
    private readonly setEmail: SetUserEmail,
    private readonly getUserEmail: GetUserEmail,
  ) {}

  getUserToken() {
    return this.appService.getToken();
  }

  getSavedUserEmail() {
    return this.getUserEmail();
  }

  setUserEmail(email: string) {
    return this.setEmail(email);
  }

  logout() {
    return this.appService.logout();
  }

  async getFieldsForRegistrationStep(step: number) {
    const token = this.appService.getToken();

    return this.getRegistrationStep(token, step);
  }

  async getUserStaticInfo() {
    const token = this.appService.getToken();

    return this.getUserInfo(token);
  }

  async sendFields(step: number, fields: unknown) {
    const token = this.appService.getToken();

    return this.postFields(token, step, fields);
  }

  async sendUserEmail(email: string) {
    const token = this.appService.getToken();

    return this.saveUserEmail(token, email);
  }

  async checkCodeForEmail(code: string) {
    const token = this.appService.getToken();

    return this.checkEmailCode(token, code);
  }

  async finishRegistration() {
    const token = this.appService.getToken();

    return this.finishRegister(token);
  }
}

injected(
  RegistrationService,
  appTokens.appService,
  registrationPrivateTokens.getRegistrationStep,
  registrationPrivateTokens.postFields,
  registrationPrivateTokens.getUserStaticInfo,
  registrationPrivateTokens.saveUserEmail,
  registrationPrivateTokens.finishRegistration,
  registrationPrivateTokens.checkEmailCode,
  registrationPrivateTokens.setUserEmail,
  registrationPrivateTokens.getUserEmail,
);
