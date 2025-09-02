import { useOutletContext, useNavigation, Link } from "react-router";
import { useState } from "react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { LocalizationProvider, DateTimeField } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale/ru";
import { withLocale } from "~/shared/withLocale";
import { compareAsc, format, set, getDate, getMonth, getDay } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { useTranslation } from "react-i18next";
import { statusCodeMap } from "~/shared/status";

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import {
  S_Accordion,
  S_AccordionDetails,
  S_AccordionSummary,
} from "./index.styled";
import { Loader } from "~/shared/ui/Loader/Loader";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { TimeField } from "~/shared/ui/TimeField/TimeField";

import { DeleteIcon } from "~/shared/icons/DeleteIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { ExpandIcon } from "~/shared/icons/ExpandIcon";
import { LocationIcon } from "~/shared/icons/LocationIcon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import type { GetBidSuccess } from "~/requests/_personal/getBid/getBidSuccess.type";
import { determineRole } from "~/shared/determineRole";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

export default function Index() {
  const navigation = useNavigation();

  const { t } = useTranslation("assignment");

  const { request, editMode } = useOutletContext<{
    request: GetBidSuccess["data"];
    editMode: boolean;
  }>();

  const [dayIndex, setDayIndex] = useState<number>(-1);
  // const [selectedLocations, setSelectedLocations] = useState(
  //   loaderData.locations
  // );

  // console.log(request);

  const mockRequest = {
    logo: request.viewActivity.logo,
    status: request.status,
    progress: 50,
    counters: [
      { label: "Принято", count: 100, color: "var(--mui-palette-Blue)" },
      { label: "Одобрено", count: 100, color: "var(--mui-palette-WhatsApp)" },
      { label: "В работе", count: 100, color: "var(--mui-palette-Green)" },
      {
        label: "На рассмотрении",
        count: 100,
        color: "var(--mui-palette-Corp_2)",
      },
      { label: "Отменено", count: 100, color: "var(--mui-palette-Red)" },
    ],
    place: {
      id: request.place.id,
      name: request.place.name,
      logo: request.place.logo,
    },
    activity: { id: request.viewActivity.id, name: request.viewActivity.name },
    amount: "1",
    unitPrice: request.price ? request.price.toString() : "0",
    taxedPrice: 0,
    finalPrice: request.priceResult,
    taxStatus: "Самозанятый",
    radius: request.radius ? request.radius.toString() : "1",
    dateStart: request.dateStart,
    dateEnd: request.dateEnd,
    dateActivity: [
      {
        timeStart: "2025-09-20T16:00:00.000Z",
        timeEnd: "2025-09-21T03:00:00.000Z",
        places: [],
      },
      {
        timeStart: "2025-09-21T15:00:00.000Z",
        timeEnd: "2025-09-22T03:00:00.000Z",
        places: [
          {
            id: 3,
            name: "Пятёрочка МСК ул. Арбат д. 24",
            latitude: "55.00000000",
            longitude: "37.00000000",
            address_kladr: "ул. Арбат д. 24  г.Москва",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          },
          {
            id: 4,
            name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
            latitude: "55.00000000",
            longitude: "49.00000000",
            address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            region: {
              id: 1,
              name: "Татарстан Респ",
            },
            brand: {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          },
        ],
      },
      {
        timeStart: "2025-09-22T15:00:00.000Z",
        timeEnd: "2025-09-22T16:00:00.000Z",
        places: [],
      },
    ],
    responsiblePerson: request.user,
    responsiblePersonRole: determineRole(request.user.roles),
    task: request.task,
    order: request.order,
  };

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
      place: mockRequest.place.id,
      activity: mockRequest.activity.id,
      amount: mockRequest.amount,
      unitPrice: mockRequest.unitPrice,
      radius: mockRequest.radius,
      dateStart: new UTCDate(mockRequest.dateStart),
      dateEnd: new UTCDate(mockRequest.dateEnd),
      needDays: request.dateActivity.length > 0 ? true : false,
      needFoto: request.needFoto,

      days: (() => {
        const days: {
          timeStart: string;
          timeEnd: string;
          needRoute: boolean;
          locations: { id: string; name: string; logo: string }[];
        }[] = [];

        mockRequest.dateActivity.forEach((item) => {
          const locations: { id: string; name: string; logo: string }[] = [];

          item.places.forEach((location) => {
            locations.push({
              id: location.id.toString(),
              name: location.name,
              logo: location.logo ? location.logo : "",
            });
          });

          days.push({
            timeStart: item.timeStart,
            timeEnd: item.timeEnd,
            needRoute: locations.length > 0 ? true : false,
            locations: locations,
          });
        });

        return days;
      })(),
    },
    resolver: yupResolver(
      Yup.object({
        place: Yup.number().required(t("text", { ns: "constructorFields" })),
        activity: Yup.number().required(t("text", { ns: "constructorFields" })),
        amount: Yup.string().required(t("text", { ns: "constructorFields" })),
        unitPrice: Yup.string().required(
          t("text", { ns: "constructorFields" })
        ),
        radius: Yup.string().required(t("text", { ns: "constructorFields" })),
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
    // @ts-expect-error wrong narroiing type
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        locations: Yup.array().of(Yup.string()).min(1),
      })
    ),
  });

  return (
    // <>
    //   {navigation.state !== "idle" ? <Loader /> : null}

    //   <Box
    //     sx={{
    //       height: "calc(100vh - 120px)",
    //       overflow: "auto",
    //       display: "flex",
    //       flexDirection: "column",
    //       rowGap: "14px",
    //       paddingLeft: "16px",
    //       paddingRight: "16px",
    //       paddingTop: "20px",
    //     }}
    //   >
    //     <Avatar
    //       src={`${import.meta.env.VITE_ASSET_PATH}${mockRequest.logo}`}
    //       sx={{ width: "100px", height: "100px", margin: "0 auto" }}
    //     />

    //     <Box
    //       sx={{
    //         display: "grid",
    //         rowGap: "4px",
    //       }}
    //     >
    //       <Typography
    //         component="p"
    //         variant="Reg_12"
    //         sx={(theme) => ({
    //           color: theme.vars.palette["Grey_2"],
    //         })}
    //       >
    //         {t("statusPlaceholder")}
    //       </Typography>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           columnGap: "8px",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             width: "14px",
    //             height: "14px",
    //             borderRadius: "50px",
    //           }}
    //           style={{
    //             backgroundColor:
    //               statusCodeMap[
    //                 mockRequest.status as keyof typeof statusCodeMap
    //               ].color,
    //           }}
    //         ></Box>
    //         <Typography
    //           component="p"
    //           variant="Reg_14"
    //           sx={(theme) => ({
    //             color: theme.vars.palette["Black"],
    //           })}
    //         >
    //           {t(
    //             `status.${
    //               statusCodeMap[
    //                 mockRequest.status as keyof typeof statusCodeMap
    //               ].value
    //             }`
    //           )}
    //         </Typography>
    //       </Box>
    //     </Box>

    //     <Box
    //       sx={(theme) => ({
    //         display: "grid",
    //         padding: "12px",
    //         borderRadius: "6px",
    //         backgroundColor: theme.vars.palette["Grey_5"],
    //         rowGap: "12px",
    //       })}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           minWidth: "28px",
    //           paddingLeft: "3px",
    //           paddingRight: "3px",
    //           borderRadius: "3px",
    //         }}
    //         style={{
    //           ...(mockRequest.progress === 100 && {
    //             background: "var(--mui-palette-WhatsApp)",
    //             color: "var(--mui-palette-White)",
    //           }),
    //           ...(mockRequest.progress < 100 && {
    //             background: `linear-gradient(to right, var(--mui-palette-Grey_3) ${mockRequest.progress}%, var(--mui-palette-Grey_4) ${mockRequest.progress}%)`,
    //             color: "var(--mui-palette-Grey_2)",
    //           }),
    //         }}
    //       >
    //         <Typography component="p" variant="Bold_12">
    //           {mockRequest.progress}
    //         </Typography>
    //       </Box>
    //       {mockRequest.counters.map((counter, index) => (
    //         <Box
    //           key={index}
    //           sx={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //           }}
    //           style={{
    //             color: counter.color,
    //           }}
    //         >
    //           <Typography component="p" variant="Reg_14">
    //             {counter.label}
    //           </Typography>
    //           <Typography component="p" variant="Bold_14">
    //             {counter.count}
    //           </Typography>
    //         </Box>
    //       ))}
    //     </Box>

    //     <Box
    //       sx={{
    //         display: "grid",
    //         rowGap: "4px",
    //       }}
    //     >
    //       <Typography
    //         component="p"
    //         variant="Reg_12"
    //         sx={(theme) => ({
    //           color: theme.vars.palette["Grey_2"],
    //         })}
    //       >
    //         {t("locationPlaceholder")}
    //       </Typography>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           columnGap: "8px",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Avatar
    //           src={`${import.meta.env.VITE_ASSET_PATH}${mockRequest.place.logo}`}
    //           sx={{ width: "30px", height: "30px" }}
    //         />
    //         <Typography
    //           component="p"
    //           variant="Reg_14"
    //           sx={(theme) => ({ color: theme.vars.palette["Black"] })}
    //         >
    //           {mockRequest.place.name}
    //         </Typography>
    //       </Box>
    //     </Box>

    //     <Box
    //       sx={{
    //         display: "grid",
    //         rowGap: "4px",
    //       }}
    //     >
    //       <Typography
    //         component="p"
    //         variant="Reg_12"
    //         sx={(theme) => ({
    //           color: theme.vars.palette["Grey_2"],
    //         })}
    //       >
    //         {/* {t("statusPlaceholder")} */}
    //         Вид услуги
    //       </Typography>
    //       <Typography
    //         component="p"
    //         variant="Reg_14"
    //         sx={(theme) => ({
    //           color: theme.vars.palette["Black"],
    //         })}
    //       >
    //         {mockRequest.activity.name}
    //       </Typography>
    //     </Box>

    //     <form
    //       id="edit-request-form"
    //       onSubmit={handleSubmit((values) => {
    //         console.log(values);
    //         // const payload: postUpdateOrderActivityPayload = {
    //         //   orderId: Number(loaderData.orderId),
    //         //   orderActivity: Number(loaderData.orderActivity),
    //         //   viewActivityId: Number(values.activity),
    //         //   count: Number(values.amount),
    //         //   dateStart: dateWithoutTimezone(new Date(values.dateStart)),
    //         //   dateEnd: dateWithoutTimezone(new Date(values.dateEnd)),
    //         //   needFoto: values.needFoto,
    //         //   ...(values.days &&
    //         //     values.days.length > 0 && {
    //         //       dateActivity: (() => {
    //         //         const days: {
    //         //           timeStart: string;
    //         //           timeEnd: string;
    //         //           placeIds?: number[];
    //         //         }[] = [];

    //         //         values.days?.forEach((day) => {
    //         //           const places: number[] = [];

    //         //           day.locations?.forEach((location) => {
    //         //             places.push(Number(location.id));
    //         //           });

    //         //           days.push({
    //         //             timeStart: dateWithoutTimezone(new Date(day.timeStart)),
    //         //             timeEnd: dateWithoutTimezone(new Date(day.timeEnd)),
    //         //             ...(places.length > 0 && { placeIds: places }),
    //         //           });
    //         //         });

    //         //         return days;
    //         //       })(),
    //         //     }),
    //         // };

    //         // submit(JSON.stringify(payload), {
    //         //   method: "POST",
    //         //   encType: "application/json",
    //         // });
    //       })}
    //       style={{
    //         display: "grid",
    //         rowGap: "14px",
    //         width: "100%",
    //       }}
    //     >
    //       <Controller
    //         name="amount"
    //         control={control}
    //         render={({ field }) =>
    //           editMode ? (
    //             <TextField
    //               {...field}
    //               label={"Количество"}
    //               error={errors.amount?.message ? true : false}
    //               helperText={errors.amount?.message}
    //               slotProps={{
    //                 input: {
    //                   inputComponent: MaskedField as never,
    //                   inputProps: {
    //                     mask: "00",
    //                   },
    //                   inputMode: "numeric",
    //                   type: "tel",
    //                 },
    //               }}
    //             />
    //           ) : (
    //             <Box
    //               sx={{
    //                 display: "grid",
    //                 rowGap: "4px",
    //               }}
    //             >
    //               <Typography
    //                 component="p"
    //                 variant="Reg_12"
    //                 sx={(theme) => ({
    //                   color: theme.vars.palette["Grey_2"],
    //                 })}
    //               >
    //                 Количество
    //               </Typography>
    //               <Typography
    //                 component="p"
    //                 variant="Reg_14"
    //                 sx={(theme) => ({ color: theme.vars.palette["Black"] })}
    //               >
    //                 {field.value}
    //               </Typography>
    //             </Box>
    //           )
    //         }
    //       />
    //       <Controller
    //         name="unitPrice"
    //         control={control}
    //         render={({ field }) =>
    //           editMode ? (
    //             <TextField
    //               {...field}
    //               label={"Цена за (Ед.измерения) *"}
    //               error={errors.amount?.message ? true : false}
    //               helperText={errors.amount?.message}
    //               slotProps={{
    //                 input: {
    //                   inputComponent: MaskedField as never,
    //                   inputProps: {
    //                     mask: "000000",
    //                   },
    //                   inputMode: "numeric",
    //                   type: "tel",
    //                 },
    //               }}
    //             />
    //           ) : (
    //             <Box
    //               sx={{
    //                 display: "grid",
    //                 rowGap: "4px",
    //               }}
    //             >
    //               <Typography
    //                 component="p"
    //                 variant="Reg_12"
    //                 sx={(theme) => ({
    //                   color: theme.vars.palette["Grey_2"],
    //                 })}
    //               >
    //                 Цена за (Ед.измерения) *
    //               </Typography>
    //               <Typography
    //                 component="p"
    //                 variant="Reg_14"
    //                 sx={(theme) => ({ color: theme.vars.palette["Corp_1"] })}
    //               >
    //                 {field.value}
    //               </Typography>
    //             </Box>
    //           )
    //         }
    //       />

    //       {editMode ? (
    //         <Box
    //           sx={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //           }}
    //         >
    //           <Box
    //             sx={{
    //               display: "grid",
    //               rowGap: "4px",
    //             }}
    //           >
    //             <Typography
    //               component="p"
    //               variant="Reg_12"
    //               sx={(theme) => ({
    //                 color: theme.vars.palette["Grey_2"],
    //               })}
    //             >
    //               Стоимость (с налогом)
    //             </Typography>
    //             <Typography
    //               component="p"
    //               variant="Reg_14"
    //               sx={(theme) => ({ color: theme.vars.palette["Black"] })}
    //             >
    //               {mockRequest.taxedPrice}
    //             </Typography>
    //           </Box>
    //           <Box
    //             sx={{
    //               display: "grid",
    //               rowGap: "4px",
    //             }}
    //           >
    //             <Typography
    //               component="p"
    //               variant="Reg_12"
    //               sx={(theme) => ({
    //                 color: theme.vars.palette["Grey_2"],
    //               })}
    //             >
    //               ИТОГО на руки
    //             </Typography>
    //             <Typography
    //               component="p"
    //               variant="Reg_14"
    //               sx={(theme) => ({ color: theme.vars.palette["Black"] })}
    //             >
    //               {mockRequest.finalPrice}
    //             </Typography>
    //           </Box>
    //         </Box>
    //       ) : null}

    //       <Controller
    //         name="radius"
    //         control={control}
    //         render={({ field }) =>
    //           editMode ? (
    //             <StyledSelect
    //               {...field}
    //               inputType="select"
    //               name="radius"
    //               placeholder="Радиус"
    //               onImmediateChange={() => {}}
    //               options={[
    //                 {
    //                   value: "1",
    //                   label: "1",
    //                   disabled: false,
    //                 },
    //                 {
    //                   value: "2",
    //                   label: "2",
    //                   disabled: false,
    //                 },
    //                 {
    //                   value: "3",
    //                   label: "3",
    //                   disabled: false,
    //                 },
    //                 {
    //                   value: "4",
    //                   label: "4",
    //                   disabled: false,
    //                 },
    //                 {
    //                   value: "5",
    //                   label: "5",
    //                   disabled: false,
    //                 },
    //                 {
    //                   value: "6",
    //                   label: "6",
    //                   disabled: false,
    //                 },
    //               ]}
    //             />
    //           ) : (
    //             <Box
    //               sx={{
    //                 display: "grid",
    //                 rowGap: "4px",
    //               }}
    //             >
    //               <Typography
    //                 component="p"
    //                 variant="Reg_12"
    //                 sx={(theme) => ({
    //                   color: theme.vars.palette["Grey_2"],
    //                 })}
    //               >
    //                 Радиус
    //               </Typography>
    //               <Typography
    //                 component="p"
    //                 variant="Reg_14"
    //                 sx={(theme) => ({ color: theme.vars.palette["Black"] })}
    //               >
    //                 {field.value}
    //               </Typography>
    //             </Box>
    //           )
    //         }
    //       />

    //       {!editMode ? (
    //         <>
    //           <Box
    //             sx={{
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "space-between",
    //             }}
    //           >
    //             <Box
    //               sx={{
    //                 display: "grid",
    //                 rowGap: "4px",
    //               }}
    //             >
    //               <Typography
    //                 component="p"
    //                 variant="Reg_12"
    //                 sx={(theme) => ({
    //                   color: theme.vars.palette["Grey_2"],
    //                 })}
    //               >
    //                 Дата начала
    //               </Typography>
    //               <Typography
    //                 component="p"
    //                 variant="Reg_14"
    //                 sx={(theme) => ({ color: theme.vars.palette["Black"] })}
    //               >
    //                 {format(
    //                   new UTCDate(getValues("dateStart")),
    //                   "kk:mm dd.LL.yyyy"
    //                 )}
    //               </Typography>
    //             </Box>
    //             <Box
    //               sx={{
    //                 display: "grid",
    //                 rowGap: "4px",
    //               }}
    //             >
    //               <Typography
    //                 component="p"
    //                 variant="Reg_12"
    //                 sx={(theme) => ({
    //                   color: theme.vars.palette["Grey_2"],
    //                 })}
    //               >
    //                 Дата окончания
    //               </Typography>
    //               <Typography
    //                 component="p"
    //                 variant="Reg_14"
    //                 sx={(theme) => ({ color: theme.vars.palette["Black"] })}
    //               >
    //                 {format(
    //                   new UTCDate(getValues("dateEnd")),
    //                   "kk:mm dd.LL.yyyy"
    //                 )}
    //               </Typography>
    //             </Box>
    //           </Box>
    //         </>
    //       ) : null}

    //       <Controller
    //         name="dateStart"
    //         control={control}
    //         render={({ field }) =>
    //           editMode ? (
    //             <LocalizationProvider
    //               dateAdapter={AdapterDateFns}
    //               adapterLocale={ru}
    //             >
    //               <DateTimeField
    //                 error={errors.dateStart?.message ? true : false}
    //                 variant="filled"
    //                 label={"Дата начала"}
    //                 helperText={errors.dateStart?.message}
    //                 {...field}
    //                 value={new UTCDate(field.value)}
    //               />
    //             </LocalizationProvider>
    //           ) : (
    //             <></>
    //           )
    //         }
    //       />

    //       <Controller
    //         name="dateEnd"
    //         control={control}
    //         render={({ field }) =>
    //           editMode ? (
    //             <LocalizationProvider
    //               dateAdapter={AdapterDateFns}
    //               adapterLocale={ru}
    //             >
    //               <DateTimeField
    //                 error={errors.dateEnd?.message ? true : false}
    //                 // error={true}
    //                 variant="filled"
    //                 label={"Дата окончания"}
    //                 helperText={errors.dateEnd?.message}
    //                 disablePast
    //                 {...field}
    //                 value={new UTCDate(field.value)}
    //               />
    //             </LocalizationProvider>
    //           ) : (
    //             <></>
    //           )
    //         }
    //       />

    //       {!editMode ? (
    //         <Box
    //           sx={{
    //             display: "grid",
    //             rowGap: "4px",
    //           }}
    //         >
    //           <Typography
    //             component="p"
    //             variant="Reg_12"
    //             sx={(theme) => ({
    //               color: theme.vars.palette["Grey_2"],
    //             })}
    //           >
    //             {/* {t("statusPlaceholder")} */}
    //             Налоговый статус
    //           </Typography>
    //           <Typography
    //             component="p"
    //             variant="Reg_14"
    //             sx={(theme) => ({
    //               color: theme.vars.palette["Black"],
    //             })}
    //           >
    //             {mockRequest.taxStatus}
    //           </Typography>
    //         </Box>
    //       ) : null}
    //     </form>

    //     {fields.length > 0 ? (
    //       <Box
    //         sx={{
    //           display: "grid",
    //           rowGap: "8px",
    //         }}
    //       >
    //         {fields.map((day, index) => (
    //           <S_Accordion key={day.id}>
    //             <S_AccordionSummary
    //               expandIcon={
    //                 <ExpandIcon
    //                   sx={(theme) => ({
    //                     color: theme.vars.palette["Grey_2"],
    //                     padding: "4px",
    //                   })}
    //                 />
    //               }
    //             >
    //               <Box
    //                 sx={{
    //                   width: "100%",
    //                   display: "flex",
    //                   justifyContent: "space-between",
    //                   alignItems: "center",
    //                 }}
    //               >
    //                 <Typography
    //                   component="p"
    //                   variant="Bold_14"
    //                   sx={(theme) => ({
    //                     color: theme.vars.palette["Black"],
    //                   })}
    //                 >
    //                   {getDate(day.timeStart)}.
    //                   {getMonth(day.timeStart) < 10
    //                     ? `0${getMonth(day.timeStart) + 1}`
    //                     : getMonth(day.timeStart) + 1}
    //                   &nbsp;
    //                   {/*@ts-expect-error https://www.i18next.com/overview/typescript#type-error-template-literal */}
    //                   {t(`dayMap.${getDay(day.timeStart)}`)}
    //                 </Typography>

    //                 <Typography
    //                   component="p"
    //                   variant="Reg_14"
    //                   sx={(theme) => ({
    //                     color: theme.vars.palette["Black"],
    //                   })}
    //                 >
    //                   {format(
    //                     new UTCDate(getValues(`days.${index}.timeStart`)),
    //                     "kk:mm"
    //                   )}
    //                   -
    //                   {format(
    //                     new UTCDate(getValues(`days.${index}.timeEnd`)),
    //                     "kk:mm"
    //                   )}
    //                 </Typography>

    //                 {(() => {
    //                   const locations = getValues(`days.${index}.locations`);

    //                   if (locations && locations.length > 0) {
    //                     return (
    //                       <Box
    //                         sx={{
    //                           display: "flex",
    //                           alignItems: "center",
    //                           columnGap: "4px",
    //                         }}
    //                       >
    //                         <LocationIcon
    //                           sx={(theme) => ({
    //                             color: theme.vars.palette["Grey_2"],
    //                             padding: "2px",
    //                           })}
    //                         />
    //                         <Typography
    //                           component="p"
    //                           variant="Reg_14"
    //                           sx={(theme) => ({
    //                             color: theme.vars.palette["Black"],
    //                           })}
    //                         >
    //                           {locations.length}
    //                         </Typography>
    //                       </Box>
    //                     );
    //                   } else {
    //                     return null;
    //                   }
    //                 })()}
    //               </Box>
    //             </S_AccordionSummary>
    //             <S_AccordionDetails>
    //               {" "}
    //               <Box>
    //                 <Box
    //                   sx={{
    //                     display: "flex",
    //                     columnGap: "10px",
    //                     marginBottom: "14px",
    //                   }}
    //                 >
    //                   {editMode ? (
    //                     <>
    //                       <Controller
    //                         name={`days.${index}.timeStart` as const}
    //                         control={control}
    //                         render={({ field }) => (
    //                           <TimeField
    //                             minTime={new UTCDate(field.value)}
    //                             maxTime={set(new UTCDate(field.value), {
    //                               hours: 21,
    //                             })}
    //                             placeholder={"Время начала"}
    //                             // error={errors.days[index]?.message}
    //                             {...field}
    //                           />
    //                         )}
    //                       />
    //                       <Controller
    //                         name={`days.${index}.timeEnd` as const}
    //                         control={control}
    //                         render={({ field }) => (
    //                           <TimeField
    //                             minTime={set(new UTCDate(field.value), {
    //                               hours: 9,
    //                             })}
    //                             maxTime={new UTCDate(field.value)}
    //                             placeholder={"Время окончания"}
    //                             // error={errors.days[index]?.message}
    //                             {...field}
    //                           />
    //                         )}
    //                       />
    //                     </>
    //                   ) : (
    //                     <Box
    //                       sx={{
    //                         display: "flex",
    //                         alignItems: "center",
    //                         justifyContent: "space-between",
    //                         width: "100%",
    //                       }}
    //                     >
    //                       <Box
    //                         sx={{
    //                           display: "grid",
    //                           rowGap: "4px",
    //                         }}
    //                       >
    //                         <Typography
    //                           component="p"
    //                           variant="Reg_12"
    //                           sx={(theme) => ({
    //                             color: theme.vars.palette["Grey_2"],
    //                           })}
    //                         >
    //                           Время начала
    //                         </Typography>
    //                         <Typography
    //                           component="p"
    //                           variant="Reg_14"
    //                           sx={(theme) => ({
    //                             color: theme.vars.palette["Black"],
    //                           })}
    //                         >
    //                           {format(
    //                             new UTCDate(
    //                               getValues(`days.${index}.timeStart`)
    //                             ),
    //                             "kk:mm"
    //                           )}
    //                         </Typography>
    //                       </Box>
    //                       <Box
    //                         sx={{
    //                           display: "grid",
    //                           rowGap: "4px",
    //                         }}
    //                       >
    //                         <Typography
    //                           component="p"
    //                           variant="Reg_12"
    //                           sx={(theme) => ({
    //                             color: theme.vars.palette["Grey_2"],
    //                           })}
    //                         >
    //                           Время окончания
    //                         </Typography>
    //                         <Typography
    //                           component="p"
    //                           variant="Reg_14"
    //                           sx={(theme) => ({
    //                             color: theme.vars.palette["Black"],
    //                           })}
    //                         >
    //                           {format(
    //                             new UTCDate(getValues(`days.${index}.timeEnd`)),
    //                             "kk:mm"
    //                           )}
    //                         </Typography>
    //                       </Box>
    //                     </Box>
    //                   )}
    //                 </Box>

    //                 {getValues(`days.${index}.needRoute`) !== undefined ? (
    //                   <Controller
    //                     name={`days.${index}.needRoute` as const}
    //                     control={control}
    //                     render={({ field }) => (
    //                       <>
    //                         {editMode ? (
    //                           <StyledCheckbox
    //                             {...field}
    //                             inputType="checkbox"
    //                             label={"Маршрут дня"}
    //                             onImmediateChange={() => {}}
    //                             validation="none"
    //                             value={field.value as boolean}
    //                           />
    //                         ) : null}

    //                         <Box
    //                           sx={{
    //                             display: "grid",
    //                             rowGap: "14px",
    //                           }}
    //                         >
    //                           {getValues(`days.${index}.needRoute`) === true
    //                             ? getValues(`days.${index}.locations`)?.map(
    //                                 (location) => (
    //                                   <Box
    //                                     key={location.id}
    //                                     sx={{
    //                                       display: "flex",
    //                                       columnGap: "12px",
    //                                       alignItems: "center",
    //                                     }}
    //                                   >
    //                                     {location.logo ? (
    //                                       <Avatar
    //                                         src={`${import.meta.env.VITE_ASSET_PATH}${
    //                                           location.logo
    //                                         }`}
    //                                         sx={{
    //                                           width: "30px",
    //                                           height: "30px",
    //                                         }}
    //                                       />
    //                                     ) : null}

    //                                     <Typography
    //                                       component="p"
    //                                       variant="Reg_14"
    //                                       sx={{
    //                                         flexGrow: "1",
    //                                       }}
    //                                     >
    //                                       {location.name}
    //                                     </Typography>

    //                                     {editMode ? (
    //                                       <IconButton
    //                                         onClick={() => {
    //                                           const currentList = getValues(
    //                                             `days.${index}.locations`
    //                                           );

    //                                           const updatedList =
    //                                             currentList?.filter(
    //                                               (item) =>
    //                                                 item.id !== location.id
    //                                             );
    //                                           setValue(
    //                                             `days.${index}.locations`,
    //                                             updatedList
    //                                           );
    //                                           trigger(
    //                                             `days.${index}.locations`
    //                                           );
    //                                         }}
    //                                         sx={{
    //                                           width: "24px",
    //                                           height: "24px",
    //                                         }}
    //                                       >
    //                                         <DeleteIcon
    //                                           sx={{
    //                                             width: "12px",
    //                                             height: "12px",
    //                                           }}
    //                                         />
    //                                       </IconButton>
    //                                     ) : null}
    //                                   </Box>
    //                                 )
    //                               )
    //                             : null}

    //                           {getValues(`days.${index}.needRoute`) === true &&
    //                           editMode ? (
    //                             <Button
    //                               variant="outlined"
    //                               startIcon={<PointerIcon />}
    //                               onClick={() => {
    //                                 setDayIndex(index);
    //                               }}
    //                             >
    //                               Добавить адрес
    //                             </Button>
    //                           ) : null}

    //                           {editMode ? (
    //                             <Button
    //                               type="button"
    //                               variant="text"
    //                               onClick={() => {
    //                                 remove(index);
    //                                 if (getValues("days")?.length === 0) {
    //                                   setValue("needDays", false);
    //                                 }
    //                               }}
    //                             >
    //                               Удалить день
    //                             </Button>
    //                           ) : null}
    //                         </Box>
    //                       </>
    //                     )}
    //                   />
    //                 ) : null}

    //                 <Divider sx={{ marginTop: "8px" }} />
    //               </Box>
    //             </S_AccordionDetails>
    //           </S_Accordion>
    //         ))}
    //       </Box>
    //     ) : null}

    //     <Controller
    //       name="needFoto"
    //       control={control}
    //       disabled={!editMode}
    //       render={({ field }) => (
    //         <StyledCheckbox
    //           {...field}
    //           inputType="checkbox"
    //           label="Фотоотчет"
    //           onImmediateChange={() => {}}
    //           validation="none"
    //         />
    //       )}
    //     />

    //     {mockRequest.order && !editMode ? (
    //       <Box
    //         sx={{
    //           display: "grid",
    //           rowGap: "4px",
    //         }}
    //       >
    //         <Typography
    //           component="p"
    //           variant="Reg_12"
    //           sx={(theme) => ({
    //             color: theme.vars.palette["Grey_2"],
    //           })}
    //         >
    //           {/* {t("statusPlaceholder")} */}
    //           Родительская задача
    //         </Typography>
    //         <Link
    //           to={withLocale(`/assignments/${mockRequest.order.id}`)}
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //             textDecoration: "none",
    //           }}
    //         >
    //           <Typography
    //             component="p"
    //             variant="Reg_14"
    //             sx={(theme) => ({
    //               color: theme.vars.palette["Black"],
    //             })}
    //           >
    //             {mockRequest.order.id}
    //           </Typography>
    //           <ArrowBackIosNewIcon
    //             sx={(theme) => ({
    //               width: "18px",
    //               height: "18px",
    //               color: theme.vars.palette["Corp_1"],
    //               transform: "rotate(180deg)",
    //             })}
    //           />
    //         </Link>
    //       </Box>
    //     ) : null}

    //     {mockRequest.task && !editMode ? (
    //       <Box
    //         sx={{
    //           display: "grid",
    //           rowGap: "4px",
    //         }}
    //       >
    //         <Typography
    //           component="p"
    //           variant="Reg_12"
    //           sx={(theme) => ({
    //             color: theme.vars.palette["Grey_2"],
    //           })}
    //         >
    //           {/* {t("statusPlaceholder")} */}
    //           Родительская задача
    //         </Typography>
    //         <Link
    //           to={withLocale(`/tasks/${mockRequest.task.id}`)}
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //             textDecoration: "none",
    //           }}
    //         >
    //           <Typography
    //             component="p"
    //             variant="Reg_14"
    //             sx={(theme) => ({
    //               color: theme.vars.palette["Black"],
    //             })}
    //           >
    //             {mockRequest.task.id}
    //           </Typography>
    //           <ArrowBackIosNewIcon
    //             sx={(theme) => ({
    //               width: "18px",
    //               height: "18px",
    //               color: theme.vars.palette["Corp_1"],
    //               transform: "rotate(180deg)",
    //             })}
    //           />
    //         </Link>
    //       </Box>
    //     ) : null}

    //     <Box
    //       sx={{
    //         display: "grid",
    //         rowGap: "4px",
    //       }}
    //     >
    //       <Typography
    //         component="p"
    //         variant="Reg_12"
    //         sx={(theme) => ({
    //           color: theme.vars.palette["Grey_2"],
    //         })}
    //       >
    //         Ответственный
    //       </Typography>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           columnGap: "8px",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Avatar
    //           src={`${import.meta.env.VITE_ASSET_PATH}${mockRequest.responsiblePerson.logo}`}
    //           sx={{ width: "30px", height: "30px" }}
    //         />
    //         <Typography
    //           component="p"
    //           variant="Reg_14"
    //           sx={(theme) => ({
    //             color: theme.vars.palette["Black"],
    //           })}
    //         ></Typography>
    //       </Box>
    //     </Box>
    //   </Box>

    //   <SwipeableDrawer
    //     open={dayIndex !== -1 ? true : false}
    //     onClose={() => {
    //       resetAddress();
    //       setDayIndex(-1);
    //     }}
    //     onOpen={() => {}}
    //     disableBackdropTransition={true}
    //     disableSwipeToOpen={true}
    //     anchor="bottom"
    //     sx={{
    //       "& .MuiDrawer-paper": {
    //         borderRadius: "6px",
    //       },
    //     }}
    //   >
    //     <TopNavigation
    //       header={{
    //         text: "Места проведения",
    //         bold: false,
    //       }}
    //     />
    //     <form
    //       onSubmit={handleAddressSubmit(() => {
    //         const selectedDayLocations = getValues(
    //           `days.${dayIndex}.locations`
    //         );
    //         const selectedLoactions = getValuesAddress("locations");

    //         selectedLoactions.forEach((item) => {
    //           const match = loaderData.locations.find(
    //             (location) => location.value === item
    //           );

    //           const isAlreadySelected = selectedDayLocations?.find(
    //             (location) => location.id === item
    //           );

    //           if (match && isAlreadySelected === undefined) {
    //             selectedDayLocations?.push({
    //               id: match.value,
    //               name: match.label,
    //               ...(match.logo && { logo: match.logo }),
    //             });
    //           }
    //         });

    //         resetAddress();
    //         setDayIndex(-1);
    //       })}
    //     >
    //       <Box
    //         sx={{
    //           position: "relative",
    //           display: "grid",
    //           alignContent: "flex-start",
    //           rowGap: "14px",
    //           paddingTop: "20px",
    //           paddingLeft: "16px",
    //           paddingRight: "16px",
    //           height: "85vh",
    //         }}
    //       >
    //         <Controller
    //           name="searchbar"
    //           control={controlAddress}
    //           render={({ field }) => (
    //             <StyledSearchBar
    //               placeholder={"Поиск"}
    //               {...field}
    //               // onChange={(evt) => {
    //               //   const currentFieldValue = new RegExp(
    //               //     `^${evt.target.value}`,
    //               //     "i"
    //               //   );

    //               //   let matchingLocations: typeof loaderData.locations = [];

    //               //   if (evt.target.value !== "") {
    //               //     matchingLocations = [
    //               //       ...selectedLocations.filter((item) =>
    //               //         currentFieldValue.test(item.label)
    //               //       ),
    //               //     ];
    //               //   } else {
    //               //     matchingLocations = [...loaderData.locations];
    //               //   }

    //               //   setSelectedLocations(matchingLocations);

    //               //   field.onChange(evt);
    //               // }}
    //             />
    //           )}
    //         />

    //         {/* <Controller
    //           name="locations"
    //           control={controlAddress}
    //           render={({ field }) => (
    //             <StyledCheckboxMultiple
    //               inputType="checkboxMultiple"
    //               onImmediateChange={() => {}}
    //               options={selectedLocations}
    //               {...field}
    //             />
    //           )}
    //         /> */}

    //         <Box
    //           sx={(theme) => ({
    //             display: "flex",
    //             columnGap: "14px",
    //             padding: "10px",
    //             backgroundColor: theme.vars.palette["White"],
    //             position: "fixed",
    //             zIndex: 1,
    //             width: "100%",
    //             bottom: "0",
    //             left: "0",
    //           })}
    //         >
    //           <Button
    //             type="submit"
    //             variant="contained"
    //             startIcon={<PointerIcon />}
    //           >
    //             Добавить адреса
    //           </Button>
    //         </Box>
    //       </Box>
    //     </form>
    //   </SwipeableDrawer>
    // </>

    <>
      <p>запросы </p>
      <p>
        получение заявки <b>getBid</b>
      </p>
      <p>
        запрос на получение локаций <b></b>
      </p>
      <p>
        запрос радиуса для селекта <b></b>
      </p>
      <p>
        запрос сохрания заявки <b></b>
      </p>
    </>
  );
}
