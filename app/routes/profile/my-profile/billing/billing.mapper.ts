import type { GetRequisitesDataSuccess } from "~/api/_personal/getRequisitesData/getRequisitesDataSuccess.schema";

import type { BillingLoaderData } from "./billing.service";

export class BillingMapper {
  static toLoaderData(data: GetRequisitesDataSuccess): BillingLoaderData {
    return {
      billingItems: data.result.map((item) => ({
        bik: item.bik,
        fio: item.fio,
        card: item.card,
        account: item.account,
        cardDue: item.cardDue,
        confidant: item.confidant,
        payWithCard: item.payWithCard,
      })),
    };
  }
}
