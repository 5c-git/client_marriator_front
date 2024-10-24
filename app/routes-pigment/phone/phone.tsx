import { Button } from "@mui/material";
import Box from "@mui/material-pigment-css/Box";

export default function Phone() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "red",
        }}
      >
        <Button variant="contained">button</Button>
        <p>this is test</p>
      </Box>
      <Button>test</Button>
    </>
  );
}
