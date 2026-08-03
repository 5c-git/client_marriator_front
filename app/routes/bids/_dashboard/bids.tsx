import { useFetcher, useNavigate, useParams } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/bids";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { DashboardHeader } from "~/shared/ui/DashboardHeader/DashboardHeader";
import { DashboardView } from "~/shared/views/EntitiesList/DashboardView";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { EntityCell } from "~/shared/ui/EntityCell/EntityCell";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { bidsContainer } from "../bids.module";
import { bidsTokens } from "../bids.tokens";

import { bidContainer } from "../bid/bid.module";
import { bidTokens } from "../bid/bid.tokens";

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

  const navigate = useNavigate();
  const fetcher = useFetcher();

  const view = useStore((state) => state.entitiesView);
  const setView = useStore((state) => state.setEntitiesView);

  const [bidToAct, setBidToAct] = useState<number | null>(null);

  const { bidId } = useParams();

  return (
    <>
      <DashboardHeader header={t("bids")} />

      <DashboardView
        translation="tasks"
        view={view}
        setView={setView}
        entityType="bid"
        entities={loaderData.bids}
        sorting="ascending"
        entityListView={(entity) => (
          <EntityCard
            key={entity.id}
            to={withLocale(`/dashboard/bids/${entity.id}`)}
            statusColor={entity.statusColor}
            isActive={bidId && Number(bidId) === entity.id ? true : false}
            header={`${t("cardHeader")} ${entity.subHeader}`}
            subHeader={{
              text: entity.header,
              bold: false,
            }}
            id={entity.id.toString()}
            address={entity.address}
            duration={entity.duration}
            divider
          />
        )}
        entityTableView={(entity) => (
          <EntityCell
            key={entity.id}
            to={withLocale(`/dashboard/bids/${entity.id}`)}
            id={entity.id.toString()}
            logo={entity.address.logo}
            name={entity.placeName}
            address={entity.address.text}
            isActive={bidId && Number(bidId) === entity.id ? true : false}
          />
        )}
        entityMapView={(entity) => {
          navigate(withLocale(`/dashboard/bids/${entity.id}`));
        }}
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
