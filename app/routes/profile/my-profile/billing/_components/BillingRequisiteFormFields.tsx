import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";

import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledAccountField } from "~/shared/ui/StyledAccountField/StyledAccountField";
import { StyledCardField } from "~/shared/ui/StyledCardField/StyledCardField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { StyledMonthField } from "~/shared/ui/StyledMonthField/StyledMonthField";
import { StyledAutocomplete } from "~/shared/ui/StyledAutocomplete/StyledAutocomplete";

import type { BikOption, BillingFormValues } from "../billing.service";

type BillingRequisiteFormFieldsProps = {
  translation:
    | "m_profile_myProfile_billing_billingAdd"
    | "m_profile_myProfile_billing_billingEdit";
  control: Control<BillingFormValues>;
  errors: FieldErrors<BillingFormValues>;
  bikOptions: BikOption[];
};

export function BillingRequisiteFormFields(
  props: BillingRequisiteFormFieldsProps,
) {
  const { t } = useTranslation(props.translation);

  return (
    <Box
      sx={{
        display: "grid",
        rowGap: "8px",
        paddingTop: "14px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <Controller
        name="confidant"
        control={props.control}
        render={({ field }) => (
          <StyledCheckbox
            inputType="checkbox"
            label={t("placeholder_checkbox")}
            onImmediateChange={() => {}}
            validation="none"
            error={props.errors.confidant?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="fio"
        control={props.control}
        render={({ field }) => (
          <StyledTextField
            inputType="text"
            placeholder={t("placeholder_fio")}
            onImmediateChange={() => {}}
            validation="none"
            error={props.errors.fio?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="bik"
        control={props.control}
        render={({ field }) => (
          <StyledAutocomplete
            inputType="autocomplete"
            placeholder={t("placeholder_bik")}
            onImmediateChange={() => {}}
            validation="none"
            options={props.bikOptions}
            error={props.errors.bik?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="account"
        control={props.control}
        render={({ field }) => (
          <StyledAccountField
            inputType="account"
            placeholder={t("placeholder_account")}
            onImmediateChange={() => {}}
            validation="none"
            error={props.errors.account?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="card"
        control={props.control}
        render={({ field }) => (
          <StyledCardField
            inputType="card"
            placeholder={t("placeholder_card")}
            onImmediateChange={() => {}}
            validation="none"
            error={props.errors.card?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="payWithCard"
        control={props.control}
        render={({ field }) => (
          <StyledRadioButton
            inputType="radio"
            onImmediateChange={() => {}}
            validation="none"
            error={props.errors.payWithCard?.message}
            heading={t("placeholder_payWithCard")}
            options={[
              {
                disabled: false,
                label: t("button_yes"),
                value: "yes",
              },
              {
                disabled: false,
                label: t("button_no"),
                value: "no",
              },
            ]}
            {...field}
          />
        )}
      />
      <Controller
        name="cardDue"
        control={props.control}
        render={({ field }) => (
          <StyledMonthField
            inputType="month"
            placeholder={t("placeholder_cardDue")}
            onImmediateChange={() => {}}
            validation="none"
            error={props.errors.cardDue?.message}
            {...field}
          />
        )}
      />
    </Box>
  );
}
