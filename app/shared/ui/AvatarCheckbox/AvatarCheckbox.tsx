import { ChangeEvent } from "react";
import { Typography, Checkbox, Avatar } from "@mui/material";
import Box from "@mui/material/Box";

type AvatarCheckboxProps = {
  checked: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  avatar: string;
  header: string;
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
  features,
}: AvatarCheckboxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "10px",
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
        <Box>
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
              {index > 0 ? (
                <Typography
                  component="span"
                  sx={(theme) => ({
                    color: theme.vars.palette["Grey_2"],
                  })}
                >
                  ,{" "}
                </Typography>
              ) : null}
              {item.label}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
