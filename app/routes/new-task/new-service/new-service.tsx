import { useState } from "react";
import { useNavigation, useNavigate, useSubmit, redirect } from "react-router";
import type { Route } from "./+types/new-service";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import {
  intervalToDuration,
  eachDayOfInterval,
  set,
  getDate,
  getMonth,
  getDay,
  compareAsc,
} from "date-fns";

import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  SwipeableDrawer,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimeField } from "@mui/x-date-pickers";
import { ru } from "date-fns/locale/ru";

import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";
import { TimeField } from "~/shared/ui/TimeField/TimeField";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

import { PointerIcon } from "~/shared/icons/PointerIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

import { useStore } from "~/store/store";

import { dateWithoutTimezone } from "~/shared/dateWithoutTimezone";

import { getViewActivitiesForTask } from "~/requests/_personal/getViewActivitiesForTask/getViewActivitiesForTask";
import { getPlaceForTask } from "~/requests/_personal/getPlaceForTask/getPlaceForTask";

import { postCreateTaskActivity } from "~/requests/_personal/postCreateTaskActivity/postCreateTaskActivity";
import type { postCreateTaskActivityPayload } from "~/requests/_personal/postCreateTaskActivity/postCreateTaskActivity";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;

  const activities: {
    value: string;
    label: string;
    needRoute: boolean;
    disabled: boolean;
  }[] = [];

  const locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[] = [];

  if (accessToken) {
    const activitiesData = await getViewActivitiesForTask(
      accessToken,
      params.taskId
    );

    const locationsData = await getPlaceForTask(accessToken);

    activitiesData.data.forEach((item) => {
      activities.push({
        value: item.id.toString(),
        label: item.name,
        needRoute: item.traveling,
        disabled: false,
      });
    });

    locationsData.data.forEach((item) => {
      locations.push({
        value: item.id.toString(),
        label: `${item.name} ${item.region.name}`,
        logo: item.logo,
        disabled: false,
      });
    });

    return { taskId: params.taskId, activities, locations };
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
    await postCreateTaskActivity(accessToken, fields);

    throw redirect(withLocale(`/new-task?taskId=${params.taskId}`));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function NewService({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const { t } = useTranslation("new_service");

  const [selectedLocations, setSelectedLocations] = useState(
    loaderData.locations
  );
  const [dayIndex, setDayIndex] = useState<number>(-1);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    getValues,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      activity: "",
      amount: "",
      dateStart: null as unknown as undefined,
      dateEnd: null as unknown as undefined,
      needDays: false,
      needFoto: false,
      days: [],
    },
    resolver: yupResolver(
      Yup.object({
        activity: Yup.string().required(t("text", { ns: "constructorFields" })),
        amount: Yup.string().required(t("text", { ns: "constructorFields" })),
        dateStart: Yup.date()
          .nullable()
          .min(new Date(), t("inFututreDate", { ns: "constructorFields" }))
          .required(t("text", { ns: "constructorFields" })),
        dateEnd: Yup.date()
          .nullable()
          .min(new Date(), t("inFututreDate", { ns: "constructorFields" }))
          .test(
            "is-after",
            t("lessThanStartDate", { ns: "constructorFields" }),
            (value) => {
              const result = compareAsc(
                (value as Date) || null,
                getValues("dateStart")
              );

              if (result > 0) {
                return true;
              }

              return false;
            }
          )
          .required(t("text", { ns: "constructorFields" })),
        needDays: Yup.boolean().required(),
        needFoto: Yup.boolean().required(),
        days: Yup.array().of(
          Yup.object().shape({
            timeStart: Yup.string()
              .nullable()
              .required(t("text", { ns: "constructorFields" })),
            timeEnd: Yup.string()
              .nullable()
              .required(t("text", { ns: "constructorFields" })),
            needRoute: Yup.boolean().notRequired(),
            locations: Yup.array().of(
              Yup.object().shape({
                id: Yup.string().required(
                  t("text", { ns: "constructorFields" })
                ),
                name: Yup.string().required(
                  t("text", { ns: "constructorFields" })
                ),
                logo: Yup.string().notRequired(),
              })
            ),
          })
        ),
      })
    ),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "days",
  });

  const {
    control: controlAddress,
    getValues: getValuesAddress,
    reset: resetAddress,
    handleSubmit: handleAddressSubmit,
  } = useForm<{
    searchbar: string;
    locations: string[];
  }>({
    defaultValues: {
      searchbar: "",
      locations: [],
    },
    // @ts-expect-error
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        locations: Yup.array().of(Yup.string()).min(1),
      })
    ),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale(`/new-task?taskId=${loaderData.taskId}`), {
            viewTransition: true,
          });
        }}
      />
      <Box
        sx={{
          height: "calc(100vh - 120px)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",

          rowGap: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "20px",
        }}
      >
        <form
          id="new-service-form"
          onSubmit={handleSubmit((values) => {
            const payload: postCreateTaskActivityPayload = {
              taskId: Number(loaderData.taskId),
              viewActivityId: Number(values.activity),
              count: Number(values.amount),
              dateStart: dateWithoutTimezone(new Date(values.dateStart)),
              dateEnd: dateWithoutTimezone(new Date(values.dateEnd)),
              needFoto: values.needFoto,
              ...(values.days &&
                values.days.length > 0 && {
                  dateActivity: (() => {
                    const days: {
                      timeStart: string;
                      timeEnd: string;
                      placeIds?: number[];
                    }[] = [];

                    values.days?.forEach((day) => {
                      const places: number[] = [];

                      day.locations?.forEach((location) => {
                        places.push(Number(location.id));
                      });

                      days.push({
                        timeStart: dateWithoutTimezone(new Date(day.timeStart)),
                        timeEnd: dateWithoutTimezone(new Date(day.timeEnd)),
                        ...(places.length > 0 && { placeIds: places }),
                      });
                    });

                    return days;
                  })(),
                }),
            };

            submit(JSON.stringify(payload), {
              method: "POST",
              encType: "application/json",
            });
          })}
          style={{
            display: "grid",
            rowGap: "14px",
            width: "100%",
          }}
        >
          <Controller
            name="activity"
            control={control}
            render={({ field }) => (
              <StyledSelect
                inputType="select"
                placeholder={t("fields.servicePlaceholder")}
                onImmediateChange={() => {}}
                validation="none"
                error={errors.activity?.message}
                options={loaderData.activities}
                {...field}
                onChange={(evt) => {
                  field.onChange(evt);
                  remove();
                  setValue("needDays", false);
                }}
              />
            )}
          />

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("fields.amountPlaceholder")}
                error={errors.amount?.message ? true : false}
                helperText={errors.amount?.message}
                slotProps={{
                  input: {
                    inputComponent: MaskedField as never,
                    inputProps: {
                      mask: "00",
                    },
                    inputMode: "numeric",
                    type: "tel",
                  },
                }}
              />
            )}
          />

          <Controller
            name="dateStart"
            control={control}
            render={({ field }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ru}
              >
                <DateTimeField
                  error={errors.dateStart?.message ? true : false}
                  variant="filled"
                  label={t("fields.startTimePlaceholder")}
                  helperText={errors.dateStart?.message}
                  disablePast
                  {...field}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="dateEnd"
            control={control}
            render={({ field }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ru}
              >
                <DateTimeField
                  error={errors.dateEnd?.message ? true : false}
                  variant="filled"
                  label={t("fields.endTimePlaceholder")}
                  helperText={errors.dateStart?.message}
                  disablePast
                  {...field}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="needDays"
            control={control}
            render={({ field }) => (
              <StyledCheckbox
                {...field}
                inputType="checkbox"
                label={t("fields.needDaysPlaceholder")}
                onImmediateChange={() => {}}
                error={errors.needDays?.message}
                validation="none"
                disabled={(() => {
                  const interval = intervalToDuration({
                    start: watch("dateStart"),
                    end: watch("dateEnd"),
                  }).days;

                  return watch("activity") !== "" &&
                    getValues("dateStart") !== null &&
                    getValues("dateEnd") !== null &&
                    interval &&
                    interval > 0
                    ? false
                    : true;
                })()}
                onChange={(evt) => {
                  field.onChange(evt);
                  if (getValues("needDays") === true) {
                    const dateStart = getValues("dateStart");
                    const dateEnd = getValues("dateEnd");

                    const days = eachDayOfInterval({
                      start: dateStart,
                      end: dateEnd,
                    });

                    for (let i = 0; i < days.length; i++) {
                      if (i === 0) {
                        append({
                          timeStart: getValues("dateStart").toString(),
                          timeEnd: set(days[i], { hours: 21 }).toString(),
                          ...((() => {
                            let result = false;
                            const match = loaderData.activities.find(
                              (item) => item.value === getValues("activity")
                            );

                            if (match) {
                              result = match.needRoute;
                            }

                            return result;
                          })() && { needRoute: false, locations: [] }),
                        });
                      } else if (i === days.length - 1) {
                        append({
                          timeStart: set(days[i], { hours: 9 }).toString(),
                          timeEnd: getValues("dateEnd").toString(),
                          ...((() => {
                            let result = false;
                            const match = loaderData.activities.find(
                              (item) => item.value === getValues("activity")
                            );

                            if (match) {
                              result = match.needRoute;
                            }

                            return result;
                          })() && { needRoute: false, locations: [] }),
                        });
                      } else {
                        append({
                          timeStart: set(days[i], { hours: 9 }).toString(),
                          timeEnd: set(days[i], { hours: 21 }).toString(),
                          ...((() => {
                            let result = false;
                            const match = loaderData.activities.find(
                              (item) => item.value === getValues("activity")
                            );

                            if (match) {
                              result = match.needRoute;
                            }

                            return result;
                          })() && { needRoute: false, locations: [] }),
                        });
                      }
                    }
                  } else {
                    remove();
                  }
                }}
              />
            )}
          />
        </form>

        {fields.map((day, index) => (
          <Box key={day.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography
                component="p"
                variant="Bold_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {getDate(day.timeStart)}.
                {getMonth(day.timeStart) < 10
                  ? `0${getMonth(day.timeStart) + 1}`
                  : getMonth(day.timeStart) + 1}
                &nbsp;
                {/*@ts-expect-error https://www.i18next.com/overview/typescript#type-error-template-literal */}
                {t(`dayMap.${getDay(day.timeStart)}`)}
              </Typography>

              <IconButton
                onClick={() => {
                  remove(index);
                  if (getValues("days")?.length === 0) {
                    setValue("needDays", false);
                  }
                }}
                sx={{
                  width: "24px",
                  height: "24px",
                }}
              >
                <DeleteIcon
                  sx={{
                    width: "12px",
                    height: "12px",
                  }}
                />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                columnGap: "10px",
                marginBottom: "14px",
              }}
            >
              <Controller
                name={`days.${index}.timeStart` as const}
                control={control}
                render={({ field }) => (
                  <TimeField
                    minTime={new Date(field.value)}
                    maxTime={set(new Date(field.value), { hours: 21 })}
                    placeholder={t("fields.startClockPlaceholder")}
                    // error={errors.days[index]?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name={`days.${index}.timeEnd` as const}
                control={control}
                render={({ field }) => (
                  <TimeField
                    minTime={set(new Date(field.value), { hours: 9 })}
                    maxTime={new Date(field.value)}
                    placeholder={t("fields.endClockPlaceholder")}
                    // error={errors.days[index]?.message}
                    {...field}
                  />
                )}
              />
            </Box>

            {getValues(`days.${index}.needRoute`) !== undefined ? (
              <Controller
                name={`days.${index}.needRoute` as const}
                control={control}
                render={({ field }) => (
                  <>
                    <StyledCheckbox
                      {...field}
                      inputType="checkbox"
                      label={t("fields.needRoutePlaceholder")}
                      onImmediateChange={() => {}}
                      validation="none"
                      value={field.value as boolean}
                    />

                    <Box
                      sx={{
                        display: "grid",
                        rowGap: "14px",
                      }}
                    >
                      {getValues(`days.${index}.locations`)?.map((location) => (
                        <Box
                          key={location.id}
                          sx={{
                            display: "flex",
                            columnGap: "12px",
                            alignItems: "center",
                          }}
                        >
                          {location.logo ? (
                            <Avatar
                              src={`${import.meta.env.VITE_ASSET_PATH}${
                                location.logo
                              }`}
                              sx={{ width: "30px", height: "30px" }}
                            />
                          ) : null}

                          <Typography
                            component="p"
                            variant="Reg_14"
                            sx={{
                              flexGrow: "1",
                            }}
                          >
                            {location.name}
                          </Typography>

                          <IconButton
                            onClick={() => {
                              debugger;
                              const currentList = getValues(
                                `days.${index}.locations`
                              );

                              const updatedList = currentList?.filter(
                                (item) => item.id !== location.id
                              );
                              setValue(`days.${index}.locations`, updatedList);
                              trigger(`days.${index}.locations`);
                            }}
                            sx={{
                              width: "24px",
                              height: "24px",
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                width: "12px",
                                height: "12px",
                              }}
                            />
                          </IconButton>
                        </Box>
                      ))}

                      {getValues(`days.${index}.needRoute`) === true ? (
                        <Button
                          variant="outlined"
                          startIcon={<PointerIcon />}
                          onClick={() => {
                            setDayIndex(index);
                          }}
                        >
                          {t("addAddressButton")}
                        </Button>
                      ) : null}
                    </Box>
                  </>
                )}
              />
            ) : null}

            <Divider sx={{ marginTop: "14px" }} />
          </Box>
        ))}

        <Controller
          name="needFoto"
          control={control}
          render={({ field }) => (
            <StyledCheckbox
              {...field}
              inputType="checkbox"
              label={t("fields.needPhotosPlaceholder")}
              onImmediateChange={() => {}}
              validation="none"
            />
          )}
        />

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
              // setSelectedLocations(loaderData.locations);
            }}
          >
            {t("cancelButton")}
          </Button>
          <Button form="new-service-form" type="submit" variant="contained">
            {t("saveButton")}
          </Button>
        </Box>
      </Box>

      <SwipeableDrawer
        open={dayIndex !== -1 ? true : false}
        onClose={() => {
          resetAddress();
          setDayIndex(-1);
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
        <TopNavigation
          header={{
            text: t("popupHeader"),
            bold: false,
          }}
        />
        <form
          onSubmit={handleAddressSubmit(() => {
            const selectedDayLocations = getValues(
              `days.${dayIndex}.locations`
            );
            const selectedLoactions = getValuesAddress("locations");

            selectedLoactions.forEach((item) => {
              const match = loaderData.locations.find(
                (location) => location.value === item
              );

              const isAlreadySelected = selectedDayLocations?.find(
                (location) => location.id === item
              );

              if (match && isAlreadySelected === undefined) {
                selectedDayLocations?.push({
                  id: match.value,
                  name: match.label,
                  ...(match.logo && { logo: match.logo }),
                });
              }
            });

            resetAddress();
            setDayIndex(-1);
          })}
        >
          <Box
            sx={{
              position: "relative",
              display: "grid",
              alignContent: "flex-start",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
              height: "85vh",
            }}
          >
            <Controller
              name="searchbar"
              control={controlAddress}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={t("fields.searchbarPlaceholder")}
                  {...field}
                  onChange={(evt) => {
                    const currentFieldValue = new RegExp(
                      `^${evt.target.value}`,
                      "i"
                    );

                    let matchingLocations: typeof loaderData.locations = [];

                    if (evt.target.value !== "") {
                      matchingLocations = [
                        ...selectedLocations.filter((item) =>
                          currentFieldValue.test(item.label)
                        ),
                      ];
                    } else {
                      matchingLocations = [...loaderData.locations];
                    }

                    setSelectedLocations(matchingLocations);

                    field.onChange(evt);
                  }}
                />
              )}
            />

            <Controller
              name="locations"
              control={controlAddress}
              render={({ field }) => (
                <StyledCheckboxMultiple
                  inputType="checkboxMultiple"
                  onImmediateChange={() => {}}
                  options={selectedLocations}
                  {...field}
                />
              )}
            />

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
                type="submit"
                variant="contained"
                startIcon={<PointerIcon />}
              >
                {t("addSelectedAddressButton")}
              </Button>
            </Box>
          </Box>
        </form>
      </SwipeableDrawer>
    </>
  );
}
