import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Avatar, Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { S_SwipeableDrawer } from "../meta.styled";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

import type { MetaData } from "../meta.service";

type MetaViewProps = {
  data: MetaData;
  navigateToLocationAction: () => void;
  setFioAction: (fio: string) => void;
  deleteLocationAction: (placeId: number) => void;
  saveLogoAction: (logo: string) => void;
  finishRegisterAction: (name: string) => void;
};

export function MetaView(props: MetaViewProps) {
  const { t } = useTranslation("m_signin_client_meta");

  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      logo: props.data.userLogo,
      fio: props.data.userName,
      locations: props.data.locations,
    },
    resolver: zodResolver(
      z.object({
        logo: z.string({ error: t(`form.logo`) }),
        fio: z
          .string()
          .trim()
          .min(1, {
            error: t(`form.fio`),
          }),
        locations: z
          .array(
            z.object({
              id: z.number(),
              name: z.string(),
              icon: z.string(),
              coordinates: z.array(z.string()).min(2).max(2),
              address: z.string(),
            }),
          )
          .min(1, { error: t(`form.locations`) }),
      }),
    ),
    mode: "onChange",
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        logo: props.data.userLogo,
        fio: getValues("fio"),
        locations: props.data.locations,
      });
    });
  }, [props.data, reset, getValues]);

  return (
    <Box
      sx={{
        paddingBottom: "105px",
      }}
    >
      <TopNavigation
        header={{
          text: t(`header`),
          bold: false,
        }}
      />

      <form
        onSubmit={handleSubmit(() => {
          props.finishRegisterAction(getValues("fio"));
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
          src={`${import.meta.env.VITE_ASSET_PATH}${getValues("logo")}`}
          sx={(theme) => ({
            width: "88px",
            height: "88px",
            justifySelf: "center",
            ...theme.typography.Reg_16,
          })}
        >
          {t(`avatar.placeholder`)}
        </Avatar>

        <Box>
          <Button
            style={{
              "--borderColor": errors.logo?.message
                ? "var(--mui-palette-Red)"
                : "transparent",
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              padding: "8px 12px",
              marginBottom: "4px",
              rowGap: "2px",
              backgroundColor: (theme) => theme.vars.palette["Grey_5"],
              borderRadius: "6px",
              border: "1px solid",
              borderColor: "var(--borderColor)",
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
              {t(`avatar.text`)}
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
                style={{
                  "--color": errors.logo?.message
                    ? "var(--mui-palette-Red)"
                    : "var(--mui-palette-Black)",
                }}
                sx={{
                  flexGrow: "1",
                  color: "var(--color)",
                  textAlign: "left",
                }}
              >
                {t(`avatar.value`)}
              </Typography>{" "}
              <KeyboardArrowDownIcon
                sx={{
                  color: (theme) => theme.vars.palette["Grey_2"],
                }}
              />
            </Stack>
          </Button>

          {errors.logo?.message ? (
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Red"],
              })}
            >
              {t(`form.logo`)}
            </Typography>
          ) : null}
        </Box>

        <Controller
          name="fio"
          control={control}
          render={({ field }) => (
            <StyledTextField
              placeholder={t(`fioPlaceholder`)}
              onImmediateChange={() => {
                props.setFioAction(getValues("fio"));
              }}
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
                src={`${import.meta.env.VITE_ASSET_PATH}${location.icon}`}
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
                    (item) => item.id !== location.id,
                  );
                  setValue("locations", updatedList);
                  trigger("locations");

                  props.deleteLocationAction(location.id);
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
          variant="outlined"
          startIcon={<PointerIcon />}
          onClick={props.navigateToLocationAction}
          style={{
            "--color": errors.locations?.message
              ? "var(--mui-palette-Red)"
              : "var(--mui-palette-Corp_1)",
          }}
          sx={{
            color: "var(--color)",
            borderColor: "var(--color)",
          }}
        >
          {t(`locationsButton`)}
        </Button>

        {errors.locations?.message ? (
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Red"],
              textAlign: "center",
            })}
          >
            {t(`form.locations`)}
          </Typography>
        ) : null}

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
          <Button
            type="button"
            onClick={handleSubmit(() => {
              props.finishRegisterAction(getValues("fio"));
            })}
            variant="contained"
            disabled={!isValid}
          >
            {t(`completeRegistration`)}
          </Button>
        </Box>
      </form>

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
                {...field}
                onImmediateChange={() => {
                  props.saveLogoAction(getValues("logo"));
                }}
                inputType="radio"
                validation="none"
                options={props.data.brands}
              />
            )}
          />
        </Box>
      </S_SwipeableDrawer>
    </Box>
  );
}
