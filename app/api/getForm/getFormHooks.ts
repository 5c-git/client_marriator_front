import { GetFormActivitiesSuccess } from "../_personal/getFormActivities/getFormActivities.schema";

export const transformBikOptions = (data: GetFormActivitiesSuccess) => {
  const dataCopy = { ...data };

  const bikRegExp = new RegExp(`^бик`, "i");

  const bikOptions: {
    bic: string;
    value: string;
    label: string;
    disabled: boolean;
  }[] = [];

  const autocompleteFieldMatch = data.result.formData.find(
    (item) => item.inputType === "autocomplete",
  );

  if (
    autocompleteFieldMatch &&
    bikRegExp.test(autocompleteFieldMatch.placeholder)
  ) {
    autocompleteFieldMatch.options.forEach((element) => {
      bikOptions.push({
        bic: element.bic,
        value: element.bic,
        label: element.label,
        disabled: element.disabled,
      });
    });

    const elementIndexInData = dataCopy.result.formData.findIndex(
      (item) => item.name === autocompleteFieldMatch.name,
    );

    const bikField = dataCopy.result.formData[
      elementIndexInData
    ] as typeof autocompleteFieldMatch;

    bikField.options = bikOptions;

    return dataCopy;
  }

  return data;
};
