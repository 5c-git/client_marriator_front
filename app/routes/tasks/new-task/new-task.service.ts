import { injected } from "brandi";

import type {
  GetTask,
  GetPlaceForTask,
  GetProjectsForTask,
  GetSupervisorsForTask,
  CreateTask,
  UpdateTask,
  CancelTask,
  InvoiceTask,
  DeleteTaskActivity,
} from "./new-task.private-tokens";

import { newTaskPrivateTokens } from "./new-task.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";
import { TaskMapper } from "../task/task.mapper";
import { NewTaskMapper } from "./new-task.mapper";

export class NewTaskService {
  constructor(
    private readonly appService: AppService,
    private readonly _getTask: GetTask,
    private readonly _getPlaceForTask: GetPlaceForTask,
    private readonly _getProjectsForTask: GetProjectsForTask,
    private readonly _getSupervisorsForTask: GetSupervisorsForTask,
    private readonly _createTask: CreateTask,
    private readonly _updateTask: UpdateTask,
    private readonly _cancelTask: CancelTask,
    private readonly _invoiceTask: InvoiceTask,
    private readonly _deleteTaskActivity: DeleteTaskActivity,
  ) {}

  async getTask(taskId: string) {
    const token = this.appService.getToken();

    const data = await this._getTask(token, taskId);

    return NewTaskMapper.mapDataToNewTask(data);
  }

  async getPlaceOptions() {
    const token = this.appService.getToken();

    const data = await this._getPlaceForTask(token);

    return NewTaskMapper.placesToSelectOptions(data);
  }

  async getProjectOptions(placeId: string) {
    const token = this.appService.getToken();

    const data = await this._getProjectsForTask(token, placeId);

    return TaskMapper.dataToSelectOptions(data);
  }

  async getSupervisorsOptions(taskId: string) {
    const token = this.appService.getToken();

    const data = await this._getSupervisorsForTask(token, taskId);

    return TaskMapper.dataToSelectOptions(data);
  }

  async createTask(placeId: number, projectId: number, selfEmployed: boolean) {
    const token = this.appService.getToken();

    return this._createTask(token, placeId, projectId, selfEmployed);
  }

  async updateTask(
    placeId: number,
    taskId: number,
    projectId: number,
    selfEmployed: boolean,
  ) {
    const token = this.appService.getToken();

    return this._updateTask(token, placeId, taskId, projectId, selfEmployed);
  }

  async cancelTask(taskId: string) {
    const token = this.appService.getToken();

    return this._cancelTask(token, taskId);
  }

  async deleteActivity(taskId: string, taskActivityId: string) {
    const token = this.appService.getToken();

    return this._deleteTaskActivity(token, taskId, taskActivityId);
  }

  async inviteSupervisors(taskId: string, supervisors: string[]) {
    const token = this.appService.getToken();

    return this._invoiceTask(token, taskId, supervisors);
  }
}

injected(
  NewTaskService,
  appTokens.appService,
  newTaskPrivateTokens.getTask,
  newTaskPrivateTokens.getPlaceForTask,
  newTaskPrivateTokens.getProjectsForTask,
  newTaskPrivateTokens.getSupervisorsForTask,
  newTaskPrivateTokens.createTask,
  newTaskPrivateTokens.updateTask,
  newTaskPrivateTokens.cancelTask,
  newTaskPrivateTokens.invoiceTask,
  newTaskPrivateTokens.deleteTaskActivity,
);
