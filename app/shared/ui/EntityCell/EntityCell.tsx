import { Link } from "react-router";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";

import { CalendarIcon } from "~/shared/icons/CalendarIcon";

import { format } from "date-fns";

type EntityCellProps = {
  id: string;
  to?: string;
  isActive?: boolean;
  logo: string;
  name: string;
  address: string;
};

export const EntityCell = (props: EntityCellProps) => (
  <>
    <Box
      style={{
        padding: "10px 18px",

        ...(props.isActive === true && {
          background: "rgb(251, 241, 248)",
          borderLeft: `3px solid var(--mui-palette-Corp_1)`,
        }),
      }}
    >
      <Box>
        <Box
          component={props.to ? Link : "div"}
          to={props.to}
          sx={{
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              columnGap: "4px",
              alignItems: "center",
            }}
          >
            <img
              style={{
                display: "block",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                marginTop: "10px",
                marginBottom: "10px",
                objectFit: "cover",
              }}
              src={props.logo}
              alt={props.logo}
            />

            <Box
              sx={(theme) => ({
                display: "flex",
                overflow: "hidden",
                columnGap: "4px",
                color: theme.vars.palette["Black"],
              })}
            >
              <Typography
                component="p"
                variant="Bold_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
                style={{
                  // truncate
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {props.name}
              </Typography>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_1"],
                })}
                style={{
                  // truncate
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {props.address}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    <Divider />
  </>
);
