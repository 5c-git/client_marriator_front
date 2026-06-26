import { injected } from "brandi";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import type {
  GetEntity,
  GetViewActivitiesForEntity,
  GetPlaceForEntity,
  GetSetting,
  CreateEntityActivity,
  UpdateEntityActivity,
  GetEntityVocabulary,
} from "./activity.private-tokens";
import { activityPrivateTokens } from "./activity.private-tokens";
import { ActivityMapper } from "./activity.mapper";

import { Setting } from "~/api/_settings/getSettingsFromKey/getSettingsFromKeySuccess.schema";

import { postCreateTaskActivityPayload } from "~/api/_personal/postCreateTaskActivity/postCreateTaskActivity";
import { postCreateOrderActivityPayload } from "~/api/_personal/postCreateOrderActivity/postCreateOrderActivity";
import { postUpdateTaskActivityPayload } from "~/api/_personal/postUpdateTaskActivity/postUpdateTaskActivity";
import { postUpdateOrderActivityPayload } from "~/api/_personal/postUpdateOrderActivity/postUpdateOrderActivity";

export class ActivityService {
  constructor(
    private readonly appSerivce: AppService,
    private readonly _getEntity: GetEntity,
    private readonly _getViewActivities: GetViewActivitiesForEntity,
    private readonly _getPlaceForEntity: GetPlaceForEntity,
    private readonly _getSetting: GetSetting,
    private readonly _createEntityActivity: CreateEntityActivity,
    private readonly _updateEntityActivity: UpdateEntityActivity,
    private readonly _getEntityVocabulary: GetEntityVocabulary,
  ) {}

  getUserRole() {
    return this.appSerivce.getUserRole();
  }

  async getEntity(entityId: string) {
    const token = this.appSerivce.getToken();
    return this._getEntity(token, entityId);
  }

  async getActivitiesOptions(entityId: string) {
    const token = this.appSerivce.getToken();
    const data = await this._getViewActivities(token, entityId);

    return ActivityMapper.mapActivitiesToOptions(data);
  }

  async getLocationsOptions() {
    const token = this.appSerivce.getToken();
    const data = await this._getPlaceForEntity(token);

    return ActivityMapper.mapLocationsToOptions(data);
  }

  async getSetting(setting: Setting) {
    const token = this.appSerivce.getToken();
    return this._getSetting(token, setting);
  }

  async createEntityActivity(
    payload: postCreateTaskActivityPayload | postCreateOrderActivityPayload,
  ) {
    const token = this.appSerivce.getToken();
    return this._createEntityActivity(token, payload);
  }

  async updateEntityActivity(
    payload: postUpdateTaskActivityPayload | postUpdateOrderActivityPayload,
  ) {
    const token = this.appSerivce.getToken();
    return this._updateEntityActivity(token, payload);
  }

  getEntityVocabulary() {
    return this._getEntityVocabulary();
  }
}

injected(
  ActivityService,
  appTokens.appService,
  activityPrivateTokens.getEntity,
  activityPrivateTokens.getViewActivitiesForEntity,
  activityPrivateTokens.getPlaceForEntity,
  activityPrivateTokens.getSetting,
  activityPrivateTokens.createEntityActivity,
  activityPrivateTokens.updateEntityActivity,
  activityPrivateTokens.getEntityVocabulary,
);
