import { redirect, useSubmit, useNavigate } from "react-router";
import { useRef, useState } from "react";
import type { Route } from "./+types/manager";
import { withLocale } from "~/shared/withLocale";

import { managerContainer } from "~/routes/users/managers/manager/manager.module";
import { managerTokens } from "~/routes/users/managers/manager/manager.tokens";
import type { ManagerActionPayload } from "~/routes/users/managers/manager/manager.service";
import { ManagerView } from "./_views/ManagerView";
import { useTranslation } from "react-i18next";

import { CheckIcon } from "~/shared/icons/CheckIcon";
import { Button } from "@mui/material";
import { ManagerMapper } from "./manager.mapper";
import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

export const MANAGER_ACTIONS = {
  confirm: "confirm",
  saveLogo: "saveLogo",
  inviteSupervisors: "inviteSupervisors",
  setCounterparty: "setCounterparty",
  deleteCounterparty: "deleteCounterparty",
  deleteProject: "deleteProject",
  deletePlace: "deletePlace",
  deleteSupervisor: "deleteSupervisor",
  decline: "decline",
} as const;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await managerContainer
    .get(managerTokens.managerService)
    .getManagerData(Number(params.user));
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const payload = await request.json();
  await managerContainer
    .get(managerTokens.managerService)
    .handleAction(payload);

  if (
    payload._action === MANAGER_ACTIONS.confirm ||
    payload._action === MANAGER_ACTIONS.decline
  ) {
    throw redirect(withLocale("/users"));
  }
}

export default function Manager({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_users_manager");
  const submit = useSubmit();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const [openSupervisors, setOpenSupervisors] = useState(false);
  const [openCounterparty, setOpenCounterparty] = useState(false);

  return (
    <>
      <ManagerView
        data={loaderData}
        ref={formRef}
        onBack={() => {
          navigate(withLocale("/users/managers"), { viewTransition: true });
        }}
        onSubmit={(values) => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.confirm,
              userId: loaderData.client.id,
              confirm: "1",
              fields: {
                ...values,
                change_task: ManagerMapper.formatHHmm(values.change_task),
                cancel_task: ManagerMapper.formatHHmm(values.cancel_task),
                live_task: ManagerMapper.formatHHmm(values.live_task),
                repeat_bid: ManagerMapper.formatHHmm(values.repeat_bid),
                leave_bid: ManagerMapper.formatHHmm(values.leave_bid),
              },
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onSaveLogo={(values) => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.saveLogo,
              values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onDeleteCounterparty={(values) => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.deleteCounterparty,
              values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onDeleteProject={(values) => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.deleteProject,
              values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onDeletePlace={(values) => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.deletePlace,
              values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onDeleteSupervisor={(values) => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.deleteSupervisor,
              values,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onDecline={() => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.decline,
              userId: loaderData.client.id,
              confirm: "0",
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        supervisorsActionSlot={
          <Button variant="outlined" onClick={() => setOpenSupervisors(true)}>
            {t("supervisorInviteButton")}
          </Button>
        }
        counterpartyActionSlot={
          <Button onClick={() => setOpenCounterparty(true)} variant="outlined">
            {t("counterpartySelector")}
          </Button>
        }
        bottomSlot={
          loaderData.client.userRole === "admin" ? (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.requestSubmit();
                  }
                }}
                startIcon={<CheckIcon />}
              >
                {loaderData.client.confirmRegister
                  ? t("saveButton")
                  : t("confirmButton")}
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  submit(
                    JSON.stringify({
                      _action: MANAGER_ACTIONS.decline,
                      userId: loaderData.client.id,
                      confirm: "0",
                    }),
                    { method: "POST", encType: "application/json" },
                  );
                }}
              >
                {t("excludeButton")}
              </Button>
            </>
          ) : null
        }
      />

      <CheckboxSearchableDrawer
        translation="supervisor"
        open={openSupervisors}
        onClose={() => setOpenSupervisors(false)}
        onSubmit={(supervisors) => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.inviteSupervisors,
              userId: loaderData.client.id,
              supervisors,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        items={loaderData.supervisorsToSelect}
        value={loaderData.supervisorsToSelect.map((item) => item.value)}
      />

      <CheckboxSearchableDrawer
        translation="counterparty"
        open={openCounterparty}
        onClose={() => setOpenCounterparty(false)}
        onSubmit={(counterparties) => {
          submit(
            JSON.stringify({
              _action: MANAGER_ACTIONS.setCounterparty,
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
