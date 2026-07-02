import { useState } from "react";

import { Link } from "react-router";

import type { BidMobileViewInterface } from "./BidMobileViewInterface";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { statusCodeMap } from "~/shared/status";

import { ru } from "date-fns/locale/ru";
import { LocalizationProvider, DateTimeField } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { withLocale } from "~/shared/withLocale";

import {
  compareAsc,
  format,
  set,
  getDay,
  eachDayOfInterval,
  intervalToDuration,
  isSameDay,
  isBefore,
  isAfter,
  addDays,
} from "date-fns";

import { determineRole } from "~/shared/determineRole";

import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";
import { TimeField } from "~/shared/ui/TimeField/TimeField";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  S_Accordion,
  S_AccordionSummary,
  S_AccordionDetails,
} from "./BidMobileView.styled";

import { ExpandIcon } from "~/shared/icons/ExpandIcon";
import { LocationIcon } from "~/shared/icons/LocationIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { CalendarIcon } from "~/shared/icons/CalendarIcon";

const createBidFormSchema = (
  startDate: Date,
  endDate: Date,
  defaultStartDate: Date,
  defaultEndDate: Date,
  projectStartDate: Date,
  projectEndDate: Date,
) =>
  z
    .object({
      place: z.number({ error: t("text", { ns: "constructorFields" }) }),
      activity: z.number({ error: t("text", { ns: "constructorFields" }) }),
      amount: z.number({ error: t("text", { ns: "constructorFields" }) }),
      unitPrice: z.string({ error: t("text", { ns: "constructorFields" }) }),
      radius: z
        .string({ error: t("text", { ns: "constructorFields" }) })
        .min(1),
      dateStart: z
        .date({ error: t("text", { ns: "constructorFields" }) })
        .min(projectStartDate, {
          error: t("earlierThanProject", { ns: "constructorFields" }),
        })
        .min(startDate, {
          error: t("newDateBeforeStart", { ns: "constructorFields" }),
        })
        .max(projectEndDate, {
          error: t("laterThanProject", { ns: "constructorFields" }),
        }),
      dateEnd: z
        .date({ error: t("text", { ns: "constructorFields" }) })
        .min(projectStartDate, {
          error: t("earlierThanProject", { ns: "constructorFields" }),
        })
        .max(endDate, {
          error: t("newDateAfterFinish", { ns: "constructorFields" }),
        })
        .max(projectEndDate, {
          error: t("laterThanProject", { ns: "constructorFields" }),
        }),
      needDays: z.boolean(),
      needFoto: z.boolean(),
      days: z
        .array(
          z.object({
            timeStart: z.date({
              error: t("text", { ns: "constructorFields" }),
            }),
            timeEnd: z.date({
              error: t("text", { ns: "constructorFields" }),
            }),
            needRoute: z.boolean().optional(),
            locations: z
              .array(
                z.object({
                  id: z
                    .string()
                    .trim()
                    .min(1, {
                      error: t("text", { ns: "constructorFields" }),
                    }),
                  name: z
                    .string()
                    .trim()
                    .min(1, {
                      error: t("text", { ns: "constructorFields" }),
                    }),
                  logo: z.string().optional(),
                }),
              )
              .optional(),
          }),
        )
        .superRefine((days, ctx) => {
          days.forEach((day, index) => {
            const locations = day.locations;
            if (locations && locations.length < 1 && day.needRoute === true) {
              ctx.addIssue({
                code: "custom",
                message: t("locationsNeeded", { ns: "constructorFields" }),
                input: day.locations,
                path: [index],
              });
            }
          });
        }),
    })
    .superRefine((values, ctx) => {
      const dateStart = values.dateStart;
      const dateEnd = values.dateEnd;

      //проверяем что дата конца не раньше даты старта
      const result = compareAsc(dateStart, dateEnd);
      if (result >= 0) {
        ctx.addIssue({
          code: "custom",
          message: t("lessThanStartDate", { ns: "constructorFields" }),
          input: values.dateEnd,
          path: ["dateEnd"],
        });
      }

      //проверяем что дата старта и дата конца не выходят за заданные временные рамки
      if (
        isAfter(
          dateEnd,
          set(dateEnd, {
            hours: defaultEndDate.getHours(),
            minutes: defaultEndDate.getMinutes(),
          }),
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: t("service.laterThanDefaultError", {
            ns: "ServiceMobileView",
          }),
          input: values.dateEnd,
          path: ["dateEnd"],
        });
      }

      if (
        isBefore(
          dateStart,
          set(dateStart, {
            hours: defaultStartDate.getHours(),
            minutes: defaultStartDate.getMinutes(),
          }),
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: t("service.earlierThanDefaultError", {
            ns: "ServiceMobileView",
          }),
          input: values.dateStart,
          path: ["dateStart"],
        });
      }

      //проверяем что детальные дни не выходят за заданные временные рамки
      // первый и последний дни проверяем по указанному пользователем времени
      // все внутренние дни проверяем по заданному промежутку с сервера
      const days = values.days;

      days.forEach((day, index) => {
        const isStartDay = isSameDay(dateStart, day.timeStart);
        const isEndDay = isSameDay(dateEnd, day.timeStart);

        //проверяем что дата конца не раньше даты старта
        const result = compareAsc(day.timeStart, day.timeEnd);
        if (result >= 0) {
          ctx.addIssue({
            code: "custom",
            message: t("moreThanEndDate", { ns: "constructorFields" }),
            input: values.days[index],
            path: [`days.${index}.timeStart`],
          });
          ctx.addIssue({
            code: "custom",
            message: t("lessThanStartDate", { ns: "constructorFields" }),
            input: values.days[index],
            path: [`days.${index}.timeEnd`],
          });
        }

        if (
          isBefore(
            day.timeStart,
            set(day.timeStart, {
              hours: defaultStartDate.getHours(),
              minutes: defaultStartDate.getMinutes(),
            }),
          )
        ) {
          ctx.addIssue({
            code: "custom",
            message: t("earlierThanDefaultError", {
              ns: "BidMobileView",
            }),
            input: values.days[index],
            path: [`days.${index}.timeStart`],
          });
        } else if (
          isAfter(
            day.timeEnd,
            set(day.timeEnd, {
              hours: defaultEndDate.getHours(),
              minutes: defaultEndDate.getMinutes(),
            }),
          )
        ) {
          ctx.addIssue({
            code: "custom",
            message: t("laterThanDefaultError", {
              ns: "BidMobileView",
            }),
            input: values.days[index],
            path: [`days.${index}.timeEnd`],
          });
        }

        if (isStartDay) {
          if (isBefore(day.timeStart, startDate)) {
            ctx.addIssue({
              code: "custom",
              message: t("earlierThanDefaultError", {
                ns: "BidMobileView",
              }),
              input: values.days[index],
              path: [`days.${index}.timeStart`],
            });
          }

          if (
            isAfter(
              day.timeEnd,
              set(day.timeEnd, {
                hours: defaultEndDate.getHours(),
                minutes: defaultEndDate.getMinutes(),
              }),
            )
          ) {
            ctx.addIssue({
              code: "custom",
              message: t("laterThanDefaultError", {
                ns: "BidMobileView",
              }),
              input: values.days[index],
              path: [`days.${index}.timeEnd`],
            });
          }
        } else if (isEndDay) {
          if (isAfter(day.timeEnd, dateEnd)) {
            ctx.addIssue({
              code: "custom",
              message: t("laterThanDefaultError", {
                ns: "BidMobileView",
              }),
              input: values.days[index],
              path: [`days.${index}.timeEnd`],
            });
          }

          if (
            isBefore(
              day.timeStart,
              set(day.timeStart, {
                hours: defaultStartDate.getHours(),
                minutes: defaultStartDate.getMinutes(),
              }),
            )
          ) {
            ctx.addIssue({
              code: "custom",
              message: t("earlierThanDefaultError", {
                ns: "BidMobileView",
              }),
              input: values.days[index],
              path: [`days.${index}.timeStart`],
            });
          }
        }
      });
    });

