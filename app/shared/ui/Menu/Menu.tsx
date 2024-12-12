import { forwardRef } from "react";
import { NavLink } from "react-router";
import { withLocale } from "~/shared/withLocale";
import {
  Theme,
  SxProps,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";

type MenuProps = {
  styles?: SxProps<Theme>;
  links: {
    to: string;
    notification: boolean;
    disabled: boolean;
    icon: JSX.Element;
  }[];
};

export const Menu = ({ styles, links }: MenuProps) => {
  const theme = useTheme();

  return (
    <BottomNavigation
      sx={{
        height: "54px",
        boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.04)",
        backgroundColor: theme.palette["White"],
        ...(styles && styles),
      }}
    >
      {links.map((item, index) => (
        <BottomNavigationAction
          key={index}
          disabled={item.disabled}
          component={forwardRef<
            HTMLAnchorElement,
            {
              children: null;
            }
          >(function MenuItem(props, ref) {
            return (
              <NavLink
                viewTransition
                end={item.to === "/" ? true : false}
                ref={ref}
                to={withLocale(item.to)}
                style={({ isActive }) => ({
                  transition: "0.3s",
                  color: isActive
                    ? theme.palette["Corp_1"]
                    : theme.palette["Grey_2"],
                  borderColor: isActive
                    ? theme.palette["Corp_1"]
                    : "transparent",
                })}
                {...props}
              >
                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                    borderColor: "inherit",
                  }}
                >
                  {item.notification ? (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-5px",
                        right: 0,
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: theme.palette["Corp_1"],
                      }}
                    ></Box>
                  ) : null}

                  {item.icon}
                </Box>

                {props.children}
              </NavLink>
            );
          })}
          sx={{
            opacity: item.disabled ? 0.3 : 1,
          }}
        />
      ))}
    </BottomNavigation>
  );
};
