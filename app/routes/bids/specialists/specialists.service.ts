import { injected } from "brandi";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import type {
  GetSpecialistForBid,
  GetRadiusSelect,
  InvoiceBid,
} from "./specialists.private-tokens";
import { specialistsPrivateTokens } from "./specialists.private-tokens";
import { SpecialistsMapper } from "./specialists.mapper";

export class SpecialistsService {
  constructor(
    private readonly appService: AppService,
    private readonly _getSpecialistForBid: GetSpecialistForBid,
    private readonly _getRadiusSelect: GetRadiusSelect,
    private readonly _invoiceBid: InvoiceBid,
  ) {}

  async getSpecialists(bidId: string) {
    const token = this.appService.getToken();
    const data = await this._getSpecialistForBid(token, bidId);

    return SpecialistsMapper.mapDataToSpecialists(data);
  }

  async getRadiusOptions() {
    const token = this.appService.getToken();
    const data = await this._getRadiusSelect(token);

    return {
      radiusOptions: SpecialistsMapper.mapRadiusDataToOptions(data),
      defaultRadius: SpecialistsMapper.getDefaultRadius(data),
    };
  }

  async invoiceBid(bidId: string, specialistIds: string[]) {
    const token = this.appService.getToken();

    return this._invoiceBid(token, bidId, specialistIds);
  }
}

injected(
  SpecialistsService,
  appTokens.appService,
  specialistsPrivateTokens.getSpecialistForBid,
  specialistsPrivateTokens.getRadiusSelect,
  specialistsPrivateTokens.invoiceBid,
);
