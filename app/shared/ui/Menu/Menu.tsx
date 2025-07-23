import { CSSProperties, forwardRef, JSX } from "react";
import { NavLink, useLocation } from "react-router";
import { withLocale } from "~/shared/withLocale";
import Box from "@mui/material/Box";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

type MenuProps = {
  style?: CSSProperties;
  links: {
    to: string;
    notification: boolean;
    disabled: boolean;
    icon: JSX.Element;
  }[];
};

const rootMatchExeptions = ["missions", "requests", "tasks"];

const checkIfRootMatchExeption = (location: string, to: string) => {
  let isRootMatchExeption = false;

  if (location.includes(to)) {
    for (let i = 0; i < rootMatchExeptions.length; i++) {
      if (location.includes(rootMatchExeptions[i])) {
        isRootMatchExeption = true;
        break;
      }
    }
  }

  return isRootMatchExeption;
};

export const Menu = ({ style, links }: MenuProps) => {
  const location = useLocation();

  return (
    <BottomNavigation
      sx={(theme) => ({
        height: "54px",
        boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.04)",
        backgroundColor: theme.vars.palette["White"],
      })}
      style={style}
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
                // end={item.to === "/" ? true : false}
                ref={ref}
                to={withLocale(item.to)}
                style={({ isActive }) => ({
                  transition: "0.3s",
                  color:
                    isActive ||
                    checkIfRootMatchExeption(location.pathname, item.to)
                      ? "var(--mui-palette-Corp_1)"
                      : "var(--mui-palette-Grey_2)",
                  borderColor:
                    isActive ||
                    checkIfRootMatchExeption(location.pathname, item.to)
                      ? "var(--mui-palette-Corp_1)"
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
                      sx={(theme) => ({
                        position: "absolute",
                        top: "-5px",
                        right: 0,
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: theme.vars.palette["Corp_1"],
                      })}
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
