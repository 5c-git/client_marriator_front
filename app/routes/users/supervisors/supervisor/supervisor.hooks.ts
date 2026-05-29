import { useMemo, useState } from "react";
import { useFetcher, useNavigate, useNavigation, useSubmit } from "react-router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import type { SupervisorLoaderData } from "./supervisor.mapper";

export type SupervisorFormValues = {
  logo: string;
  phone: string;
  name: string;
  counterparty: { id: number; name: string }[];
  organizations: { id: number; logo: string; name: string }[];
  locations: { id: number; logo: string; address: string }[];
  repeat_bid: Date;
  leave_bid: Date;
  live_task: Date;
  waiting_task: string;
  refusal_task: Date;
  count_wait_bid: string;
  time_answer_bid: string;
  notification_start: string;
};

type ManagerFormValues = {
  searchbar: string;
  managers: string[];
};

function formatHHmm(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hh = hours >= 10 ? String(hours) : `0${hours}`;
  const mm = minutes >= 10 ? String(minutes) : `0${minutes}`;
  return `${hh}:${mm}`;
}

export function useSupervisorHooks(loaderData: SupervisorLoaderData) {
  const { t } = useTranslation("users_supervisor");
  const fetcher = useFetcher();
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [openCounterparty, setOpenCounterparty] = useState(false);
  const [searchManagers, setSearchManagers] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState(
    loaderData.managersToSelect,
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
        repeat_bid: z.date({ error: t("text", { ns: "constructorFields" }) }),
        leave_bid: z.date({ error: t("text", { ns: "constructorFields" }) }),
        live_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        waiting_task: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
        refusal_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        count_wait_bid: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
        time_answer_bid: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
        notification_start: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
      }),
    [t],
  );

  const form = useForm<SupervisorFormValues>({
    defaultValues: {
      logo: loaderData.client.logo ? loaderData.client.logo : "",
      phone: loaderData.client.phone,
      name: loaderData.client.name,
      counterparty: loaderData.client.counterparty,
      organizations: loaderData.client.organizations,
      locations: loaderData.client.locations,
      repeat_bid: new Date(`2000-01-01T${loaderData.client.repeat_bid}`),
      leave_bid: new Date(`2000-01-01T${loaderData.client.leave_bid}`),
      live_task: new Date(`2000-01-01T${loaderData.client.live_task}`),
      waiting_task: loaderData.client.waiting_task
        ? loaderData.client.waiting_task.toString()
        : "",
      refusal_task: new Date(`2000-01-01T${loaderData.client.refusal_task}`),
      count_wait_bid: loaderData.client.count_wait_bid.toString(),
      time_answer_bid: loaderData.client.time_answer_bid.toString(),
      notification_start: loaderData.client.notification_start.toString(),
    },
    resolver: zodResolver(schema),
  });

  const managerForm = useForm<ManagerFormValues>({
    defaultValues: {
      searchbar: "",
      managers: [],
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        managers: z.array(z.string()).min(1),
      }),
    ),
  });

  const onBack = () => {
    navigate(withLocale("/users/supervisors"), { viewTransition: true });
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
          repeat_bid: formatHHmm(new Date(form.getValues("repeat_bid"))),
          leave_bid: formatHHmm(new Date(form.getValues("leave_bid"))),
          live_task: formatHHmm(new Date(form.getValues("live_task"))),
          refusal_task: formatHHmm(new Date(form.getValues("refusal_task"))),
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
    searchManagers,
    setSearchManagers,
    selectedManagers,
    setSelectedManagers,
    form,
    managerForm,
    onBack,
    onDecline,
    onSubmitConfirm,
  };
}
