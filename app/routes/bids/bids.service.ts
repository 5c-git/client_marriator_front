import { injected } from "brandi";

import type { GetBids, GetUserInfo } from "./bids.private-tokens";
import { bidsPrivateTokens } from "./bids.private-tokens";

import { statusCodeMap } from "~/shared/status";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

export class BidsService {
  constructor(
    private readonly appService: AppService,
    private readonly _getBids: GetBids,
    private readonly loadUserInfo: GetUserInfo,
  ) {}

  async getBids() {
    const token = this.appService.getToken();

    const bidsData = await this._getBids(token);

    return bidsData.data.map((item) => {
      const earliestStartDate: string[] = [];
      const latestEndDate: string[] = [];

      earliestStartDate.push(item.dateStart);
      latestEndDate.push(item.dateEnd);

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
        header: item.viewActivity.name,
        subHeader: "1",
        address: {
          logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
          text: item.place.address_kladr,
        },
        duration: {
          start: item.dateStart,
          end: item.dateEnd,
        },
        coordinates: [
          Number(item.place.latitude),
          Number(item.place.longitude),
        ],
        units: item.viewActivity.standard.name,
        currency: "₽",
        createdAt: item.createdAt,
      };
    });
  }

  async getBidCancelInterval() {
    const token = this.appService.getToken();

    const userData = await this.loadUserInfo(token);

    let cancel_bid_interval = 2;

    if (userData.result.userData.repeat_bid) {
      const date = new Date(
        `2026-03-12T${userData.result.userData.repeat_bid.startsWith("0") ? userData.result.userData.repeat_bid : `0${userData.result.userData.repeat_bid}`}`,
      );
      cancel_bid_interval = date.getHours();
    }

    return cancel_bid_interval;
  }
}

injected(
  BidsService,
  appTokens.appService,
  bidsPrivateTokens.getBids,
  bidsPrivateTokens.getUserInfo,
);
