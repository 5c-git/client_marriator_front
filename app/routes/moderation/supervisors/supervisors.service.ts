import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type { UsersMobileViewInterface } from "~/shared/views/UsersList/UsersMobileViewInterface";
import type { FetchModerationSupervisors } from "./supervisors.private-tokens";

import { appTokens } from "~/shared/container/container.tokens";
import { supervisorsPrivateTokens } from "./supervisors.private-tokens";

type SupervisorStatusCode = 1 | 2 | 3;

export type SupervisorsLoaderData = {
  users: UsersMobileViewInterface["users"];
};

export class SupervisorsService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationSupervisors: FetchModerationSupervisors,
  ) {}

  async getSupervisorsMobileModeData() {
    const usersData = await this.fetchModerationSupervisors(
      this.appService.getToken(),
      1_000_000,
      "supervisor",
      null,
      null,
      null,
      null,
    );

    const userRole = this.appService.getUserRole();
    const users: UsersMobileViewInterface["users"] = [];

    usersData.data.forEach((item) => {
      const status: SupervisorStatusCode = (() => {
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

      if (
        user.status === 3 &&
        (userRole === "admin" || userRole === "manager")
      ) {
        users.push(user);
      } else if (user.status !== 3) {
        users.push(user);
      }
    });

    return {
      users,
    } satisfies SupervisorsLoaderData;
  }
}

injected(
  SupervisorsService,
  appTokens.appService,
  supervisorsPrivateTokens.fetchModerationSupervisors,
);
