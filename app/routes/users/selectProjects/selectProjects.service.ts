import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import type {
  FetchModerationSingleClient,
  FetchProjects,
  SaveProjects,
} from "./selectProjects.private-tokens";
import { selectProjectsPrivateTokens } from "./selectProjects.private-tokens";

export type ProjectOption = {
  value: string;
  label: string;
  image?: string;
  disabled: boolean;
};

export type SelectProjectsLoaderData = {
  userId: string;
  projects: ProjectOption[];
  selectedProjects: string[];
};

export class SelectProjectsService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationSingleClient: FetchModerationSingleClient,
    private readonly fetchProjects: FetchProjects,
    private readonly saveProjects: SaveProjects,
  ) {}

  async getSelectProjectsData(userId: number): Promise<SelectProjectsLoaderData> {
    const accessToken = this.appService.getToken();
    const [userData, data] = await Promise.all([
      this.fetchModerationSingleClient(accessToken, userId),
      this.fetchProjects(accessToken, userId),
    ]);

    const options: ProjectOption[] = [];
    const selectedProjects: string[] = [];

    data.data.forEach((item) => {
      options.push({
        value: item.id.toString(),
        label: item.name,
        image: item.brand[0].logo
          ? `${import.meta.env.VITE_ASSET_PATH}${item.brand[0].logo}`
          : undefined,
        disabled: false,
      });
    });

    userData.data.project.forEach((item) => {
      selectedProjects.push(item.id.toString());
    });

    return {
      userId: userId.toString(),
      projects: options,
      selectedProjects,
    };
  }

  async saveSelectedProjects(userId: string, projects: string[]) {
    const accessToken = this.appService.getToken();
    await this.saveProjects(accessToken, userId, projects);
    return { kind: "redirect" } as const;
  }
}

injected(
  SelectProjectsService,
  appTokens.appService,
  selectProjectsPrivateTokens.fetchModerationSingleClient,
  selectProjectsPrivateTokens.fetchProjects,
  selectProjectsPrivateTokens.saveProjects,
);
