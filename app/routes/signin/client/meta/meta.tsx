import { useState, useEffect } from "react";
import {
  useFetcher,
  useNavigate,
  useNavigation,
  Link,
  redirect,
} from "react-router";
import type { Route } from "./+types/meta";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Avatar, Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { S_SwipeableDrawer } from "./meta.styled";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { Loader } from "~/shared/ui/Loader/Loader";
import { PointerIcon } from "./icons/PointerIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

// export async function clientAction({ request }: Route.ClientActionArgs) {
//   const params = new URLSearchParams();
//   const { _action, ...fields } = await request.json();
// }
//

const location = {
  name: "ТЦ “Луч”",
  icon: "https://mui.com/static/images/avatar/1.jpg",
  coordinates: [37.623082, 55.75254],
  address: "ул.Вахтовиков, д. 17, к.3",
  region: "Центральный федеральный округ",
};

export default function Meta({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("profileMeta");
  // const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      logo: "",
      fio: "",
      locations: [location],
    },
    resolver: yupResolver(
      Yup.object({
        logo: Yup.string().required("logo"),
        fio: Yup.string().required("Обязательное поле"),
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
      })
    ),
    mode: "onChange",
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: "Настройка аккаунта",
            bold: false,
          }}
        />

        <form
          onSubmit={handleSubmit((values) => {
            console.log(values);
            // submit(JSON.stringify(values), {
            //   method: "POST",
            //   encType: "application/json",
            // });
          })}
          style={{
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
            name="fio"
            control={control}
            render={({ field }) => (
              <StyledTextField
                placeholder="ФИО *"
                onImmediateChange={() => {}}
                inputType="text"
                error={errors.fio?.message}
                {...field}
              />
            )}
          />

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
            component={Link}
            to="/signin/client/location"
            variant="outlined"
            startIcon={<PointerIcon />}
          >
            Выбрать места проведения
          </Button>

          <Box
            sx={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              bottom: "0",
              left: "0",
              padding: "10px 16px 24px 16px",
              backgroundColor: (theme) => theme.vars.palette["White"],
            }}
          >
            <Button type="submit" variant="contained" disabled={!isValid}>
              Завершить регистрацию
            </Button>
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
