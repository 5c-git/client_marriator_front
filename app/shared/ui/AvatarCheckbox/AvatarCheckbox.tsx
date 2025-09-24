import { ChangeEvent } from "react";
import { Typography, Checkbox, Avatar } from "@mui/material";
import Box from "@mui/material/Box";

type AvatarCheckboxProps = {
  checked: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  avatar: string;
  header: string;
  subHeader: string;
  features: {
    label: string;
    active: boolean;
  }[];
};

export const AvatarCheckbox = ({
  checked,
  onChange,
  avatar,
  header,
  subHeader,
  features,
}: AvatarCheckboxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "4px",
        alignItems: "center",
      }}
    >
      <Checkbox
        color="corp"
        size="small"
        checked={checked}
        onChange={onChange}
      />
      <Avatar src={avatar} sx={{ width: "30px", height: "30px" }} />
      <Box>
        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
          })}
        >
          {header}
        </Typography>
        <Typography
          component="p"
          variant="Reg_12"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
          })}
        >
          {subHeader}
        </Typography>
        <Box
          sx={{
            display: "flex",
          }}
        >
          {features.map((item, index) => (
            <Typography
              component="span"
              variant="Reg_12"
              style={{
                "--color": item.active
                  ? "var(--mui-palette-Corp_1)"
                  : "var(--mui-palette-Grey_2)",
              }}
              sx={{
                color: "var(--color)",
              }}
              key={item.label}
            >
              {index > 0 ? ", " : null}
              {item.label}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
