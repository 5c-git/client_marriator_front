import { ComponentPropsWithoutRef, useState } from "react";

import type { SpecialistsMobileViewInterface } from "./SpecialistsMobileViewInterface";

import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

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

  const { control, getValues, setValue, handleSubmit } = useForm<{
    searchbar: string;
    selectAll: boolean;
    onlyAccurate: boolean;
    radius: string;
    specialists: string[];
  }>({
    defaultValues: {
      searchbar: "",
      selectAll: false,
      onlyAccurate: true,
      radius: props.startingRadius.toString(),
      specialists: [],
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        selectAll: z.boolean(),
        onlyAccurate: z.boolean(),
        radius: z.string(),
        specialists: z.array(z.string()).min(1),
      }),
    ),
  });

  const startingSpecialists = props.specialists.filter((item) => item.viewActivitiesAccurate === true).filter(
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
                  `${evt.target.value}`,
                  "i",
                );

                let matchingSpecialists: SpecialistsInviteFormMobileViewInterface["specialists"] =
                  [];

                // обрататываем поиск
                if (evt.target.value !== "") {
                  matchingSpecialists = [
                    ...props.specialists.filter((item) =>
                      currentFieldValue.test(item.name),
                    ),
                    ...props.specialists.filter((item) =>
                      currentFieldValue.test(item.phone.toString()),
                    ),
                  ];
                } else {
                  matchingSpecialists = [...props.specialists];
                }

                //обрабатываем радиус
                let sortedSpecialists = matchingSpecialists.filter(
                  (item) => Number(item.radius) <= Number(getValues("radius")),
                );

                //обрабатываем "только подходящие специалисты"
                if(getValues("onlyAccurate")) {
                  sortedSpecialists = sortedSpecialists.filter(
                    (item) => item.viewActivitiesAccurate === true,
                  );
                }

                //обрабатываем "выбрать всё"
                if (getValues("selectAll")) {
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

                  let sortedSpecialists = props.specialists.filter(
                    (item) => Number(item.radius) <= selectedValue,
                  );

                  //обрабатываем "только подходящие специалисты"
                  if(getValues("onlyAccurate")) {
                    sortedSpecialists = sortedSpecialists.filter(
                      (item) => item.viewActivitiesAccurate === true,
                    );
                  }

                  setSelectedSpecialists(sortedSpecialists);
                }}
              />
            )}
          />
        </Box>

        <Controller
            name="onlyAccurate"
            control={control}
            render={({ field }) => (
              <StyledCheckbox
                {...field}
                inputType="checkbox"
                label={t("onlyAccuratePlaceholder")}
                onImmediateChange={() => {}}
                validation="none"
                disabled={props.specialists.filter((item) => item.viewActivitiesAccurate === false).length === 0}
                onChange={(evt) => {
                  field.onChange(evt);

                  let matchingSpecialists: SpecialistsInviteFormMobileViewInterface["specialists"] =
                  [...props.specialists];


                  //обрабатываем радиус
                  matchingSpecialists = matchingSpecialists.filter(
                    (item) => Number(item.radius) <= Number(getValues("radius")),
                  );

                  //обрабатываем "только подходящие специалисты"
                  if(getValues("onlyAccurate")) {
                    matchingSpecialists = matchingSpecialists.filter(
                      (item) => item.viewActivitiesAccurate === true,
                    );
                  }
  
                  // //обрабатываем "выбрать всё"
                  if (getValues("selectAll")) {
                    const newValues: string[] = [];
  
                    matchingSpecialists.forEach((item) => {
                      newValues.push(item.id.toString());
                    });
  
                    setValue("specialists", newValues);
                  }

                  setSelectedSpecialists(matchingSpecialists);
                }}
              />
            )}
          />

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

        {selectedSpecialists.length === 0 ? (
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_1"],
              textAlign: "center",
            })}
          >
            В радиусе {getValues("radius")} км нет специалистов, соответствующих
            вашим критериям
          </Typography>
        ) : null}
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
