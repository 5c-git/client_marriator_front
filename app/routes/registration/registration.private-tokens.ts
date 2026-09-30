import { token } from "brandi";

import type { GetFormInputsSuccess } from "~/api/getForm/getForm.schema";
import type { GetStaticUserInfoSuccess } from "~/api/getStaticUserInfo/getStaticUserInfo.schema";

import type { PostSaveFormSuccess } from "~/api/postSaveForm/postSaveFormSuccess.schema";
import type { PostSetUserEmailSuccess } from "~/api/_personal/postSetUserEmail/postSetUserEmailSuccess.schema";
import type { PostCheckEmailCodeSuccess } from "~/api/postCheckEmailCode/postCheckEmailCodeSuccess.schema";
import type { PostFinishRegisterSuccess } from "~/api/postFinishRegister/postFinishRegisterSuccess.schema";
import { PostCheckEmailCodeError } from "~/api/postCheckEmailCode/postCheckEmailCodeError.schema";
import { PostSetUserEmailError } from "~/api/_personal/postSetUserEmail/postSetUserEmailError.schema";

export type GetRegistrationStep = (
  accessToken: string,
  step: number,
) => Promise<GetFormInputsSuccess>;

export type PostFields = (
  accessToken: string,
  step: number,
  fields: unknown,
) => Promise<PostSaveFormSuccess>;

export type GetUserStaticInfo = (
  accessToken: string,
) => Promise<GetStaticUserInfoSuccess>;

export type SaveUserEmail = (
  accessToken: string,
  email: string,
) => Promise<PostSetUserEmailSuccess | PostSetUserEmailError>;

export type FinishRegistration = (
  accessToken: string,
) => Promise<PostFinishRegisterSuccess>;

export type CheckEmailCode = (
  accessToken: string,
  code: string,
) => Promise<PostCheckEmailCodeSuccess | PostCheckEmailCodeError>;

export type SetUserEmail = (email: string) => void;
export type GetUserEmail = () => null | string;

export const registrationPrivateTokens = {
  getRegistrationStep: token<GetRegistrationStep>(
    "registration-private:getRegistrationStep",
  ),
  postFields: token<PostFields>("registration-private:postFields"),
  getUserStaticInfo: token<GetUserStaticInfo>(
    "registration-private:getUserStaticInfo",
  ),
  saveUserEmail: token<SaveUserEmail>("registration-private:saveUserEmail"),
  finishRegistration: token<FinishRegistration>(
    "registration-private:finishRegistration",
  ),
  checkEmailCode: token<CheckEmailCode>("registration-private:checkEmailCode"),
  setUserEmail: token<SetUserEmail>("registration-private:setUserEmail"),
  getUserEmail: token<GetUserEmail>("registration-private:getUserEmail"),
};
