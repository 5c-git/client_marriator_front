import { ComponentPropsWithoutRef, useState } from "react";

import type { SpecialistsMobileViewInterface } from "./SpecialistsMobileViewInterface";

import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

import { UploadIcon } from "~/shared/icons/UploadIcon";

type SpecialistsInviteFormMobileViewInterface = Pick<
  SpecialistsMobileViewInterface,
  "activeService" | "startingRadius" | "specialists" | "radiuses"
> & {
  submitAction: (values: string[]) => void;
};

export function SpecialistsInviteFormMobileView(
  props: SpecialistsInviteFormMobileViewInterface,
) {
  const { t } = useTranslation("SpecialistsMobileView");

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    searchbar: string;
    selectAll: boolean;
    radius: number;
    specialists: string[];
  }>({
    defaultValues: {
      searchbar: "",
      selectAll: false,
      radius: props.startingRadius,
      specialists: [],
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        selectAll: z.boolean(),
        radius: z.number(),
        specialists: z.array(z.string()).min(1),
      }),
    ),
  });

  const startingSpecialists = props.specialists.filter(
    (item) => Number(item.radius) <= props.startingRadius,
  );

  const [selectedSpecialists, setSelectedSpecialists] =
    useState(startingSpecialists);

  return (
    <form
      onSubmit={handleSubmit((values) => {
        props.submitAction(values.specialists);
      })}
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: "20px 16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          rowGap: "14px",
        }}
      >
        <Controller
          name="searchbar"
          control={control}
          render={({ field }) => (
            <StyledSearchBar
              placeholder={t("searchbarPlaceholder")}
              {...field}
              onChange={(evt) => {
                const currentFieldValue = new RegExp(
                  `^${evt.target.value}`,
                  "i",
                );
                const currentRadius = getValues("radius");
                const isSelectedAll = getValues("selectAll");

                let matchingSpecialists: SpecialistsInviteFormMobileViewInterface["specialists"] =
                  [];

                // обрататываем поиск
                if (evt.target.value !== "") {
                  matchingSpecialists = [
                    ...props.specialists.filter((item) =>
                      currentFieldValue.test(item.name),
                    ),
                  ];
                } else {
                  matchingSpecialists = [...props.specialists];
                }

                //обрабатываем радиус
                const sortedSpecialists = matchingSpecialists.filter(
                  (item) => Number(item.radius) <= currentRadius,
                );

                //обрабатываем "выбрать всё"
                if (isSelectedAll) {
                  const newValues: string[] = [];

                  sortedSpecialists.forEach((item) => {
                    newValues.push(item.id.toString());
                  });

                  setValue("specialists", newValues);
                }

                setSelectedSpecialists(sortedSpecialists);

                field.onChange(evt);
              }}
            />
          )}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Controller
            name="selectAll"
            control={control}
            render={({ field }) => (
              <StyledCheckbox
                {...field}
                inputType="checkbox"
                label={t("selectAllPlaceholder")}
                onImmediateChange={() => {}}
                validation="none"
                onChange={(evt) => {
                  field.onChange(evt);

                  const isChecked = getValues("selectAll");

                  const newValues: string[] = [];

                  if (isChecked) {
                    selectedSpecialists.forEach((item) => {
                      newValues.push(item.id.toString());
                    });
                  }

                  setValue("specialists", newValues);
                }}
              />
            )}
          />

          <Controller
            name="radius"
            control={control}
            render={({ field }) => (
              <StyledDropdown
                options={props.radiuses}
                {...field}
                value={field.value.toString()}
                onChange={(evt) => {
                  field.onChange(evt);

                  const selectedValue: number = Number(evt.target.value);

                  const sortedSpecialists = props.specialists.filter(
                    (item) => Number(item.radius) <= selectedValue,
                  );

                  setSelectedSpecialists(sortedSpecialists);
                }}
              />
            )}
          />
        </Box>

        <Controller
          name="specialists"
          control={control}
          render={({ field }) => (
            <StyledCheckboxMultiple
              inputType="checkboxMultiple"
              onImmediateChange={() => {}}
              options={(() => {
                const options: ComponentPropsWithoutRef<
                  typeof StyledCheckboxMultiple
                >["options"] = [];

                selectedSpecialists.forEach((item) => {
                  options.push({
                    value: item.id.toString(),
                    label: item.name,
                    subHeader: item.country,
                    image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
                    disabled: false,
                    features: item.viewActivities.map((item) => ({
                      label: item,
                      active: false,
                    })),
                  });
                });

                return options;
              })()}
              {...field}
            />
          )}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        startIcon={<UploadIcon />}
        sx={{
          marginTop: "20px",
        }}
      >
        {t("inviteButton")}
      </Button>
    </form>
  );
}
