import type { DayReviewMobileViewInterface } from "./DayReviewMobileViewInterface";

import { useNavigate } from "react-router";
import { Fragment, useState } from "react";

import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { format, getDay } from "date-fns";

import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";

import {
  S_Accordion,
  S_AccordionDetails,
  S_AccordionSummary,
} from "./DayReviewMobileView.styled";

import CloseIcon from "@mui/icons-material/Close";
import { ExpandIcon } from "~/shared/icons/ExpandIcon";
import { CheckIcon } from "~/shared/icons/CheckIcon";

const dayReviewFormSchema = z.object({
  days: z.array(
    z.object({
      id: z.number({ error: t("text", { ns: "constructorFields" }) }),
      date: z.string({ error: t("text", { ns: "constructorFields" }) }),
      photos: z.array(z.string()).optional(),
      unitPrice: z.string({
        error: t("text", { ns: "constructorFields" }),
      }),
      unitAmount: z.string({
        error: t("text", { ns: "constructorFields" }),
      }),
      criteria: z.array(
        z.object({
          count: z.number(),
          value: z.string(),
          amount: z.number({
            error: t("text", { ns: "constructorFields" }),
          }),
        }),
      ),
    }),
  ),
});

const calculatePrice = (day: {
  photos?: (string | undefined)[] | undefined;
  criteria?:
    | {
        value: string;
        amount: number;
        count: number;
      }[]
    | undefined;
  id: number;
  date: string;
  unitPrice: string;
  unitAmount: string;
}) => {
  let criteriaPrice = 0;

  if (day.criteria) {
    day.criteria.forEach(
      (criterion) => (criteriaPrice += criterion.amount * criterion.count),
    );
  }

  criteriaPrice += Number(day.unitPrice) * Number(day.unitAmount);

  return criteriaPrice;
};

type submitValues = z.output<typeof dayReviewFormSchema>;

