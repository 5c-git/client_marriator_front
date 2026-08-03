import { GetPlaceForBidSuccess } from "~/api/_personal/getPlaceForBid/getPlaceForBidSuccess.schema";
import type { GetBidSuccess } from "~/api/_personal/getBid/getBidSuccess.schema";

import { statusCodeMap } from "~/shared/specialistStatus";

import { t } from "i18next";
import { BidMobileViewInterface } from "./_views/BidMobileView/BidMobileViewInterface";
import { bidFormSubmitValues } from "./_views/BidMobileView/BidFormMobileView";

export class BidMapper {
  static mapDataToBid(data: GetBidSuccess["data"]) {
    return {
      id: data.id,
      logo: data.viewActivity.logo,
      status: data.status,
      place: {
        id: data.place.id,
        name: data.place.name,
        logo: data.place.logo,
      },
      project: {
        id: data.project.id,
        name: data.project.name,
      },
      activity: {
        id: data.viewActivity.id,
        name: data.viewActivity.name,
        travelling: data.viewActivity.traveling,
      },
      unitPrice: data.price ? data.price : 0,
      finalPrice: data.priceResult,
      radius: data.radius ? data.radius : 0,
      dateStart: new Date(data.dateStart),
      dateEnd: new Date(data.dateEnd),
      responsiblePerson: {
        id: data.user.id,
        phone: data.user.phone,
        email: data.user.email,
        logo: data.user.logo,
        roles: data.user.roles,
      },
      taskId: data.task ? data.task.id : null,
      orderId: data.order ? data.order.id : null,
      selfEmployed: data.selfEmployed,
      progress: (() => {
        const acceptedSpecialists = data.acceptingUsers.filter(
          (specialist) => specialist.status === 5,
        );
        return (acceptedSpecialists.length / data.count) * 100;
      })(),
      counters: data.statistic.map((item) => ({
        label: t(
          `status.${statusCodeMap[item.accepted as keyof typeof statusCodeMap].value}`,
          { ns: "SpecialistMobileView" },
        ),
        count: item.count,
        color: statusCodeMap[item.accepted as keyof typeof statusCodeMap].color,
      })),
      amount: data.count,
      // taxStatus: bidData.selfEmployed ? t("selfEmployed") : t("notSelfEmployed"),
      needDays: data.dateActivity.length > 0,
      needFoto: data.needFoto,
      days: data.dateActivity.map((date) => {
        const locations: BidMobileViewInterface["entity"]["days"][0]["locations"] =
          [];

        date.places.forEach((location) => {
          locations.push({
            id: location.id.toString(),
            name: location.name,
            logo: location.logo ? location.logo : "",
          });
        });

        return {
          timeStart: new Date(date.timeStart),
          timeEnd: new Date(date.timeEnd),
          needRoute: locations.length > 0 ? true : false,
          locations: locations,
        };
      }),
      units: data.viewActivity.standard.name,
      currency: "₽",
      createdAt: data.createdAt,
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

  static mapDataToRadiusOptions(data: {
    data: {
      id: number;
      value: number;
      default: boolean;
    }[];
  }) {
    return data.data.map((item) => ({
      value: item.value.toString(),
      label: item.value.toString(),
      disabled: false,
    }));
  }

  static mapFormValuesToPayload(bidId: number, values: bidFormSubmitValues) {
    return {
      bidId: bidId,
      radius: Number(values.radius),
      price: Number(values.unitPrice),
      viewActivityId: values.activity,
      count: values.amount,
      dateStart: values.dateStart.toISOString(),
      dateEnd: values.dateEnd.toISOString(),
      needFoto: values.needFoto,
      ...(values.days &&
        values.days.length > 0 && {
          dateActivity: values.days?.map((day) => {
            const places: number[] = [];

            day.locations?.forEach((location) => {
              places.push(Number(location.id));
            });

            return {
              timeStart: new Date(day.timeStart).toISOString(),
              timeEnd: new Date(day.timeEnd).toISOString(),
              ...(places.length > 0 && { placeIds: places }),
            };
          }),
        }),
    };
  }
}
