import type { ServiceMobileViewInterface } from "../ServiceMobileViewInterface";

import { useState } from "react";

import { useTranslation } from "react-i18next";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import {
  intervalToDuration,
  eachDayOfInterval,
  set,
  getDay,
  compareAsc,
  addDays,
  format,
} from "date-fns";

import { LocalizationProvider, DateTimeField } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale/ru";

import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  Avatar,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";

import {
  S_Accordion,
  S_AccordionSummary,
  S_AccordionDetails,
} from "../ServiceMobileView.styled";

import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";
import { TimeField } from "~/shared/ui/TimeField/TimeField";

import { CalendarIcon } from "~/shared/icons/CalendarIcon";
import { LocationIcon } from "~/shared/icons/LocationIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { ExpandIcon } from "~/shared/icons/ExpandIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

type ServiceFormMobileViewInterface = Omit<
  ServiceMobileViewInterface,
  "headerButtonAction" | "logo"
>;

export function ServiceFormMobileView(props: ServiceFormMobileViewInterface) {
  const { t } = useTranslation("ServiceFormMobileView");

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
      activity: props.entity.id,
      amount: props.entity.amount,
      dateStart: props.entity.dateStart,
      dateEnd: props.entity.dateEnd,
      needDays: props.entity.needDays,
      needFoto: props.entity.needPhoto,
      days: props.entity.days,
    },
    resolver: zodResolver(
      z.object({
        activity: z.string(t("text", { ns: "constructorFields" })),
        amount: z.string(t("text", { ns: "constructorFields" })),
        dateStart: z
          .date(t("text", { ns: "constructorFields" }))
          .min(new Date(), t("inFututreDate", { ns: "constructorFields" }))
          .nullable(),

        dateEnd: z
          .date(t("text", { ns: "constructorFields" }))
          .min(new Date(), t("inFututreDate", { ns: "constructorFields" }))
          .nullable()
          .refine(
            (value) => {
              const dateStart = getValues("dateStart");

              if (dateStart) {
                const result = compareAsc(value as Date, dateStart);
                if (result > 0) {
                  return true;
                }
              }

              return false;
            },
            { error: t("lessThanStartDate", { ns: "constructorFields" }) }
          ),
        needDays: z.boolean(),
        needFoto: z.boolean(),
        days: z.array(
          z.object({
            timeStart: z.date(t("text", { ns: "constructorFields" })),
            timeEnd: z.date(t("text", { ns: "constructorFields" })),
            needRoute: z.boolean().optional(),
            locations: z
              .array(
                z.object({
                  id: z.string(t("text", { ns: "constructorFields" })),
                  name: z.string(t("text", { ns: "constructorFields" })),
                  logo: z.string().optional(),
                })
              )
              .optional(),
          })
        ),
      })
    ),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "days",
  });

  return (
    <>
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
          bold: false,
        }}
        backAction={props.headerBackAction}
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
          id="service-form"
          onSubmit={handleSubmit((values) => {
            props.submitAction(values);
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
                placeholder={t(
                  `${props.translation}.fields.servicePlaceholder`
                )}
                onImmediateChange={() => {}}
                validation="none"
                error={errors.activity?.message}
                options={props.activities}
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
                label={t(`${props.translation}.fields.amountPlaceholder`)}
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
                  label={t(`${props.translation}.fields.startTimePlaceholder`)}
                  helperText={errors.dateStart?.message}
                  {...field}
                  value={field.value}
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
                  // error={true}
                  variant="filled"
                  label={t(`${props.translation}.fields.endTimePlaceholder`)}
                  helperText={errors.dateEnd?.message}
                  disablePast
                  {...field}
                  value={field.value}
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
                label={t(`${props.translation}.fields.needDaysPlaceholder`)}
                onImmediateChange={() => {}}
                error={errors.needDays?.message}
                validation="none"
                disabled={(() => {
                  const start = watch("dateStart");
                  const end = watch("dateEnd");

                  if (start && end) {
                    const interval = intervalToDuration({
                      start: start,
                      end: end,
                    }).days;

                    return watch("activity") !== "" && interval && interval > 0
                      ? false
                      : true;
                  }

                  return true;
                })()}
                onChange={(evt) => {
                  field.onChange(evt);
                  if (getValues("needDays") === true) {
                    const dateStart = getValues("dateStart");
                    const dateEnd = getValues("dateEnd");

                    if (dateStart && dateEnd) {
                      const days = eachDayOfInterval({
                        start: dateStart,
                        end: dateEnd,
                      });

                      for (let i = 0; i < days.length; i++) {
                        if (i === 0) {
                          append({
                            timeStart: dateStart,
                            timeEnd: set(days[i], { hours: 21 }),
                            needRoute: false,
                            ...((() => {
                              let result = false;
                              const match = props.activities.find(
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
                            timeStart: set(days[i], { hours: 9 }),
                            timeEnd: dateEnd,
                            ...((() => {
                              let result = false;
                              const match = props.activities.find(
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
                            timeStart: set(days[i], { hours: 9 }),
                            timeEnd: set(days[i], { hours: 21 }),
                            ...((() => {
                              let result = false;
                              const match = props.activities.find(
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
                    }
                  } else {
                    remove();
                  }
                }}
              />
            )}
          />
        </form>

        {fields.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "8px",
            }}
          >
            {fields.map((day, index) => (
              <S_Accordion key={day.id}>
                <S_AccordionSummary
                  expandIcon={
                    <ExpandIcon
                      sx={(theme) => ({
                        color: theme.vars.palette["Grey_2"],
                        padding: "4px",
                      })}
                    />
                  }
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      component="p"
                      variant="Bold_14"
                      sx={(theme) => ({
                        color: theme.vars.palette["Black"],
                      })}
                    >
                      {format(day.timeStart, "dd.MM")}
                      &nbsp;
                      {t(
                        //@ts-expect-error https://www.i18next.com/overview/typescript#type-error-template-literal
                        `${props.translation}.dayMap.${getDay(day.timeStart)}`
                      )}
                    </Typography>

                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({
                        color: theme.vars.palette["Black"],
                      })}
                    >
                      {format(
                        new Date(getValues(`days.${index}.timeStart`)),
                        "kk:mm"
                      )}
                      -
                      {format(
                        new Date(getValues(`days.${index}.timeEnd`)),
                        "kk:mm"
                      )}
                    </Typography>

                    {(() => {
                      const locations = getValues(`days.${index}.locations`);

                      if (locations && locations.length > 0) {
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              columnGap: "4px",
                            }}
                          >
                            <LocationIcon
                              sx={(theme) => ({
                                color: theme.vars.palette["Grey_2"],
                                padding: "2px",
                              })}
                            />
                            <Typography
                              component="p"
                              variant="Reg_14"
                              sx={(theme) => ({
                                color: theme.vars.palette["Black"],
                              })}
                            >
                              {locations.length}
                            </Typography>
                          </Box>
                        );
                      } else {
                        return null;
                      }
                    })()}
                  </Box>
                </S_AccordionSummary>
                <S_AccordionDetails>
                  {" "}
                  <Box>
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
                            minTime={field.value}
                            maxTime={set(field.value, {
                              hours: 21,
                            })}
                            placeholder={t(
                              `${props.translation}.fields.startClockPlaceholder`
                            )}
                            // error={errors.days[index]?.message}
                            {...field}
                            value={field.value.toString()}
                          />
                        )}
                      />
                      <Controller
                        name={`days.${index}.timeEnd` as const}
                        control={control}
                        render={({ field }) => (
                          <TimeField
                            minTime={set(field.value, {
                              hours: 9,
                            })}
                            maxTime={field.value}
                            placeholder={t(
                              `${props.translation}.fields.endClockPlaceholder`
                            )}
                            // error={errors.days[index]?.message}
                            {...field}
                            value={field.value.toString()}
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
                              label={t(
                                `${props.translation}.fields.needRoutePlaceholder`
                              )}
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
                              {getValues(`days.${index}.needRoute`) === true
                                ? getValues(`days.${index}.locations`)?.map(
                                    (location) => (
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
                                            sx={{
                                              width: "30px",
                                              height: "30px",
                                            }}
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
                                            const currentList = getValues(
                                              `days.${index}.locations`
                                            );

                                            const updatedList =
                                              currentList?.filter(
                                                (item) =>
                                                  item.id !== location.id
                                              );
                                            setValue(
                                              `days.${index}.locations`,
                                              updatedList
                                            );
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
                                    )
                                  )
                                : null}

                              {getValues(`days.${index}.needRoute`) === true ? (
                                <Button
                                  variant="outlined"
                                  startIcon={<PointerIcon />}
                                  onClick={() => {
                                    setDayIndex(index);
                                  }}
                                >
                                  {t(`${props.translation}.addAddressButton`)}
                                </Button>
                              ) : null}
                            </Box>
                          </>
                        )}
                      />
                    ) : null}

                    <Button
                      type="button"
                      variant="text"
                      sx={{
                        marginTop: "14px",
                      }}
                      onClick={() => {
                        remove(index);
                        if (getValues("days")?.length === 0) {
                          setValue("needDays", false);
                        }
                      }}
                    >
                      {t(`${props.translation}.deleteDayButton`)}
                    </Button>

                    <Divider sx={{ marginTop: "8px" }} />
                  </Box>
                </S_AccordionDetails>
              </S_Accordion>
            ))}
          </Box>
        ) : null}

        <Button
          variant="outlined"
          type="button"
          startIcon={<CalendarIcon />}
          onClick={() => {
            const days = getValues("days");

            const lastDay = days ? [...days].pop() : undefined;

            if (lastDay) {
              append({
                timeStart: addDays(lastDay.timeStart, 1),
                timeEnd: addDays(lastDay.timeEnd, 2),
                needRoute: false,
                locations: [],
              });
            } else {
              append({
                timeStart: addDays(new Date(), 1),
                timeEnd: addDays(new Date(), 2),
                needRoute: false,
                locations: [],
              });
            }
          }}
        >
          {t(`${props.translation}.addDayButton`)}
        </Button>

        <Controller
          name="needFoto"
          control={control}
          render={({ field }) => (
            <StyledCheckbox
              {...field}
              inputType="checkbox"
              label={t(`${props.translation}.fields.needPhotosPlaceholder`)}
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
              props.cancelAction();
            }}
          >
            {t(`${props.translation}.cancelButton`)}
          </Button>
          <Button form="service-form" type="submit" variant="contained">
            {t(`${props.translation}.saveButton`)}
          </Button>
        </Box>
      </Box>

      <CheckboxSearchableDrawer
        translation={props.locationsTranslation}
        open={dayIndex !== -1 ? true : false}
        onClose={() => {
          setDayIndex(-1);
        }}
        onSubmit={(values) => {
          const selectedDayLocations = getValues(`days.${dayIndex}.locations`);
          const selectedLoactions = values;

          selectedLoactions.forEach((item) => {
            const match = props.locations.find(
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
          setDayIndex(-1);
        }}
        items={props.locations}
      />
    </>
  );
}