export function DayReviewMobileView(
  props: DayReviewMobileViewInterface & {
    submitAction: (values: submitValues) => void;
  },
) {
  const navigate = useNavigate();
  const { t } = useTranslation("DayReviewMobileView");

  const [expanded, setExpanded] = useState<number>(0);

  const { control, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      days: props.days,
    },
    resolver: zodResolver(dayReviewFormSchema),
  });

  const { fields, update } = useFieldArray({
    control,
    name: "days",
  });

  const formValues = watch();

  return (
    <>
      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={() => {
          navigate(
            withLocale(
              `/bids/${props.bidId}/specialists/${props.specialistId}`,
            ),
            {
              viewTransition: true,
              replace: true,
            },
          );
        }}
      />

      <form
        id="day-review-form"
        onSubmit={handleSubmit((values) => {
          props.submitAction(values);
        })}
        style={{
          display: "grid",
          rowGap: "14px",
          width: "100%",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        {fields.map((day, index) => (
          <S_Accordion
            key={day.id}
            expanded={expanded === index}
            onChange={() => {
              setExpanded(index);
            }}
          >
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
                  variant="Bold_16"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {format(day.date, "dd.MM")} &nbsp;
                  {/*@ts-expect-error https://www.i18next.com/overview/typescript#type-error-template-literal */}
                  {t(`dayMap.${getDay(day.date)}`)}
                </Typography>

                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {formValues.days
                    ? calculatePrice(formValues.days?.[index])
                    : ""}
                  ₽
                </Typography>
              </Box>
            </S_AccordionSummary>
            <S_AccordionDetails>
              <Box
                sx={{
                  paddingRight: "16px",
                  paddingLeft: "16px",
                  marginBottom: "14px",
                }}
              >
                <Divider
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                />
              </Box>

              {day.photos && day.photos.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "10px",
                    overflowX: "auto",
                    maxWidth: "100vw",
                    paddingRight: "16px",
                    paddingLeft: "16px",
                  }}
                >
                  {day.photos.map((photo, index) => (
                    <Box
                      key={index}
                      sx={{
                        minWidth: "calc(100vw - 45px)",
                        height: "465px",
                        borderRadius: "6px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`${import.meta.env.VITE_ASSET_PATH}${photo}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        alt={photo}
                      />
                    </Box>
                  ))}
                </Box>
              ) : null}

              <Box
                sx={{
                  display: "grid",
                  rowGap: "14px",
                  marginTop: "14px",
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}
              >
                <Typography
                  component="p"
                  variant="Bold_16"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {t("income")}
                </Typography>

                {/* <Controller
                  name={`days.${index}.unitPrice` as const}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={t("unitPrice")}
                      disabled
                      slotProps={{
                        input: {
                          inputComponent: MaskedField as never,
                          inputProps: {
                            mask: "0000000000",
                          },
                          inputMode: "numeric",
                          type: "tel",
                        },
                      }}
                      {...field}
                    />
                  )}
                /> */}
                <TextField
                  label={t("unitPrice")}
                  disabled
                  slotProps={{
                    input: {
                      inputComponent: MaskedField as never,
                      inputProps: {
                        mask: "0000000000",
                      },
                      inputMode: "numeric",
                      type: "tel",
                    },
                  }}
                  value={day.unitPrice}
                />
                <Controller
                  name={`days.${index}.unitAmount` as const}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // disabled
                      label={t("amountPrice")}
                      slotProps={{
                        input: {
                          inputComponent: MaskedField as never,
                          inputProps: {
                            mask: "0000000000",
                          },
                          inputMode: "numeric",
                          type: "tel",
                        },
                      }}
                      {...field}
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
                  <Typography
                    component="p"
                    variant="Reg_16"
                    sx={(theme) => ({
                      color: theme.vars.palette["Grey_2"],
                    })}
                  >
                    {t("income")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_16"
                    sx={(theme) => ({
                      color: theme.vars.palette["Black"],
                    })}
                  >
                    {formValues.days
                      ? calculatePrice(formValues.days?.[index])
                      : ""}
                    ₽
                  </Typography>
                </Box>

                {watch(`days.${index}.criteria`)?.map((criterion, indx) => (
                  <Fragment key={indx}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        component="p"
                        variant="Bold_16"
                        sx={(theme) => ({
                          color: theme.vars.palette["Black"],
                        })}
                      >
                        {t("finesAndIncentives")}
                      </Typography>{" "}
                      <IconButton
                        sx={{
                          width: "24px",
                          height: "24px",
                        }}
                        onClick={() => {
                          const currentDay = getValues(`days.${index}`);

                          const updatedDay = {
                            ...currentDay,
                          };

                          updatedDay.criteria.splice(indx, 1);

                          update(index, updatedDay);
                        }}
                      >
                        <CloseIcon
                          sx={(theme) => ({
                            color: theme.vars.palette["Grey_2"],
                          })}
                        />
                      </IconButton>
                    </Box>

                    <Controller
                      name={`days.${index}.criteria.${indx}.value` as const}
                      control={control}
                      render={({ field }) => (
                        <StyledSelect
                          key={indx}
                          inputType="select"
                          onImmediateChange={() => {}}
                          placeholder={t("criterionName")}
                          options={(() => {
                            const options: {
                              value: string;
                              label: string;
                              disabled: boolean;
                            }[] = [];

                            props.criteria.forEach((item) => {
                              options.push({
                                value: item.value,
                                label: item.label,
                                disabled: false,
                              });
                            });

                            return options;
                          })()}
                          {...field}
                          onChange={(evt) => {
                            const amountMatch = props.criteria.find(
                              (item) => item.value === evt.target.value,
                            );

                            if (amountMatch) {
                              setValue(
                                `days.${index}.criteria.${indx}.amount`,
                                amountMatch.amount,
                              );
                            }

                            field.onChange(evt);
                          }}
                          value={field.value}
                        />
                      )}
                    />
                    <Controller
                      name={`days.${index}.criteria.${indx}.count` as const}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label={t("criterionAmount")}
                          slotProps={{
                            input: {
                              inputComponent: MaskedField as never,
                              inputProps: {
                                mask: "0000000000",
                              },
                              inputMode: "numeric",
                              type: "tel",
                            },
                          }}
                          {...field}
                          value={field.value.toString()}
                          onChange={(evt) => {
                            field.onChange(Number(evt.target.value));
                          }}
                        />
                      )}
                    />
                  </Fragment>
                ))}

                <Button
                  variant="outlined"
                  onClick={() => {
                    const currentDay = getValues(`days.${index}`);

                    const updatedDay = {
                      ...currentDay,
                    };

                    if (updatedDay.criteria) {
                      updatedDay.criteria.push({
                        amount: props.criteria[0].amount,
                        value: props.criteria[0].value,
                        count: 1,
                      });
                    } else {
                      updatedDay.criteria = [
                        {
                          amount: props.criteria[0].amount,
                          value: props.criteria[0].value,
                          count: 1,
                        },
                      ];
                    }
                    update(index, updatedDay);
                  }}
                >
                  {t("criterionButton")}
                </Button>
              </Box>
            </S_AccordionDetails>
          </S_Accordion>
        ))}

        <Box
          sx={{
            display: "grid",
            rowGap: "14px",
            paddingRight: "16px",
            paddingLeft: "16px",
          }}
        >
          <Divider
            sx={(theme) => ({
              height: "2px",
              backgroundColor: theme.vars.palette["Corp_1"],
            })}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              component="p"
              variant="Bold_16"
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t("total")}
            </Typography>
            <Typography
              component="p"
              variant="Bold_16"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {formValues.days
                ? (() => {
                    let totalPrice = 0;

                    formValues.days.forEach((day) => {
                      const dayPrice = calculatePrice(day);

                      totalPrice += dayPrice;
                    });

                    return totalPrice;
                  })()
                : ""}
              ₽
            </Typography>
          </Box>

          <Button startIcon={<CheckIcon />} variant="contained" type="submit">
            {t("acceptButton")}
          </Button>
        </Box>
      </form>
    </>
  );
}
