import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";

import type {
  FetchCounterparty,
  FetchModerationSingleClient,
  ConfirmUserRegister,
  SetUserImg,
  DeleteProject,
  DeletePlaceModeration,
  SetCounterparty,
  DeleteCounterparty,
} from "./client.private-tokens";

import type { ClientData } from "./client.mapper";

import { clientPrivateTokens } from "./client.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { ClientMapper } from "./client.mapper";

import { CLIENT_ACTIONS } from "./client";

export type ClientActionPayload =
  | {
      _action: typeof CLIENT_ACTIONS.confirm;
      userId: number;
      confirm: "1";
      fields: { fields: unknown };
    }
  | { _action: typeof CLIENT_ACTIONS.decline; userId: number; confirm: "0" }
  | {
      _action: typeof CLIENT_ACTIONS.saveLogo;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof CLIENT_ACTIONS.deleteProject;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof CLIENT_ACTIONS.deletePlace;
      userId: number;
      projectId: number;
    }
  | {
      _action: typeof CLIENT_ACTIONS.setCounterparty;
      userId: number;
      counterparties: string[];
    }
  | {
      _action: typeof CLIENT_ACTIONS.deleteCounterparty;
      userId: number;
      counterpartyId: number;
    };

export class ClientService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationSingleClient: FetchModerationSingleClient,
    private readonly fetchCounterparty: FetchCounterparty,
    private readonly confirmUserRegister: ConfirmUserRegister,
    private readonly setUserImg: SetUserImg,
    private readonly deleteProject: DeleteProject,
    private readonly deletePlaceModeration: DeletePlaceModeration,
    private readonly setCounterparty: SetCounterparty,
    private readonly deleteCounterparty: DeleteCounterparty,
  ) {}

  async getClientData(userId: number): Promise<ClientData> {
    const accessToken = this.appService.getToken();

    const [clientData, counterpartyData] = await Promise.all([
      this.fetchModerationSingleClient(accessToken, userId),
      this.fetchCounterparty(accessToken),
    ]);

    const counterparty = ClientMapper.mapCounterparty(counterpartyData);

    const currentCounterparty = ClientMapper.mapCurrentCounterparty(clientData);

    const organizations = ClientMapper.mapOrganizations(clientData);

    const locations = ClientMapper.mapLocations(clientData);

    const status = ClientMapper.mapStatus(clientData);

    const userRole = this.appService.getUserRole();

    return {
      client: {
        id: clientData.data.id,
        logo: clientData.data.logo,
        phone: clientData.data.phone.toString(),
        name: clientData.data.name,
        counterparty: currentCounterparty,
        organizations,
        locations,
        change_order: clientData.data.change_order,
        cancel_order: clientData.data.cancel_order,
        live_order: clientData.data.live_order,
        confirmRegister: clientData.data.confirmRegister,
        status,
        userRole,
      },
      counterparty,
    };
  }

  async handleAction(payload: ClientActionPayload) {
    const accessToken = this.appService.getToken();

    switch (payload._action) {
      case CLIENT_ACTIONS.confirm:
        return await this.confirmUserRegister(
          accessToken,
          payload.userId,
          payload.confirm,
          { fields: payload.fields },
        );

      case CLIENT_ACTIONS.decline:
        return await this.confirmUserRegister(
          accessToken,
          payload.userId,
          payload.confirm,
        );

      case CLIENT_ACTIONS.saveLogo:
        return await this.setUserImg(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case CLIENT_ACTIONS.deleteProject:
        return await this.deleteProject(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case CLIENT_ACTIONS.deletePlace:
        return await this.deletePlaceModeration(
          accessToken,
          payload.userId,
          payload.projectId,
        );

      case CLIENT_ACTIONS.setCounterparty:
        return await this.setCounterparty(
          accessToken,
          payload.userId,
          payload.counterparties,
        );

      case CLIENT_ACTIONS.deleteCounterparty:
        return await this.deleteCounterparty(
          accessToken,
          payload.userId,
          payload.counterpartyId,
        );
    }
  }
}

injected(
  ClientService,
  appTokens.appService,
  clientPrivateTokens.fetchModerationSingleClient,
  clientPrivateTokens.fetchCounterparty,
  clientPrivateTokens.confirmUserRegister,
  clientPrivateTokens.setUserImg,
  clientPrivateTokens.deleteProject,
  clientPrivateTokens.deletePlaceModeration,
  clientPrivateTokens.setCounterparty,
  clientPrivateTokens.deleteCounterparty,
);
