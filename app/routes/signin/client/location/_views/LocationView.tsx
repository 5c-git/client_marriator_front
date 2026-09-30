import { useState } from "react";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  reactify,
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapMarker,
} from "~/shared/ymap/map";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { LocationCheckboxMultiple } from "~/shared/ui/LocationCheckboxMultiple/LocationCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";

import { MapIcon } from "~/shared/icons/MapIcon";

import type { LocationData } from "../location.service";

import type { LocationOption } from "../location.mapper";

type LocationViewProps = {
  data: LocationData;
  backAction: () => void;
  submitShopsAction: (shopIds: string[]) => void;
};

export function LocationView(props: LocationViewProps) {
  const { t } = useTranslation("m_signin_client_location");

  const [showMap, setShowMap] = useState<boolean>(false);
  const [selectedShops, setSelectedShops] = useState(props.data.shops);
  const [trigger, setTrigger] = useState(false);

  const { control, setValue, getValues, handleSubmit, reset, watch } = useForm<{
    searchbar: string;
    region: string;
    shops: string[];
  }>({
    defaultValues: {
      searchbar: "",
      region: "",
      shops: props.data.selectedLocations,
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        region: z.string(),
        shops: z.array(z.string()).min(1),
      }),
    ),
    mode: "onChange",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <TopNavigation
        header={{
          text: t(`header`),
          bold: false,
        }}
        buttonAction={{
          text: showMap ? t(`headerListAction`) : t(`headerMapAction`),
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
        backAction={props.backAction}
      />

      <form
        onSubmit={handleSubmit((values) => {
          props.submitShopsAction(values.shops);
        })}
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            rowGap: "14px",
            paddingTop: "20px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "80px",
          }}
        >
          <Controller
            name="searchbar"
            control={control}
            render={({ field }) => (
              <StyledSearchBar
                placeholder={t(`searchbarPlaceholder`)}
                {...field}
                onChange={(evt) => {
                  const currentFieldValue = new RegExp(
                    `${evt.target.value}`,
                    "i",
                  );

                  let matchingShops: LocationOption[] = [];

                  if (evt.target.value !== "") {
                    matchingShops = [
                      ...props.data.shops.filter(
                        (item) =>
                          currentFieldValue.test(item.name) ||
                          currentFieldValue.test(item.address),
                      ),
                    ];
                  } else {
                    const currentRegion = getValues("region");
                    matchingShops =
                      currentRegion !== ""
                        ? [
                            ...props.data.shops.filter(
                              (item) => item.regionId === currentRegion,
                            ),
                          ]
                        : [...props.data.shops];
                  }

                  setSelectedShops(matchingShops);

                  field.onChange(evt);
                }}
              />
            )}
          />

          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <StyledDropdown
                placeholder={t(`regionPlaceholder`)}
                options={props.data.regions}
                {...field}
                onChange={(evt) => {
                  const currentSearchbarValue = new RegExp(
                    `^${getValues("searchbar")}`,
                    "i",
                  );

                  const matchingRegionShops =
                    evt.target.value !== ""
                      ? [
                          ...props.data.shops.filter(
                            (item) => item.regionId === evt.target.value,
                          ),
                        ]
                      : [...props.data.shops];

                  const matchingShops = [
                    ...matchingRegionShops.filter((item) =>
                      currentSearchbarValue.test(item.name),
                    ),
                  ];

                  setSelectedShops(matchingShops);

                  field.onChange(evt);
                }}
              />
            )}
          />

          {!showMap ? (
            <Controller
              name="shops"
              control={control}
              render={({ field }) => (
                <LocationCheckboxMultiple options={selectedShops} {...field} />
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
                flexGrow: 1,
              }}
            >
              <YMap
                location={reactify.useDefault({
                  center:
                    selectedShops.length > 0
                      ? selectedShops[0].coordinates
                      : [37.588144, 55.733842],
                  zoom: 12,
                })}
              >
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />

                {selectedShops.map((item, index) => {
                  const isShopSelected =
                    getValues("shops").findIndex(
                      (location) => location === item.value,
                    ) !== -1;

                  return (
                    <YMapMarker
                      key={index}
                      coordinates={item.coordinates}
                      onClick={() => {
                        const currentSelectedLocations = getValues("shops");

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

                        setValue("shops", currentSelectedLocations);
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
              position: "absolute",
              zIndex: 9000,
              width: "100%",
              bottom: "0",
              left: "0",
            })}
          >
            <Button
              type="button"
              onClick={() => {
                reset();
                setSelectedShops(props.data.shops);
              }}
            >
              {t(`cancelButton`)}
            </Button>
            <Button type="submit" variant="contained">
              {t(`selectButton`)}{" "}
              {watch("shops").length > 0
                ? ` ${getValues("shops").length}`
                : null}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
