import type { GetModerationSingleClientSuccess } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClientSuccess.schema";
import type { GetCounterpartySuccess } from "~/api/_personal/_moderation/getCounterparty/getCounterpartySuccess.schema";

import type { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";


type ClientStatusCode = 1 | 2 | 3;

export type ClientLoaderData = {
  client: {
    id: number;
    logo: string | null;
    phone: string;
    name: string;
    counterparty: { id: number; name: string }[];
    organizations: { id: number; logo: string; name: string }[];
    locations: { id: number; logo: string; address: string }[];
    change_order: string | null;
    cancel_order: string | null;
    live_order: string | null;
    confirmRegister: boolean;
    status: ClientStatusCode;
  };
  counterparty: React.ComponentPropsWithoutRef<
    typeof CheckboxSearchableDrawer
  >["items"];
};

export class ClientMapper {

    static mapCounterparty(data: GetCounterpartySuccess): ClientLoaderData["counterparty"] {
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

    static mapStatus(data: GetModerationSingleClientSuccess) {
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

}