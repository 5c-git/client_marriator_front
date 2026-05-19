import { redirect } from "react-router";
import type { Route } from "./+types/meta";

import { withLocale } from "~/shared/withLocale";

import { Loader } from "~/shared/ui/Loader/Loader";

import { MetaView } from "./_views/MetaView";
import { metaContainer } from "./meta.module";
import { metaTokens } from "./meta.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";
import { useMetaHooks } from "./meta.hooks";

export async function clientLoader() {
  const metaService = metaContainer.get(metaTokens.metaService);

  return metaService.loadMeta();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const metaService = metaContainer.get(metaTokens.metaService);

  if (_action === "deleteLocation") {
    await metaService.deleteLocation(fields.placeId);
  } else if (_action === "saveLogo") {
    await metaService.saveLogo(fields.logo);
  } else if (_action === "finishRegister") {
    await metaService.finishRegister(fields.name);
    throw redirect(withLocale("/signin/client/registration-complete"));
  }
}

export default function Meta({ loaderData }: Route.ComponentProps) {
  const { isLoading, navigateTo } = useAppHooks();
  const { setFio, deleteLocation, saveLogo, finishRegister } = useMetaHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <MetaView
        translation="meta"
        loaderData={loaderData}
        navigateToLocationAction={() => {
          navigateTo("/signin/client/location");
        }}
        setFioAction={setFio}
        deleteLocationAction={deleteLocation}
        saveLogoAction={saveLogo}
        finishRegisterAction={finishRegister}
      />
    </>
  );
}
