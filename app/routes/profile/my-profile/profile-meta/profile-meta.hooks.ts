import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { createProfileMetaFormSchema } from "./profile-meta-form.validation";
import type {
  ProfileMetaActionError,
  ProfileMetaFormValues,
  ProfileMetaLoaderData,
} from "./profile-meta.service";

export function useProfileMetaHooks(loaderData: ProfileMetaLoaderData) {
  const { t } = useTranslation("profileMeta");
  const fetcher = useFetcher<ProfileMetaActionError | null>();

  const [openPhoneDialog, setOpenPhoneDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);

  const validationSchema = useMemo(() => createProfileMetaFormSchema(t), [t]);

  const defaultValues = useMemo<ProfileMetaFormValues>(
    () => ({
      metaPhoto: loaderData.photo,
      metaPhone: loaderData.phone,
      metaEmail: loaderData.email,
    }),
    [loaderData.photo, loaderData.phone, loaderData.email],
  );

  const {
    control,
    setValue,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(defaultValues, { keepErrors: false });
    });
  }, [defaultValues, reset]);

  const submitAction = useCallback(
    (payload: Record<string, unknown>) => {
      fetcher.submit(JSON.stringify(payload), {
        method: "POST",
        encType: "application/json",
      });
    },
    [fetcher],
  );

  const submitPhotoChange = useCallback(() => {
    submitAction({
      _action: "changePhoto",
      email: getValues("metaPhoto"),
    });
  }, [submitAction, getValues]);

  const confirmPhone = useCallback(() => {
    submitAction({
      _action: "confirmPhone",
      phone: getValues("metaPhone"),
    });
    setOpenPhoneDialog(false);
  }, [submitAction, getValues]);

  const confirmEmail = useCallback(() => {
    submitAction({
      _action: "confirmEmail",
      email: getValues("metaEmail"),
    });
    setOpenEmailDialog(false);
  }, [submitAction, getValues]);

  const resetFetcherError = useCallback(() => {
    submitAction({ _action: "reset" });
  }, [submitAction]);

  const closePhoneDialog = useCallback(() => {
    setOpenPhoneDialog(false);
    setValue("metaPhone", "");
  }, [setValue]);

  const closeEmailDialog = useCallback(() => {
    setOpenEmailDialog(false);
    setValue("metaEmail", "");
  }, [setValue]);

  const onPhoneBlur = useCallback(
    (value: string) => {
      if (
        value !== "" &&
        value !== loaderData.phone &&
        errors.metaPhone === undefined
      ) {
        setOpenPhoneDialog(true);
      }
    },
    [loaderData.phone, errors.metaPhone],
  );

  const onEmailBlur = useCallback(
    (value: string) => {
      if (
        value !== "" &&
        value !== loaderData.email &&
        errors.metaEmail === undefined
      ) {
        setOpenEmailDialog(true);
      }
    },
    [loaderData.email, errors.metaEmail],
  );

  return {
    control,
    setValue,
    trigger,
    errors,
    fetcherData: fetcher.data,
    openPhoneDialog,
    openEmailDialog,
    submitPhotoChange,
    confirmPhone,
    confirmEmail,
    resetFetcherError,
    closePhoneDialog,
    closeEmailDialog,
    onPhoneBlur,
    onEmailBlur,
  };
}
