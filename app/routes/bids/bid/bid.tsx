import { useMemo, useState } from "react";
import { useOutletContext, useFetcher } from "react-router";
import type { Route } from "./+types/bid";
import type { GetBidSuccess } from "~/api/_personal/getBid/getBidSuccess.schema";
import type { BidMobileViewInterface } from "./_views/BidMobileView/BidMobileViewInterface";

import { useTranslation } from "react-i18next";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
} from "@mui/material";

import { BidFormMobileView } from "./_views/BidMobileView/BidFormMobileView";
import { BidStaticMobileView } from "./_views/BidMobileView/BidStaticMobileView";

import { bidsContainer } from "../bids.module";
import { bidsTokens } from "../bids.tokens";

import { bidContainer } from "./bid.module";
import { bidTokens } from "./bid.tokens";
import { BidMapper } from "./bid.mapper";
import { addHours, isBefore } from "date-fns";

const BID_ACTIONS = {
  update: "update",
  cancel: "cancel",
} as const;

export async function clientLoader() {
  const bidsService = bidsContainer.get(bidsTokens.bidsService);
  const bidService = bidContainer.get(bidTokens.bidService);

  const locations = await bidService.getPlaceOptions();
  const radiuses = await bidService.getRadiusOptions();
  const defaultTimeRange = await bidService.getDefaultTimeRange();
  const userCancelInterval = await bidsService.getBidCancelInterval();

  return { locations, radiuses, defaultTimeRange, userCancelInterval };
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const bidService = bidContainer.get(bidTokens.bidService);

  const { _action, ...fields } = await request.json();

  if (_action === BID_ACTIONS.update) {
    await bidService.updateBid(fields.payload);
  } else if (_action === BID_ACTIONS.cancel) {
    // ошибка отмены не должна уводить на страницу ошибки — показываем её в карточке
    try {
      const data = await bidService.cancelBid(params.bidId);

      if (!data.data.success) {
        return { cancelError: true };
      }
    } catch (error) {
      if (error instanceof Response && error.status === 401) {
        throw error;
      }

      return { cancelError: true };
    }
  }
}

export default function Bid({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation(["m_bids_bid", "m_bids"]);
  const fetcher = useFetcher<{ cancelError?: boolean }>();
  const { bidMobileData, editMode, projectTimeRange } = useOutletContext<{
    bidMobileData: GetBidSuccess["data"];
    editMode: boolean;
    projectTimeRange: {
      start: string;
      end: string;
    };
  }>();

  // пересчитываем после перезагрузки loader'а, иначе после отмены карточка показывает старый статус
  const bid = useMemo<BidMobileViewInterface["entity"] | null>(
    () => BidMapper.mapDataToBid(bidMobileData),
    [bidMobileData],
  );

  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [cancelExpired, setCancelExpired] = useState<boolean>(false);

  const isDesktop = window.innerWidth >= 768 ? true : false;

  const canCancelBid = () =>
    bid &&
    (bid.status == 1 || bid.status == 6) &&
    bid.createdAt &&
    isBefore(new Date(), addHours(bid.createdAt, loaderData.userCancelInterval))
      ? true
      : false;

  return (
    <>
      {bid ? (
        <>
          {editMode ? (
            <BidFormMobileView
              entity={bid}
              locations={loaderData.locations}
              radiuses={loaderData.radiuses}
              defaultTimeRange={
                bidMobileData.project.timeStart && bidMobileData.project.timeEnd
                  ? {
                      start: new Date(
                        `2026-03-12T${bidMobileData.project.timeStart}:00`,
                      ),
                      end: new Date(
                        `2026-03-12T${bidMobileData.project.timeEnd}:00`,
                      ),
                    }
                  : loaderData.defaultTimeRange
              }
              projectTimeRange={{
                start: new Date(projectTimeRange.start),
                end: new Date(projectTimeRange.end),
              }}
              submitAction={(values) => {
                const payload = BidMapper.mapFormValuesToPayload(
                  bidMobileData.id,
                  values,
                );

                fetcher.submit(
                  JSON.stringify({
                    _action: BID_ACTIONS.update,
                    payload,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              }}
            />
          ) : (
            <BidStaticMobileView
              entity={bid}
              locations={loaderData.locations}
              radiuses={loaderData.radiuses}
              defaultTimeRange={
                bidMobileData.project.timeStart && bidMobileData.project.timeEnd
                  ? {
                      start: new Date(
                        `2026-03-12T${bidMobileData.project.timeStart.startsWith("0") ? bidMobileData.project.timeStart : `0${bidMobileData.project.timeStart}`}:00`,
                      ),
                      end: new Date(
                        `2026-03-12T${bidMobileData.project.timeEnd.startsWith("0") ? bidMobileData.project.timeEnd : `0${bidMobileData.project.timeEnd}`}:00`,
                      ),
                    }
                  : loaderData.defaultTimeRange
              }
              projectTimeRange={{
                start: new Date(projectTimeRange.start),
                end: new Date(projectTimeRange.end),
              }}
              {...(canCancelBid() && isDesktop
                ? {
                    cancelAction: () => {
                      setCancelDialogOpen(true);
                    },
                    cancelDisabled: fetcher.state !== "idle",
                  }
                : {})}
            />
          )}
        </>
      ) : null}

      <Dialog
        open={cancelDialogOpen}
        onClose={() => {
          setCancelDialogOpen(false);
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
          {`${t("dialog.cancel", { ns: "m_bids" })} ${t("dialog.title", { ns: "m_bids" })} ?`}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setCancelDialogOpen(false);
            }}
          >
            {t("dialog.no", { ns: "m_bids" })}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setCancelDialogOpen(false);

              // интервал мог истечь, пока открыта модалка — тогда на сервер не идём
              if (!canCancelBid()) {
                setCancelExpired(true);
                return;
              }

              fetcher.submit(
                JSON.stringify({
                  _action: BID_ACTIONS.cancel,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                },
              );
            }}
          >
            {t("dialog.yes", { ns: "m_bids" })}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        // пока идёт повторный запрос — скрыт; иначе reset по таймеру сбросил бы state в idle посреди запроса
        open={
          (fetcher.state === "idle" && fetcher.data?.cancelError) ||
          cancelExpired
            ? true
            : false
        }
        autoHideDuration={3000}
        onClose={() => {
          if (fetcher.state === "idle") {
            fetcher.reset();
          }
          setCancelExpired(false);
        }}
      >
        <Alert
          severity="error"
          variant="small"
          sx={{
            width: "100%",
          }}
        >
          {cancelExpired ? t("cancelExpiredAlert") : t("cancelErrorAlert")}
        </Alert>
      </Snackbar>
    </>
  );
}
