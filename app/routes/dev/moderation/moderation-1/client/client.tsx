import { useState } from "react";
import { useNavigate, useNavigation, useSubmit, redirect } from "react-router";
// import type { Route } from "./+types/billing-add";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Button, IconButton, Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { TimeField } from "~/shared/ui/TimeField/TimeField";

import { S_SwipeableDrawer } from "./client.styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FileIcon } from "~/shared/icons/FileIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { CheckIcon } from "~/shared/icons/CheckIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

const location = {
  name: "ТЦ “Луч”",
  icon: "https://mui.com/static/images/avatar/1.jpg",
  coordinates: [37.623082, 55.75254],
  address: "ул.Вахтовиков, д. 17, к.3",
  region: "Центральный федеральный округ",
};

export default function Client() {
  const { t } = useTranslation("billingAdd");
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      logo: "",
      agent: "",
      phone: "",
      fio: "",
      locations: [location],
      editInterval: null as unknown as string,
      cancelInterval: null as unknown as string,
      interval: null as unknown as string,
    },
    resolver: yupResolver(
      Yup.object({
        logo: Yup.string().required("Обязательное поле"),
        agent: Yup.string().required("Обязательное поле"),
        phone: Yup.string().required("Обязательное поле"),
        fio: Yup.string().required(t("text", { ns: "constructorFields" })),
        locations: Yup.array()
          .min(1)
          .of(
            Yup.object().shape({
              name: Yup.string().required(),
              icon: Yup.string().required(),
              coordinates: Yup.array().min(2).max(2).of(Yup.number()),
              address: Yup.string().required(),
              region: Yup.string().required(),
            })
          )
          .required("fff"),
        editInterval: Yup.string().nullable().required("Обязательное поле"),
        cancelInterval: Yup.string().nullable().required("Обязательное поле"),
        interval: Yup.string().nullable().required("Обязательное поле"),
      })
    ),
  });

  console.log(errors);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingBottom: "54px",
        }}
      >
        <TopNavigation
          header={{
            text: "Клиент",
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/dev/moderation/moderation-1"), {
              viewTransition: true,
            });
          }}
        />

        <form
          onSubmit={handleSubmit((values) => {
            // submit(JSON.stringify(values), {
            //   method: "POST",
            //   encType: "application/json",
            // });
            console.log(JSON.stringify(values));
          })}
        >
          <Box
            sx={{
              display: "grid",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Avatar
              src={getValues().logo}
              sx={(theme) => ({
                width: "88px",
                height: "88px",
                justifySelf: "center",
                ...theme.typography.Reg_16,
              })}
            >
              Логотип
            </Avatar>

            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "8px 12px",
                rowGap: "2px",
                backgroundColor: (theme) => theme.vars.palette["Grey_5"],
                borderRadius: "6px",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={{
                  color: (theme) => theme.vars.palette["Grey_2"],
                }}
              >
                Аватар *
              </Typography>
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={{
                    flexGrow: "1",
                    color: (theme) => theme.vars.palette["Black"],
                    textAlign: "left",
                  }}
                >
                  Выберите
                </Typography>{" "}
                <KeyboardArrowDownIcon
                  sx={{
                    color: (theme) => theme.vars.palette["Grey_2"],
                  }}
                />
              </Stack>
            </Button>

            <Controller
              name="agent"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  inputType="select"
                  placeholder="Контрагент *"
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.agent?.message}
                  options={[
                    {
                      value: "romashka",
                      label: "ООО Ромашка",
                      disabled: false,
                    },
                    {
                      value: "vasilek",
                      label: "ООО Василёк",
                      disabled: false,
                    },
                    {
                      value: "sunflower",
                      label: "ООО Подсолнух",
                      disabled: false,
                    },
                  ]}
                  {...field}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <StyledPhoneField
                  inputType="phone"
                  placeholder={"телефон"}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.phone?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="fio"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  inputType="text"
                  placeholder={t("placeholder_fio")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.fio?.message}
                  {...field}
                />
              )}
            />

            <Typography component="p" variant="Bold_14">
              Проект
            </Typography>
            <Box
              sx={{
                display: "flex",
                columnGap: "12px",
                alignItems: "center",
              }}
            >
              <Avatar
                src={"https://mui.com/static/images/avatar/1.jpg"}
                sx={{ width: "30px", height: "30px" }}
              />

              <Typography
                component="p"
                variant="Reg_14"
                sx={{
                  flexGrow: "1",
                }}
              >
                Пятерочка
              </Typography>
            </Box>

            <Button variant="outlined" startIcon={<FileIcon />}>
              Выбрать проект
            </Button>

            <Typography component="p" variant="Bold_14">
              Места проведения
            </Typography>

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {getValues("locations").map((location) => (
                <Box
                  key={location.name}
                  sx={{
                    display: "flex",
                    columnGap: "12px",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={location.icon}
                    sx={{ width: "30px", height: "30px" }}
                  />

                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    {location.name}, {location.address}
                  </Typography>

                  <IconButton
                    onClick={() => {
                      const currentList = getValues("locations");
                      const updatedList = currentList.filter(
                        (item) => item.name !== location.name
                      );
                      setValue("locations", updatedList);
                      trigger("locations");
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
            </Stack>

            <Button
              // component={Link}
              // to="/signin/client/location"
              variant="outlined"
              startIcon={<PointerIcon />}
            >
              Выбрать места проведения
            </Button>

            <Controller
              name="editInterval"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder="Интервал редактирования поручения *"
                  error={errors.editInterval?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="cancelInterval"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder="Интервал отмены поручения *"
                  error={errors.editInterval?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="editInterval"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder="Срок действия поручения *"
                  error={errors.editInterval?.message}
                  {...field}
                />
              )}
            />

            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                Идентификатор пользователя
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                M0000001
              </Typography>
            </Box>

            <Button variant="contained" type="submit" startIcon={<CheckIcon />}>
              Подтвердить
            </Button>
            <Button variant="text">Исключить</Button>
          </Box>
        </form>
      </Box>

      <S_SwipeableDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
      >
        <Box
          sx={{
            padding: "18px 16px",
          }}
        >
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <StyledRadioButton
                onImmediateChange={() => {}}
                inputType="radio"
                validation="none"
                options={[
                  {
                    value: "https://mui.com/static/images/avatar/1.jpg",
                    label: "Пятерочка",
                    disabled: false,
                    image: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  {
                    value: "https://mui.com/static/images/avatar/2.jpg",
                    label: "Перекресток",
                    disabled: false,
                    image: "https://mui.com/static/images/avatar/2.jpg",
                  },
                  {
                    value: "https://mui.com/static/images/avatar/3.jpg",
                    label: "Чижик",
                    disabled: false,
                    image: "https://mui.com/static/images/avatar/3.jpg",
                  },
                ]}
                {...field}
              />
            )}
          />
        </Box>
      </S_SwipeableDrawer>
    </>
  );
}
