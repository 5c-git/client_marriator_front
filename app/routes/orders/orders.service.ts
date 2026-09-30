import { injected } from "brandi";

import type {
  GetUserInfo,
  GetOrders,
  RepeatOrder,
  CancelOrder,
} from "./orders.private-tokens";

import { ordersPrivateTokens } from "./orders.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import { statusCodeMap } from "~/shared/status";

export class OrdersService {
  constructor(
    private readonly appService: AppService,
    private readonly loadOrders: GetOrders,
    private readonly loadUserInfo: GetUserInfo,
    private readonly _repeatOrder: RepeatOrder,
    private readonly _cancelOrder: CancelOrder,
  ) {}

  getUserRole() {
    return this.appService.getUserRole();
  }

  async getOrders() {
    const token = this.appService.getToken();

    const ordersData = await this.loadOrders(token);

    return ordersData.data.map((item) => {
      const earliestStartDate: string[] = [];
      const latestEndDate: string[] = [];

      item.orderActivities.forEach((item) => {
        earliestStartDate.push(item.dateStart);
      });

      item.orderActivities.forEach((item) => {
        latestEndDate.push(item.dateEnd);
      });

      earliestStartDate.sort(
        (a, b) => new Date(a).valueOf() - new Date(b).valueOf(),
      );

      latestEndDate.sort(
        (a, b) => new Date(b).valueOf() - new Date(a).valueOf(),
      );

      return {
        id: item.id,
        userId: item.user.id,
        status: item.status,
        statusColor: statusCodeMap[item.status].color,
        header: item.orderActivities.length.toString(),
        subHeader: item.orderActivities
          .map((activity) => `${activity.viewActivity.name}`)
          .join(", "),
        address: {
          logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
          text: item.place.address_kladr,
        },
        duration: {
          start: earliestStartDate.length > 0 ? earliestStartDate[0] : null,
          end: latestEndDate.length > 0 ? latestEndDate[0] : null,
        },
        coordinates: [
          Number(item.place.latitude),
          Number(item.place.longitude),
        ] as [lon: number, lat: number],
        units: "",
        currency: "₽",
        createdAt: item.createdAt,
        placeName: item.place.brand ? item.place.brand.name : "",
      };
    });
  }

  async getUserIntervals() {
    const token = this.appService.getToken();

    const userData = await this.loadUserInfo(token);

    const date_create_bid = new Date(
      `2026-03-12T${userData.data.leave_bid.startsWith("0") ? userData.data.leave_bid : `0${userData.data.leave_bid}`}`,
    );
    const create_bid_interval = date_create_bid.getHours();

    const date_cancel = new Date(
      `2026-03-12T${userData.data.cancel_order.startsWith("0") ? userData.data.cancel_order : `0${userData.data.cancel_order}`}`,
    );
    const cancel_order_interval = date_cancel.getHours();

    const date_repeat = new Date(
      `2026-03-12T${userData.data.change_order.startsWith("0") ? userData.data.change_order : `0${userData.data.change_order}`}`,
    );
    const repeat_order_interval = date_repeat.getHours();

    return {
      id: userData.data.id,
      create_bid_interval,
      cancel_order_interval,
      repeat_order_interval,
    };
  }

  async getUserProjects() {
    const token = this.appService.getToken();

    const userData = await this.loadUserInfo(token);

    return userData.data.project;
  }

  async repeatOrder(orderId: string) {
    const token = this.appService.getToken();

    return this._repeatOrder(token, orderId);
  }

  async cancelOrder(orderId: string) {
    const token = this.appService.getToken();

    return this._cancelOrder(token, orderId);
  }
}

injected(
  OrdersService,
  appTokens.appService,
  ordersPrivateTokens.getOrders,
  ordersPrivateTokens.getUserInfo,
  ordersPrivateTokens.repeatOrder,
  ordersPrivateTokens.cancelOrder,
);
