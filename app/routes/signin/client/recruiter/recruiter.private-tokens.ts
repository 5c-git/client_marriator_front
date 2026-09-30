import { token } from "brandi";

import type { GetPlaceSuccess } from "~/api/getPlace/getPlaceSuccess.schema";
import type { PostSetUserDataSuccess } from "~/api/postSetUserData/postSetUserDataSuccess.schema";
import type { PostSetUserDataError } from "~/api/postSetUserData/postSetUserDataError.schema";
import type { PostFinishRegisterSuccess } from "~/api/postFinishRegister/postFinishRegisterSuccess.schema";

export type GetPlace = (accessToken: string) => Promise<GetPlaceSuccess>;

export type SetUserData = (
  accessToken: string,
  data: { name: string },
) => Promise<PostSetUserDataSuccess | PostSetUserDataError>;

export type FinishRegister = (
  accessToken: string,
) => Promise<PostFinishRegisterSuccess>;

export type ClearAppStore = () => void;

export const recruiterPrivateTokens = {
  getPlace: token<GetPlace>("recruiter-private:getPlace"),
  setUserData: token<SetUserData>("recruiter-private:setUserData"),
  postFinishRegister: token<FinishRegister>(
    "recruiter-private:postFinishRegister",
  ),
  clearAppStore: token<ClearAppStore>("recruiter-private:clearAppStore"),
};
