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

import type { ClientLoaderData } from "./client.mapper";

import { clientPrivateTokens } from "./client.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { ClientMapper } from "./client.mapper";

export type ClientActionPayload =
  | {
      _action: "_confirm";
      userId: number;
      confirm: "1";
      fields: unknown;
    }
  | { _action: "_decline"; userId: number; confirm: "0" }
  | { _action: "_saveLogo"; userId: number; projectId: number }
  | { _action: "_deleteProject"; userId: number; projectId: number }
  | { _action: "_deletePlace"; userId: number; projectId: number }
  | { _action: "_setCounterparty"; userId: number; counterparties: string[] }
  | { _action: "_deleteCounterparty"; userId: number; counterpartyId: number };




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

  async getClientData(userId: number): Promise<ClientLoaderData> {
    const accessToken = this.appService.getToken();

    const [clientData, counterpartyData] = await Promise.all([
      this.fetchModerationSingleClient(accessToken, userId),
      this.fetchCounterparty(accessToken),
    ]);

    const counterparty = ClientMapper.mapCounterparty(counterpartyData);

    const currentCounterparty = ClientMapper.mapCurrentCounterparty(clientData);

    const organizations = ClientMapper.mapOrganizations(clientData);

    const locations = ClientMapper.mapLocations(clientData);

    const status =  ClientMapper.mapStatus(clientData);

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
      },
      counterparty,
    };
  }

  async handleAction(payload: ClientActionPayload) {
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

