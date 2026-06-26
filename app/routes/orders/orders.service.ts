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
        ],
        units: "",
        currency: "₽",
      };
    });
  }

  async getUserIntervals() {
    const token = this.appService.getToken();

    const userData = await this.loadUserInfo(token);

    let cancel_order_interval = 6;
    let repeat_order_interval = 6;

    if (userData.result.userData.cancel_order) {
      const date = new Date(
        `2026-03-12T${userData.result.userData.cancel_order.startsWith("0") ? userData.result.userData.cancel_order : `0${userData.result.userData.cancel_order}`}`,
      );
      cancel_order_interval = date.getHours();
    }
    if (userData.result.userData.change_order) {
      const date = new Date(
        `2026-03-12T${userData.result.userData.change_order.startsWith("0") ? userData.result.userData.change_order : `0${userData.result.userData.change_order}`}`,
      );
      repeat_order_interval = date.getHours();
    }

    return {
      id: userData.result.userData.id,
      cancel_order_interval,
      repeat_order_interval,
    };
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
