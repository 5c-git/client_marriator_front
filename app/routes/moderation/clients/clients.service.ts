import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";

import type { UsersMobileViewInterface } from "~/shared/views/UsersList/UsersMobileViewInterface";

import type { FetchModerationClients } from "./clients.private-tokens";

import { clientsPrivateTokens } from "./clients.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

type ClientStatusCode = 1 | 2 | 3;

export type ClientsLoaderData = {
  users: UsersMobileViewInterface["users"];
};

export class ClientsService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationClients: FetchModerationClients,
  ) {}

  async getClientsMobileModeData() {
    const accessToken = this.appService.getToken();
    const userRole = this.appService.getToken();

    const usersData = await this.fetchModerationClients(
      accessToken,
      1_000_000,
      "client",
      null,
      null,
      null,
      null,
    );

    const users: UsersMobileViewInterface["users"] = [];

    usersData.data.forEach((item) => {
      const status: ClientStatusCode = (() => {
        if (item.confirmRegister === false && item.finishRegister === true) {
          return 1;
        }
        if (item.confirmRegister === true && item.finishRegister === true) {
          return 2;
        }
        return 3;
      })();

      const user = {
        id: item.id,
        status,
        name: item.name,
        email: item.email,
        phone: item.phone.toString(),
        address:
          item.place.length > 0 ? item.place.map((item) => item.name) : null,
        logo: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
      };

      if (user.status === 3 && userRole === "admin") {
        users.push(user);
      } else if (user.status !== 3) {
        users.push(user);
      }
    });

    return {
      users,
    } satisfies ClientsLoaderData;
  }
}

injected(
  ClientsService,
  appTokens.appService,
  clientsPrivateTokens.fetchModerationClients,
);
