import { GetCounterpartyForOrderSuccess } from "~/api/_personal/getCounterpartyForOrder/getCounterpartyForOrder.schema";

export class RequestsMapper {
  static mapCompaniesToOptions(data: GetCounterpartyForOrderSuccess) {
    return data.data.map((item) => ({
      id: item.id,
      label: item.name,
      value: item.active,
    }));
  }
}
