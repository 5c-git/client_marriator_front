import { useTheme, Box, Button, Typography } from "@mui/material";
import { Outlet, useRouteError, useNavigate } from "@remix-run/react";

import { t } from "i18next";

import logoTurnOff from "./logo-turnoff.svg";
import { useEffect } from "react";

export const ErrorBoundary = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const error = useRouteError() as { status: number; data: string };

  useEffect(() => {
    if (error.status === 401) {
      navigate("/signin/phone");
    }
  }, [error.status, navigate]);

  return (
    <>
      {error.status !== 401 ? (
        <Box
          sx={{
            paddingRight: "16px",
            paddingLeft: "16px",
            paddingTop: "60px",
          }}
        >
          <Box
            sx={{
              width: "164px",
              height: "78px",
              margin: "0 auto",
            }}
          >
            <img
              src={logoTurnOff}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              alt="marriator"
            />
          </Box>
          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Black"],
              textAlign: "center",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
          >
            {error.data}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(0);
            }}
          >
            {t("RootErrorBoundry.refresh")}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default function RootErrorBoundry() {
  return <Outlet />;
}
