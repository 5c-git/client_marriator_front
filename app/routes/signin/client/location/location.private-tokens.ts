import { token } from "brandi";

import type { GetDataSuccess } from "~/api/_personal/getData/getDataSuccess.schema";
import type { GetPlaceSuccess } from "~/api/getPlace/getPlaceSuccess.schema";
import type { PostSetPlaceSuccess } from "~/api/postSetPlace/postSetPlaceSuccess.schema";
import type { PostSetPlaceError } from "~/api/postSetPlace/postSetPlaceError.schema";
import type { AppService } from "~/shared/container/container.service";

export type GetData = (accessToken: string) => Promise<GetDataSuccess>;

export type GetPlace = (accessToken: string) => Promise<GetPlaceSuccess>;

export type SetPlace = (
  accessToken: string,
  placeIds: string[],
) => Promise<PostSetPlaceSuccess | PostSetPlaceError>;

export const locationPrivateTokens = {
  getData: token<GetData>("location-private:getData"),
  getPlace: token<GetPlace>("location-private:getPlace"),
  setPlace: token<SetPlace>("location-private:setPlace")
};
