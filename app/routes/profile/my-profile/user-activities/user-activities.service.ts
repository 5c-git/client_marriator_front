import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type {
  FetchFormActivities,
  SaveUserFieldsActivities,
} from "./user-activities.private-tokens";
import type { inputs } from "~/shared/constructor/inputs.schema";
import type { z } from "zod";

import { userActivitiesPrivateTokens } from "./user-activities.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

export type UserActivitiesFormField = z.infer<typeof inputs>[number];
export type UserActivitiesFormStatus = "needRequired" | "allowedNewStep";

export type UserActivitiesLoaderData = {
  accessToken: string;
  formFields: UserActivitiesFormField[];
  formStatus: UserActivitiesFormStatus;
};

export class UserActivitiesService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchFormActivities: FetchFormActivities,
    private readonly saveUserFieldsActivities: SaveUserFieldsActivities,
  ) {}

  async loadFormActivities(step: number): Promise<UserActivitiesLoaderData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchFormActivities(accessToken, step);

    return {
      accessToken,
      formFields: data.result.formData,
      formStatus: data.result.type,
    };
  }

  async saveFormFields(step: number, fields: unknown) {
    const accessToken = this.appService.getToken();
    return await this.saveUserFieldsActivities(accessToken, step, fields);
  }
}

injected(
  UserActivitiesService,
  appTokens.appService,
  userActivitiesPrivateTokens.fetchFormActivities,
  userActivitiesPrivateTokens.saveUserFieldsActivities,
);
