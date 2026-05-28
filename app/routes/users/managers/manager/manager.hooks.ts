import { useMemo, useState } from "react";
import { useFetcher, useNavigate, useNavigation, useSubmit } from "react-router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import type { ClientLoaderData } from "./manager.mapper";

export type ManagerFormValues = {
  logo: string;
  phone: string;
  name: string;
  counterparty: { id: number; name: string }[];
  organizations: { id: number; logo: string; name: string }[];
  locations: { id: number; logo: string; address: string }[];
  change_task: Date;
  cancel_task: Date;
  live_task: Date;
  repeat_bid: Date;
  leave_bid: Date;
  notification_start: string;
};

type SupervisorFormValues = {
  searchbar: string;
  supervisors: string[];
};

function formatHHmm(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hh = hours >= 10 ? String(hours) : `0${hours}`;
  const mm = minutes >= 10 ? String(minutes) : `0${minutes}`;
  return `${hh}:${mm}`;
}

export function useManagerHooks(loaderData: ClientLoaderData) {
  const { t } = useTranslation("users_manager");
  const fetcher = useFetcher();
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [openCounterparty, setOpenCounterparty] = useState(false);
  const [searchSupervisors, setSearchSupervisors] = useState(false);
  const [selectedSupervisors, setSelectedSupervisors] = useState(
    loaderData.supervisorsToSelect,
  );

  const schema = useMemo(
    () =>
      z.object({
        logo: z.string({ error: t("text", { ns: "constructorFields" }) }),
        phone: z.string({ error: t("text", { ns: "constructorFields" }) }),
        name: z.string({ error: t("text", { ns: "constructorFields" }) }),
        counterparty: z
          .array(z.object({ id: z.number(), name: z.string() }))
          .min(1),
        organizations: z
          .array(z.object({ id: z.number(), logo: z.string(), name: z.string() }))
          .min(1),
        locations: z
          .array(z.object({ id: z.number(), logo: z.string(), address: z.string() }))
          .min(1),
        change_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        cancel_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        live_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        repeat_bid: z.date({ error: t("text", { ns: "constructorFields" }) }),
        leave_bid: z.date({ error: t("text", { ns: "constructorFields" }) }),
        notification_start: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
      }),
    [t],
  );

  const form = useForm<ManagerFormValues>({
    defaultValues: {
      logo: loaderData.client.logo ? loaderData.client.logo : "",
      phone: loaderData.client.phone,
      name: loaderData.client.name,
      counterparty: loaderData.client.counterparty,
      organizations: loaderData.client.organizations,
      locations: loaderData.client.locations,
      change_task: new Date(`2000-01-01T${loaderData.client.change_task}`),
      cancel_task: new Date(`2000-01-01T${loaderData.client.cancel_task}`),
      live_task: new Date(`2000-01-01T${loaderData.client.live_task}`),
      repeat_bid: new Date(`2000-01-01T${loaderData.client.repeat_bid}`),
      leave_bid: new Date(`2000-01-01T${loaderData.client.leave_bid}`),
      notification_start: loaderData.client.notification_start,
    },
    resolver: zodResolver(schema),
  });

  const supervisorForm = useForm<SupervisorFormValues>({
    defaultValues: {
      searchbar: "",
      supervisors: [],
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        supervisors: z.array(z.string()).min(1),
      }),
    ),
  });

  const onBack = () => {
    navigate(withLocale("/users/managers"), { viewTransition: true });
  };

  const onDecline = () => {
    submit(
      JSON.stringify({
        _action: "_decline",
        userId: loaderData.client.id,
        confirm: "0",
      }),
      { method: "POST", encType: "application/json" },
    );
  };

  const onSubmitConfirm = form.handleSubmit((values) => {
    submit(
      JSON.stringify({
        _action: "_confirm",
        userId: loaderData.client.id,
        confirm: "1",
        fields: {
          ...values,
          change_task: formatHHmm(new Date(form.getValues("change_task"))),
          cancel_task: formatHHmm(new Date(form.getValues("cancel_task"))),
          live_task: formatHHmm(new Date(form.getValues("live_task"))),
          repeat_bid: formatHHmm(new Date(form.getValues("repeat_bid"))),
          leave_bid: formatHHmm(new Date(form.getValues("leave_bid"))),
        },
      }),
      { method: "POST", encType: "application/json" },
    );
  });

  return {
    t,
    fetcher,
    isLoading: navigation.state !== "idle",
    open,
    setOpen,
    openCounterparty,
    setOpenCounterparty,
    searchSupervisors,
    setSearchSupervisors,
    selectedSupervisors,
    setSelectedSupervisors,
    form,
    supervisorForm,
    onBack,
    onDecline,
    onSubmitConfirm,
  };
}