export type bidFormSubmitValues = z.output<
  ReturnType<typeof createBidFormSchema>
>;

type BidFormMobileViewInterface = BidMobileViewInterface & {
  submitAction: (values: bidFormSubmitValues) => void;
  cancelAction: () => void;
};

export function BidFormMobileView(props: BidFormMobileViewInterface) {
  const { t } = useTranslation("m_bids_bid");
  const [dayIndex, setDayIndex] = useState<number>(-1);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      place: props.entity.place.id,
      activity: props.entity.activity.id,
      amount: props.entity.amount,
      unitPrice: props.entity.unitPrice.toString(),
      radius: props.entity.radius.toString(),
      dateStart: props.entity.dateStart,
      dateEnd: props.entity.dateEnd,
      needDays: props.entity.needDays,
      needFoto: props.entity.needFoto,
      days: props.entity.days,
    },
    resolver: zodResolver(
      createBidFormSchema(
        props.entity.dateStart,
        props.entity.dateEnd,
        props.defaultTimeRange.start,
        props.defaultTimeRange.end,
        props.projectTimeRange.start,
        props.projectTimeRange.end,
      ),
    ),
  });

  const { fields, append, prepend, insert, remove } = useFieldArray({
    control,
    name: "days",
  });

  return (
    <>
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
        <Avatar
          src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.logo}`}
          sx={{ width: "100px", height: "100px", margin: "0 auto" }}
        />

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("statusPlaceholder")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "14px",
                height: "14px",
                borderRadius: "50px",
              }}
              style={{
                backgroundColor:
                  statusCodeMap[
                    props.entity.status as keyof typeof statusCodeMap
                  ].color,
              }}
            ></Box>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t(
                `status.${
                  statusCodeMap[
                    props.entity.status as keyof typeof statusCodeMap
                  ].value
                }`,
              )}
            </Typography>
          </Box>
        </Box>

        {/*// progress*/}
        {/*<Box
          sx={(theme) => ({
            display: "grid",
            padding: "12px",
            borderRadius: "6px",
            backgroundColor: theme.vars.palette["Grey_5"],
            rowGap: "12px",
          })}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              minWidth: "28px",
              paddingLeft: "3px",
              paddingRight: "3px",
              borderRadius: "3px",
            }}
            style={{
              ...(props.entity.progress === 100 && {
                background: "var(--mui-palette-WhatsApp)",
                color: "var(--mui-palette-White)",
              }),
              ...(props.entity.progress < 100 && {
                background: `linear-gradient(to right, var(--mui-palette-Grey_3) ${props.entity.progress}%, var(--mui-palette-Grey_4) ${props.entity.progress}%)`,
                color: "var(--mui-palette-Grey_2)",
              }),
            }}
          >
            <Typography component="p" variant="Bold_12">
              {props.entity.progress}
            </Typography>
          </Box>
          {props.entity.counters.map((counter, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              style={{
                color: counter.color,
              }}
            >
              <Typography component="p" variant="Reg_14">
                {counter.label}
              </Typography>
              <Typography component="p" variant="Bold_14">
                {counter.count}
              </Typography>
            </Box>
          ))}
        </Box>*/}
        {/*// progress*/}

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("locationPlaceholder")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.place.logo}`}
              sx={{ width: "30px", height: "30px" }}
            />
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.entity.place.name}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("serviceTypePlaceholder")}
          </Typography>
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
            })}
          >
            {props.entity.activity.name}
          </Typography>
        </Box>

        <form
          id="bid-edit-form"
          onSubmit={handleSubmit((values) => {
            props.submitAction(values);
          })}
          style={{
            display: "grid",
            rowGap: "14px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              rowGap: "4px",
            }}
          >
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t("amountPlaceholder")}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {props.entity.amount}
            </Typography>
          </Box>
          {/*<Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("amountPlaceholder")}
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
                value={field.value.toString()}
              />
            )}
          />*/}
          <Controller
            name="unitPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={`${t("unitPricePlaceholder")} ${props.entity.units}`}
                error={errors.amount?.message ? true : false}
                helperText={errors.amount?.message}
                slotProps={{
                  input: {
                    inputComponent: MaskedField as never,
                    inputProps: {
                      mask: "000000",
                    },
                    inputMode: "numeric",
                    type: "tel",
                  },
                }}
                value={field.value.toString()}
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "grid",
                rowGap: "4px",
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t("paxPricePlaceholder")}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({ color: theme.vars.palette["Black"] })}
              >
                {props.entity.finalPrice}
              </Typography>
            </Box>
            {/* <Box
              sx={{
                display: "grid",
                rowGap: "4px",
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t("finalPricePlaceholder")}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({ color: theme.vars.palette["Black"] })}
              >
                {watch("unitPrice") && props.entity.selfEmployed
                  ? Math.floor(Number(getValues("unitPrice")) * 0.94)
                  : Math.floor(Number(getValues("unitPrice")) * 0.87)}
              </Typography>
            </Box> */}
          </Box>

          <Controller
            name="radius"
            control={control}
            render={({ field }) => (
              <StyledSelect
                {...field}
                inputType="select"
                name="radius"
                placeholder={t("radiusPlaceholder")}
                onImmediateChange={() => {}}
                options={props.radiuses}
                value={field.value.toString()}
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
                  label={t("dayStartPlaceholder")}
                  helperText={errors.dateStart?.message}
                  {...field}
                  onChange={(evt) => {
                    field.onChange(evt);
                    remove();
                    setValue("needDays", false);
                  }}
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
                  label={t("dayEndPlaceholder")}
                  helperText={errors.dateEnd?.message}
                  disablePast
                  {...field}
                  onChange={(evt) => {
                    field.onChange(evt);
                    remove();
                    setValue("needDays", false);
                  }}
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
                label={t("needDaysPlaceholder")}
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

                    return interval && interval > 0 ? false : true;
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
                            timeEnd: set(days[i], {
                              hours: props.defaultTimeRange.end.getHours(),
                              minutes: 0,
                            }),
                            ...(props.entity.activity.travelling === true && {
                              needRoute: false,
                              locations: [],
                            }),
                          });
                        } else if (i === days.length - 1) {
                          append({
                            timeStart: set(days[i], {
                              hours: props.defaultTimeRange.start.getHours(),
                              minutes: 0,
                            }),
                            timeEnd: dateEnd,
                            ...(props.entity.activity.travelling === true && {
                              needRoute: false,
                              locations: [],
                            }),
                          });
                        } else {
                          append({
                            timeStart: set(days[i], {
                              hours: props.defaultTimeRange.start.getHours(),
                              minutes: 0,
                            }),
                            timeEnd: set(days[i], {
                              hours: props.defaultTimeRange.end.getHours(),
                              minutes: 0,
                            }),
                            ...(props.entity.activity.travelling === true && {
                              needRoute: false,
                              locations: [],
                            }),
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
            {(() => {
              const startDate = getValues("dateStart") as Date;

              //надо проверить является ли текущий день датой старта
              const sameDay = isSameDay(fields[0].timeStart, startDate);

              if (!sameDay) {
                //если день не один и тотже, значит есть промежуток, вставляем кнопку

                return (
                  <Button
                    variant="outlined"
                    type="button"
                    startIcon={<CalendarIcon />}
                    onClick={() => {
                      prepend({
                        timeStart: props.entity.dateStart,
                        timeEnd: set(props.entity.dateStart, {
                          hours: props.defaultTimeRange.end.getHours(),
                          minutes: 0,
                        }),
                        ...(props.entity.activity.travelling === true && {
                          needRoute: false,
                          locations: [],
                        }),
                      });
                    }}
                  >
                    {t(`addDayButton`)}
                  </Button>
                );
              } else {
                return null;
              }
            })()}
            {fields.map((day, index) => (
              <Box
                sx={{
                  display: "grid",
                  rowGap: "8px",
                }}
                key={day.id}
              >
                <S_Accordion>
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
                        {/*@ts-expect-error https://www.i18next.com/overview/typescript#type-error-template-literal */}
                        {t(`dayMap.${getDay(day.timeStart)}`)}
                      </Typography>

                      <Typography
                        component="p"
                        variant="Reg_14"
                        sx={(theme) => ({
                          color: theme.vars.palette["Black"],
                        })}
                      >
                        {format(watch(`days.${index}.timeStart`), "kk:mm")}-
                        {format(watch(`days.${index}.timeEnd`), "kk:mm")}
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
                        <>
                          <Controller
                            name={`days.${index}.timeStart` as const}
                            control={control}
                            render={({ field }) => (
                              <TimeField
                                // minTime={field.value}
                                // maxTime={set(field.value, {
                                //   hours: 21,
                                // })}
                                placeholder={t("timeStartPlaceholder")}
                                {...field}
                                error={(() => {
                                  const daysErrors = errors.days;

                                  if (daysErrors) {
                                    if (daysErrors[index]) {
                                      return daysErrors[index].timeStart
                                        ?.message;
                                    }
                                  }
                                  return undefined;
                                })()}
                                value={field.value.toISOString()}
                                onChange={(value) => {
                                  setValue(
                                    `days.${index}.timeStart` as const,
                                    new Date(value),
                                  );
                                }}
                              />
                            )}
                          />
                          <Controller
                            name={`days.${index}.timeEnd` as const}
                            control={control}
                            render={({ field }) => (
                              <TimeField
                                // minTime={set(field.value, {
                                //   hours: 9,
                                // })}
                                // maxTime={field.value}
                                placeholder={t("timeEndPlaceholder")}
                                error={(() => {
                                  const daysErrors = errors.days;

                                  if (daysErrors) {
                                    if (daysErrors[index]) {
                                      return daysErrors[index].timeEnd?.message;
                                    }
                                  }
                                  return undefined;
                                })()}
                                {...field}
                                value={field.value.toISOString()}
                                onChange={(value) => {
                                  setValue(
                                    `days.${index}.timeEnd` as const,
                                    new Date(value),
                                  );
                                }}
                              />
                            )}
                          />
                        </>
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
                                label={t("routePlaceholder")}
                                onImmediateChange={() => {}}
                                validation="none"
                                value={field.value as boolean}
                              />

                              {errors.days ? (
                                <Typography
                                  component="p"
                                  variant="Reg_14"
                                  sx={(theme) => ({
                                    flexGrow: "1",
                                    color: theme.vars.palette["Red"],
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    textAlign: "center",
                                  })}
                                >
                                  {errors.days[index]?.message}
                                </Typography>
                              ) : null}

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
                                                `days.${index}.locations`,
                                              );

                                              const updatedList =
                                                currentList?.filter(
                                                  (item) =>
                                                    item.id !== location.id,
                                                );
                                              setValue(
                                                `days.${index}.locations`,
                                                updatedList,
                                              );
                                              trigger(
                                                `days.${index}.locations`,
                                              );
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
                                      ),
                                    )
                                  : null}

                                {getValues(`days.${index}.needRoute`) ===
                                true ? (
                                  <Button
                                    variant="outlined"
                                    startIcon={<PointerIcon />}
                                    onClick={() => {
                                      setDayIndex(index);
                                    }}
                                  >
                                    {t("addressButton")}
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
                        {t("removeDayButton")}
                      </Button>

                      <Divider sx={{ marginTop: "8px" }} />
                    </Box>
                  </S_AccordionDetails>
                </S_Accordion>
                {(() => {
                  const endDate = getValues("dateEnd") as Date;

                  // смотрим есть ли в массиве дней после текущего дня ещё день
                  const nextDayinArray = fields[index + 1];

                  if (nextDayinArray) {
                    //дни есть, нужно проверить есть ли промежуток между днями или они идут друг за другом, для этого берем текущий день, прибавляем к нему 24 часа и берем следующий день в массиве и сравниваем, если день один и тотже, то дни идут друг за другом
                    const sameDay = isSameDay(
                      addDays(day.timeStart, 1),
                      nextDayinArray.timeStart,
                    );

                    //если день не один и тотже, значит есть промежуток, вставляем кнопку
                    if (!sameDay) {
                      return (
                        <Button
                          variant="outlined"
                          type="button"
                          startIcon={<CalendarIcon />}
                          onClick={() => {
                            //ищем нужный нам день в пропсах, чтобы из него взять время старта и окончания

                            const days = eachDayOfInterval({
                              start: props.entity.dateStart,
                              end: props.entity.dateEnd,
                            });

                            let match;

                            if (props.entity.days.length > 0) {
                              match = props.entity.days.find((propsDay) =>
                                isSameDay(
                                  addDays(day.timeStart, 1),
                                  propsDay.timeStart,
                                ),
                              );

                              if (!match) {
                                match = days.find((propsDay) =>
                                  isSameDay(
                                    addDays(day.timeStart, 1),
                                    propsDay,
                                  ),
                                );
                              }
                            } else {
                              match = days.find((propsDay) =>
                                isSameDay(addDays(day.timeStart, 1), propsDay),
                              );
                            }

                            if (match) {
                              insert(index + 1, {
                                timeStart:
                                  "timeStart" in match
                                    ? match.timeStart
                                    : set(match, {
                                        hours:
                                          props.defaultTimeRange.start.getHours(),
                                        minutes: 0,
                                      }),
                                timeEnd:
                                  "timeEnd" in match
                                    ? match.timeEnd
                                    : set(match, {
                                        hours:
                                          props.defaultTimeRange.end.getHours(),
                                        minutes: 0,
                                      }),
                                ...(props.entity.activity.travelling ===
                                  true && {
                                  needRoute: false,
                                  locations: [],
                                }),
                              });
                            }
                          }}
                        >
                          {t("addDayButton")}
                        </Button>
                      );
                    } else {
                      return null;
                    }
                  } else {
                    //если после текущего дня дней больше нет, надо проверить является ли текущий день датой окончания

                    const sameDay = isSameDay(day.timeStart, endDate);
                    //если день не один и тотже, значит есть промежуток, вставляем кнопку
                    if (!sameDay) {
                      // текущий день не является датой окончания, рисуем кнопку
                      return (
                        <Button
                          variant="outlined"
                          type="button"
                          startIcon={<CalendarIcon />}
                          onClick={() => {
                            //ищем нужный нам день в пропсах, чтобы из него взять время старта и окончания
                            const days = eachDayOfInterval({
                              start: props.entity.dateStart,
                              end: props.entity.dateEnd,
                            });

                            let match;

                            if (props.entity.days.length > 0) {
                              match = props.entity.days.find((propsDay) =>
                                isSameDay(
                                  addDays(day.timeStart, 1),
                                  propsDay.timeStart,
                                ),
                              );

                              if (!match) {
                                match = days.find((propsDay) =>
                                  isSameDay(
                                    addDays(day.timeStart, 1),
                                    propsDay,
                                  ),
                                );
                              }
                            } else {
                              match = days.find((propsDay) =>
                                isSameDay(addDays(day.timeStart, 1), propsDay),
                              );
                            }

                            if (match) {
                              append({
                                timeStart:
                                  "timeStart" in match
                                    ? match.timeStart
                                    : set(match, {
                                        hours:
                                          props.defaultTimeRange.start.getHours(),
                                        minutes: 0,
                                      }),
                                timeEnd:
                                  "timeEnd" in match
                                    ? match.timeEnd
                                    : getValues("dateEnd"),
                                ...(props.entity.activity.travelling ===
                                  true && {
                                  needRoute: false,
                                  locations: [],
                                }),
                              });
                            }
                          }}
                        >
                          {t("addDayButton")}
                        </Button>
                      );
                    } else {
                      return null;
                    }
                  }
                })()}
              </Box>
            ))}
          </Box>
        ) : null}

        <Controller
          name="needFoto"
          control={control}
          render={({ field }) => (
            <StyledCheckbox
              {...field}
              inputType="checkbox"
              label={t("needPhotoPlaceholder")}
              onImmediateChange={() => {}}
              validation="none"
              value={field.value}
              disabled
            />
          )}
        />

        {props.entity.orderId ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "4px",
            }}
          >
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t("parentOrder")}
            </Typography>
            <Link
              to={withLocale(`/orders/${props.entity.orderId}`)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
              }}
            >
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {props.entity.orderId}
              </Typography>
              <ArrowBackIosNewIcon
                sx={(theme) => ({
                  width: "18px",
                  height: "18px",
                  color: theme.vars.palette["Corp_1"],
                  transform: "rotate(180deg)",
                })}
              />
            </Link>
          </Box>
        ) : null}

        {props.entity.taskId ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "4px",
            }}
          >
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t("parentTask")}
            </Typography>
            <Link
              to={withLocale(`/tasks/${props.entity.taskId}`)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
              }}
            >
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {props.entity.taskId}
              </Typography>
              <ArrowBackIosNewIcon
                sx={(theme) => ({
                  width: "18px",
                  height: "18px",
                  color: theme.vars.palette["Corp_1"],
                  transform: "rotate(180deg)",
                })}
              />
            </Link>
          </Box>
        ) : null}

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("responsible")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.responsiblePerson.logo}`}
              sx={{ width: "30px", height: "30px" }}
            />
            <Box>
              {" "}
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {props.entity.responsiblePerson.email}
              </Typography>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t(
                  `role.${determineRole(props.entity.responsiblePerson.roles)}`,
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          display: "grid",
          rowGap: "10px",
          width: "100%",
          backgroundColor: theme.vars.palette["White"],
          padding: "10px 16px 26px 16px",
        })}
      >
        <Button
          variant="contained"
          type="submit"
          form="bid-edit-form"
          sx={{
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          {t("saveBidButton")}
        </Button>
        {/* <Button
          variant="outlined"
          startIcon={<CloseIcon />}
          onClick={() => {
            props.cancelAction();
          }}
        >
          {t("cancelBidButton")}
        </Button> */}
      </Box>

      <CheckboxSearchableDrawer
        translation={"address"}
        open={dayIndex !== -1 ? true : false}
        onClose={() => {
          setDayIndex(-1);
        }}
        onSubmit={(values) => {
          const selectedDayLocations = getValues(`days.${dayIndex}.locations`);
          const selectedLoactions = values;

          selectedLoactions.forEach((item) => {
            const match = props.locations.find(
              (location) => location.value === item,
            );

            const isAlreadySelected = selectedDayLocations?.find(
              (location) => location.id === item,
            );

            if (match && isAlreadySelected === undefined) {
              selectedDayLocations?.push({
                id: match.value,
                name: match.label,
                ...(match.logo && { logo: match.logo }),
              });
            }
          });

          trigger();
          setDayIndex(-1);
        }}
        items={props.locations}
        value={[]}
      />
    </>
  );
}
