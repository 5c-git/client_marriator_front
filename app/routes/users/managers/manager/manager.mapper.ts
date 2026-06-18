import type { GetModerationSingleClientSuccess } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClientSuccess.schema";
import type { GetCounterpartySuccess } from "~/api/_personal/_moderation/getCounterparty/getCounterpartySuccess.schema";
import type { GetSupervisorsSuccess } from "~/api/_personal/_moderation/getSupervisors/getSupervisorsSuccess.schema";
import type { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";
import { State } from "~/store/store";

type ManagerStatusCode = 1 | 2 | 3;

export type ManagerData = {
  client: {
    id: number;
    logo: string | null;
    phone: string;
    name: string;
    counterparty: { id: number; name: string }[];
    organizations: { id: number; logo: string; name: string }[];
    locations: { id: number; logo: string; address: string }[];
    change_task: string | null;
    cancel_task: string | null;
    live_task: string | null;
    repeat_bid: string | null;
    leave_bid: string | null;
    notification_start: string;
    confirmRegister: boolean;
    status: ManagerStatusCode;
    userRole: State["userRole"];
  };
  counterparty: React.ComponentPropsWithoutRef<
    typeof CheckboxSearchableDrawer
  >["items"];
  supervisorsToSelect: {
    value: string;
    label: string;
    disabled: boolean;
  }[];
  organizationsToSelect: {
    id: number;
    value: string;
    label: string;
    disabled: boolean;
    image: string;
  }[];
  currentSupervisors: {
    id: number;
    email: string;
    logo: string;
  }[];
};

export class ManagerMapper {
  static mapCounterparty(data: GetCounterpartySuccess) {
    return data.data.map((agent) => ({
      value: agent.id.toString(),
      label: agent.name,
      disabled: false,
    }));
  }

  static mapCurrentCounterparty(data: GetModerationSingleClientSuccess) {
    return data.data.counterparty.map((party) => ({
      id: party.id,
      name: party.name,
    }));
  }

  static mapOrganizations(data: GetModerationSingleClientSuccess) {
    return data.data.project.map((org) => ({
      id: org.id,
      logo: org.brand[0].logo,
      name: org.name,
    }));
  }

  static mapLocations(data: GetModerationSingleClientSuccess) {
    return data.data.place.map((loc) => ({
      id: loc.id,
      logo: loc.logo,
      address: loc.address_kladr,
    }));
  }

  static mapSupervisorsToSelect(data: GetSupervisorsSuccess) {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: item.email,
      disabled: false,
    }));
  }

  static mapStatus(data: GetModerationSingleClientSuccess): ManagerStatusCode {
    if (
      data.data.confirmRegister === false &&
      data.data.finishRegister === true
    ) {
      return 1;
    }
    if (
      data.data.confirmRegister === true &&
      data.data.finishRegister === true
    ) {
      return 2;
    }
    return 3;
  }

  static mapRadioButtons = (
    list: { id: number; name: string; logo: string }[],
  ) => {
    return list.map((item) => ({
      id: item.id,
      value: item.logo,
      label: item.name,
      disabled: false,
      image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
    }));
  };

  static formatHHmm(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hh = hours >= 10 ? String(hours) : `0${hours}`;
    const mm = minutes >= 10 ? String(minutes) : `0${minutes}`;
    return `${hh}:${mm}`;
  }
}
