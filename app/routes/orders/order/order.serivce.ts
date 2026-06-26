import { injected } from "brandi";
import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import { orderPrivateTokens } from "./order.private-tokens";
import {
  GetOrder,
  DeleteOrderActivity,
  ConvertTask,
  AcceptOrder,
  SendOrder,
  GetSupervisorsForTask,
  CreateBidFromOrder,
  CreateSearchFromOrder,
  UpdateSearch,
  GetPlaceForBid,
} from "./order.private-tokens";
import { OrderMapper } from "./order.mapper";

import type { PostUpdateSearchPayload } from "~/api/_personal/postUpdateSearch/postUpdateSearch";

export class OrderService {
  constructor(
    private readonly appService: AppService,
    private readonly _getOrder: GetOrder,
    private readonly _deleteOrderActivity: DeleteOrderActivity,
    private readonly _convertTask: ConvertTask,
    private readonly _acceptOrder: AcceptOrder,
    private readonly _sendOrder: SendOrder,
    private readonly _getSupervisorsForTask: GetSupervisorsForTask,
    private readonly _createBidFromOrder: CreateBidFromOrder,
    private readonly _createSearchFromOrder: CreateSearchFromOrder,
    private readonly _updateSearch: UpdateSearch,
    private readonly _getPlaceForBid: GetPlaceForBid,
  ) {}

  getUserRole() {
    return this.appService.getUserRole();
  }

  async getOrder(orderId: string) {
    const token = this.appService.getToken();

    const data = await this._getOrder(token, orderId);

    return OrderMapper.mapDataToOrder(data);
  }

  async getLocationOptions() {
    const token = this.appService.getToken();

    const data = await this._getPlaceForBid(token);

    return OrderMapper.mapLocationsToOptions(data);
  }

  async getSupervisorsOptions(orderId: string) {
    const token = this.appService.getToken();

    const data = await this._getSupervisorsForTask(token, orderId);

    return OrderMapper.mapSupervisorsToOptions(data);
  }

  async deleteActivity(orderId: string, orderActivityId: string) {
    const token = this.appService.getToken();

    return this._deleteOrderActivity(token, orderId, orderActivityId);
  }

  async convertToTask(orderId: string, responsibleId: string) {
    const token = this.appService.getToken();

    return this._convertTask(token, orderId, responsibleId);
  }

  async convertToBid(orderId: string, orderActivityId: string) {
    const token = this.appService.getToken();

    return this._createBidFromOrder(token, orderId, orderActivityId);
  }

  async makeSearchRequest(orderId: string, orderActivityId: string) {
    const token = this.appService.getToken();

    const searchData = await this._createSearchFromOrder(
      token,
      orderId,
      orderActivityId,
    );

    return OrderMapper.mapDataToSearch(searchData);
  }

  async updateSearchRequest(
    searchId: string,
    payload: PostUpdateSearchPayload,
  ) {
    const token = this.appService.getToken();

    return this._updateSearch(token, searchId, payload);
  }

  async acceptOrder(orderId: string) {
    const token = this.appService.getToken();

    return this._acceptOrder(token, orderId);
  }

  async saveOrder(orderId: string) {
    const token = this.appService.getToken();

    return this._sendOrder(token, orderId);
  }
}

injected(
  OrderService,
  appTokens.appService,
  orderPrivateTokens.getOrder,
  orderPrivateTokens.deleteOrderActivity,
  orderPrivateTokens.convertTask,
  orderPrivateTokens.acceptOrder,
  orderPrivateTokens.sendOrder,
  orderPrivateTokens.getSupervisorsForTask,
  orderPrivateTokens.createBidFromOrder,
  orderPrivateTokens.createSearchFromOrder,
  orderPrivateTokens.updateSearch,
  orderPrivateTokens.getPlaceForBid,
);
