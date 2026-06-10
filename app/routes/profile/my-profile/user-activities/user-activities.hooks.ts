import { useCallback, useEffect } from "react";
import { useFetcher, useSearchParams, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  generateDefaultValues,
  generateValidationSchema,
} from "~/shared/constructor/constructor";

import type { UserActivitiesLoaderData } from "./user-activities.service";
import { withLocale } from "~/shared/withLocale";

export function useUserActivitiesHooks(loaderData: UserActivitiesLoaderData) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const stepParams = searchParams.get("step");
  const step = stepParams ? Number(stepParams) : 1;

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
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

  const submitFormFields = useCallback(() => {
    fetcher.submit(JSON.stringify(getValues()), {
      method: "POST",
      encType: "application/json",
    });
  }, [fetcher, getValues]);

  const goToNextStepOrFinish = useCallback(() => {
    if (loaderData.formStatus === "allowedNewStep" && step !== 3) {
      setSearchParams((prev) => {
        prev.set("step", (step + 1).toString());
        return prev;
      });
    } else if (loaderData.formStatus === "allowedNewStep") {
      navigate(withLocale("/profile/my-profile"));
    }
  }, [loaderData.formStatus, navigate, setSearchParams, step]);

  const handleFormSubmit = useCallback(() => {
    handleSubmit(goToNextStepOrFinish)();
  }, [handleSubmit, goToNextStepOrFinish]);

  const handleFinishClick = useCallback(() => {
    trigger();
    handleFormSubmit();
  }, [trigger, handleFormSubmit]);

  const goBack = useCallback(() => {
    if (step === 1) {
      navigate(withLocale("/profile/my-profile"));
    } else {
      setSearchParams((prev) => {
        prev.set("step", (step - 1).toString());
        return prev;
      });
    }
  }, [navigate, setSearchParams, step]);

  return {
    step,
    control,
    setValue,
    trigger,
    errors,
    goBack,
    handleFormSubmit,
    handleFinishClick,
    submitFormFields,
  };
}
