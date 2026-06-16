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

import { PROFILE_META_ACTIONS } from "./profile-meta";

export function useProfileMetaHooks(loaderData: ProfileMetaLoaderData) {
  const { t } = useTranslation("m_profile_myProfile_profileMeta");
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

  const form = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      form.reset(defaultValues, { keepErrors: false });
    });
  }, [defaultValues, form.reset]);

  const submitAction = useCallback(
    (payload: unknown) => {
      fetcher.submit(JSON.stringify(payload), {
        method: "POST",
        encType: "application/json",
      });
    },
    [fetcher],
  );

  const submitPhotoChange = useCallback(() => {
    submitAction({
      _action: PROFILE_META_ACTIONS.changePhoto,
      email: form.getValues("metaPhoto"),
    });
  }, [submitAction, form.getValues]);

  const confirmPhone = useCallback(() => {
    submitAction({
      _action: PROFILE_META_ACTIONS.confirmPhone,
      phone: form.getValues("metaPhone"),
    });
    setOpenPhoneDialog(false);
  }, [submitAction, form.getValues]);

  const confirmEmail = useCallback(() => {
    submitAction({
      _action: PROFILE_META_ACTIONS.confirmEmail,
      email: form.getValues("metaEmail"),
    });
    setOpenEmailDialog(false);
  }, [submitAction, form.getValues]);

  const resetFetcherError = useCallback(() => {
    submitAction({ _action: PROFILE_META_ACTIONS.reset });
  }, [submitAction]);

  const closePhoneDialog = useCallback(() => {
    setOpenPhoneDialog(false);
    form.setValue("metaPhone", "");
  }, [form.setValue]);

  const closeEmailDialog = useCallback(() => {
    setOpenEmailDialog(false);
    form.setValue("metaEmail", "");
  }, [form.setValue]);

  const onPhoneBlur = useCallback(
    (value: string) => {
      if (
        value !== "" &&
        value !== loaderData.phone &&
        form.formState.errors.metaPhone === undefined
      ) {
        setOpenPhoneDialog(true);
      }
    },
    [loaderData.phone, form.formState.errors.metaPhone],
  );

  const onEmailBlur = useCallback(
    (value: string) => {
      if (
        value !== "" &&
        value !== loaderData.email &&
        form.formState.errors.metaEmail === undefined
      ) {
        setOpenEmailDialog(true);
      }
    },
    [loaderData.email, form.formState.errors.metaEmail],
  );

  return {
    form,
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
