import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type {
  ProjectOption,
  SelectProjectsLoaderData,
} from "../selectProjects.service";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

type SelectProjectsViewProps = {
  data: SelectProjectsLoaderData;
  onBack: () => void;
  onSubmit: (values: string[]) => void;
};

export function SelectProjectsView(props: SelectProjectsViewProps) {
  const { t } = useTranslation("m_users_selectProjects");
  const [selectedProjects, setSelectedProjects] = useState(props.data.projects);

  const form = useForm({
    defaultValues: {
      searchbar: "",
      projects: props.data.selectedProjects,
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        projects: z.array(z.string()).min(1),
      }),
    ),
    mode: "onChange",
  });

  return (
    <Box>
      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={props.onBack}
      />

      <form
        onSubmit={form.handleSubmit((values) => {
          props.onSubmit(values.projects);
        })}
      >
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
            control={form.control}
            render={({ field }) => (
              <StyledSearchBar
                placeholder={t("searchbarPlaceholder")}
                {...field}
                onChange={(evt) => {
                  const currentFieldValue = new RegExp(
                    `${evt.target.value}`,
                    "i",
                  );
                  let matchingProjects: ProjectOption[] = [];

                  if (evt.target.value !== "") {
                    matchingProjects = [
                      ...props.data.projects.filter((item) =>
                        currentFieldValue.test(item.label),
                      ),
                    ];
                  } else {
                    matchingProjects = [...props.data.projects];
                  }

                  setSelectedProjects(matchingProjects);
                  field.onChange(evt);
                }}
              />
            )}
          />

          <Controller
            name="projects"
            control={form.control}
            render={({ field }) => (
              <StyledCheckboxMultiple
                inputType="checkboxMultiple"
                onImmediateChange={() => {}}
                options={selectedProjects}
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
            <Button
              type="button"
              onClick={() => {
                form.reset();
                setSelectedProjects(props.data.projects);
              }}
            >
              {t("cancelButton")}
            </Button>
            <Button type="submit" variant="contained">
              {t("selectButton")}{" "}
              {form.watch("projects").length > 0
                ? ` ${form.getValues("projects").length}`
                : null}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
