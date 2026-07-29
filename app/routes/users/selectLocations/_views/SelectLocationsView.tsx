import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  reactify,
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapMarker,
} from "~/shared/ymap/map";

import type {
  LocationOption,
  SelectLocationsLoaderData,
} from "../selectLocations.service";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { LocationCheckboxMultiple } from "~/shared/ui/LocationCheckboxMultiple/LocationCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";
import { MapIcon } from "~/shared/icons/MapIcon";

type SelectLocationsViewProps = {
  data: SelectLocationsLoaderData;
  onBack: () => void;
  onSubmit: (values: string[]) => void;
};

export function SelectLocationsView(props: SelectLocationsViewProps) {
  const { t } = useTranslation("m_users_selectLocations");

  const [showMap, setShowMap] = useState(false);
  const [allLocations, setAllLocations] = useState(props.data.locations);
  const [trigger, setTrigger] = useState(false);

  const form = useForm({
    defaultValues: {
      searchbar: "",
      region: "",
      locations: props.data.selectedLocations,
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        region: z.string(),
        locations: z.array(z.string()).min(1),
      }),
    ),
    mode: "onChange",
  });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        buttonAction={{
          text: showMap ? t("headerListAction") : t("headerMapAction"),
          icon: (
            <MapIcon
              sx={{
                width: "15px",
                height: "15px",
              }}
            />
          ),
          action: () => {
            setShowMap(!showMap);
          },
        }}
        backAction={props.onBack}
      />

      <form
        onSubmit={form.handleSubmit((values) => {
          props.onSubmit(values.locations);
        })}
        style={{
          height: "100%",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            rowGap: "14px",
            paddingTop: "20px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Controller
            name="searchbar"
            control={form.control}
            render={({ field }) => (
              <StyledSearchBar
                placeholder={t("searchbarPlaceholder")}
                {...field}
                onChange={(evt) => {
                  const currentFieldValue = new RegExp(
                    `${evt.target.value}`,
                    "i",
                  );
                  let matchingLocations: LocationOption[] = [];

                  if (evt.target.value !== "") {
                    matchingLocations = [
                      ...props.data.locations.filter(
                        (item) =>
                          currentFieldValue.test(item.name) ||
                          currentFieldValue.test(item.address),
                      ),
                    ];
                  } else {
                    const currentRegion = form.getValues("region");
                    matchingLocations =
                      currentRegion !== ""
                        ? [
                            ...props.data.locations.filter(
                              (item) => item.regionId === currentRegion,
                            ),
                          ]
                        : [...props.data.locations];
                  }

                  setAllLocations(matchingLocations);
                  field.onChange(evt);
                }}
                style={{
                  zIndex: 1,
                }}
              />
            )}
          />

          <Controller
            name="region"
            control={form.control}
            render={({ field }) => (
              <StyledDropdown
                placeholder={t("regionPlaceholder")}
                options={props.data.regions}
                {...field}
                onChange={(evt) => {
                  const currentSearchbarValue = new RegExp(
                    `^${form.getValues("searchbar")}`,
                    "i",
                  );

                  const matchingRegionLocations =
                    evt.target.value !== ""
                      ? [
                          ...props.data.locations.filter(
                            (item) => item.regionId === evt.target.value,
                          ),
                        ]
                      : [...props.data.locations];

                  const matchingLocations = [
                    ...matchingRegionLocations.filter((item) =>
                      currentSearchbarValue.test(item.name),
                    ),
                  ];

                  setAllLocations(matchingLocations);
                  field.onChange(evt);
                }}
                style={{
                  zIndex: 1,
                }}
              />
            )}
          />

          {!showMap ? (
            <Controller
              name="locations"
              control={form.control}
              render={({ field }) => (
                <LocationCheckboxMultiple options={allLocations} {...field} />
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
                height: "100%",
              }}
            >
              <YMap
                location={reactify.useDefault({
                  center:
                    allLocations.length > 0
                      ? allLocations[0].coordinates
                      : [37.588144, 55.733842],
                  zoom: 12,
                })}
              >
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />

                {allLocations.map((item, index) => {
                  const isShopSelected =
                    form
                      .getValues("locations")
                      .findIndex((location) => location === item.value) !== -1;

                  return (
                    <YMapMarker
                      key={index}
                      coordinates={item.coordinates}
                      onClick={() => {
                        const currentSelectedLocations =
                          form.getValues("locations");

                        const isLocationSelected =
                          currentSelectedLocations.findIndex(
                            (shop) => shop === item.value,
                          );

                        if (isLocationSelected > -1) {
                          currentSelectedLocations.splice(
                            isLocationSelected,
                            1,
                          );
                        } else {
                          currentSelectedLocations.push(item.value);
                        }

                        form.setValue("locations", currentSelectedLocations);
                        setTrigger(!trigger);
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "-50%",
                          top: "-50%",
                          width: "41px",
                          height: "41px",
                          border: "5px solid",
                          borderRadius: "50%",
                          overflow: "hidden",
                          borderColor: isShopSelected
                            ? "var(--mui-palette-Corp_1)"
                            : "transparent",
                        }}
                      >
                        <img
                          src={item.icon}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          alt="shop logo"
                        />
                      </div>
                    </YMapMarker>
                  );
                })}
              </YMap>
            </Box>
          )}

          <Box
            sx={(theme) => ({
              display: "flex",
              columnGap: "14px",
              padding: "10px",
              backgroundColor: theme.vars.palette["White"],
              position: "fixed",
              zIndex: 9000,
              width: "100%",
              bottom: "0",
              left: "0",
            })}
          >
            <Button
              type="button"
              onClick={() => {
                form.reset();
                setAllLocations(props.data.locations);
              }}
            >
              {t("cancelButton")}
            </Button>
            <Button type="submit" variant="contained">
              {t("selectButton")}{" "}
              {form.watch("locations").length > 0
                ? ` ${form.getValues("locations").length}`
                : null}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
