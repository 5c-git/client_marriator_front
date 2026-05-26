import type { GetBikSuccess } from "~/api/_personal/getBik/getBikSuccess.schema";
import type { GetRequisitesDataSuccess } from "~/api/_personal/getRequisitesData/getRequisitesDataSuccess.schema";

import type {
  BillingLoaderData,
  BillingRequisiteLoaderData,
} from "./billing.service";

export class BillingMapper {
  static toBikOptions(data: GetBikSuccess): BillingRequisiteLoaderData {
    return {
      bikOptions: data.result.bankData.map((element) => ({
        value: element.bic,
        label: element.label,
        disabled: element.disabled,
      })),
    };
  }

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
