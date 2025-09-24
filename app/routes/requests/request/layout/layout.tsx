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

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const requestData = await getBid(accessToken, params.requestId);

    const request = requestData.data;

    return {
      request,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("request_layout");
  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <>
      <TopNavigation
        header={{
          text: loaderData.request.viewActivity.name,
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/requests"), {
            viewTransition: true,
          });
        }}
        {...(!editMode
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
          to={withLocale(`/requests/${loaderData.request.id}`)}
          value={withLocale(`/requests/${loaderData.request.id}`)}
          component={Link}
        />
        ,
        <Tab
          label={t("tabs.specialists")}
          to={withLocale(`/requests/${loaderData.request.id}/specialists`)}
          value={withLocale(`/requests/${loaderData.request.id}/specialists`)}
          component={Link}
        />
        ,
        {/*<Tab
          label={t("tabs.recruitment")}
          to={withLocale(`/requests/${loaderData.request.id}/recruitment`)}
          value={withLocale(`/requests/${loaderData.request.id}/recruitment`)}
          component={Link}
        />*/}
        ,
      </Tabs>

      <Outlet context={{ request: loaderData.request, editMode }} />
    </>
  );
}
