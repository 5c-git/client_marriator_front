import { useNavigation, useNavigate, useSubmit, redirect } from "react-router";
import { Fragment, useState } from "react";
import type { Route } from "./+types/day-review";

import type { PageInterface } from "./PageInterface";
import { useTranslation } from "react-i18next";
import { useStore } from "~/store/store";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { format, getDay } from "date-fns";

import Box from "@mui/material/Box";
import { Button, Divider, Typography, TextField } from "@mui/material";

import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";

import {
  S_Accordion,
  S_AccordionDetails,
  S_AccordionSummary,
} from "./day-review.styled";

import { ExpandIcon } from "~/shared/icons/ExpandIcon";
import { CheckIcon } from "~/shared/icons/CheckIcon";

import { getJob } from "~/requests/_personal/getJob/getJob";
import { getReasons } from "~/requests/_personal/getReasons/getReasons";
import { postAcceptReport } from "~/requests/_personal/postAcceptReport/postAcceptReport";
import { postAcceptAllReportJob } from "~/requests/_personal/postAcceptAllReportJob/postAcceptAllReportJob";

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
      (criterion) => (criteriaPrice += criterion.amount * criterion.count)
    );
  }

  criteriaPrice += Number(day.unitPrice) * Number(day.unitAmount);

  return criteriaPrice;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    // const data: PageInterface = {
    //   days: [
    //     {
    //       id: 1,
    //       date: "2025-10-27T08:10:00.000Z",
    //       photos: [
    //         "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    //         "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    //         "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    //         "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    //         "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    //       ],
    //       unitPrice: "1000",
    //       unitAmount: "4",
    //       criteria: [],
    //     },
    //     {
    //       id: 2,
    //       date: "2025-10-28T08:10:00.000Z",
    //       photos: [
    //         "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    //         "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    //         "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    //         "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    //         "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    //       ],
    //       unitPrice: "2000",
    //       unitAmount: "6",
    //       criteria: [
    //         {
    //           amount: -100,
    //           count: 2,
    //           value: "late",
    //         },
    //         {
    //           amount: -100,
    //           count: 1,
    //           value: "smoking",
    //         },
    //       ],
    //     },
    //   ],
    //   criteria: [
    //     {
    //       amount: -100,
    //       label: "Cвоевременность, нарушение режима(минута)",
    //       value: "late",
    //     },
    //     {
    //       amount: 250,
    //       label: "Ведение переговоров на иностранном языке",
    //       value: "foreign talk",
    //     },
    //     {
    //       amount: -100,
    //       label: "Курение во время работы(разы)",
    //       value: "smoking",
    //     },
    //     {
    //       amount: -500,
    //       label: "Нарушение трудового кодекса",
    //       value: "break of terms",
    //     },
    //   ],
    // };

    const data: PageInterface = {
      days: [],
      criteria: [],
    };

    const missionData = await getJob(
      accessToken,
      params.specialistId,
      params.requestId
    );

    const criteriaData = await getReasons(accessToken);

    criteriaData.data.forEach((criterion) => {
      data.criteria.push({
        amount: -100,
        label: criterion.value,
        value: criterion.id.toString(),
      });
    });

    if (params.reportId) {
      const particularDay = missionData.data.reports.find(
        (report) => report.id === Number(params.reportId)
      );

      if (
        (particularDay && particularDay.status === 2) ||
        (particularDay && particularDay.status === 3) ||
        (particularDay && particularDay.status === 7)
      ) {
        data.days.push({
          id: Number(particularDay.id),
          date: particularDay.dateStart ? particularDay.dateStart : "",
          unitPrice: "0",
          unitAmount: particularDay.hours ? particularDay.hours : "",
          ...(particularDay.report && { photos: particularDay.report }),
          criteria: (() => {
            const criteria: PageInterface["days"][0]["criteria"] = [];

            particularDay.reasons.forEach((item) => {
              criteria.push({
                amount: item.amount,
                count: 3,
                value: item.id.toString(),
              });
            });

            return criteria;
          })(),
        });
      }
    } else {
      missionData.data.reports.forEach((report) => {
        if (report.status === 2 || report.status === 3 || report.status === 7) {
          data.days.push({
            id: Number(report.id),
            date: report.dateStart ? report.dateStart : "",
            unitPrice: "0",
            unitAmount: report.hours ? report.hours : "",
            ...(report.report && { photos: report.report }),
            criteria: (() => {
              const criteria: PageInterface["days"][0]["criteria"] = [];

              report.reasons.forEach((item) => {
                criteria.push({
                  amount: item.amount,
                  count: 3,
                  value: item.id.toString(),
                });
              });

              return criteria;
            })(),
          });
        }
      });
    }

    if (data.days.length === 0) {
      throw redirect(
        withLocale(
          `/requests/${params.requestId}/specialists/${params.specialistId}`
        )
      );
    }

    return {
      data: data,
      requestId: params.requestId,
      specialistId: params.specialistId,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const fields: {
    days: {
      photos?: string[];
      criteria?: {
        value: string;
        amount: number;
        count: number;
      }[];
      id: number;
      date: string;
      unitPrice: string;
      unitAmount: string;
    }[];
  } = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (fields.days.length > 1) {
      await postAcceptAllReportJob(
        accessToken,
        params.requestId,
        params.specialistId
      );
      // throw redirect(currentURL.toString());
      throw redirect(
        withLocale(
          `/requests/${params.requestId}/specialists/${params.specialistId}`
        )
      );
    } else if (fields.days.length === 1) {
      await postAcceptReport(accessToken, fields.days[0].id.toString());
      throw redirect(
        withLocale(
          `/requests/${params.requestId}/specialists/${params.specialistId}`
        )
      );
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function DayReview({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const { t } = useTranslation(
    "request_specialists_specialistRequest_dayReview"
  );

  const [expanded, setExpanded] = useState<number>(0);

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
      days: loaderData.data.days,
    },
    resolver: zodResolver(
      z.object({
        days: z.array(
          z.object({
            id: z.number(t("text", { ns: "constructorFields" })),
            date: z.iso.date(t("text", { ns: "constructorFields" })),
            photos: z.array(z.string()).optional(),
            unitPrice: z.string(t("text", { ns: "constructorFields" })),
            unitAmount: z.string(t("text", { ns: "constructorFields" })),
            criteria: z.array(
              z.object({
                count: z.number(),
                value: z.string(),
                amount: z.number(t("text", { ns: "constructorFields" })),
              })
            ),
          })
        ),
      })
    ),
  });

  const { fields, update } = useFieldArray({
    control,
    name: "days",
  });

  const formValues = watch();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={() => {
          navigate(
            withLocale(
              `/requests/${loaderData.requestId}/specialists/${loaderData.specialistId}`
            ),
            {
              viewTransition: true,
            }
          );
        }}
      />

      <form
        id="day-review-form"
        onSubmit={handleSubmit((values) => {
          submit(JSON.stringify(values), {
            method: "POST",
            encType: "application/json",
          });
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

                <Controller
                  name={`days.${index}.unitPrice` as const}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={t("unitPrice")}
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
                    <Typography
                      component="p"
                      variant="Bold_16"
                      sx={(theme) => ({
                        color: theme.vars.palette["Black"],
                      })}
                    >
                      {t("finesAndIncentives")}
                    </Typography>

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

                            loaderData.data.criteria.forEach((item) => {
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
                            const amountMatch = loaderData.data.criteria.find(
                              (item) => item.value === evt.target.value
                            );

                            if (amountMatch) {
                              setValue(
                                `days.${index}.criteria.${indx}.amount`,
                                amountMatch.amount
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
                        amount: loaderData.data.criteria[0].amount,
                        value: loaderData.data.criteria[0].value,
                        count: 1,
                      });
                    } else {
                      updatedDay.criteria = [
                        {
                          amount: loaderData.data.criteria[0].amount,
                          value: loaderData.data.criteria[0].value,
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
