import { token } from "brandi";

import type { State } from "~/store/store";
import type { GetCounterpartySuccess } from "~/api/_personal/_moderation/getCounterparty/getCounterpartySuccess.schema";
import type { GetModerationSingleClientSuccess } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClientSuccess.schema";
import type { GetManagerSuccess } from "~/api/_personal/getManager/getManagerSuccess.schema";
import type { PostConfirmUserRegisterSuccess } from "~/api/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegisterSuccess.schema";
import type { PostDeleteCounterpartySuccess } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterpartySuccess.schema";
import type { PostDeleteCounterpartyError } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterpartyError.schema";
import type { PostSetCounterpartySuccess } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterpartySuccess.schema";
import type { PostSetCounterpartyError } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterpartyError.schema";

export type FetchModerationSingleSupervisor = (
  accessToken: string,
  userId: number,
) => Promise<GetModerationSingleClientSuccess>;

export type FetchCounterparty = (
  accessToken: string,
) => Promise<GetCounterpartySuccess>;

export type FetchManagers = (
  accessToken: string,
  userId: number,
) => Promise<GetManagerSuccess>;

export type ConfirmUserRegister = (
  accessToken: string,
  userId: number,
  confirm: string,
  fields?: { fields: { [key: string]: unknown } },
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

export type SetManagers = (
  accessToken: string,
  userId: number,
  managers: string[],
) => Promise<unknown>;

export type DeleteManager = (
  accessToken: string,
  userId: number,
  managerId: number,
) => Promise<unknown>;

export type SetCounterparty = (
  accessToken: string,
  userId: number,
  counterparties: string[],
) => Promise<PostSetCounterpartySuccess | PostSetCounterpartyError>;

export type DeleteCounterparty = (
  accessToken: string,
  userId: number,
  counterpartyId: number,
) => Promise<PostDeleteCounterpartySuccess | PostDeleteCounterpartyError>;

export const supervisorPrivateTokens = {
  fetchModerationSingleSupervisor: token<FetchModerationSingleSupervisor>(
    "users-supervisor-private:fetchModerationSingleSupervisor",
  ),
  fetchCounterparty: token<FetchCounterparty>(
    "users-supervisor-private:fetchCounterparty",
  ),
  fetchManagers: token<FetchManagers>("users-supervisor-private:fetchManagers"),
  confirmUserRegister: token<ConfirmUserRegister>(
    "users-supervisor-private:confirmUserRegister",
  ),
  setUserImg: token<SetUserImg>("users-supervisor-private:setUserImg"),
  deleteProject: token<DeleteProject>("users-supervisor-private:deleteProject"),
  deletePlaceModeration: token<DeletePlaceModeration>(
    "users-supervisor-private:deletePlaceModeration",
  ),
  setManagers: token<SetManagers>("users-supervisor-private:setManagers"),
  deleteManager: token<DeleteManager>("users-supervisor-private:deleteManager"),
  setCounterparty: token<SetCounterparty>(
    "users-supervisor-private:setCounterparty",
  ),
  deleteCounterparty: token<DeleteCounterparty>(
    "users-supervisor-private:deleteCounterparty",
  ),
};
