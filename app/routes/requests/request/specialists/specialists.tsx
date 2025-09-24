import { useState } from "react";
import { useSubmit, redirect, useOutletContext } from "react-router";
import type { Route } from "./+types/specialists";

import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useStore } from "~/store/store";
import { withLocale } from "~/shared/withLocale";
import { format, eachDayOfInterval } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { statusCodeMap, statusValueMap } from "./statusMap";

import Box from "@mui/material/Box";
import { Button, IconButton, Typography } from "@mui/material";

import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";
import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { AssignmentCard } from "~/shared/ui/AssignmentCard/AssignmentCard";

import { UploadIcon } from "~/shared/icons/UploadIcon";
import { PhoneIcon } from "~/shared/icons/PhoneIcon";

import { getSpecialistForBid } from "~/requests/_personal/getSpecialistForBid/getSpecialistForBid";
import { getRadiusSelect } from "~/requests/_personal/getRadiusSelect/getRadiusSelect";
import { postInvoiceBid } from "~/requests/_personal/postInvoiceBid/postInvoiceBid";
import type { GetBidSuccess } from "~/requests/_personal/getBid/getBidSuccess.type";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;

  const radiusValues: {
    value: string;
    label: string;
    disabled: boolean;
  }[] = [];

  const specialists: {
    value: string;
    label: string;
    subHeader: string;
    image: string;
    disabled: boolean;
    radius: number;
    features: {
      label: string;
      active: boolean;
    }[];
  }[] = [];

  if (accessToken) {
    const specialistsData = await getSpecialistForBid(
      accessToken,
      params.requestId,
    );
    specialistsData.data.forEach((item) => {
      specialists.push({
        value: item.id.toString(),
        label: item.name,
        subHeader: item.country,
        image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
        disabled: false,
        radius: Number(item.radius),
        features: item.viewActivities.map((item) => ({
          label: item,
          active: false,
        })),
      });
    });

    const radiusData = await getRadiusSelect(accessToken);

    radiusData.data.forEach((item) => {
      radiusValues.push({
        // value: item.value.toString(),
        value: item.id.toString(),
        label: item.id.toString(),
        disabled: false,
      });
    });

    let startingRadius = 1;

    const defaultRadius = radiusData.data.find((item) => item.default === true);

    if (defaultRadius) {
      startingRadius = defaultRadius.id;
    }

    const startingSpecialists = specialists.filter(
      (item) => item.radius <= startingRadius,
    );

    return {
      startingSpecialists,
      startingRadius,
      specialists,
      radiusValues,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    await postInvoiceBid(accessToken, params.requestId, fields);
    throw redirect(withLocale(`/requests/${params.requestId}`));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Specialists({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("request_specialists");
  const submit = useSubmit();

  const { request, editMode } = useOutletContext<{
    request: GetBidSuccess["data"];
    editMode: boolean;
  }>();

  const { control, getValues, setValue, handleSubmit } = useForm<{
    searchbar: string;
    selectAll: boolean;
    radius: number;
    users: string[];
  }>({
    defaultValues: {
      searchbar: "",
      selectAll: false,
      radius: loaderData.startingRadius,
      users: [],
    },
    // @ts-expect-error wrong narroiing type
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        users: Yup.array().of(Yup.string()).min(1),
      }),
    ),
  });

  const correctFeaturesSpecialists = loaderData.startingSpecialists;
  correctFeaturesSpecialists.forEach((item) => {
    item.features = item.features.map((feature) => ({
      label: feature.label,
      active: request.viewActivity.name === feature.label,
    }));
  });

  const [selectedSpecialists, setSelectedSpecialists] = useState(
    loaderData.startingSpecialists,
  );

  // cards page
  const filteredSpecialists: {
    notAccepted: typeof request.acceptingUsers;
    accepted: typeof request.acceptingUsers;
    declined: typeof request.acceptingUsers;
    consideration: typeof request.acceptingUsers;
    work: typeof request.acceptingUsers;
    empty: typeof request.acceptingUsers;
  } = {
    notAccepted: [],
    accepted: [],
    declined: [],
    consideration: [],
    work: [],
    empty: [],
  };

  filteredSpecialists.notAccepted = request.acceptingUsers.filter(
    (item) => item.status === statusValueMap.notAccepted,
  );
  filteredSpecialists.accepted = request.acceptingUsers.filter(
    (item) => item.status === statusValueMap.accepted,
  );
  filteredSpecialists.declined = request.acceptingUsers.filter(
    (item) => item.status === statusValueMap.declined,
  );
  filteredSpecialists.consideration = request.acceptingUsers.filter(
    (item) => item.status === statusValueMap.consideration,
  );
  filteredSpecialists.work = request.acceptingUsers.filter(
    (item) => item.status === statusValueMap.work,
  );

  let activeStatus: keyof typeof statusValueMap | "empty" = "empty";

  if (filteredSpecialists.notAccepted.length > 0) {
    activeStatus = "notAccepted";
  }
  if (filteredSpecialists.accepted.length > 0) {
    activeStatus = "accepted";
  }
  if (filteredSpecialists.declined.length > 0) {
    activeStatus = "declined";
  }
  if (filteredSpecialists.consideration.length > 0) {
    activeStatus = "consideration";
  }
  if (filteredSpecialists.work.length > 0) {
    activeStatus = "work";
  }

  const daysRange = eachDayOfInterval({
    start: new UTCDate(request.dateStart),
    end: new UTCDate(request.dateEnd),
  });

  const [filter, setFilter] = useState<keyof typeof statusValueMap | "empty">(
    activeStatus,
  );
  const [selectedDate, setSelectedDate] = useState<UTCDate>(daysRange[0]);

  const [activeSpecialists, setActiveSpecialists] = useState<
    typeof request.acceptingUsers
  >(filteredSpecialists[filter]);
  // cards page

  return (
    <>
      {request.acceptingUsers.length === 0 ? (
        <form
          onSubmit={handleSubmit(() => {
            submit(JSON.stringify(getValues("users")), {
              method: "POST",
              encType: "application/json",
            });
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

                    let matchingSpecialists: typeof loaderData.specialists = [];

                    // обрататываем поиск
                    if (evt.target.value !== "") {
                      matchingSpecialists = [
                        ...selectedSpecialists.filter((item) =>
                          currentFieldValue.test(item.label),
                        ),
                      ];
                    } else {
                      matchingSpecialists = [...loaderData.specialists];
                    }

                    //обрабатываем радиус
                    const sortedSpecialists = matchingSpecialists.filter(
                      (item) => item.radius <= currentRadius,
                    );

                    //обрабатываем "выбрать всё"
                    if (isSelectedAll) {
                      const newValues: string[] = [];

                      sortedSpecialists.forEach((item) => {
                        newValues.push(item.value);
                      });

                      setValue("users", newValues);
                    }

                    setSelectedSpecialists(sortedSpecialists);

                    field.onChange(evt);
                  }}
                />
              )}
            />

            <Box>
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
                          newValues.push(item.value);
                        });
                      }

                      setValue("users", newValues);
                    }}
                  />
                )}
              />

              <Controller
                name="radius"
                control={control}
                render={({ field }) => (
                  <StyledDropdown
                    options={loaderData.radiusValues}
                    {...field}
                    value={field.value.toString()}
                    onChange={(evt) => {
                      field.onChange(evt);

                      const selectedValue: number = Number(evt.target.value);

                      const sortedSpecialists = loaderData.specialists.filter(
                        (item) => item.radius <= selectedValue,
                      );

                      setSelectedSpecialists(sortedSpecialists);
                    }}
                  />
                )}
              />
            </Box>

            <Controller
              name="users"
              control={control}
              render={({ field }) => (
                <StyledCheckboxMultiple
                  inputType="checkboxMultiple"
                  onImmediateChange={() => {}}
                  options={selectedSpecialists}
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
      ) : (
        <>
          <Box
            sx={{
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <StatusSelect
              value={filter}
              onChange={(value) => {
                setFilter(value as typeof filter);
              }}
              options={[
                ...(filteredSpecialists.notAccepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.notAccepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.notAccepted"),
                        count: filteredSpecialists.notAccepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.notAccepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(filteredSpecialists.accepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.accepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.accepted"),
                        count: filteredSpecialists.accepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.accepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(filteredSpecialists.declined.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.declined as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.declined"),
                        count: filteredSpecialists.declined.length,
                        color:
                          statusCodeMap[
                            statusValueMap.declined as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(filteredSpecialists.consideration.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.consideration as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.consideration"),
                        count: filteredSpecialists.consideration.length,
                        color:
                          statusCodeMap[
                            statusValueMap.consideration as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(filteredSpecialists.work.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.work as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.work"),
                        count: filteredSpecialists.work.length,
                        color:
                          statusCodeMap[
                            statusValueMap.work as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
              ]}
            />

            <StyledDropdown
              value={selectedDate.toUTCString()}
              onChange={(evt) => {
                setSelectedDate(new UTCDate(evt.target.value));
              }}
              name="dateSelect"
              options={daysRange.map((date) => ({
                value: date.toUTCString(),
                label: format(new UTCDate(date), "dd.LL.yyyy"),
                disabled: true,
              }))}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              rowGap: "14px",
            }}
          >
            {activeSpecialists.map((user) => (
              <AssignmentCard
                key={user.id}
                id={user.id.toString()}
                avatar={{
                  logo: `${import.meta.env.VITE_ASSET_PATH}${user.logo}`,
                  name: user.name,
                  address: `${user.age}, ${user.country}`,
                  skills: user.viewActivities.map((item) => ({
                    label: item,
                    active: request.viewActivity.name === item,
                  })),
                }}
                buttonsTray={{
                  leftTray: [
                    <IconButton
                      key="phone"
                      component="a"
                      href={`tel:+${user.phone}`}
                      sx={(theme) => ({
                        display: "flex",
                        padding: "7px",
                        color: theme.vars.palette["Corp_1"],
                        backgroundColor: theme.vars.palette["Grey_4"],
                        borderRadius: "5px",
                      })}
                    >
                      <PhoneIcon
                        sx={{
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    </IconButton>,
                  ],
                }}
                statusColor={statusCodeMap[user.status].color}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
}
