import { GetOrderSuccess } from "~/api/_personal/getOrder/getOrderSuccess.schema";
import { GetViewActivitiesForOrderSuccess } from "~/api/_personal/getViewActivitiesForOrder/getViewActivitiesForOrderSuccess.schema";
import { GetPlaceForOrderSuccess } from "~/api/_personal/getPlaceForOrder/getPlaceForOrderSuccess.schema";

import { ServiceMobileViewInterface } from "~/shared/views/ActivityMobileView/ActivityMobileViewInterface";

export class ActivityMapper {
  static mapEntityToActivity(
    data: GetOrderSuccess["data"]["orderActivities"][0],
  ) {
    return {
      id: data.viewActivity.id.toString(),
      name: data.viewActivity.name,
      amount: data.count.toString(),
      dateStart: new Date(data.dateStart),
      dateEnd: new Date(data.dateEnd),
      needDays: data.dateActivity.length > 0 ? true : false,
      needPhoto: data.needFoto,
      days: data.dateActivity.map((item) => {
        const locations: ServiceMobileViewInterface["entity"]["days"][0]["locations"] =
          [];

        item.places.forEach((location) => {
          locations.push({
            id: location.id.toString(),
            name: location.name,
            logo: location.logo ? location.logo : "",
          });
        });

        return {
          timeStart: new Date(item.timeStart),
          timeEnd: new Date(item.timeEnd),
          needRoute: locations.length > 0 ? true : false,
          locations: locations,
        };
      }),
    };
  }

  static mapActivitiesToOptions(data: GetViewActivitiesForOrderSuccess) {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: item.detailName,
      needRoute: item.traveling,
      disabled: false,
    }));
  }

  static mapLocationsToOptions(data: GetPlaceForOrderSuccess) {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: `${item.name} ${item.region.name}`,
      logo: item.logo,
      disabled: false,
    }));
  }
}
