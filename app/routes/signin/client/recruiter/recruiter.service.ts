import { injected } from "brandi";

import type {
  GetPlace,
  SetUserData,
  FinishRegister,
  ClearAppStore,
} from "./recruiter.private-tokens";
import type { AppService } from "~/shared/container/container.service";
import type { RecruiterLocationOption } from "./recruiter.mapper";

import { recruiterPrivateTokens } from "./recruiter.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { RecruiterMapper } from "./recruiter.mapper";

export type RecruiterLoaderData = {
  locations: RecruiterLocationOption[];
};

export class RecruiterService {
  constructor(
    private readonly getPlace: GetPlace,
    private readonly setUserData: SetUserData,
    private readonly postFinishRegister: FinishRegister,
    private readonly clearAppStore: ClearAppStore,
    private readonly appService: AppService,
  ) {}

  async loadRecruiter(): Promise<RecruiterLoaderData> {
    const accessToken = this.appService.getToken();
    const locationsData = await this.getPlace(accessToken);

    return {
      locations: RecruiterMapper.mapPlacesToLocationOptions(locationsData),
    };
  }

  async finishRegister(name: string) {
    const accessToken = this.appService.getToken();
    await this.setUserData(accessToken, { name });
    await this.postFinishRegister(accessToken);
    this.clearAppStore();
  }
}

injected(
  RecruiterService,
  recruiterPrivateTokens.getPlace,
  recruiterPrivateTokens.setUserData,
  recruiterPrivateTokens.postFinishRegister,
  recruiterPrivateTokens.clearAppStore,
  appTokens.appService,
);
