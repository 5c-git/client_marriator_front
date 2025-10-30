import { Ref } from "react";
import type { PageInterface } from "./PageInterface";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { compareAsc, format, getDay, set } from "date-fns";

import { LocalizationProvider, DateTimeField } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale/ru";

import Box from "@mui/material/Box";

import { Avatar, IconButton, Divider, Typography } from "@mui/material";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { TimeField } from "~/shared/ui/TimeField/TimeField";

import CloseIcon from "@mui/icons-material/Close";
import { PhoneIcon } from "~/shared/icons/PhoneIcon";

import { statusCodeMap } from "~/shared/specialistStatus";

type submitValues = {
  days?: {
    locations?: {
      logo?: string;
      id: string;
      name: string;
    }[];
    timeStart: string;
    timeEnd: string;
  }[];
  dateStart: Date;
  dateEnd: Date;
};

export function FormView({
  data,
  action,
  formID,
  ref,
}: {
  data: PageInterface;
  action: (values: submitValues) => void;
  formID: string;
  ref?: Ref<HTMLFormElement>;
}) {
  const { t } = useTranslation("mission");

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      dateStart: new Date(data.dateStart),
      dateEnd: new Date(data.dateEnd),
      days: (() => {
        const days: {
          timeStart: string;
          timeEnd: string;
          locations: { id: string; name: string; logo: string }[];
        }[] = [];

        data.days.forEach((day) => {
          const locations: { id: string; name: string; logo: string }[] = [];

          day.places.forEach((location) => {
            locations.push({
              id: location.id.toString(),
              name: location.text,
              logo: location.logo ? location.logo : "",
            });
          });

          days.push({
            timeStart: day.timeStart,
            timeEnd: day.timeEnd,
            locations: locations,
          });
        });

        return days;
      })(),
    },
    resolver: yupResolver(
      Yup.object({
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
        days: Yup.array().of(
          Yup.object().shape({
            timeStart: Yup.string()
              .nullable()
              .required(t("text", { ns: "constructorFields" })),
            timeEnd: Yup.string()
              .nullable()
              .required(t("text", { ns: "constructorFields" })),
            locations: Yup.array().of(
              Yup.object().shape({
                id: Yup.string().required(
                  t("text", { ns: "constructorFields" })
                ),
                name: Yup.string().required(
                  t("text", { ns: "constructorFields" })
                ),
                logo: Yup.string().required(
                  t("text", { ns: "constructorFields" })
                ),
              })
            ),
          })
        ),
      })
    ),
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "days",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "14px",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Avatar
        src={`${import.meta.env.VITE_ASSET_PATH}${data.logo}`}
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
          {t("statusText")}
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
                statusCodeMap[data.status as keyof typeof statusCodeMap].color,
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
                statusCodeMap[data.status as keyof typeof statusCodeMap].value
              }`
            )}
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
          {t("locationText")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: "8px",
            alignItems: "center",
          }}
        >
          <Avatar
            src={`${import.meta.env.VITE_ASSET_PATH}${data.place.logo}`}
            sx={{ width: "30px", height: "30px" }}
          />
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({ color: theme.vars.palette["Black"] })}
          >
            {data.place.name}
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
          {t("serviceTypeText")}
        </Typography>
        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
          })}
        >
          {data.activity}
        </Typography>
      </Box>

      <Box
        sx={{
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
            {t("pricePerUnitText")}
          </Typography>
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({ color: theme.vars.palette["Corp_1"] })}
          >
            {data.unitPrice}
          </Typography>
        </Box>

        <form
          id={formID}
          onSubmit={handleSubmit((values) => {
            action(values);
          })}
          style={{
            display: "grid",
            rowGap: "14px",
            width: "100%",
          }}
          ref={ref}
        >
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
                  label={t("dateStartText")}
                  helperText={errors.dateStart?.message}
                  {...field}
                  value={new Date(field.value)}
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
                  label={t("dateEndText")}
                  helperText={errors.dateEnd?.message}
                  disablePast
                  {...field}
                  value={new Date(field.value)}
                />
              </LocalizationProvider>
            )}
          />

          {fields.length > 0 ? (
            <>
              <Divider />
              <Box
                sx={{
                  display: "grid",
                  rowGap: "14px",
                }}
              >
                {fields.map((day, index) => (
                  <Box key={day.id}>
                    <Box
                      sx={{
                        width: "100%",
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
                        {/* @ts-ignore */}
                        {`${format(new Date(data.dateStart), "dd.MM")} ${t(`dayMap.${getDay(new Date(day.timeStart))}`)}`}
                      </Typography>

                      <IconButton
                        sx={{
                          width: "24px",
                          height: "24px",
                        }}
                        onClick={() => {
                          remove();
                        }}
                      >
                        <CloseIcon
                          sx={(theme) => ({
                            color: theme.vars.palette["Grey_2"],
                          })}
                        />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: "grid",
                        rowGap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          columnGap: "10px",
                        }}
                      >
                        <Controller
                          name={`days.${index}.timeStart` as const}
                          control={control}
                          render={({ field }) => (
                            <TimeField
                              minTime={new Date(field.value)}
                              maxTime={set(new Date(field.value), {
                                hours: 21,
                              })}
                              placeholder={t("timeStartText")}
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
                              minTime={set(new Date(field.value), {
                                hours: 9,
                              })}
                              maxTime={new Date(field.value)}
                              placeholder={t("timeEndText")}
                              // error={errors.days[index]?.message}
                              {...field}
                            />
                          )}
                        />
                      </Box>

                      {day.locations &&
                        day.locations.length > 0 &&
                        day.locations.map((place) => (
                          <Box
                            sx={{
                              display: "flex",
                              columnGap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              src={`${import.meta.env.VITE_ASSET_PATH}${place.logo}`}
                              sx={{ width: "30px", height: "30px" }}
                            />
                            <Typography
                              component="p"
                              variant="Reg_14"
                              sx={(theme) => ({
                                color: theme.vars.palette["Black"],
                              })}
                            >
                              {place.name}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          ) : null}
        </form>

        <Divider />

        <StyledCheckbox
          inputType="checkbox"
          name="needPhoto"
          label={t("photoCheckbox")}
          value={data.needPhoto}
          onChange={() => {}}
          onImmediateChange={() => {}}
          validation="none"
          disabled
        />

        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              columnGap: "4px",
              alignItems: "flex-start",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_ASSET_PATH}${data.logo}`}
              sx={{ width: "30px", height: "30px" }}
            />
            <Box>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {data.user.name}
              </Typography>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {/* @ts-ignore */}
                {t(`role.${data.user.role}`)}
              </Typography>
            </Box>
          </Box>
          <IconButton
            component="a"
            href={`tel:+${data.user.phone}`}
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
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
