import { renderToStaticMarkup } from "react-dom/server";
import { useState, useEffect } from "react";
import {
  useSubmit,
  useNavigate,
  useNavigation,
  Link,
  redirect,
} from "react-router";
import type { Route } from "./+types/location";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, get } from "react-hook-form";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

//map
import { YMap, LngLat, YMapMarker } from "ymaps3";
import { loadMap, langMap } from "~/shared/ymap/ymap";
import type { Coordinates } from "~/shared/ymap/ymap";
//map

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { LocationCheckboxMultiple } from "~/shared/ui/LocationCheckboxMultiple/LocationCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";

import { MapIcon } from "./icons/MapIcon";

import { useStore } from "~/store/store";

import { getPlace } from "~/requests/getPlace/getPlace";
import { postSetPlace } from "~/requests/postSetPlace/postSetPlace";

const renderIcon = (image: string, borderColor: string) => {
  return renderToStaticMarkup(
    // <MarkerIcon
    //   style={{
    //     position: "absolute",

    //     color: borderColor,
    //   }}
    // />
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
        borderColor: borderColor,
      }}
    >
      <img
        // src={image}
        src={"https://mui.com/static/images/avatar/1.jpg"}
        style={{
          // position: "relative",
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
        alt="shop logo"
      />
    </div>
  );
};

type Option = {
  value: string;
  name: string;
  icon: string;
  coordinates: Coordinates;
  address: string;
  region: string;
  regionId: string;
  disabled: boolean;
};

