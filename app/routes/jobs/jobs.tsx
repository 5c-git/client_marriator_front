import { useOutletContext, useNavigation } from "react-router";

import type { Route } from "./+types/jobs";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { statusCodeMap } from "~/shared/specialistStatus";

import { useStore } from "~/store/store";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";
import type { EntitiesListViewInterface } from "~/shared/views/EntitiesListView/EntitesListViewInterface";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { Loader } from "~/shared/ui/Loader/Loader";

import { getJobs } from "~/api/_personal/getJobs/getJobs";

type MobileModeData = {
  mode: "mobile";
  jobs: EntitiesListViewInterface["entities"];
};

export async function clientLoader() {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  const jobs: EntitiesListViewInterface["entities"] = [];

  if (accessToken) {
    if (mode === "mobile") {
      const jobsData = await getJobs(accessToken);

      jobsData.data.sort(
        (a, b) =>
          new Date(a.dateStart).valueOf() - new Date(b.dateEnd).valueOf(),
      );

      jobsData.data.forEach((item) => {
        jobs.push({
          id: item.id,
          userId: item.acceptingUser.id,
          status: item.acceptingUser.status,
          statusColor: statusCodeMap[item.acceptingUser.status].color,
          header: item.viewActivity.name,
          subHeader: item.price.toString(),
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
          units: item.viewActivity.standard.name,
          currency: "₽",
        });
      });

      data = {
        mode: "mobile",
        jobs: jobs,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("jobs");
  const navigation = useNavigation();

  const showMap = useOutletContext<boolean>();
  const userRole = useStore().userRole;

  return (
    <>
      {loaderData.mode === "mobile" ? (
        <>
          {navigation.state !== "idle" ? <Loader /> : null}{" "}
          <EntitiesListView
            translation="jobs"
            mapView={showMap}
            entities={loaderData.jobs}
            entityType="job"
            entityListView={(entity) => (
              <EntityCard
                key={entity.id + entity.userId}
                to={
                  userRole === "specialist"
                    ? withLocale(`/jobs/${entity.id}/${entity.userId}`)
                    : withLocale(
                        `/bids/${entity.id}/specialists/${entity.userId}`,
                      )
                }
                status={
                  entity.status === 1 || entity.status === 4
                    ? t("bidStatus")
                    : t("jobStatus")
                }
                statusColor={entity.statusColor}
                // header={`${t("cardHeader")} ${entity.header}`}
                header={entity.header}
                subHeader={{
                  text: t("amount", {
                    price: entity.subHeader,
                    curency: entity.currency,
                    measure: entity.units,
                  }),
                  bold: true,
                }}
                id={entity.id.toString()}
                address={entity.address}
                duration={entity.duration}
              />
            )}
            entityMapView={(entity) => (
              <EntityCard
                to={withLocale(`/jobs/${entity.id}/${entity.userId}`)}
                status={
                  entity.status === 1 || entity.status === 4
                    ? t("bidStatus")
                    : t("jobStatus")
                }
                header={`${t("cardHeader")} ${entity.header}`}
                subHeader={{
                  text: t("amount", {
                    price: entity.subHeader,
                    curency: entity.currency,
                    measure: entity.units,
                  }),
                  bold: true,
                }}
                id={entity.id.toString()}
                address={entity.address}
                duration={entity.duration}
              />
            )}
          />
        </>
      ) : null}
    </>
  );
}
