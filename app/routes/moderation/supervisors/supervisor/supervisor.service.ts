import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";

import type {
  FetchCounterparty,
  FetchModerationSingleSupervisor,
  FetchManagers,
  ConfirmUserRegister,
  SetUserImg,
  DeleteProject,
  DeletePlaceModeration,
  SetManagers,
  DeleteManager,
  SetCounterparty,
  DeleteCounterparty,
} from "./supervisor.private-tokens";

import { appTokens } from "~/shared/container/container.tokens";
import { supervisorPrivateTokens } from "./supervisor.private-tokens";
import { SupervisorMapper, type SupervisorData } from "./supervisor.mapper";

import { SUPERVISOR_ACTIONS } from "./supervisor";

export type SupervisorActionPayload =
  | {
      _action: typeof SUPERVISOR_ACTIONS.confirm;
      userId: number;
      confirm: "1";
      fields: { fields: unknown };
    }
  | { _action: typeof SUPERVISOR_ACTIONS.decline; userId: number; confirm: "0" }
  | {
      _action: typeof SUPERVISOR_ACTIONS.saveLogo;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof SUPERVISOR_ACTIONS.deleteProject;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof SUPERVISOR_ACTIONS.deletePlace;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof SUPERVISOR_ACTIONS.inviteManagers;
      userId: number;
      managers: string[];
    }
  | {
      _action: typeof SUPERVISOR_ACTIONS.deleteManager;
      userId: number;
      managerId: number;
    }
  | {
      _action: typeof SUPERVISOR_ACTIONS.setCounterparty;
      userId: number;
      counterparties: string[];
    }
  | {
      _action: typeof SUPERVISOR_ACTIONS.deleteCounterparty;
      userId: number;
      counterpartyId: number;
    };

export class SupervisorService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationSingleSupervisor: FetchModerationSingleSupervisor,
    private readonly fetchCounterparty: FetchCounterparty,
    private readonly fetchManagers: FetchManagers,
    private readonly confirmUserRegister: ConfirmUserRegister,
    private readonly setUserImg: SetUserImg,
    private readonly deleteProject: DeleteProject,
    private readonly deletePlaceModeration: DeletePlaceModeration,
    private readonly setManagers: SetManagers,
    private readonly deleteManager: DeleteManager,
    private readonly setCounterparty: SetCounterparty,
    private readonly deleteCounterparty: DeleteCounterparty,
  ) {}

  async getSupervisorData(userId: number): Promise<SupervisorData> {
    const accessToken = this.appService.getToken();
    const userRole = this.appService.getUserRole();

    const [data, counterpartyData] = await Promise.all([
      this.fetchModerationSingleSupervisor(accessToken, userId),
      this.fetchCounterparty(accessToken),
    ]);

    let managersToSelect: SupervisorData["managersToSelect"] = [];

    if (this.appService.getUserRole() === "admin") {
      const managersData = await this.fetchManagers(accessToken, userId);
      managersToSelect = SupervisorMapper.mapManagersToSelect(managersData);
    }

    const counterparty = SupervisorMapper.mapCounterparty(counterpartyData);
    const currentCounterparty = SupervisorMapper.mapCurrentCounterparty(data);
    const organizations = SupervisorMapper.mapOrganizations(data);
    const locations = SupervisorMapper.mapLocations(data);
    const status = SupervisorMapper.mapStatus(data);

    return {
      client: {
        id: data.data.id,
        logo: data.data.logo,
        phone: data.data.phone.toString(),
        name: data.data.name,
        counterparty: currentCounterparty,
        organizations,
        locations,
        repeat_bid: data.data.repeat_bid,
        leave_bid: data.data.leave_bid,
        live_task: data.data.live_task,
        waiting_task: data.data.waiting_task,
        refusal_task: data.data.refusal_task,
        count_wait_bid: data.data.count_wait_bid,
        time_answer_bid: data.data.time_answer_bid,
        notification_start: data.data.notification_start,
        confirmRegister: data.data.confirmRegister,
        status,
        userRole,
      },
      counterparty,
      managersToSelect,
      currentManagers: data.data.manager,
    };
  }

  async handleAction(payload: SupervisorActionPayload) {
    const accessToken = this.appService.getToken();

    switch (payload._action) {
      case SUPERVISOR_ACTIONS.confirm:
        return await this.confirmUserRegister(
          accessToken,
          payload.userId,
          payload.confirm,
          { fields: payload.fields },
        );

      case SUPERVISOR_ACTIONS.decline:
        return await this.confirmUserRegister(
          accessToken,
          payload.userId,
          payload.confirm,
        );

      case SUPERVISOR_ACTIONS.saveLogo:
        return await this.setUserImg(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case SUPERVISOR_ACTIONS.deleteProject:
        return await this.deleteProject(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case SUPERVISOR_ACTIONS.deletePlace:
        return await this.deletePlaceModeration(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case SUPERVISOR_ACTIONS.inviteManagers:
        return this.setManagers(accessToken, payload.userId, payload.managers);

      case SUPERVISOR_ACTIONS.deleteManager:
        return await this.deleteManager(
          accessToken,
          payload.userId,
          payload.managerId,
        );

      case SUPERVISOR_ACTIONS.setCounterparty:
        return await this.setCounterparty(
          accessToken,
          payload.userId,
          payload.counterparties,
        );

      case SUPERVISOR_ACTIONS.deleteCounterparty:
        return await this.deleteCounterparty(
          accessToken,
          payload.userId,
          payload.counterpartyId,
        );
    }
  }
}

injected(
  SupervisorService,
  appTokens.appService,
  supervisorPrivateTokens.fetchModerationSingleSupervisor,
  supervisorPrivateTokens.fetchCounterparty,
  supervisorPrivateTokens.fetchManagers,
  supervisorPrivateTokens.confirmUserRegister,
  supervisorPrivateTokens.setUserImg,
  supervisorPrivateTokens.deleteProject,
  supervisorPrivateTokens.deletePlaceModeration,
  supervisorPrivateTokens.setManagers,
  supervisorPrivateTokens.deleteManager,
  supervisorPrivateTokens.setCounterparty,
  supervisorPrivateTokens.deleteCounterparty,
);
