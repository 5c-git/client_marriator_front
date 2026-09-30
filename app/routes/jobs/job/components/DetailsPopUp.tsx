import { Typography, IconButton, Dialog } from "@mui/material";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";

type StyledPhotoCheckboxProps = {
  details: {
    text: string;
    details: string;
    img: string;
  } | null;
  onClose: (details: StyledPhotoCheckboxProps["details"]) => void;
};

export const DetailsPopUp = (props: StyledPhotoCheckboxProps) => (
  <Dialog
    open={props.details !== null ? true : false}
    onClose={() => {
      props.onClose(props.details);
    }}
    sx={{
      "& .MuiPaper-root": {
        marginRight: "16px",
        marginLeft: "16px",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      },
    }}
  >
    <Box>
      <Box
        sx={{
          position: "relative",
          marginBottom: "16px",
          height: "176px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <IconButton
          sx={(theme) => ({
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "18px",
            height: "18px",
            backgroundColor: theme.vars.palette["Grey_3"],
          })}
          onClick={() => {
            props.onClose(props.details);
          }}
        >
          <CloseIcon
            sx={(theme) => ({
              width: "14px",
              height: "14px",
              color: theme.vars.palette["White"],
            })}
          />
        </IconButton>

        <img
          src={props.details?.img}
          alt="checkbox banner"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          rowGap: "8px",
          padding: "16px",
          paddingBottom: "32px",
        }}
      >
        <Typography
          component="p"
          variant="Bold_18"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
          })}
        >
          {props.details?.text}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
          })}
        >
          {props.details?.details}
        </Typography>
      </Box>
    </Box>
  </Dialog>
);
