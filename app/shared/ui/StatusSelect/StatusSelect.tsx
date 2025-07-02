import { useState } from "react";

import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { S_SwipeableDrawer } from "./StatusSelect.styled";
import { Typography } from "@mui/material";

type StatusSelectProps = {
  value: string;
  options: {
    id: string;
    label: string;
    count: number;
    color: string;
  }[];
  textColor?: string;
  onChange: (value: string) => void;
};

export const StatusSelect = ({
  textColor = "var(--mui-palette-White)",
  ...props
}: StatusSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        component="button"
        onClick={() => {
          setOpen(true);
        }}
        style={{
          backgroundColor: props.options.find(
            (option) => option.id === props.value
          )?.color,
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
          sx={{
            color: textColor,
          }}
        >
          {props.options.find((option) => option.id === props.value)?.label}
        </Typography>
        <Typography
          component="p"
          variant="Reg_12"
          sx={{
            color: textColor,
          }}
        >
          {props.options.find((option) => option.id === props.value)?.count}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            marginLeft: "auto",
            color: textColor,
          }}
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
              key={option.id}
              component="button"
              onClick={() => {
                props.onChange(option.id);
                setOpen(false);
              }}
              style={{
                backgroundColor: option.color,
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
                sx={{
                  color: textColor,
                }}
              >
                {option.label}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={{
                  color: textColor,
                }}
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
