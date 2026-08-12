import { ComponentPropsWithoutRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";

import { Box, Button, SwipeableDrawer } from "@mui/material";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";

type RadioDrawerProps = {
  translation: "responsible" | "responsible-task";
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  items: ComponentPropsWithoutRef<typeof StyledRadioButton>["options"];
};

export function RadioSearchableDrawer(props: RadioDrawerProps) {
  const { t } = useTranslation("RadioSearchableDrawer");

  const [selectedItems, setSelectedItems] = useState<typeof props.items>(
    props.items,
  );

  const {
    control,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    searchbar: string;
    selectedItem: string;
  }>({
    defaultValues: {
      searchbar: "",
      selectedItem: "",
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        selectedItem: z.string({ error: t(`${props.translation}.error`) }),
      }),
    ),
  });

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
          maxWidth: "768px",
          margin: "0 auto",
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
          const selectedItem = getValues("selectedItem");

          props.onSubmit(selectedItem);
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
                    `${evt.target.value}`,
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
            name="selectedItem"
            control={control}
            render={({ field }) => (
              <StyledRadioButton
                inputType="radio"
                validation="none"
                onImmediateChange={() => {}}
                options={selectedItems}
                error={errors.selectedItem?.message}
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
              position: "absolute",
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
