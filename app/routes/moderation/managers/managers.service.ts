import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type { UsersMobileViewInterface } from "~/shared/views/UsersList/UsersMobileViewInterface";
import type { FetchModerationManagers } from "./managers.private-tokens";

import { appTokens } from "~/shared/container/container.tokens";
import { managersPrivateTokens } from "./managers.private-tokens";

type ManagerStatusCode = 1 | 2 | 3;

export type ManagersLoaderData = {
  users: UsersMobileViewInterface["users"];
};

export class ManagersService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationManagers: FetchModerationManagers,
  ) {}

  async getManagersMobileModeData() {
    const usersData = await this.fetchModerationManagers(
      this.appService.getToken(),
      1_000_000,
      "manager",
      null,
      null,
      null,
      null,
    );

    const users: UsersMobileViewInterface["users"] = [];

    usersData.data.forEach((item) => {
      const status: ManagerStatusCode = (() => {
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

      if (user.status === 3 && this.appService.getToken() === "admin") {
        users.push(user);
      } else if (user.status !== 3) {
        users.push(user);
      }
    });

    return {
      users,
    } satisfies ManagersLoaderData;
  }
}

injected(
  ManagersService,
  appTokens.appService,
  managersPrivateTokens.fetchModerationManagers,
);
