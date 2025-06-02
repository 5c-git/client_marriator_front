import { useState } from "react";

import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { S_SwipeableDrawer } from "./StatusSelect.styled";
import { Typography } from "@mui/material";

const statusSelectMap = {
  rejected: {
    value: "rejected",
    colour: "var(--mui-palette-Grey_1)",
    text: "Не принято",
  },
  "not-сonfirmed": {
    value: "not-сonfirmed",
    colour: "var(--mui-palette-Grey_1)",
    text: "Не подтверждена",
  },
  сonfirmed: {
    value: "сonfirmed",
    colour: "var(--mui-palette-Dark_blue)",
    text: "Подтверждена",
  },
  "in-review": {
    value: "in-review",
    colour: "var(--mui-palette-Corp_2)",
    text: "На рассмотрении",
  },
  accepted: {
    value: "accepted",
    colour: "var(--mui-palette-Telegram)",
    text: "Принято",
  },
  "in-work": {
    value: "in-work",
    colour: "var(--mui-palette-Green)",
    text: "В работе",
  },
  approved: {
    value: "approved",
    colour: "var(--mui-palette-WhatsApp)",
    text: "Одобрена",
  },
  cancelled: {
    value: "cancelled",
    colour: "var(--mui-palette-Red)",
    text: "Отменено",
  },
  archived: {
    value: "archived",
    colour: "var(--mui-palette-Grey_2)",
    text: "Архив",
  },
} as const;

type StatusSelectProps = {
  value: keyof typeof statusSelectMap;
  options: {
    id: keyof typeof statusSelectMap;
    count: number;
  }[];
  onChange: (value: keyof typeof statusSelectMap) => void;
};

export const StatusSelect = (props: StatusSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        component="button"
        onClick={() => {
          setOpen(true);
        }}
        style={{
          backgroundColor: statusSelectMap[props.value].colour,
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "8px",
          border: 0,
          borderRadius: "20px",
          padding: "6px 12px",
        }}
      >
        <Typography
          component="p"
          variant="Med_14"
          sx={(theme) => ({
            color: theme.vars.palette["White"],
          })}
        >
          {statusSelectMap[props.value].text}
        </Typography>
        <Typography
          component="p"
          variant="Reg_12"
          sx={(theme) => ({
            color: theme.vars.palette["White"],
          })}
        >
          {props.options.find((option) => option.id === props.value)?.count}
        </Typography>
        <KeyboardArrowDownIcon
          sx={(theme) => ({
            marginLeft: "auto",
            color: theme.vars.palette["White"],
          })}
        />
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
        <Box>
          {props.options.map((option) => (
            <Box
              component="button"
              onClick={() => {
                props.onChange(statusSelectMap[option.id].value);
                setOpen(false);
              }}
              style={{
                backgroundColor: statusSelectMap[option.id].colour,
              }}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "8px",
                border: 0,
                padding: "20px 12px",
              }}
            >
              <Typography
                component="p"
                variant="Reg_18"
                sx={(theme) => ({
                  color: theme.vars.palette["White"],
                })}
              >
                {statusSelectMap[option.id].text}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["White"],
                })}
              >
                {option.count}
              </Typography>
            </Box>
          ))}
        </Box>
      </S_SwipeableDrawer>
    </>
  );
};
