import { CSSProperties } from "react";
import {
  Divider,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Avatar,
} from "@mui/material";
import Box from "@mui/material/Box";

import type { Coordinates } from "~/shared/ymap/ymap";

type option = {
  value: string;
  name: string;
  icon: string;
  coordinates: Coordinates;
  address: string;
  region: string;
  disabled: boolean;
};

type LocationCheckboxMultipleProps = {
  name: string;
  value: string[];
  options: option[];
  onChange: (values: string[]) => void;
  style?: CSSProperties;
};

export const LocationCheckboxMultiple = (
  props: LocationCheckboxMultipleProps
) => {
  return (
    <Box style={props.style}>
      <FormGroup
        sx={{
          display: "grid",
          rowGap: "14px",
        }}
      >
        {props.options.map((item) => (
          <Box
            key={item.value}
            sx={{
              borderRadius: "6px",
              padding: "10px 14px",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <FormControlLabel
              disabled={item.disabled}
              sx={{
                display: "flex",
                marginLeft: "-6px",
              }}
              control={
                <Checkbox
                  name={props.name}
                  value={item.value}
                  checked={props.value.includes(item.value)}
                  onChange={(evt) => {
                    const _values = [...props.value];

                    if (evt.target.checked) _values.push(evt.target.value);
                    else _values.splice(_values.indexOf(evt.target.value), 1);

                    props.onChange(_values);
                  }}
                  size="small"
                  color="corp"
                  sx={{
                    padding: "4px",
                  }}
                />
              }
              label={
                <Typography
                  component="div"
                  variant="Reg_16"
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    columnGap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: "20px",
                      height: "20px",
                    }}
                    src={item.icon}
                  />
                  {item.name}
                </Typography>
              }
            />
            <Typography
              component="p"
              variant="Reg_12"
              sx={{
                color: "#6E6E6E",
                paddingTop: "4px",
              }}
            >
              {item.region}
            </Typography>

            <Divider
              sx={{
                background: (theme) => theme.vars.palette["Grey_3"],
                marginTop: "8px",
                marginBottom: "8px",
              }}
            />

            <Typography
              component="p"
              variant="Reg_12"
              sx={{
                color: (theme) => theme.vars.palette["Black"],
              }}
            >
              {item.address}
            </Typography>
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
};
