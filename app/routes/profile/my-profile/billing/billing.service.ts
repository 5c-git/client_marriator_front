import { injected } from "brandi";

import type { FetchRequisitesDataCached } from "./billing.private-tokens";
import type { AppService } from "~/shared/container/container.service";

import { billingPrivateTokens } from "./billing.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { BillingMapper } from "./billing.mapper";

export type BillingItem = {
  bik: string;
  fio: string;
  card: string;
  account: string;
  cardDue: string;
  confidant: boolean;
  payWithCard: string;
};

export type BillingLoaderData = {
  billingItems: BillingItem[];
};

export class BillingService {
  constructor(
    private readonly fetchRequisitesDataCached: FetchRequisitesDataCached,
    private readonly appService: AppService,
  ) {}

  async loadBilling(): Promise<BillingLoaderData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchRequisitesDataCached(accessToken);

    return BillingMapper.toLoaderData(data);
  }
}

injected(
  BillingService,
  billingPrivateTokens.fetchRequisitesDataCached,
  appTokens.appService,
);
