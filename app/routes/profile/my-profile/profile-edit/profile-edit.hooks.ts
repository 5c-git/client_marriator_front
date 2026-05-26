import { useCallback, useEffect } from "react";
import { useFetcher } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  generateDefaultValues,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

import type { ProfileEditLoaderData } from "./profile-edit.service";

export function useProfileEditHooks(loaderData: ProfileEditLoaderData) {
  const fetcher = useFetcher();

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: generateDefaultValues(loaderData.formFields),
    resolver: zodResolver(generateValidationSchema(loaderData.formFields)),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset(generateDefaultValues(loaderData.formFields));
    });
  }, [loaderData.formFields, reset]);

  const submitForm = useCallback(() => {
    fetcher.submit(JSON.stringify(getValues()), {
      method: "POST",
      encType: "application/json",
    });
  }, [fetcher, getValues]);

  const resetForm = useCallback(() => {
    reset(generateDefaultValues(loaderData.formFields));
  }, [loaderData.formFields, reset]);

  const confirmForm = useCallback(() => {
    trigger();
    handleSubmit(submitForm)();
  }, [trigger, handleSubmit, submitForm]);

  return {
    control,
    setValue,
    trigger,
    errors,
    isDirty,
    handleSubmit,
    submitForm,
    resetForm,
    confirmForm,
  };
}
