import type { GetTaskSuccess } from "~/api/_personal/getTask/getTaskSuccess.schema";
import type { GetPlaceForBidSuccess } from "~/api/_personal/getPlaceForBid/getPlaceForBidSuccess.schema";
import type { PostCreateSearchFromTaskSuccess } from "~/api/_personal/postCreateSearchFromTask/postCreateSearchFromTaskSuccess.schema";

import type { RequestSearchDrawerInterface } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawerInterface";
import type { EntityMobileViewInterface } from "~/shared/views/EntityMobileView/EntityMobileViewInterface";

import { determineRole } from "~/shared/determineRole";

export class TaskMapper {
  static mapDataToTask(
    data: GetTaskSuccess,
  ): EntityMobileViewInterface["entity"] {
    const earliestStartDate: string[] = [];
    const latestEndDate: string[] = [];

    data.data.orderActivities.forEach((item) => {
      earliestStartDate.push(item.dateStart);
    });

    data.data.orderActivities.forEach((item) => {
      latestEndDate.push(item.dateEnd);
    });

    earliestStartDate.sort(
      (a, b) => new Date(a).valueOf() - new Date(b).valueOf(),
    );

    latestEndDate.sort((a, b) => new Date(b).valueOf() - new Date(a).valueOf());

    return {
      id: data.data.id.toString(),
      status: data.data.status,
      place: data.data.place
        ? {
            id: data.data.place.id,
            name: data.data.place.name,
            logo: data.data.place.logo,
            region: data.data.place.region.name,
          }
        : null,
      selfEmployed: data.data.selfEmployed,
      route: 0,
      project: data.data.project
        ? {
            id: data.data.project.id,
            logo: data.data.project.brand[0].logo,
            name: data.data.project.name,
          }
        : null,
      creatingPerson: data.data.user
        ? {
            id: data.data.user.id,
            role: determineRole(data.data.user.roles),
            name: data.data.user.name,
            phone: data.data.user.phone,
            email: data.data.user.email,
            logo: data.data.user.logo,
          }
        : null,
      acceptingPerson: data.data.acceptUser
        ? {
            id: data.data.acceptUser.id,
            role: determineRole(data.data.acceptUser.roles),
            name: data.data.acceptUser.name,
            phone: data.data.acceptUser.phone,
            email: data.data.acceptUser.email,
            logo: data.data.acceptUser.logo,
          }
        : null,
      services: data.data.orderActivities.map((item) => {
        let routeCount = 0;
        // считаем количество точек в маршруте
        item.dateActivity.forEach((t) => {
          routeCount = routeCount + t.places.length;
        });
        // считаем количество точек в маршруте

        return {
          id: item.id,
          count: item.count,
          name: item.viewActivity.name,
          route: routeCount,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          countSearch: item.countSearch,
          buttonBidNeed: item.buttonBidNeed,
          buttonSearchNeed: item.buttonSearchNeed,
        };
      }),
      invitedPersons: data.data.acceptedUser.map((item) => {
        return {
          id: item.id,
          role: determineRole(item.roles),
          name: item.name,
          phone: item.phone,
          email: item.email,
          logo: item.logo,
        };
      }),
      duration: {
        start: earliestStartDate.length > 0 ? earliestStartDate[0] : null,
        end: latestEndDate.length > 0 ? latestEndDate[0] : null,
      },
      userId: data.data.user.id,
    };
  }

  static mapDataToSearchRequest(
    data: PostCreateSearchFromTaskSuccess,
  ): RequestSearchDrawerInterface["entity"] {
    return {
      id: data.data.id,
      logo: data.data.viewActivity.logo,
      place: {
        id: data.data.place.id,
        name: data.data.place.name,
        logo: data.data.place.logo,
      },
      project: {
        id: data.data.project.id,
        name: data.data.project.name,
      },
      activity: {
        id: data.data.viewActivity.id,
        name: data.data.viewActivity.name,
        travelling: data.data.viewActivity.traveling,
      },
      unitPrice: data.data.price ? data.data.price : 0,
      finalPrice: data.data.priceResult,
      radius: data.data.radius ? data.data.radius : 0,
      dateStart: new Date(data.data.dateStart),
      dateEnd: new Date(data.data.dateEnd),
      responsiblePerson: {
        id: data.data.user.id,
        phone: data.data.user.phone,
        email: data.data.user.email,
        logo: data.data.user.logo,
        roles: data.data.user.roles,
      },
      taskId: data.data.task ? data.data.task.id : null,
      orderId: data.data.order ? data.data.order.id : null,
      selfEmployed: data.data.selfEmployed,
      amount: data.data.count,
      needDays: data.data.dateActivity.length > 0,
      needFoto: data.data.needFoto,
      days: (() => {
        const days: RequestSearchDrawerInterface["entity"]["days"] = [];

        data.data.dateActivity.forEach((date) => {
          const locations: RequestSearchDrawerInterface["entity"]["days"][0]["locations"] =
            [];

          date.places.forEach((location) => {
            locations.push({
              id: location.id.toString(),
              name: location.name,
              logo: location.logo ? location.logo : "",
            });
          });

          days.push({
            timeStart: new Date(date.timeStart),
            timeEnd: new Date(date.timeEnd),
            needRoute: locations.length > 0 ? true : false,
            locations: locations,
          });
        });

        return days;
      })(),
      units: data.data.viewActivity.standard.name,
      currency: "₽",
    };
  }

  static mapLocationsDataToLocations(data: GetPlaceForBidSuccess): {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[] {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: `${item.name} ${item.region.name}`,
      logo: item.logo,
      disabled: false,
    }));
  }

  static dataToSelectOptions(data: {
    data: {
      id: number;
      name: string;
    }[];
  }) {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: item.name,
      disabled: false,
    }));
  }
}
