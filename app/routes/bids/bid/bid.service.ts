import { injected } from "brandi";
import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import { bidPrivateTokens } from "./bid.private-tokens";
import type {
  GetBid,
  GetPlaceForBid,
  GetRadiusSelect,
  UpdateBid,
  CancelBid,
  GetSetting,
} from "./bid.private-tokens";
import { BidMapper } from "./bid.mapper";
import { postUpdateBidPayload } from "~/api/_personal/postUpdateBid/postUpdateBid";

export class BidService {
  constructor(
    private readonly appSerivice: AppService,
    private readonly _getBid: GetBid,
    private readonly _getPlaceForBid: GetPlaceForBid,
    private readonly _getRadiusSelect: GetRadiusSelect,
    private readonly _updateBid: UpdateBid,
    private readonly _cancelBid: CancelBid,
    private readonly _getSetting: GetSetting,
  ) {}

  async getBid(bidId: string) {
    const token = this.appSerivice.getToken();

    return this._getBid(token, bidId);
  }

  async getPlaceOptions() {
    const data = await this._getPlaceForBid(this.appSerivice.getToken());

    return BidMapper.mapLocationsDataToLocations(data);
  }

  async getRadiusOptions() {
    const data = await this._getRadiusSelect(this.appSerivice.getToken());

    return BidMapper.mapDataToRadiusOptions(data);
  }

  async getDefaultTimeRange() {
    const token = this.appSerivice.getToken();

    const intervalDayStart = await this._getSetting(token, "intervalDayStart");
    const intervalDayEnd = await this._getSetting(token, "intervalDayStart");

    return {
      start: new Date(
        `2026-03-12T${intervalDayStart.data.value.startsWith("0") ? intervalDayStart.data.value : `0${intervalDayStart.data.value}`}:00`,
      ),
      end: new Date(`2026-03-12T${intervalDayEnd.data.value}:00`),
    };
  }

  async updateBid(payload: postUpdateBidPayload) {
    const token = this.appSerivice.getToken();

    return this._updateBid(token, payload);
  }

  async cancelBid(bidId: string) {
    const token = this.appSerivice.getToken();

    return this._cancelBid(token, bidId);
  }
}

injected(
  BidService,
  appTokens.appService,
  bidPrivateTokens.getBid,
  bidPrivateTokens.getPlaceForBid,
  bidPrivateTokens.getRadiusSelect,
  bidPrivateTokens.updateBid,
  bidPrivateTokens.cancelBid,
  bidPrivateTokens.getSetting,
);
