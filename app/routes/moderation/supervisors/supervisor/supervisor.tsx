import { redirect, useNavigate, useSubmit } from "react-router";
import type { Route } from "./+types/supervisor";

import { useState } from "react";

import { withLocale } from "~/shared/withLocale";

import { SupervisorView } from "./_views/SupervisorView";
import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { Button, IconButton } from "@mui/material";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

import { supervisorContainer } from "./supervisor.module";
import { supervisorTokens } from "./supervisor.tokens";
import type { SupervisorActionPayload } from "./supervisor.service";
import { SupervisorMapper } from "./supervisor.mapper";
import { useTranslation } from "react-i18next";
import { CheckIcon } from "~/shared/icons/CheckIcon";

export const SUPERVISOR_ACTIONS = {
  confirm: "confirm",
  decline: "decline",
  saveLogo: "saveLogo",
  deleteProject: "deleteProject",
  deletePlace: "deletePlace",
  inviteManagers: "inviteManagers",
  deleteManager: "deleteManager",
  setCounterparty: "setCounterparty",
  deleteCounterparty: "deleteCounterparty",
} as const;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await supervisorContainer
    .get(supervisorTokens.supervisorService)
    .getSupervisorData(Number(params.user));
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const payload = (await request.json()) as SupervisorActionPayload;
  await supervisorContainer
    .get(supervisorTokens.supervisorService)
    .handleAction(payload);

  if (
    payload._action === SUPERVISOR_ACTIONS.confirm ||
    payload._action === SUPERVISOR_ACTIONS.decline
  ) {
    throw redirect(withLocale("/moderation/supervisors"));
  }
}

export default function Supervisor({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_users_supervisor");
  const navigate = useNavigate();
  const submit = useSubmit();

  const [searchManagers, setSearchManagers] = useState(false);
  const [openCounterparty, setOpenCounterparty] = useState(false);

  return (
    <>
      <SupervisorView
        data={loaderData}
        onBack={() => {
          navigate(withLocale("/moderation/supervisors"), {
            viewTransition: true,
          });
        }}
        onSubmit={(values) => {
          submit(
            JSON.stringify({
              _action: SUPERVISOR_ACTIONS.confirm,
              userId: loaderData.client.id,
              confirm: "1",
              fields: {
                ...values,
                repeat_bid: SupervisorMapper.formatHHmm(values.repeat_bid),
                leave_bid: SupervisorMapper.formatHHmm(values.leave_bid),
                live_task: SupervisorMapper.formatHHmm(values.live_task),
                refusal_task: SupervisorMapper.formatHHmm(values.refusal_task),
              },
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onSaveLogo={(values) => {
          submit(
            JSON.stringify({
              _action: SUPERVISOR_ACTIONS.saveLogo,
              values,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        onDeleteProject={(values) => {
          submit(
            JSON.stringify({
              _action: SUPERVISOR_ACTIONS.deleteProject,
              values,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        onDeletePlace={(values) => {
          submit(
            JSON.stringify({
              _action: SUPERVISOR_ACTIONS.deletePlace,
              values,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        onDeleteCounterparty={(values) => {
          submit(
            JSON.stringify({
              _action: SUPERVISOR_ACTIONS.deleteCounterparty,
              values,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        managersActionSlot={
          loaderData.client.userRole === "admin" ? (
            <Button
              variant="outlined"
              onClick={() => {
                setSearchManagers(true);
              }}
            >
              {t("managerInviteButton")}
            </Button>
          ) : null
        }
        deleteManagerSlot={(values) =>
          loaderData.client.userRole === "admin" ? (
            <IconButton
              onClick={() => {
                submit(
                  JSON.stringify({
                    _action: SUPERVISOR_ACTIONS.deleteManager,
                    userId: loaderData.client.id,
                    managerId: values.managerId,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              }}
              sx={{
                width: "24px",
                height: "24px",
              }}
            >
              <DeleteIcon
                sx={{
                  width: "12px",
                  height: "12px",
                }}
              />
            </IconButton>
          ) : null
        }
        counterpartyActionSlot={
          <Button
            onClick={() => {
              setOpenCounterparty(true);
            }}
            variant="outlined"
          >
            {t("counterpartySelector")}
          </Button>
        }
        bottomSlot={
          loaderData.client.userRole === "admin" ||
          loaderData.client.userRole === "manager" ? (
            <>
              {" "}
              <Button
                variant="contained"
                type="submit"
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
                      _action: SUPERVISOR_ACTIONS.decline,
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
        translation="manager"
        open={searchManagers}
        onSubmit={(value) => {
          submit(
            JSON.stringify({
              _action: SUPERVISOR_ACTIONS.inviteManagers,
              userId: loaderData.client.id,
              managers: value,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        onClose={() => {
          setSearchManagers(false);
        }}
        value={loaderData.managersToSelect.map((item) => item.value)}
        items={loaderData.managersToSelect}
      />

      <CheckboxSearchableDrawer
        translation="counterparty"
        open={openCounterparty}
        onClose={() => {
          setOpenCounterparty(false);
        }}
        onSubmit={(counterparties) => {
          submit(
            JSON.stringify({
              _action: SUPERVISOR_ACTIONS.setCounterparty,
              userId: loaderData.client.id,
              counterparties,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        items={loaderData.counterparty}
        value={loaderData.client.counterparty.map((item) => item.id.toString())}
      />
    </>
  );
}
