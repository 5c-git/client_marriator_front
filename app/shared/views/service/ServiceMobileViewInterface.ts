import { ComponentPropsWithoutRef } from "react";

import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

type submitValues = {
  activity: string;
  amount: string;
  dateStart: Date | null;
  dateEnd: Date | null;
  needDays: boolean;
  needFoto: boolean;
  days: {
    timeStart: Date;
    timeEnd: Date;
    needRoute?: boolean;
    locations?: {
      id: string;
      name: string;
      logo?: string;
    }[];
  }[];
};

export type ServiceMobileViewInterface = {
  translation: "service";
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
  headerBackAction: () => void;
  headerButtonAction?: () => void;
  cancelAction: () => void;
  submitAction: (values: submitValues) => void;
};
