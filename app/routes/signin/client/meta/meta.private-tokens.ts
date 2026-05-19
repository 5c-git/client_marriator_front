import { token } from "brandi";

import type { GetDataSuccess } from "~/api/_personal/getData/getDataSuccess.schema";
import type { GetBrandSuccess } from "~/api/getBrand/getBrandSuccess.schema";
import type { PostDelPlaceSuccess } from "~/api/postDelPlace/postDelPlaceSuccess.schema";
import type { PostDelPlaceError } from "~/api/postDelPlace/postDelPlaceError.schema";
import type { PostSetBrandImgSuccess } from "~/api/postSetBrandImg/postSetBrandImgSuccess.schema";
import type { PostSetBrandImgError } from "~/api/postSetBrandImg/postSetBrandImgError.schema";
import type { PostSetUserDataSuccess } from "~/api/postSetUserData/postSetUserDataSuccess.schema";
import type { PostSetUserDataError } from "~/api/postSetUserData/postSetUserDataError.schema";
import type { PostFinishRegisterSuccess } from "~/api/postFinishRegister/postFinishRegisterSuccess.schema";

export type GetData = (accessToken: string) => Promise<GetDataSuccess>;

export type GetBrand = (accessToken: string) => Promise<GetBrandSuccess>;

export type DelPlace = (
  accessToken: string,
  placeId: string,
) => Promise<PostDelPlaceSuccess | PostDelPlaceError>;

export type SetBrandImg = (
  accessToken: string,
  logo: string,
) => Promise<PostSetBrandImgSuccess | PostSetBrandImgError>;

export type SetUserData = (
  accessToken: string,
  data: { name: string },
) => Promise<PostSetUserDataSuccess | PostSetUserDataError>;

export type FinishRegister = (
  accessToken: string,
) => Promise<PostFinishRegisterSuccess>;

export type GetPersistedFio = () => string;

export type ClearMetaStore = () => void;

export type ClearAppStore = () => void;

export const metaPrivateTokens = {
  getData: token<GetData>("meta-private:getData"),
  getBrand: token<GetBrand>("meta-private:getBrand"),
  delPlace: token<DelPlace>("meta-private:delPlace"),
  setBrandImg: token<SetBrandImg>("meta-private:setBrandImg"),
  setUserData: token<SetUserData>("meta-private:setUserData"),
  postFinishRegister: token<FinishRegister>("meta-private:postFinishRegister"),
  getPersistedFio: token<GetPersistedFio>("meta-private:getPersistedFio"),
  clearMetaStore: token<ClearMetaStore>("meta-private:clearMetaStore"),
  clearAppStore: token<ClearAppStore>("meta-private:clearAppStore"),
};
