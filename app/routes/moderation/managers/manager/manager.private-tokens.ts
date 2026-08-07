import { token } from "brandi";

import type { GetCounterpartySuccess } from "~/api/_personal/_moderation/getCounterparty/getCounterpartySuccess.schema";
import type { GetModerationSingleClientSuccess } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClientSuccess.schema";
import type { GetSupervisorsSuccess } from "~/api/_personal/_moderation/getSupervisors/getSupervisorsSuccess.schema";
import type { PostConfirmUserRegisterSuccess } from "~/api/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegisterSuccess.schema";
import type { PostSetSupervisorsSuccess } from "~/api/_personal/_moderation/postSetSupervisors/postSetSupervisorsSuccess.schema";
import type { PostDeleteCounterpartySuccess } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterpartySuccess.schema";
import type { PostDeleteCounterpartyError } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterpartyError.schema";
import type { PostSetCounterpartySuccess } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterpartySuccess.schema";
import type { PostSetCounterpartyError } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterpartyError.schema";

export type FetchModerationSingleManager = (
  accessToken: string,
  userId: number,
) => Promise<GetModerationSingleClientSuccess>;

export type FetchCounterparty = (
  accessToken: string,
) => Promise<GetCounterpartySuccess>;

export type FetchSupervisors = (
  accessToken: string,
  userId: number,
) => Promise<GetSupervisorsSuccess>;

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

export type SetSupervisors = (
  accessToken: string,
  userId: number,
  supervisors: string[],
) => Promise<PostSetSupervisorsSuccess>;

export type DeleteSupervisor = (
  accessToken: string,
  userId: number,
  supervisorId: number,
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

export const managerPrivateTokens = {
  fetchModerationSingleManager: token<FetchModerationSingleManager>(
    "users-manager-private:fetchModerationSingleManager",
  ),
  fetchCounterparty: token<FetchCounterparty>(
    "users-manager-private:fetchCounterparty",
  ),
  fetchSupervisors: token<FetchSupervisors>(
    "users-manager-private:fetchSupervisors",
  ),
  confirmUserRegister: token<ConfirmUserRegister>(
    "users-manager-private:confirmUserRegister",
  ),
  setUserImg: token<SetUserImg>("users-manager-private:setUserImg"),
  deleteProject: token<DeleteProject>("users-manager-private:deleteProject"),
  deletePlaceModeration: token<DeletePlaceModeration>(
    "users-manager-private:deletePlaceModeration",
  ),
  setSupervisors: token<SetSupervisors>("users-manager-private:setSupervisors"),
  deleteSupervisor: token<DeleteSupervisor>(
    "users-manager-private:deleteSupervisor",
  ),
  setCounterparty: token<SetCounterparty>(
    "users-manager-private:setCounterparty",
  ),
  deleteCounterparty: token<DeleteCounterparty>(
    "users-manager-private:deleteCounterparty",
  ),
};
