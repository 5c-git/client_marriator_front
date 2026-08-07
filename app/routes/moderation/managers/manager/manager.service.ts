import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";

import type {
  FetchCounterparty,
  FetchModerationSingleManager,
  FetchSupervisors,
  ConfirmUserRegister,
  SetUserImg,
  DeleteProject,
  DeletePlaceModeration,
  SetSupervisors,
  DeleteSupervisor,
  SetCounterparty,
  DeleteCounterparty,
} from "./manager.private-tokens";

import { appTokens } from "~/shared/container/container.tokens";
import { managerPrivateTokens } from "./manager.private-tokens";
import { ManagerData, ManagerMapper } from "./manager.mapper";

import { MANAGER_ACTIONS } from "./manager";

export type ManagerActionPayload =
  | {
      _action: typeof MANAGER_ACTIONS.confirm;
      userId: number;
      confirm: "1";
      fields: { fields: unknown };
    }
  | { _action: typeof MANAGER_ACTIONS.decline; userId: number; confirm: "0" }
  | {
      _action: typeof MANAGER_ACTIONS.saveLogo;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof MANAGER_ACTIONS.deleteProject;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof MANAGER_ACTIONS.deletePlace;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof MANAGER_ACTIONS.inviteSupervisors;
      userId: number;
      supervisors: string[];
    }
  | {
      _action: typeof MANAGER_ACTIONS.deleteSupervisor;
      userId: number;
      supervisorId: number;
    }
  | {
      _action: typeof MANAGER_ACTIONS.setCounterparty;
      userId: number;
      counterparties: string[];
    }
  | {
      _action: typeof MANAGER_ACTIONS.deleteCounterparty;
      userId: number;
      counterpartyId: number;
    };

export class ManagerService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationSingleManager: FetchModerationSingleManager,
    private readonly fetchCounterparty: FetchCounterparty,
    private readonly fetchSupervisors: FetchSupervisors,
    private readonly confirmUserRegister: ConfirmUserRegister,
    private readonly setUserImg: SetUserImg,
    private readonly deleteProject: DeleteProject,
    private readonly deletePlaceModeration: DeletePlaceModeration,
    private readonly setSupervisors: SetSupervisors,
    private readonly deleteSupervisor: DeleteSupervisor,
    private readonly setCounterparty: SetCounterparty,
    private readonly deleteCounterparty: DeleteCounterparty,
  ) {}

  async getManagerData(userId: number): Promise<ManagerData> {
    const accessToken = this.appService.getToken();
    const userRole = this.appService.getUserRole();
    const [data, supervisorsData, counterpartyData] = await Promise.all([
      this.fetchModerationSingleManager(accessToken, userId),
      this.fetchSupervisors(accessToken, userId),
      this.fetchCounterparty(accessToken),
    ]);

    const counterparty = ManagerMapper.mapCounterparty(counterpartyData);

    const currentCounterparty = ManagerMapper.mapCurrentCounterparty(data);

    const organizations = ManagerMapper.mapOrganizations(data);

    const locations = ManagerMapper.mapLocations(data);

    const supervisorsToSelect =
      ManagerMapper.mapSupervisorsToSelect(supervisorsData);

    const organizationsToSelect = ManagerMapper.mapRadioButtons(organizations);

    const status = ManagerMapper.mapStatus(data);

    return {
      client: {
        id: data.data.id,
        logo: data.data.logo,
        phone: data.data.phone.toString(),
        name: data.data.name,
        counterparty: currentCounterparty,
        organizations,
        locations,
        change_task: data.data.change_task,
        cancel_task: data.data.cancel_task,
        live_task: data.data.live_task,
        repeat_bid: data.data.repeat_bid,
        leave_bid: data.data.leave_bid,
        notification_start: data.data.notification_start.toString(),
        confirmRegister: data.data.confirmRegister,
        status,
        userRole,
      },
      counterparty,
      supervisorsToSelect,
      organizationsToSelect,
      currentSupervisors: data.data.supervisors,
    };
  }

  async handleAction(payload: ManagerActionPayload) {
    const accessToken = this.appService.getToken();

    switch (payload._action) {
      case MANAGER_ACTIONS.confirm:
        return await this.confirmUserRegister(
          accessToken,
          payload.userId,
          payload.confirm,
          { fields: payload.fields },
        );

      case MANAGER_ACTIONS.decline:
        return await this.confirmUserRegister(
          accessToken,
          payload.userId,
          payload.confirm,
        );

      case MANAGER_ACTIONS.saveLogo:
        return await this.setUserImg(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case MANAGER_ACTIONS.deleteProject:
        return await this.deleteProject(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case MANAGER_ACTIONS.deletePlace:
        return await this.deletePlaceModeration(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case MANAGER_ACTIONS.inviteSupervisors:
        return await this.setSupervisors(
          accessToken,
          payload.userId,
          payload.supervisors,
        );

      case MANAGER_ACTIONS.deleteSupervisor:
        return await this.deleteSupervisor(
          accessToken,
          payload.userId,
          payload.supervisorId,
        );

      case MANAGER_ACTIONS.setCounterparty:
        return await this.setCounterparty(
          accessToken,
          payload.userId,
          payload.counterparties,
        );

      case MANAGER_ACTIONS.deleteCounterparty:
        return await this.deleteCounterparty(
          accessToken,
          payload.userId,
          payload.counterpartyId,
        );
    }
  }
}

injected(
  ManagerService,
  appTokens.appService,
  managerPrivateTokens.fetchModerationSingleManager,
  managerPrivateTokens.fetchCounterparty,
  managerPrivateTokens.fetchSupervisors,
  managerPrivateTokens.confirmUserRegister,
  managerPrivateTokens.setUserImg,
  managerPrivateTokens.deleteProject,
  managerPrivateTokens.deletePlaceModeration,
  managerPrivateTokens.setSupervisors,
  managerPrivateTokens.deleteSupervisor,
  managerPrivateTokens.setCounterparty,
  managerPrivateTokens.deleteCounterparty,
);
