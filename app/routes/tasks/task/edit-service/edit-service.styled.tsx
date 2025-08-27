import {
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

export const S_Accordion = styled(Accordion)(() => ({
  boxShadow: "none",
  "&:before": {
    position: "initial",
  },

  "&.Mui-expanded": {
    margin: 0,
  },
}));

export const S_AccordionSummary = styled(AccordionSummary)((props) => ({
  padding: 0,
  margin: 0,
  minHeight: "unset",
  columnGap: "24px",

  "& .MuiAccordionSummary-content": {
    margin: 0,
    "&.Mui-expanded": {
      margin: 0,
    },
  },
  "&.Mui-expanded": {
    minHeight: "unset",
    paddingBottom: "8px",
    marginBottom: "8px",
    borderBottom: `1px solid ${props.theme.vars.palette["Black"]}`,
  },
}));

export const S_AccordionDetails = styled(AccordionDetails)((props) => ({
  padding: 0,
}));
