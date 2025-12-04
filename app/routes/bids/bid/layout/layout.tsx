import { Link, Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/layout";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";
import { useStore } from "~/store/store";

import { Tabs, Tab } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { EditIcon } from "~/shared/icons/EditIcon";

import { getBid } from "~/requests/_personal/getBid/getBid";
import type { GetBidSuccess } from "~/requests/_personal/getBid/getBidSuccess.type";

type MobileModeData = {
  mode: "mobile";
  bidData: GetBidSuccess["data"];
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (mode === "mobile") {
      const bidData = await getBid(accessToken, params.bidId);

      data = {
        mode: "mobile",
        bidData: bidData.data,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("request_layout");
  const [editMode, setEditMode] = useState<boolean>(false);

  return loaderData.mode === "mobile" ? (
    <>
      <TopNavigation
        header={{
          text: loaderData.bidData.viewActivity.name,
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/bids"), {
            viewTransition: true,
          });
        }}
        {...(!editMode && !location.pathname.includes("specialists")
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
          to={withLocale(`/bids/${loaderData.bidData.id}`)}
          value={withLocale(`/bids/${loaderData.bidData.id}`)}
          component={Link}
        />
        <Tab
          label={t("tabs.specialists")}
          to={withLocale(`/bids/${loaderData.bidData.id}/specialists`)}
          value={withLocale(`/bids/${loaderData.bidData.id}/specialists`)}
          component={Link}
        />
      </Tabs>
      <Outlet context={{ bidData: loaderData.bidData, editMode }} />
    </>
  ) : null;
}
