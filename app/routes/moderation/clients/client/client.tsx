import { redirect, useNavigate, useSubmit } from "react-router";
import type { Route } from "./+types/client";
import { useState } from "react";

import { withLocale } from "~/shared/withLocale";

import { useTranslation } from "react-i18next";

import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { Button } from "@mui/material";

import { clientContainer } from "./client.module";
import { clientTokens } from "./client.tokens";
import { ClientView } from "./_views/ClientView";
import { ClientMapper } from "./client.mapper";

export const CLIENT_ACTIONS = {
  confirm: "confirm",
  saveLogo: "saveLogo",
  setCounterparty: "setCounterparty",
  deleteCounterparty: "deleteCounterparty",
  deleteProject: "deleteProject",
  deletePlace: "deletePlace",
  decline: "decline",
} as const;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await clientContainer
    .get(clientTokens.clientService)
    .getClientData(Number(params.user));
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const payload = await request.json();
  await clientContainer.get(clientTokens.clientService).handleAction(payload);

  if (
    payload._action === CLIENT_ACTIONS.confirm ||
    payload._action === CLIENT_ACTIONS.decline
  ) {
    throw redirect(withLocale("/moderation/clients"));
  }
}

export default function Client({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_users_client");
  const navigate = useNavigate();
  const submit = useSubmit();

  const [openCounterparty, setOpenCounterparty] = useState(false);

  return (
    <>
      <ClientView
        data={loaderData}
        onBack={() => {
          navigate(withLocale("/moderation/clients"), { viewTransition: true });
        }}
        onSubmit={(values) => {
          submit(
            JSON.stringify({
              _action: CLIENT_ACTIONS.confirm,
              userId: loaderData.client.id,
              confirm: "1",
              fields: {
                ...values,
                change_order: ClientMapper.formatHHmm(values.change_order),
                cancel_order: ClientMapper.formatHHmm(values.cancel_order),
                live_order: ClientMapper.formatHHmm(values.live_order),
              },
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onSubmitLogo={(values) => {
          submit(
            JSON.stringify({
              _action: CLIENT_ACTIONS.saveLogo,
              ...values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onDeleteCounterparty={(values) => {
          submit(
            JSON.stringify({
              _action: CLIENT_ACTIONS.deleteCounterparty,
              ...values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onProjectSelect={() => {
          navigate(
            withLocale(`/moderation/${loaderData.client.id}/select-projects`),
            {
              viewTransition: true,
              state: {
                from: `/moderation/clients/${loaderData.client.id}`,
              },
            },
          );
        }}
        onDeleteProject={(values) => {
          submit(
            JSON.stringify({
              _action: CLIENT_ACTIONS.deleteProject,
              ...values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onLocationSelect={() => {
          navigate(
            withLocale(`/moderation/${loaderData.client.id}/select-locations`),
            {
              viewTransition: true,
              state: {
                from: `/moderation/clients/${loaderData.client.id}`,
              },
            },
          );
        }}
        onDeletePlace={(values) => {
          submit(
            JSON.stringify({
              _action: CLIENT_ACTIONS.deletePlace,
              ...values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        counterpartyActionSlot={
          <Button onClick={() => setOpenCounterparty(true)} variant="outlined">
            {t("counterpartySelector")}
          </Button>
        }
        bottomSlot={
          loaderData.client.userRole === "admin" ? (
            <Button
              variant="text"
              onClick={() => {
                submit(
                  JSON.stringify({
                    _action: CLIENT_ACTIONS.decline,
                    userId: loaderData.client.id,
                    confirm: "0",
                  }),
                  { method: "POST", encType: "application/json" },
                );
              }}
            >
              {t("excludeButton")}
            </Button>
          ) : null
        }
      />

      <CheckboxSearchableDrawer
        translation="counterparty"
        open={openCounterparty}
        onClose={() => setOpenCounterparty(false)}
        onSubmit={(counterparties) => {
          submit(
            JSON.stringify({
              _action: CLIENT_ACTIONS.setCounterparty,
              userId: loaderData.client.id,
              counterparties,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        items={loaderData.counterparty}
        value={loaderData.client.counterparty.map((item) => item.id.toString())}
      />
    </>
  );
}