export async function clientLoader() {
  const language = i18next.language as "en" | "ru";
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const ymaps = await loadMap(langMap[language]);

    const locationsData = await getPlace(accessToken);

    const shops: Option[] = [];

    const regions: { value: string; label: string; disabled: boolean }[] = [];

    locationsData.data.forEach((item, index) => {
      shops.push({
        value: item.id.toString(),
        name: item.name,
        icon: item.logo,
        coordinates: [Number(item.latitude), Number(item.longitude)],
        address: item.address_kladr,
        region: item.region.name,
        regionId: item.region.id.toString(),
        disabled: false,
      });

      const match = regions.findIndex(
        (region) => region.value === item.region.id.toString()
      );

      if (match === -1) {
        regions.push({
          value: locationsData.data[index].region.id.toString(),
          label: locationsData.data[index].region.name,
          disabled: false,
        });
      }
    });

    return { ymaps, shops, regions };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const accessToken = useStore.getState().accessToken;

  const shops = await request.json();

  if (accessToken) {
    await postSetPlace(accessToken, shops);

    throw redirect(withLocale("/signin/client/meta"));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Location({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("signin_client_location");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const [showMap, setShowMap] = useState<boolean>(false);
  const [selectedShops, setSelectedShops] = useState(loaderData.shops);
  const [mapInstance, setMapInstance] = useState<YMap | null>(null);

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<{
    searchbar: string;
    region: string;
    shops: string[];
  }>({
    defaultValues: {
      searchbar: "",
      region: "",
      shops: [],
    },
    // @ts-expect-error
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        region: Yup.string().notRequired(),
        shops: Yup.array().of(Yup.string()).min(1),
      })
    ),
    mode: "onChange",
  });

  // рисуем пустую карту
  useEffect(() => {
    if (showMap) {
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
        loaderData.ymaps;

      const container = document.querySelector("#map") as HTMLElement;

      const map = new YMap(container, {
        location: { center: selectedShops[0].coordinates, zoom: 12 },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      setMapInstance(map);
    }
  }, [showMap, loaderData.ymaps]);

  // рисуем на карте маркеры, опираясь на данные(далее по коду работаем толлько с selectedShops и этот эффект будет нам перерисовывать маркеры)
  useEffect(() => {
    const { YMapMarker } = loaderData.ymaps;

    const markers: YMapMarker[] = [];

    mapInstance?.children.forEach((child) => {
      if ("coordinates" in child) {
        markers.push(child as YMapMarker);
      }
    });

    markers.forEach((marker) => {
      mapInstance?.removeChild(marker);
    });

    //рисуем новые маркеры из свежих данных
    selectedShops.forEach((shop) => {
      const markerElement = document.createElement("div");

      const isShopSelected =
        getValues("shops").findIndex((item) => item === shop.value) !== -1;

      const icon = renderIcon(
        "image",
        isShopSelected ? "var(--mui-palette-Corp_1)" : "transparent"
      );

      markerElement.innerHTML = icon;

      const marker = new YMapMarker(
        {
          coordinates: shop.coordinates as LngLat,
          properties: {
            id: shop.value,
          },
        },
        markerElement
      );

      // markers.push(marker);
      mapInstance?.addChild(marker);
    });
  }, [loaderData.ymaps, mapInstance, selectedShops]);

  // обновляем слушатель событий
  useEffect(() => {
    const { YMapListener, YMapMarker } = loaderData.ymaps;

    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type === "marker") {
          if (object.entity.properties) {
            const clickedShop = object.entity.properties.id as string;
            const clickedShopCoordinates = object.entity.coordinates;

            const currentSelectedShops = getValues("shops");

            const isShopSelected = currentSelectedShops.findIndex(
              (shop) => shop === clickedShop
            );

            if (isShopSelected > -1) {
              currentSelectedShops.splice(isShopSelected, 1);
            } else {
              currentSelectedShops.push(clickedShop);
            }

            mapInstance?.removeChild(object.entity);

            const markerElement = document.createElement("div");
            const icon = renderIcon(
              "image",
              isShopSelected > -1 ? "transparent" : "var(--mui-palette-Corp_1)"
            );
            markerElement.innerHTML = icon;

            const marker = new YMapMarker(
              {
                coordinates: clickedShopCoordinates,
                properties: {
                  id: clickedShop,
                },
              },
              markerElement
            );

            mapInstance?.addChild(marker);
            setValue("shops", currentSelectedShops);
          }
        }
      },
    });

    if (mapInstance) {
      mapInstance.addChild(mapListener);
    }
  }, [loaderData.ymaps, mapInstance]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
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
          backAction={() => {
            navigate(withLocale("/signin/client/meta"), {
              viewTransition: true,
            });
          }}
        />

        <form
          onSubmit={handleSubmit((values) => {
            submit(JSON.stringify(values.shops), {
              method: "POST",
              encType: "application/json",
            });
          })}
        >
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
              control={control}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={t("searchbarPlaceholder")}
                  {...field}
                  onChange={(evt) => {
                    const currentFieldValue = new RegExp(
                      `^${evt.target.value}`,
                      "i"
                    );

                    const matchingShops = [
                      ...loaderData.shops.filter((item) =>
                        currentFieldValue.test(item.name)
                      ),
                    ];

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
                  placeholder={t("regionPlaceholder")}
                  options={loaderData.regions}
                  {...field}
                  onChange={(evt) => {
                    const currentSearchbarValue = new RegExp(
                      `^${getValues("searchbar")}`,
                      "i"
                    );

                    const matchingRegionShops =
                      evt.target.value !== ""
                        ? [
                            ...loaderData.shops.filter(
                              (item) => item.regionId === evt.target.value
                            ),
                          ]
                        : [...loaderData.shops];

                    const matchingShops = [
                      ...matchingRegionShops.filter((item) =>
                        currentSearchbarValue.test(item.name)
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
                  <LocationCheckboxMultiple
                    options={selectedShops}
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
              <Button
                type="button"
                onClick={() => {
                  reset();
                  setSelectedShops(loaderData.shops);
                }}
              >
                {t("cancelButton")}
              </Button>
              <Button type="submit" variant="contained">
                {t("selectButton")}{" "}
                {watch("shops").length > 0
                  ? ` ${getValues("shops").length}`
                  : null}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
