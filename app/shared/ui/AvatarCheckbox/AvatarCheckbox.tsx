import { ChangeEvent } from "react";
import { useTheme, Box, Typography, Checkbox, Avatar } from "@mui/material";

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
  const theme = useTheme();

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
          sx={{
            color: theme.palette["Black"],
          }}
        >
          {header}
        </Typography>
        <Box>
          {features.map((item, index) => (
            <Typography
              component="span"
              variant="Reg_12"
              sx={{
                color: item.active
                  ? theme.palette["Corp_1"]
                  : theme.palette["Grey_2"],
              }}
              key={item.label}
            >
              {index > 0 ? (
                <Typography
                  component="span"
                  sx={{
                    color: theme.palette["Grey_2"],
                  }}
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
