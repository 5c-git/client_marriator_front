import { useState } from "react";
import { useOutletContext, useFetcher } from "react-router";
import type { Route } from "./+types/bid";
import type { GetBidSuccess } from "~/api/_personal/getBid/getBidSuccess.schema";
import type { BidMobileViewInterface } from "./_views/BidMobileView/BidMobileViewInterface";

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
    await bidService.cancelBid(params.bidId);
  }
}

export default function Bid({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const { bidMobileData, editMode, projectTimeRange } = useOutletContext<{
    bidMobileData: GetBidSuccess["data"];
    editMode: boolean;
    projectTimeRange: {
      start: string;
      end: string;
    };
  }>();

  const [bid] = useState<BidMobileViewInterface["entity"] | null>(
    BidMapper.mapDataToBid(bidMobileData),
  );

  const isDesktop = window.innerWidth >= 768 ? true : false;

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
              {...((bid.status == 1 || bid.status == 6) &&
              bid.createdAt &&
              isBefore(
                new Date(),
                addHours(bid.createdAt, loaderData.userCancelInterval),
              ) &&
              isDesktop
                ? {
                    cancelAction: () => {
                      fetcher.submit(
                        JSON.stringify({
                          _action: BID_ACTIONS.cancel,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        },
                      );
                    },
                  }
                : {})}
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
            />
          )}
        </>
      ) : null}
    </>
  );
}
