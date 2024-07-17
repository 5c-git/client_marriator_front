import { forwardRef } from "react";
import { NavLink, useLocation } from "@remix-run/react";
import {
  Theme,
  SxProps,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";

import i18next from "i18next";

type MenuProps = {
  styles?: SxProps<Theme>;
  links: {
    to: string;
    match: string;
    notification: boolean;
    disabled: boolean;
    icon: JSX.Element;
  }[];
};

const withLocale = (to: string): string => {
  const activeLocale = i18next.language;

  if (activeLocale !== "ru") {
    return `${activeLocale}${to}`;
  }

  return to;
};

const isActive = (path: string, match: string): boolean => {
  const isLocale = path.length === 4 ? path.slice(1, 3) : path.slice(1);

  if (isLocale.length === 0 && match === "index") {
    return true;
  } else if (i18next.languages.includes(isLocale) && match === "index") {
    return true;
  } else if (path.includes(match)) {
    return true;
  }

  return false;
};

export const Menu = ({ styles, links }: MenuProps) => {
  const theme = useTheme();
  const location = useLocation();

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
                ref={ref}
                to={withLocale(item.to)}
                style={() => ({
                  color: isActive(location.pathname, item.match)
                    ? theme.palette["Corp_1"]
                    : theme.palette["Grey_2"],
                  borderColor: isActive(location.pathname, item.match)
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
