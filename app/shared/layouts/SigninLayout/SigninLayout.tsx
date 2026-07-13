import { Outlet } from "react-router";

import { Box } from "@mui/material";

import { Background } from "./_components/Background/Background";

export default function SigninLayout() {
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
        <Background />
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "25px",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
