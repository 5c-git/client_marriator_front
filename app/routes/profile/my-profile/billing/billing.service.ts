import { injected } from "brandi";

import type {
  DeleteRequisite,
  FetchBik,
  FetchRequisitesDataCached,
  SaveRequisitesData,
} from "./billing.private-tokens";
import type { AppService } from "~/shared/container/container.service";

import { billingPrivateTokens } from "./billing.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { BillingMapper } from "./billing.mapper";

export type BikOption = {
  value: string;
  label: string;
  disabled: boolean;
};

export type BillingRequisiteLoaderData = {
  bikOptions: BikOption[];
};

export type BillingFormValues = {
  confidant: boolean;
  fio: string;
  bik: string;
  account: string;
  card: string;
  payWithCard: string;
  cardDue: string | null;
};

export type BillingEditInfo = BillingFormValues & {
  dataId: number;
};

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
    private readonly fetchBik: FetchBik,
    private readonly saveRequisites: SaveRequisitesData,
    private readonly deleteRequisiteApi: DeleteRequisite,
    private readonly appService: AppService,
  ) {}

  async loadBilling(): Promise<BillingLoaderData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchRequisitesDataCached(accessToken);

    return BillingMapper.toLoaderData(data);
  }

  async loadBikOptions(): Promise<BillingRequisiteLoaderData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchBik(accessToken);

    return BillingMapper.toBikOptions(data);
  }

  async saveRequisite(formData: unknown, dataId: number) {
    return await this.saveRequisites(
      this.appService.getToken(),
      formData,
      dataId,
    );
  }

  async deleteRequisite(dataId: number) {
    return await this.deleteRequisiteApi(
      this.appService.getToken(),
      dataId,
    );
  }
}

injected(
  BillingService,
  billingPrivateTokens.fetchRequisitesDataCached,
  billingPrivateTokens.fetchBik,
  billingPrivateTokens.saveRequisitesData,
  billingPrivateTokens.deleteRequisite,
  appTokens.appService,
);
