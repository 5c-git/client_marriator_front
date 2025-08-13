import { Link, useOutletContext, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import type { Route } from "./+types/assignments";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import Box from "@mui/material/Box";
import { Fab, SwipeableDrawer, Typography } from "@mui/material";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";
import { AssignmentCard } from "~/shared/ui/AssignmentCard/AssignmentCard";

import AddIcon from "@mui/icons-material/Add";

//map
import { YMap, LngLat, YMapMarker } from "ymaps3";
import { loadMap, langMap, renderIcon } from "~/shared/ymap/ymap";
import type { Coordinates } from "~/shared/ymap/ymap";
//map

import { useStore } from "~/store/store";

import { getOrders } from "~/requests/_personal/getOrders/getOrders";

const statusColorMap = {
  1: "var(--mui-palette-Corp_1)",
  2: "var(--mui-palette-Blue)",
  3: "var(--mui-palette-Grey_1)",
  4: "var(--mui-palette-Red)",
  5: "var(--mui-palette-Grey_2)",
};

const statusMap = {
  new: "1",
  accepted: "2",
  notAccepted: "3",
  canceled: "4",
  archive: "5",
};

const sortMap = {
  ascending: "1",
  descending: "2",
};

type Option = {
  id: number;
  statusColor: string;
  header: string;
  subHeader: string;
  address: {
    logo: string;
    text: string;
  };
  duration: {
    start: string;
    end?: string;
  };
  coordinates: Coordinates;
};

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const language = i18next.language as "en" | "ru";
  const accessToken = useStore.getState().accessToken;

  const currentURL = new URL(request.url);

  const sort = currentURL.searchParams.get("sort");
  const status = currentURL.searchParams.get("status");
  const page = currentURL.searchParams.get("page");

  const assignments: Option[] = [];

  if (accessToken) {
    const ymaps = await loadMap(langMap[language]);

    const assignmentsData = await getOrders(
      accessToken,
      status ? status : undefined
    );

    assignmentsData.data.forEach((item) => {
      assignments.push({
        id: item.id,
        statusColor: statusColorMap[item.status],
        header: item.place.name,
        subHeader: "Сюда нужны услуги",
        address: {
          logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
          text: item.place.region.name,
        },
        duration: {
          start: "нужна дата начала",
          end: "нужна дата конца",
        },
        coordinates: [
          Number(item.place.latitude),
          Number(item.place.longitude),
        ],
      });
    });

    return { ymaps, assignments, sort, status };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Assignments({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("assignments");
  const [_, setSearchParams] = useSearchParams();
  const userRole = useStore.getState().userRole;

  const showMap = useOutletContext<boolean>();
  const [mapInstance, setMapInstance] = useState<YMap | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Option | null>(
    null
  );

  const { control, setValue, reset, getValues } = useForm<{
    status: string;
    sorting: string;
  }>({
    defaultValues: {
      status: loaderData.status ? loaderData.status : "2",
      sorting: loaderData.sort ? loaderData.sort : "",
    },
    mode: "onChange",
  });

  // рисуем пустую карту
  useEffect(() => {
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
      loaderData.ymaps;

    const container = document.querySelector("#map") as HTMLElement;

    let map: YMap | null = null;

    const coordinates: LngLat =
      loaderData.assignments.length > 0
        ? loaderData.assignments[0].coordinates
        : [30.315635, 59.950258];

    if (container) {
      map = new YMap(container, {
        location: { center: coordinates, zoom: 12 },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      setMapInstance(map);
    }

    return () => {
      map?.destroy();
      setMapInstance(null);
    };
  }, [showMap, loaderData.ymaps]);

  // рисуем на карте маркеры
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
    loaderData.assignments.forEach((location) => {
      const markerElement = document.createElement("div");

      const icon = renderIcon(location.address.logo, location.statusColor);

      markerElement.innerHTML = icon;

      const marker = new YMapMarker(
        {
          coordinates: location.coordinates as LngLat,
          properties: {
            id: location.id,
            icon: location.address.logo,
          },
        },
        markerElement
      );

      mapInstance?.addChild(marker);
    });
  }, [loaderData.ymaps, loaderData.assignments, mapInstance]);

  // обновляем слушатель событий
  useEffect(() => {
    const { YMapListener } = loaderData.ymaps;

    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type === "marker") {
          if (object.entity.properties) {
            const clickedLocation = object.entity.properties.id as number;

            const match = loaderData.assignments.find(
              (item) => item.id === clickedLocation
            );

            if (match) {
              setSelectedAssignment(match);
            }
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
      {loaderData.assignments.length > 0 ||
      loaderData.sort ||
      loaderData.status ? (
        <>
          <Box
            sx={{
              position: "relative",
              zIndex: "1",
              display: "grid",
              rowGap: "16px",
              padding: "20px 16px 16px 20px",
            }}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <StatusSelect
                  value={field.value}
                  onChange={(value) => {
                    setValue("status", value);
                    setSearchParams((searchParams) => {
                      searchParams.set("status", value);
                      searchParams.set("page", "1");
                      return searchParams;
                    });
                  }}
                  options={[
                    {
                      id: statusMap["notAccepted"],
                      label: t("status.notAccepted"),
                      count: 16,
                      color: "var(--mui-palette-Grey_1)",
                    },
                    {
                      id: statusMap["accepted"],
                      label: t("status.accepted"),
                      count: 5,
                      color: "var(--mui-palette-Blue)",
                    },
                    {
                      id: statusMap["canceled"],
                      label: t("status.canceled"),
                      count: 2,
                      color: "var(--mui-palette-Red)",
                    },
                    {
                      id: statusMap["archive"],
                      label: t("status.archive"),
                      count: 2,
                      color: "var(--mui-palette-Grey_2)",
                    },
                  ]}
                />
              )}
            />

            {!showMap ? (
              <Controller
                name="sorting"
                control={control}
                render={({ field }) => (
                  <StyledDropdown
                    options={[
                      {
                        value: "",
                        label: t("sorting.placeholder"),
                        disabled: true,
                      },
                      {
                        value: sortMap.ascending,
                        label: t("sorting.ascending"),
                        disabled: false,
                      },
                      {
                        value: sortMap.descending,
                        label: t("sorting.descending"),
                        disabled: false,
                      },
                    ]}
                    {...field}
                    onChange={(evt) => {
                      field.onChange(evt);

                      setSearchParams((searchParams) => {
                        searchParams.set("sort", evt.target.value);
                        searchParams.set("page", "1");
                        return searchParams;
                      });
                    }}
                  />
                )}
              />
            ) : null}
          </Box>

          {showMap ? (
            <Box
              id="map"
              sx={{
                position: "absolute",
                top: "108px",
                left: "0",
                width: "100%",
                height: "calc(100vh - 162px)",
              }}
            ></Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                rowGap: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingBottom: "16px",
              }}
            >
              {loaderData.assignments.map((item) => (
                <AssignmentCard
                  key={item.id}
                  to={`/assignments/${item.id}`}
                  statusColor={item.statusColor}
                  header={item.header}
                  subHeader={item.subHeader}
                  id={item.id.toString()}
                  address={item.address}
                  duration={item.duration}
                  divider
                  // {...(showMap === false
                  //   ? {
                  //       buttonAction: {
                  //         action: () => {},
                  //         text: "Отменить поручение",
                  //         variant: "text",
                  //       },
                  //     }
                  //   : {})}
                />
              ))}
            </Box>
          )}

          <SwipeableDrawer
            open={showMap && selectedAssignment !== null ? true : false}
            onClose={() => {
              setSelectedAssignment(null);
            }}
            onOpen={() => {}}
            disableBackdropTransition={true}
            disableSwipeToOpen={true}
            anchor="bottom"
            sx={{
              "& .MuiDrawer-paper": {
                borderRadius: "6px",
              },
            }}
          >
            <Box
              sx={{
                padding: "18px 16px",
              }}
            >
              {selectedAssignment !== null ? (
                <AssignmentCard
                  to={`/assignments/${selectedAssignment.id}`}
                  header={selectedAssignment.header}
                  subHeader={selectedAssignment.subHeader}
                  id={selectedAssignment.id.toString()}
                  address={selectedAssignment.address}
                  duration={selectedAssignment.duration}
                  // buttonAction={{
                  //   action: () => {},
                  //   text: "Отменить поручение",
                  //   variant: "text",
                  // }}
                  divider
                />
              ) : null}
            </Box>
          </SwipeableDrawer>
        </>
      ) : (
        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
            textAlign: "center",
            marginTop: "100px",
          })}
        >
          {userRole === "admin" || userRole === "client"
            ? t("emptyHeaderCreate")
            : t("emptyHeader")}
        </Typography>
      )}

      {(!showMap && userRole === "admin") ||
      (!showMap && userRole === "client") ||
      (loaderData.assignments.length === 0 &&
        userRole === "admin" &&
        !loaderData.sort &&
        !loaderData.status) ||
      (loaderData.assignments.length === 0 &&
        userRole === "client" &&
        !loaderData.sort &&
        !loaderData.status) ? (
        <Fab
          component={Link}
          to={withLocale("/new-assignment")}
          color="Corp_1"
          aria-label="Create new assignment"
          sx={{
            position: "fixed",
            bottom: "60px",
            right: "16px",
            width: "60px",
            height: "60px",
            zIndex: 1,
          }}
        >
          <AddIcon
            sx={{
              fontSize: "2rem",
            }}
          />
        </Fab>
      ) : null}
    </>
  );
}
