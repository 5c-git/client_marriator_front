import { token } from "brandi";

import type { UsersLayoutService } from "./layout.service";

export const layoutTokens = {
  usersLayoutService: token<UsersLayoutService>("usersLayout:UsersLayoutService"),
};
