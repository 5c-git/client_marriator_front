import { useOutletContext, useNavigation } from "react-router";
import type { Route } from "./+types/bids";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { statusCodeMap } from "~/shared/status";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";
import type { EntitiesListViewInterface } from "~/shared/views/EntitiesListView/EntitesListViewInterface";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { Loader } from "~/shared/ui/Loader/Loader";

import { getBids } from "~/requests/_personal/getBids/getBids";

type MobileModeData = {
  mode: "mobile";
  bids: EntitiesListViewInterface["entities"];
};

export async function clientLoader() {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  const bids: EntitiesListViewInterface["entities"] = [];

  if (accessToken) {
    if (mode === "mobile") {
      const bidsData = await getBids(accessToken);

      bidsData.data.forEach((item) => {
        const earliestStartDate: string[] = [];
        const latestEndDate: string[] = [];

        earliestStartDate.push(item.dateStart);
        latestEndDate.push(item.dateEnd);

        earliestStartDate.sort(
          (a, b) => new Date(a).valueOf() - new Date(b).valueOf(),
        );

        latestEndDate.sort(
          (a, b) => new Date(b).valueOf() - new Date(a).valueOf(),
        );

        bids.push({
          id: item.id,
          userId: item.user.id,
          status: item.status,
          statusColor: statusCodeMap[item.status].color,
          header: item.viewActivity.name,
          subHeader: "1",
          address: {
            logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
            text: item.place.address_kladr,
          },
          duration: {
            start: item.dateStart,
            end: item.dateEnd,
          },
          coordinates: [
            Number(item.place.latitude),
            Number(item.place.longitude),
          ],
        });
      });

      data = {
        mode: "mobile",
        bids: bids,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Bids({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("bids");
  const navigation = useNavigation();

  const showMap = useOutletContext<boolean>();

  return (
    <>
      {loaderData.mode === "mobile" ? (
        <>
          {navigation.state !== "idle" ? <Loader /> : null}{" "}
          <EntitiesListView
            translation="tasks"
            mapView={showMap}
            entities={loaderData.bids}
            entityListView={(entity) => (
              <EntityCard
                key={entity.id}
                to={withLocale(`/bids/${entity.id}`)}
                statusColor={entity.statusColor}
                header={`${t("cardHeader")} ${entity.header}`}
                subHeader={{
                  text: entity.subHeader,
                  bold: false,
                }}
                id={entity.id.toString()}
                address={entity.address}
                duration={entity.duration}
                divider
              />
            )}
            entityMapView={(entity) => (
              <EntityCard
                to={withLocale(`/bids/${entity.id}`)}
                header={`${t("cardHeader")} ${entity.header}`}
                subHeader={{
                  text: entity.subHeader,
                  bold: false,
                }}
                id={entity.id.toString()}
                address={entity.address}
                duration={entity.duration}
                divider
              />
            )}
          />
        </>
      ) : null}
    </>
  );
}
