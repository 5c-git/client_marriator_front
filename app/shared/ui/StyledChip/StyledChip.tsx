import { MouseEventHandler } from "react";
import { Typography, Chip } from "@mui/material";

type StyledChipProps = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  label: string;
  count: number;
  statusColor: string;
  isActive: boolean;
};

export const StyledChip = ({
  onClick,
  label,
  count,
  statusColor,
  isActive,
}: StyledChipProps) => {
  return (
    <Chip
      onClick={onClick}
      style={{
        "--bgColor": isActive
          ? "var(--mui-palette-Copr_3)"
          : "var(--mui-palette-Grey_5)",
      }}
      sx={{
        backgroundColor: "var(--bgColor)",
      }}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z"
            fill={isActive ? "var(--mui-palette-White)" : statusColor}
          />
        </svg>
      }
      label={
        <Typography
          style={{
            "--color": isActive
              ? "var(--mui-palette-White)"
              : "var(--mui-palette-Grey_1)",
          }}
          sx={(theme) => ({
            ...theme.typography["Med_14"],
            display: "flex",
            columnGap: "8px",
            alignItems: "baseline",
            justifyContent: "center",
            color: "var(--color)",
          })}
        >
          {label}
          <Typography
            style={{
              "--color": isActive
                ? "var(--mui-palette-White)"
                : "var(--mui-palette-Grey_1)",
            }}
            sx={(theme) => ({
              ...theme.typography["Reg_12"],
              color: "var(--color)",
            })}
          >
            {count}
          </Typography>
        </Typography>
      }
    />
  );
};
