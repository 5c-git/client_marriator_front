import { ComponentPropsWithoutRef } from "react";

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
  submitRadiusAction: (value: string) => void;
  submitAction: (values: string[]) => void;
};

export function SpecialistsInviteFormMobileView(
  props: SpecialistsInviteFormMobileViewInterface,
) {
  const { t } = useTranslation("m_bids_bid_specialists");

  const { control, getValues, setValue, handleSubmit, watch } = useForm<{
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

  let matchingSpecialists: SpecialistsInviteFormMobileViewInterface["specialists"] =
    [];

  // обрататываем поиск
  if (watch("searchbar") !== "") {
    const currentSearchbarValue = new RegExp(`${watch("searchbar")}`, "i");

    matchingSpecialists = [
      ...props.specialists.filter((item) =>
        currentSearchbarValue.test(item.name),
      ),
      ...props.specialists.filter((item) =>
        currentSearchbarValue.test(item.phone.toString()),
      ),
    ];
  } else {
    matchingSpecialists = [...props.specialists];
  }
  //обрабатываем радиус
  const sortedSpecialists = matchingSpecialists.filter(
    (item) => Number(item.radius) <= Number(watch("radius")),
  );
  //обрабатываем "только подходящие специалисты"
  if (watch("onlyAccurate")) {
    matchingSpecialists = sortedSpecialists.filter(
      (item) => item.viewActivitiesAccurate === true,
    );
  }

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
        backgroundColor: "var(--mui-palette-White)",
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
                    matchingSpecialists.forEach((item) => {
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
                  props.submitRadiusAction(evt.target.value);
                  setValue("specialists", []);
                  setValue("selectAll", false);
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
              disabled={
                props.specialists.filter(
                  (item) => item.viewActivitiesAccurate === false,
                ).length === 0
              }
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

                matchingSpecialists.forEach((item) => {
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

        {matchingSpecialists.length === 0 ? (
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
