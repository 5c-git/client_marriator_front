import { Controller } from "react-hook-form";

import type { useSelectProjectsHooks } from "../selectProjects.hooks";
import type { SelectProjectsLoaderData } from "../selectProjects.service";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

type SelectProjectsViewProps = {
  loaderData: SelectProjectsLoaderData;
  ui: ReturnType<typeof useSelectProjectsHooks>;
};

export function SelectProjectsView(props: SelectProjectsViewProps) {
  return (
    <>
      {props.ui.isLoading ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: props.ui.t("header"),
            bold: false,
          }}
          backAction={props.ui.onBack}
        />

        <form onSubmit={props.ui.onSubmit}>
          <Box
            sx={{
              position: "relative",
              display: "grid",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Controller
              name="searchbar"
              control={props.ui.form.control}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={props.ui.t("searchbarPlaceholder")}
                  {...field}
                  onChange={(evt) => {
                    props.ui.onSearchChange(evt.target.value, field.onChange);
                  }}
                />
              )}
            />

            <Controller
              name="projects"
              control={props.ui.form.control}
              render={({ field }) => (
                <StyledCheckboxMultiple
                  inputType="checkboxMultiple"
                  onImmediateChange={() => {}}
                  options={props.ui.selectedProjects}
                  {...field}
                />
              )}
            />

            <Box
              sx={(theme) => ({
                display: "flex",
                columnGap: "14px",
                padding: "10px",
                backgroundColor: theme.vars.palette["White"],
                position: "fixed",
                zIndex: 1,
                width: "100%",
                bottom: "0",
                left: "0",
              })}
            >
              <Button type="button" onClick={props.ui.onReset}>
                {props.ui.t("cancelButton")}
              </Button>
              <Button type="submit" variant="contained">
                {props.ui.t("selectButton")}{" "}
                {props.ui.form.watch("projects").length > 0
                  ? ` ${props.ui.form.getValues("projects").length}`
                  : null}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
