import { ComponentPropsWithoutRef } from "react";

import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import type { submitValues } from "./ActivityFormMobileView/ActivityFormMobileView";

export type ActivityMobileViewInterface = {
  translation: "activity";
  locationsTranslation: ComponentPropsWithoutRef<
    typeof CheckboxSearchableDrawer
  >["translation"];
  logo: string;
  entity: {
    id: string;
    name: string;
    amount: string;
    dateStart: Date | null;
    dateEnd: Date | null;
    needDays: boolean;
    needPhoto: boolean;
    days: {
      timeStart: Date;
      timeEnd: Date;
      needRoute: boolean;
      locations: { id: string; name: string; logo: string }[];
    }[];
  };
  activities: {
    value: string;
    label: string;
    needRoute: boolean;
    disabled: boolean;
  }[];
  locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[];
  defaultTimeRange: {
    start: Date;
    end: Date;
  };
  projectTimeRange: {
    start: Date;
    end: Date;
  };
  headerBackAction: () => void;
  headerButtonAction?: () => void;
  cancelAction: () => void;
  submitAction: (values: submitValues) => void;
};
