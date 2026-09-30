import { token } from "brandi";

import type { GetBikSuccess } from "~/api/_personal/getBik/getBikSuccess.schema";
import type { GetRequisitesDataSuccess } from "~/api/_personal/getRequisitesData/getRequisitesDataSuccess.schema";
import type { PostDeleteRequisiteSuccess } from "~/api/_personal/postDeleteRequisite/postDeleteRequisiteSuccess.schema";
import type { PostSaveRequisitesDataSuccess } from "~/api/_personal/postSaveRequisitesData/postSaveRequisitesDataSuccess.schema";

export type FetchRequisitesDataCached = (
  accessToken: string,
) => Promise<GetRequisitesDataSuccess>;

export type FetchBik = (accessToken: string) => Promise<GetBikSuccess>;

export type SaveRequisitesData = (
  accessToken: string,
  formData: unknown,
  dataId: number,
) => Promise<PostSaveRequisitesDataSuccess>;

export type DeleteRequisite = (
  accessToken: string,
  dataId: number,
) => Promise<PostDeleteRequisiteSuccess>;

export const billingPrivateTokens = {
  fetchRequisitesDataCached: token<FetchRequisitesDataCached>(
    "billing-private:fetchRequisitesDataCached",
  ),
  fetchBik: token<FetchBik>("billing-private:fetchBik"),
  saveRequisitesData: token<SaveRequisitesData>(
    "billing-private:saveRequisitesData",
  ),
  deleteRequisite: token<DeleteRequisite>("billing-private:deleteRequisite"),
};
