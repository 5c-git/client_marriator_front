import { ComponentPropsWithoutRef, useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";

import { Box, Button, SwipeableDrawer } from "@mui/material";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

type CheckboxDrawerProps = {
  translation: "address" | "supervisor";
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string[]) => void;
  items: ComponentPropsWithoutRef<typeof StyledCheckboxMultiple>["options"];
};

export function CheckboxSearchableDrawer(props: CheckboxDrawerProps) {
  const { t } = useTranslation("CheckboxSearchableDrawer");

  const [selectedItems, setSelectedItems] = useState<typeof props.items>([]);

  const {
    control,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    searchbar: string;
    selectedItems: string[];
  }>({
    defaultValues: {
      searchbar: "",
      selectedItems: [],
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        selectedItems: z.array(z.string()).min(1),
      }),
    ),
    shouldUnregister: true,
  });

  useEffect(() => {
    setSelectedItems(props.items);
  }, [props.items]);

  return (
    <SwipeableDrawer
      open={props.open}
      onClose={() => {
        reset();
        props.onClose();
      }}
      onOpen={() => {}}
      disableBackdropTransition={true}
      disableSwipeToOpen={true}
      anchor="bottom"
      sx={{
        "& .MuiDrawer-paper": {
          borderRadius: "6px",
        },
      }}
    >
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
          bold: false,
        }}
      />
      <form
        onSubmit={handleSubmit(() => {
          const selectedItems = getValues("selectedItems");

          props.onSubmit(selectedItems);
          reset();
          props.onClose();
        })}
      >
        <Box
          sx={{
            position: "relative",
            display: "grid",
            alignContent: "flex-start",
            rowGap: "14px",
            paddingTop: "20px",
            paddingLeft: "16px",
            paddingRight: "16px",
            height: "85vh",
          }}
        >
          <Controller
            name="searchbar"
            control={control}
            render={({ field }) => (
              <StyledSearchBar
                placeholder={t(`${props.translation}.searchbar`)}
                {...field}
                onChange={(evt) => {
                  const currentFieldValue = new RegExp(
                    `^${evt.target.value}`,
                    "i",
                  );

                  let matchingItems: typeof props.items = [];

                  if (evt.target.value !== "") {
                    matchingItems = [
                      ...props.items.filter((item) =>
                        currentFieldValue.test(item.label),
                      ),
                    ];
                  } else {
                    matchingItems = [...props.items];
                  }

                  setSelectedItems(matchingItems);

                  field.onChange(evt);
                }}
              />
            )}
          />

          <Controller
            name="selectedItems"
            control={control}
            render={({ field }) => (
              <StyledCheckboxMultiple
                inputType="checkboxMultiple"
                onImmediateChange={() => {}}
                options={selectedItems}
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
            <Button type="submit" variant="contained">
              {t(`${props.translation}.submit`)}
            </Button>
          </Box>
        </Box>
      </form>
    </SwipeableDrawer>
  );
}
