import { Button, TextField, Typography } from "@mui/material";

// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";

export default function Pigment() {
  return (
    <div>
      <p>this is test</p>
      <Typography
        component="p"
        sx={{
          color: "red",
        }}
      >
        text is red
      </Typography>
      <TextField defaultValue={"test"} label={"this is label"} />{" "}
      <Button variant="outlined">button</Button>
    </div>
  );
}
