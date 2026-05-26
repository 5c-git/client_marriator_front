import { useMemo } from "react";
import { useSubmit } from "react-router";

export type CheckboxItem = { uuid: string; name: string };

export function generateDefaultValues(items: CheckboxItem[]) {
  const defaultValues: Record<string, boolean> = {};
  items.forEach((item) => {
    defaultValues[item.uuid] = false;
  });
  return defaultValues;
}

export function useSignADealHooks(loaderData: CheckboxItem[]) {
  const submit = useSubmit();

  const defaultValues = useMemo(
    () => generateDefaultValues(loaderData),
    [loaderData],
  );

  const submitSelection = (values: Record<string, boolean>) => {
    const checkedValues: string[] = [];
    for (const key in values) {
      if (values[key] === true) checkedValues.push(key);
    }

    submit(JSON.stringify(checkedValues), {
      method: "POST",
      encType: "application/json",
    });
  };

  return {
    defaultValues,
    submitSelection,
  };
}

