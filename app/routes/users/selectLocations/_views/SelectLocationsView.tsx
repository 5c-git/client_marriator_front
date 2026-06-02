import { Controller } from "react-hook-form";

import type { useSelectLocationsHooks } from "../selectLocations.hooks";
import type { SelectLocationsLoaderData } from "../selectLocations.service";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { LocationCheckboxMultiple } from "~/shared/ui/LocationCheckboxMultiple/LocationCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";
import { MapIcon } from "~/shared/icons/MapIcon";

type SelectLocationsViewProps = {
  loaderData: SelectLocationsLoaderData;
  ui: ReturnType<typeof useSelectLocationsHooks>;
};

export function SelectLocationsView(props: SelectLocationsViewProps) {
  return (
    <>
      {props.ui.isLoading ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: props.ui.t("header"),
            bold: false,
          }}
          buttonAction={{
            text: props.ui.showMap
              ? props.ui.t("headerListAction")
              : props.ui.t("headerMapAction"),
            icon: (
              <MapIcon
                sx={{
                  width: "15px",
                  height: "15px",
                }}
              />
            ),
            action: props.ui.onToggleMap,
          }}
          backAction={props.ui.onBack}
        />

        <form onSubmit={props.ui.onSubmit}>
          <Box
            sx={{
              position: "relative",
              display: "grid",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Controller
              name="searchbar"
              control={props.ui.form.control}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={props.ui.t("searchbarPlaceholder")}
                  {...field}
                  onChange={(evt) => {
                    props.ui.onSearchbarChange(evt.target.value, field.onChange);
                  }}
                />
              )}
            />

            <Controller
              name="region"
              control={props.ui.form.control}
              render={({ field }) => (
                <StyledDropdown
                  placeholder={props.ui.t("regionPlaceholder")}
                  options={props.loaderData.regions}
                  {...field}
                  onChange={(evt) => {
                    props.ui.onRegionChange(evt.target.value, field.onChange);
                  }}
                />
              )}
            />

            {!props.ui.showMap ? (
              <Controller
                name="locations"
                control={props.ui.form.control}
                render={({ field }) => (
                  <LocationCheckboxMultiple
                    options={props.ui.selectedLocations}
                    {...field}
                  />
                )}
              />
            ) : (
              <Box
                id="map"
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "calc(100vh - 60px)",
                  zIndex: "-1",
                }}
              ></Box>
            )}

            <Box
              sx={(theme) => ({
                display: "flex",
                columnGap: "14px",
                padding: "10px",
                backgroundColor: theme.vars.palette["White"],
                position: "fixed",
                zIndex: 1,
                width: "100%",
                bottom: "0",
                left: "0",
              })}
            >
              <Button type="button" onClick={props.ui.onReset}>
                {props.ui.t("cancelButton")}
              </Button>
              <Button type="submit" variant="contained">
                {props.ui.t("selectButton")}{" "}
                {props.ui.form.watch("locations").length > 0
                  ? ` ${props.ui.form.getValues("locations").length}`
                  : null}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
