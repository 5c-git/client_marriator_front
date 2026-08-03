import { Link, Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/BidLayout";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import { isBefore } from "date-fns";

import { withLocale } from "~/shared/withLocale";

import { Tabs, Tab } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { EditIcon } from "~/shared/icons/EditIcon";

import { bidContainer } from "../../bid.module";
import { bidTokens } from "../../bid.tokens";

export function shouldRevalidate() {
  return true;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const bidService = bidContainer.get(bidTokens.bidService);

  return await bidService.getBid(params.bidId);
}

export default function BidLayout({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("m_bids_bid");
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <>
      <TopNavigation
        header={{
          text: loaderData.data.viewActivity.name,
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/bids"), {
            viewTransition: true,
          });
        }}
        {...(!editMode &&
        !location.pathname.includes("specialists") &&
        loaderData.data.status <= 2 &&
        isBefore(new Date(), loaderData.data.dateStart)
          ? {
              buttonAction: {
                text: "",
                icon: (
                  <EditIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                ),
                action: () => {
                  setEditMode(true);
                },
              },
            }
          : {})}
        style={{
          boxShadow: "none",
        }}
      />
      <Tabs
        value={location.pathname}
        sx={{
          width: "100%",
        }}
      >
        <Tab
          label={t("tabs.details")}
          to={withLocale(`/dashboard/bids/${loaderData.data.id}`)}
          value={withLocale(`/dashboard/bids/${loaderData.data.id}`)}
          component={Link}
        />
        <Tab
          label={t("tabs.specialists")}
          to={withLocale(`/dashboard/bids/${loaderData.data.id}/specialists`)}
          value={withLocale(
            `/dashboard/bids/${loaderData.data.id}/specialists`,
          )}
          component={Link}
        />
      </Tabs>
      <Outlet
        key={loaderData.data.id}
        context={{
          bidMobileData: loaderData.data,
          editMode,
          projectTimeRange: {
            start: loaderData.data.project.dateStart,
            end: loaderData.data.project.dateEnd,
          },
        }}
      />
    </>
  );
}
