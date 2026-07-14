import { Box, Button, ToggleButtonGroup, ToggleButton } from "@mui/material";

import { StyledSelect } from "../StyledSelect/StyledSelect";
import { StyledSearchBar } from "../StyledSearchBar/StyledSearchBar";

type DashboardControlPanelProps = {};

export function DashboardControlPanel(props: DashboardControlPanelProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <StyledSelect
            inputType="select"
            name="staus"
            placeholder="Статус"
            value="test(0)"
            onChange={() => {}}
            onImmediateChange={() => {}}
            options={[
              {
                value: "work",
                label: "В работе(6)",
                disabled: false,
              },
              {
                value: "cancel",
                label: "Отменено(24)",
                disabled: false,
              },
            ]}
            style={{
              flexGrow: 0.5,
            }}
          />
          <StyledSearchBar
            name="searchbar"
            value=""
            placeholder="Поиск по адресу, коду..."
            onChange={() => {}}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Button variant="outlined">По возрастанию</Button>
          <ToggleButtonGroup
            color="primary"
            value={"web"}
            exclusive
            onChange={() => {}}
            aria-label="Platform"
          >
            <ToggleButton value="web">Web</ToggleButton>
            <ToggleButton value="android">Android</ToggleButton>
            <ToggleButton value="ios">iOS</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
}
