import { useNavigate, useParams } from "react-router";

import type { Route } from "./+types/jobs";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { DashboardView } from "~/shared/views/EntitiesList/DashboardView";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { EntityCell } from "~/shared/ui/EntityCell/EntityCell";

import { jobsContainer } from "../jobs.module";
import { jobsTokens } from "../jobs.tokens";

export async function clientLoader() {
  const jobsService = jobsContainer.get(jobsTokens.jobsService);

  const jobs = await jobsService.getJobs();
  const userRole = jobsService.getUserRole();

  return { jobs, userRole };
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_jobs");
  const navigate = useNavigate();

  const view = useStore((state) => state.entitiesView);
  const setView = useStore((state) => state.setEntitiesView);

  const { jobId, bidId } = useParams();

  console.log(bidId);

  return (
    <>
      <DashboardView
        translation="jobs"
        view={view}
        setView={setView}
        entityType="job"
        entities={loaderData.jobs}
        sorting="ascending"
        entityListView={(entity) => (
          <EntityCard
            key={entity.id + entity.userId}
            isActive={
              (jobId && Number(jobId)) === entity.id ||
              (bidId && Number(bidId)) === entity.id
                ? true
                : false
            }
            to={
              loaderData.userRole === "specialist"
                ? withLocale(`/dashboard/jobs/${entity.id}/${entity.userId}`)
                : withLocale(
                    `/dashboard/jobs/${entity.id}/specialists/${entity.userId}`,
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
        entityTableView={(entity) => (
          <EntityCell
            key={entity.id}
            to={
              loaderData.userRole === "specialist"
                ? withLocale(`/dashboard/jobs/${entity.id}/${entity.userId}`)
                : withLocale(
                    `/dashboard/jobs/${entity.id}/specialists/${entity.userId}`,
                  )
            }
            id={entity.id.toString()}
            logo={entity.address.logo}
            name={entity.placeName}
            address={entity.address.text}
            isActive={
              (jobId && Number(jobId)) === entity.id ||
              (bidId && Number(bidId)) === entity.id
                ? true
                : false
            }
          />
        )}
        entityMapView={(entity) => {
          if (loaderData.userRole === "specialist") {
            navigate(
              withLocale(`/dashboard/jobs/${entity.id}/${entity.userId}`),
            );
          } else {
            navigate(
              withLocale(
                `/dashboard/jobs/${entity.id}/specialists/${entity.userId}`,
              ),
            );
          }
        }}
      />
    </>
  );
}
