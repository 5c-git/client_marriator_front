import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";

import type {
  FetchCounterparty,
  FetchModerationSingleSupervisor,
  FetchManagers,
  GetUserRole,
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
import { SupervisorMapper, type SupervisorLoaderData } from "./supervisor.mapper";

export type SupervisorActionPayload =
  | {
      _action: "_confirm";
      userId: number;
      confirm: "1";
      fields: { fields: { [key: string]: unknown } };
    }
  | { _action: "_decline"; userId: number; confirm: "0" }
  | { _action: "_saveLogo"; userId: number; projectId: number }
  | { _action: "_deleteProject"; userId: number; projectId: number }
  | { _action: "_deletePlace"; userId: number; projectId: number }
  | { _action: "_inviteManagers"; userId: number; managers: string[] }
  | { _action: "_deleteManager"; userId: number; managerId: number }
  | { _action: "_setCounterparty"; userId: number; counterparties: string[] }
  | { _action: "_deleteCounterparty"; userId: number; counterpartyId: number };

export class SupervisorService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationSingleSupervisor: FetchModerationSingleSupervisor,
    private readonly fetchCounterparty: FetchCounterparty,
    private readonly fetchManagers: FetchManagers,
    private readonly getRole: GetUserRole,
    private readonly confirmUserRegister: ConfirmUserRegister,
    private readonly setUserImg: SetUserImg,
    private readonly deleteProject: DeleteProject,
    private readonly deletePlaceModeration: DeletePlaceModeration,
    private readonly setManagers: SetManagers,
    private readonly deleteManager: DeleteManager,
    private readonly setCounterparty: SetCounterparty,
    private readonly deleteCounterparty: DeleteCounterparty,
  ) {}

  async getSupervisorData(userId: number): Promise<SupervisorLoaderData> {
    const accessToken = this.appService.getToken();
    const [data, counterpartyData] = await Promise.all([
      this.fetchModerationSingleSupervisor(accessToken, userId),
      this.fetchCounterparty(accessToken),
    ]);

    let managersToSelect: SupervisorLoaderData["managersToSelect"] = [];

    if (this.getRole() === "admin") {
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
      },
      counterparty,
      managersToSelect,
      currentManagers: data.data.manager,
    };
  }

  async handleAction(payload: SupervisorActionPayload) {
    const accessToken = this.appService.getToken();

    switch (payload._action) {
      case "_confirm":
        await this.confirmUserRegister(
          accessToken,
          payload.userId,
          payload.confirm,
          payload.fields,
        );
        return { kind: "redirect", to: "/users" } as const;

      case "_decline":
        await this.confirmUserRegister(accessToken, payload.userId, payload.confirm);
        return { kind: "redirect", to: "/users" } as const;

      case "_saveLogo":
        await this.setUserImg(accessToken, payload.userId, payload.projectId);
        return { kind: "ok" } as const;

      case "_deleteProject":
        await this.deleteProject(accessToken, payload.userId, payload.projectId);
        return { kind: "ok" } as const;

      case "_deletePlace":
        await this.deletePlaceModeration(
          accessToken,
          payload.userId,
          payload.projectId,
        );
        return { kind: "ok" } as const;

      case "_inviteManagers":
        await this.setManagers(accessToken, payload.userId, payload.managers);
        return { kind: "ok" } as const;

      case "_deleteManager":
        await this.deleteManager(accessToken, payload.userId, payload.managerId);
        return { kind: "ok" } as const;

      case "_setCounterparty":
        await this.setCounterparty(
          accessToken,
          payload.userId,
          payload.counterparties,
        );
        return { kind: "ok" } as const;

      case "_deleteCounterparty":
        await this.deleteCounterparty(
          accessToken,
          payload.userId,
          payload.counterpartyId,
        );
        return { kind: "ok" } as const;
    }
  }
}

injected(
  SupervisorService,
  appTokens.appService,
  supervisorPrivateTokens.fetchModerationSingleSupervisor,
  supervisorPrivateTokens.fetchCounterparty,
  supervisorPrivateTokens.fetchManagers,
  supervisorPrivateTokens.getUserRole,
  supervisorPrivateTokens.confirmUserRegister,
  supervisorPrivateTokens.setUserImg,
  supervisorPrivateTokens.deleteProject,
  supervisorPrivateTokens.deletePlaceModeration,
  supervisorPrivateTokens.setManagers,
  supervisorPrivateTokens.deleteManager,
  supervisorPrivateTokens.setCounterparty,
  supervisorPrivateTokens.deleteCounterparty,
);
