import { token } from "brandi";

import type { GetCounterpartySuccess } from "~/api/_personal/_moderation/getCounterparty/getCounterpartySuccess.schema";
import type { GetModerationSingleClientSuccess } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClientSuccess.schema";
import type { PostConfirmUserRegisterSuccess } from "~/api/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegisterSuccess.schema";
import type { PostSetCounterpartySuccess } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterpartySuccess.schema";
import type { PostDeleteCounterpartySuccess } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterpartySuccess.schema";

export type FetchModerationSingleClient = (
  accessToken: string,
  userId: number,
) => Promise<GetModerationSingleClientSuccess>;

export type FetchCounterparty = (
  accessToken: string,
) => Promise<GetCounterpartySuccess>;

export type ConfirmUserRegister = (
  accessToken: string,
  userId: number,
  confirm: string,
  fields?: unknown,
) => Promise<PostConfirmUserRegisterSuccess>;

export type SetUserImg = (
  accessToken: string,
  userId: number,
  projectId: number,
) => Promise<unknown>;

export type DeleteProject = (
  accessToken: string,
  userId: number,
  projectId: number,
) => Promise<unknown>;

export type DeletePlaceModeration = (
  accessToken: string,
  userId: number,
  projectId: number,
) => Promise<unknown>;

export type SetCounterparty = (
  accessToken: string,
  userId: number,
  counterparties: string[],
) => Promise<PostSetCounterpartySuccess>;

export type DeleteCounterparty = (
  accessToken: string,
  userId: number,
  counterpartyId: number,
) => Promise<PostDeleteCounterpartySuccess>;

export const clientPrivateTokens = {
  fetchModerationSingleClient: token<FetchModerationSingleClient>(
    "users-client-private:fetchModerationSingleClient",
  ),
  fetchCounterparty: token<FetchCounterparty>(
    "users-client-private:fetchCounterparty",
  ),
  confirmUserRegister: token<ConfirmUserRegister>(
    "users-client-private:confirmUserRegister",
  ),
  setUserImg: token<SetUserImg>("users-client-private:setUserImg"),
  deleteProject: token<DeleteProject>("users-client-private:deleteProject"),
  deletePlaceModeration: token<DeletePlaceModeration>(
    "users-client-private:deletePlaceModeration",
  ),
  setCounterparty: token<SetCounterparty>(
    "users-client-private:setCounterparty",
  ),
  deleteCounterparty: token<DeleteCounterparty>(
    "users-client-private:deleteCounterparty",
  ),
};

