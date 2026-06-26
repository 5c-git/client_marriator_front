import { injected } from "brandi";

import type {
  GetOrder,
  GetPlaceForOrder,
  GetProjectsForOrder,
  DeleteActivity,
  CreateOrder,
  UpdateOrder,
  CancelOrder,
  SaveOrder,
} from "./new-order.private-tokens";
import { newOrderPrivateTokens } from "./new-order.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import { NewOrderMapper } from "./new-order.mapper";

export class NewOrderService {
  constructor(
    private readonly appService: AppService,
    private readonly _getOrder: GetOrder,
    private readonly _getPlaceForOrder: GetPlaceForOrder,
    private readonly _getProjectsForOrder: GetProjectsForOrder,
    private readonly _deleteActivity: DeleteActivity,
    private readonly _createOrder: CreateOrder,
    private readonly _updateOrder: UpdateOrder,
    private readonly _cancelOrder: CancelOrder,
    private readonly _saveOrder: SaveOrder,
  ) {}

  // getUserRole() {
  //   return this.appService.getUserRole();
  // }

  async getOrder(orderId: string) {
    const token = this.appService.getToken();

    const data = await this._getOrder(token, orderId);

    return NewOrderMapper.mapDataToOrder(data);
  }

  async getProjectOptions(orderId: string) {
    const token = this.appService.getToken();

    const data = await this._getProjectsForOrder(token, orderId);

    return NewOrderMapper.mapProjectsToOptions(data);
  }

  async getPlaceOptions() {
    const token = this.appService.getToken();

    const data = await this._getPlaceForOrder(token);

    return NewOrderMapper.mapPlacesToOptions(data);
  }

  async createOrder(placeId: number, projectId: number, selfEmployed: boolean) {
    const token = this.appService.getToken();

    return this._createOrder(token, placeId, projectId, selfEmployed);
  }

  async updateOrder(
    placeId: number,
    orderId: number,
    projectId: number,
    selfEmployed: boolean,
  ) {
    const token = this.appService.getToken();

    return this._updateOrder(token, placeId, orderId, projectId, selfEmployed);
  }

  async deleteActivity(orderId: string, orderActivityId: string) {
    const token = this.appService.getToken();

    return this._deleteActivity(token, orderId, orderActivityId);
  }

  async cancelOrder(orderId: string) {
    const token = this.appService.getToken();

    return this._cancelOrder(token, orderId);
  }

  async saveOrder(orderId: string) {
    const token = this.appService.getToken();

    return this._saveOrder(token, orderId);
  }
}

injected(
  NewOrderService,
  appTokens.appService,
  newOrderPrivateTokens.getOrder,
  newOrderPrivateTokens.getPlaceForOrder,
  newOrderPrivateTokens.getProjectsForOrder,
  newOrderPrivateTokens.deleteActivity,
  newOrderPrivateTokens.createOrder,
  newOrderPrivateTokens.updateOrder,
  newOrderPrivateTokens.cancelOrder,
  newOrderPrivateTokens.saveOrder,
);
