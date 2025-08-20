import { useState } from "react";

import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { S_SwipeableDrawer } from "./SortingSelect.styled";
import { Typography } from "@mui/material";

type SortingSelectProps = {
  value: string;
  options: {
    id: string;
    label: string;
  }[];
  onChange: (value: string) => void;
};

export const SortingSelect = (props: SortingSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        component="button"
        onClick={() => {
          setOpen(true);
        }}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          columnGap: "8px",
          border: 0,
          borderRadius: "20px",
          backgroundColor: theme.vars.palette["White"],
        })}
      >
        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
          })}
        >
          {props.options.find((option) => option.id === props.value)?.label}
        </Typography>
        <KeyboardArrowDownIcon
          sx={(theme) => ({
            color: theme.vars.palette["Grey_2"],
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
        <Box
          sx={{
            display: "grid",
            rowGap: "26px",
            padding: "18px 16px",
          }}
        >
          {props.options.map((option) => (
            <Typography
              key={option.id}
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
              onClick={() => {
                props.onChange(option.id);
                setOpen(false);
              }}
            >
              {option.label}
            </Typography>
          ))}
        </Box>
      </S_SwipeableDrawer>
    </>
  );
};
