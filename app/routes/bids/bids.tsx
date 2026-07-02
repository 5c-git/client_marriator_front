import { useFetcher, useOutletContext } from "react-router";
import type { Route } from "./+types/bids";

import { isBefore } from "date-fns";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";

import { bidsContainer } from "./bids.module";
import { bidsTokens } from "./bids.tokens";

import { bidContainer } from "./bid/bid.module";
import { bidTokens } from "./bid/bid.tokens";

export async function clientLoader() {
  const bidsService = bidsContainer.get(bidsTokens.bidsService);

  return await bidsService.getBids();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const bidService = bidContainer.get(bidTokens.bidService);

  const fields = await request.json();

  await bidService.cancelBid(fields.bidId);
}

export default function Bids({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_bids");
  const showMap = useOutletContext<boolean>();
  const fetcher = useFetcher();

  return (
    <EntitiesListView
      translation="tasks"
      mapView={showMap}
      entityType="bid"
      entities={loaderData}
      sorting="ascending"
      entityListView={(entity) => (
        <EntityCard
          key={entity.id}
          to={withLocale(`/bids/${entity.id}`)}
          statusColor={entity.statusColor}
          header={`${t("cardHeader")} ${entity.subHeader}`}
          subHeader={{
            text: entity.header,
            bold: false,
          }}
          id={entity.id.toString()}
          address={entity.address}
          duration={entity.duration}
          divider
          {...(entity.status <= 2 &&
          entity.duration.start &&
          isBefore(new Date(), entity.duration.start)
            ? {
                buttonAction: {
                  action: () => {
                    fetcher.submit(
                      JSON.stringify({
                        bidId: entity.id,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      },
                    );
                  },
                  text: t("cancelBid"),
                  variant: "text",
                },
              }
            : {})}
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
          {...(entity.status <= 2 &&
          entity.duration.start &&
          isBefore(new Date(), entity.duration.start)
            ? {
                buttonAction: {
                  action: () => {
                    fetcher.submit(
                      JSON.stringify({
                        bidId: entity.id,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      },
                    );
                  },
                  text: t("cancelBid"),
                  variant: "text",
                },
              }
            : {})}
        />
      )}
    />
  );
}
