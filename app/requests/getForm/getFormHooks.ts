import { GetFormInputsSchema } from "./getForm.type";

export const transformBikOptions = (data: GetFormInputsSchema) => {
  const dataCopy = { ...data };

  const bikRegExp = new RegExp(`^бик`, "i");

  const bikOptions: {
    value: string;
    label: string;
    disabled: boolean;
  }[] = [];

  const autocompleteFieldMatch = data.result.formData.find(
    (item) => item.inputType === "autocomplete"
  );

  if (
    autocompleteFieldMatch &&
    bikRegExp.test(autocompleteFieldMatch.placeholder)
  ) {
    autocompleteFieldMatch.options.forEach((element) => {
      bikOptions.push({
        value: element.bic,
        label: element.label,
        disabled: element.disabled,
      });
    });

    const elementIndexInData = dataCopy.result.formData.findIndex(
      (item) => item.name === autocompleteFieldMatch.name
    );

    dataCopy.result.formData[elementIndexInData].options = bikOptions;

    return dataCopy;
  }

  return data;
};
