import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";
import { useForm } from "react-hook-form";

import { debounce } from "~/shared/debounce";

import type {
  WorkRadiusActionResult,
  WorkRadiusLoaderData,
} from "./work-radius.service";

export function useWorkRadiusHooks(loaderData: WorkRadiusLoaderData) {
  const fetcher = useFetcher<WorkRadiusActionResult>();

  const [isActive, setIsActive] = useState(false);

  const form = useForm<WorkRadiusLoaderData>({
    defaultValues: {
      address: loaderData.address,
      coordinates: loaderData.coordinates,
      radius: loaderData.radius,
    },
  });

  const submitGeoData = useCallback(
    (value: string, radius: string) => {
      fetcher.submit(JSON.stringify({ value, radius }), {
        method: "POST",
        encType: "application/json",
      });
    },
    [fetcher],
  );

  const resetFetcherError = useCallback(() => {
    fetcher.submit(JSON.stringify({ _action: "reset" }), {
      method: "POST",
      encType: "application/json",
    });
  }, [fetcher]);

  useEffect(() => {
    form.reset({
      address: loaderData.address,
      coordinates: loaderData.coordinates,
      radius: loaderData.radius,
    });
  }, [form, loaderData.address, loaderData.coordinates, loaderData.radius]);

  const debouncedTextFieldSubmit = useMemo(
    () =>
      debounce((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        submitGeoData(evt.target.value.replaceAll(" ", "+"), loaderData.radius);
      }, 1000),
    [submitGeoData, loaderData.radius],
  );

  const debouncedRadiusFieldSubmit = useMemo(
    () =>
      debounce((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        submitGeoData(
          `${loaderData.coordinates[0]},${loaderData.coordinates[1]}`,
          evt.target.value,
        );
      }, 1000),
    [submitGeoData, loaderData.coordinates],
  );

  const fetcherError = useMemo(() => {
    if (fetcher.data && "error" in fetcher.data) {
      return fetcher.data.error;
    }
    return null;
  }, [fetcher.data]);

  const isMapGrayscale = loaderData.address === "" && isActive === false;

  return {
    form,
    isMapGrayscale,
    fetcherError,
    debouncedTextFieldSubmit,
    debouncedRadiusFieldSubmit,
    resetFetcherError,
    isActive,
    setIsActive,
    coordinates: loaderData.coordinates,
    radius: loaderData.radius,
    submitGeoData,
  };
}
