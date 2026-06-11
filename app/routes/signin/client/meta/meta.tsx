import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/meta";

import { withLocale } from "~/shared/withLocale";

import { MetaView } from "./_views/MetaView";
import { metaContainer } from "./meta.module";
import { metaTokens } from "./meta.tokens";
import { useMetaHooks } from "./meta.hooks";

export const META_ACTIONS = {
  deleteLocation: "deleteLocation",
  saveLogo: "saveLogo",
  finishRegister: "finishRegister",
};

export async function clientLoader() {
  const metaService = metaContainer.get(metaTokens.metaService);

  return metaService.loadMeta();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const metaService = metaContainer.get(metaTokens.metaService);

  if (_action === META_ACTIONS.deleteLocation) {
    await metaService.deleteLocation(fields.placeId);
  } else if (_action === META_ACTIONS.saveLogo) {
    await metaService.saveLogo(fields.logo);
  } else if (_action === META_ACTIONS.finishRegister) {
    await metaService.finishRegister(fields.name);
    throw redirect(withLocale("/signin/client/registration-complete"));
  }
}

export default function Meta({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { setFio, deleteLocation, saveLogo, finishRegister } = useMetaHooks();

  return (
    <MetaView
      data={loaderData}
      navigateToLocationAction={() => {
        navigate(withLocale("/signin/client/location"));
      }}
      setFioAction={setFio}
      deleteLocationAction={deleteLocation}
      saveLogoAction={saveLogo}
      finishRegisterAction={finishRegister}
    />
  );
}
