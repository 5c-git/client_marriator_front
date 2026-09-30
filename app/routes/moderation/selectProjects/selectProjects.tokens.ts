import { token } from "brandi";

import type { SelectProjectsService } from "./selectProjects.service";

export const selectProjectsTokens = {
  selectProjectsService: token<SelectProjectsService>(
    "users-selectProjects:SelectProjectsService",
  ),
};
