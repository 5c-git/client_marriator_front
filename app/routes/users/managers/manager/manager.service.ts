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
import { ManagerMapper } from "./manager.mapper";

export type ManagerActionPayload =
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
  | { _action: "_inviteSupervisors"; userId: number; supervisors: string[] }
  | { _action: "_deleteSupervisor"; userId: number; supervisorId: number }
  | { _action: "_setCounterparty"; userId: number; counterparties: string[] }
  | { _action: "_deleteCounterparty"; userId: number; counterpartyId: number };



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

  async getManagerData(userId: number) {
    const accessToken = this.appService.getToken();
    const [data, supervisorsData, counterpartyData] = await Promise.all([
      this.fetchModerationSingleManager(accessToken, userId),
      this.fetchSupervisors(accessToken, userId),
      this.fetchCounterparty(accessToken),
    ]);

    const counterparty = ManagerMapper.mapCounterparty(counterpartyData)

    const currentCounterparty = ManagerMapper.mapCurrentCounterparty(data);

    const organizations = ManagerMapper.mapOrganizations(data);

    const locations = ManagerMapper.mapLocations(data);

    const supervisorsToSelect = ManagerMapper.mapSupervisorsToSelect(supervisorsData);

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
      },
      counterparty,
      supervisorsToSelect,
      currentSupervisors: data.data.supervisors,
    };
  }

  async handleAction(payload: ManagerActionPayload) {
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

      case "_inviteSupervisors":
        await this.setSupervisors(accessToken, payload.userId, payload.supervisors);
        return { kind: "ok" } as const;

      case "_deleteSupervisor":
        await this.deleteSupervisor(accessToken, payload.userId, payload.supervisorId);
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
