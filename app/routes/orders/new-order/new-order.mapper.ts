import { GetOrderSuccess } from "~/api/_personal/getOrder/getOrderSuccess.schema";
import { GetProjectsForOrderSuccess } from "~/api/_personal/getProjectsForOrder/getProjectsForOrderSuccess.schema";
import { GetPlaceForOrderSuccess } from "~/api/_personal/getPlaceForOrder/getPlaceForOrderSuccess.schema";

export class NewOrderMapper {
  static mapDataToOrder(data: GetOrderSuccess) {
    return {
      id: data.data.id.toString(),
      projectId: data.data.project ? data.data.project.id.toString() : null,
      place: data.data.place
        ? {
            id: data.data.place.id.toString(),
            name: data.data.place.name,
            region: data.data.place.region.name,
          }
        : null,

      selfEmployed: data.data.selfEmployed,
      isNewOrder: false,
      orderServices: data.data.orderActivities.map((item) => ({
        id: item.id,
        count: item.count,
        name: item.viewActivity.name,
      })),
    };
  }

  static mapProjectsToOptions(data: GetProjectsForOrderSuccess) {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: item.name,
      disabled: false,
    }));
  }

  static mapPlacesToOptions(data: GetPlaceForOrderSuccess) {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: `${item.name} ${item.region.name}`,
      disabled: false,
    }));
  }
}
