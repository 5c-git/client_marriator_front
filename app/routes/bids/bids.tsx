import { useFetcher, useOutletContext } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/bids";

import { addHours, isBefore } from "date-fns";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";
import { DashboardHeader } from "~/shared/ui/DashboardHeader/DashboardHeader";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";

import { bidsContainer } from "./bids.module";
import { bidsTokens } from "./bids.tokens";

import { bidContainer } from "./bid/bid.module";
import { bidTokens } from "./bid/bid.tokens";

export async function clientLoader() {
  const bidsService = bidsContainer.get(bidsTokens.bidsService);

  const bids = await bidsService.getBids();
  const userCancelInterval = await bidsService.getBidCancelInterval();

  return {
    bids,
    userCancelInterval,
  };
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

  const [bidToAct, setBidToAct] = useState<number | null>(null);

  return (
    <>
      <EntitiesListView
        translation="tasks"
        mapView={showMap}
        entityType="bid"
        entities={loaderData.bids}
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
            {...((entity.status == 1 || entity.status == 6) &&
            entity.createdAt &&
            isBefore(
              new Date(),
              addHours(entity.createdAt, loaderData.userCancelInterval),
            )
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
            {...((entity.status == 1 || entity.status == 6) &&
            entity.createdAt &&
            isBefore(
              new Date(),
              addHours(entity.createdAt, loaderData.userCancelInterval),
            )
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
      <Dialog
        open={bidToAct ? true : false}
        onClose={() => {
          setBidToAct(null);
        }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "400",
            fontSize: "1.125rem",
          }}
        >
          {bidToAct ? `${t("dialog.cancel")} ${t("dialog.title")} ?` : null}
          {}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setBidToAct(null);
            }}
          >
            {t("dialog.no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  bidId: bidToAct,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                },
              );
              setBidToAct(null);
            }}
          >
            {t("dialog.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
