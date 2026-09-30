import { Outlet } from "react-router";

import { Box } from "@mui/material";

export default function RegistrationLayout() {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background:
            "linear-gradient(161deg, #FF9878 -82.96%, #C7329B 8.6%, #8A2DB5 100.16%)",
          justifyContent: "center",
          display: "flex",
          columnGap: "120px",
          padding: "30px",
          paddingLeft: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            backgroundColor: "white",
            borderRadius: "5px",
            flex: 1,
            width: "100%",
            maxWidth: "768px",
            height: "95vh",
            margin: "0 auto",
            overflow: "auto",
          }}
        >
          {" "}
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
