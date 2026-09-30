import { injected } from "brandi";
import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import { taskPrivateTokens } from "./task.private-tokens";
import type {
  GetTask,
  GetPlaceForBid,
  GetSupervisorsForTask,
  DeleteTaskActivity,
  CreateBidFromTask,
  InstructTask,
  InvoiceTask,
  AcceptTask,
  MakeSearchRequest,
  UpdateSearchRequest,
  GetUserId,
} from "./task.private-tokens";
import { TaskMapper } from "./task.mapper";

import { PostUpdateSearchPayload } from "~/api/_personal/postUpdateSearch/postUpdateSearch";

export class TaskService {
  constructor(
    private readonly appSerivice: AppService,
    private readonly _getTask: GetTask,
    private readonly _getPlaceForBid: GetPlaceForBid,
    private readonly _getSupervisorsForTask: GetSupervisorsForTask,
    private readonly _deleteTaskActivity: DeleteTaskActivity,
    private readonly _createBidFromTask: CreateBidFromTask,
    private readonly _instructTask: InstructTask,
    private readonly _invoiceTask: InvoiceTask,
    private readonly _acceptTask: AcceptTask,
    private readonly _makeSearchRequest: MakeSearchRequest,
    private readonly _updateSearchRequest: UpdateSearchRequest,
    private readonly _getUserId: GetUserId,
  ) {}

  getUserRole() {
    return this.appSerivice.getUserRole();
  }

  getUserId() {
    return this._getUserId();
  }

  async getTask(taskId: string) {
    const data = await this._getTask(this.appSerivice.getToken(), taskId);

    return TaskMapper.mapDataToTask(data);
  }

  async getPlaceForBid() {
    const data = await this._getPlaceForBid(this.appSerivice.getToken());

    return TaskMapper.mapLocationsDataToLocations(data);
  }

  async getSupervisors(taskId: string) {
    const data = await this._getSupervisorsForTask(
      this.appSerivice.getToken(),
      taskId,
    );
    return TaskMapper.dataToSelectOptions(data);
  }

  async deleteTaskActivity(taskId: string, taskActivityId: string) {
    return this._deleteTaskActivity(
      this.appSerivice.getToken(),
      taskId,
      taskActivityId,
    );
  }

  async createBidFromTask(taskId: string, taskActivityId: string) {
    return this._createBidFromTask(
      this.appSerivice.getToken(),
      taskId,
      taskActivityId,
    );
  }

  async instructTask(taskId: string, supervisorId: string) {
    return this._instructTask(
      this.appSerivice.getToken(),
      taskId,
      supervisorId,
    );
  }

  async invoiceTask(taskId: string, supervisors: string[]) {
    return this._invoiceTask(this.appSerivice.getToken(), taskId, supervisors);
  }

  async acceptTask(taskId: string) {
    return this._acceptTask(this.appSerivice.getToken(), taskId);
  }

  async makeSearchRequest(taskId: string, taskActivityId: string) {
    return this._makeSearchRequest(
      this.appSerivice.getToken(),
      taskId,
      taskActivityId,
    );
  }

  async updateSearchRequest(
    searchId: string,
    payload: PostUpdateSearchPayload,
  ) {
    return this._updateSearchRequest(
      this.appSerivice.getToken(),
      searchId,
      payload,
    );
  }
}

injected(
  TaskService,
  appTokens.appService,
  taskPrivateTokens.getTask,
  taskPrivateTokens.getPlaceForBid,
  taskPrivateTokens.getSupervisorsForTask,
  taskPrivateTokens.deleteTaskActivity,
  taskPrivateTokens.createBidFromTask,
  taskPrivateTokens.instructTask,
  taskPrivateTokens.invoiceTask,
  taskPrivateTokens.acceptTask,
  taskPrivateTokens.makeSearchRequest,
  taskPrivateTokens.updateSearchRequest,
  taskPrivateTokens.getUserId,
);
