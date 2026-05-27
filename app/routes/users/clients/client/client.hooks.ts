import { useEffect, useMemo, useState } from "react";
import { useFetcher, useNavigate, useNavigation, useSubmit } from "react-router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import type { ClientLoaderData } from "./client.mapper";

export type ClientFormValues = {
  logo: string;
  phone: string;
  name: string;
  counterparty: { id: number; name: string }[];
  organizations: { id: number; logo: string; name: string }[];
  locations: { id: number; logo: string; address: string }[];
  change_order: Date;
  cancel_order: Date;
  live_order: Date;
};

function formatHHmm(date: Date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const hh = h >= 10 ? String(h) : `0${h}`;
  const mm = m >= 10 ? String(m) : `0${m}`;
  return `${hh}:${mm}`;
}

export function useClientHooks(loaderData: ClientLoaderData) {
  const { t } = useTranslation("users_client");
  const fetcher = useFetcher();
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [openCounterparty, setOpenCounterparty] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        logo: z.string({ error: t("text", { ns: "constructorFields" }) }),
        phone: z.string({ error: t("text", { ns: "constructorFields" }) }),
        name: z.string(t("text", { ns: "constructorFields" })),
        counterparty: z
          .array(z.object({ id: z.number(), name: z.string() }))
          .min(1),
        organizations: z
          .array(z.object({ id: z.number(), logo: z.string(), name: z.string() }))
          .min(1),
        locations: z
          .array(z.object({ id: z.number(), logo: z.string(), address: z.string() }))
          .min(1),
        change_order: z.date({ error: t("text", { ns: "constructorFields" }) }),
        cancel_order: z.date({ error: t("text", { ns: "constructorFields" }) }),
        live_order: z.date({ error: t("text", { ns: "constructorFields" }) }),
      }),
    [t],
  );

  const form = useForm<ClientFormValues>({
    defaultValues: {
      logo: loaderData.client.logo ? loaderData.client.logo : "",
      phone: loaderData.client.phone,
      name: loaderData.client.name,
      counterparty: loaderData.client.counterparty,
      organizations: loaderData.client.organizations,
      locations: loaderData.client.locations,
      change_order: new Date(`2000-01-01T${loaderData.client.change_order}`),
      cancel_order: new Date(`2000-01-01T${loaderData.client.cancel_order}`),
      live_order: new Date(`2000-01-01T${loaderData.client.live_order}`),
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    form.reset({
      logo: loaderData.client.logo ? loaderData.client.logo : "",
      phone: loaderData.client.phone,
      name: loaderData.client.name,
      counterparty: loaderData.client.counterparty,
      organizations: loaderData.client.organizations,
      locations: loaderData.client.locations,
      change_order: new Date(`2000-01-01T${loaderData.client.change_order}`),
      cancel_order: new Date(`2000-01-01T${loaderData.client.cancel_order}`),
      live_order: new Date(`2000-01-01T${loaderData.client.live_order}`),
    });
  }, [loaderData, form]);

  const onBack = () => {
    navigate(withLocale("/users"), { viewTransition: true });
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
          change_order: formatHHmm(new Date(form.getValues("change_order"))),
          cancel_order: formatHHmm(new Date(form.getValues("cancel_order"))),
          live_order: formatHHmm(new Date(form.getValues("live_order"))),
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
    form,
    onBack,
    onDecline,
    onSubmitConfirm,
  };
}

