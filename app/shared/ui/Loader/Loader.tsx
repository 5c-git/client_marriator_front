import { keyframes, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const Loader = () => (
  <Box
    sx={{
      position: "fixed",
      zIndex: 2,
      top: 0,
      left: 0,
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(17, 17, 17, 0.2)",
      animation: `${fadeIn} 0.4s ease-in-out`,
    }}
  >
    <CircularProgress color="corp" />
  </Box>
);
