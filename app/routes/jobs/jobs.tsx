import { useOutletContext } from "react-router";

import type { Route } from "./+types/jobs";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";
import type { EntitiesListViewInterface } from "~/shared/views/EntitiesListView/EntitesListViewInterface";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";

import { jobsContainer } from "./jobs.module";
import { jobsTokens } from "./jobs.tokens";

export async function clientLoader() {
  const jobsService = jobsContainer.get(jobsTokens.jobsService);

  const jobs = await jobsService.getJobs();
  const userRole = jobsService.getUserRole();

  return { jobs, userRole };
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_jobs");

  const showMap = useOutletContext<boolean>();

  return (
    <EntitiesListView
      translation="jobs"
      mapView={showMap}
      entities={loaderData.jobs}
      entityType="job"
      sorting="ascending"
      entityListView={(entity) => (
        <EntityCard
          key={entity.id + entity.userId}
          to={
            loaderData.userRole === "specialist"
              ? withLocale(`/jobs/${entity.id}/${entity.userId}`)
              : withLocale(`/bids/${entity.id}/specialists/${entity.userId}`)
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
  );
}
