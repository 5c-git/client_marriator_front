import { Container } from "brandi";

import { settingsModule } from "~/routes/profile/settings/settings.module";
import { settingsTokens } from "~/routes/profile/settings/settings.tokens";

export const appContainer = new Container();

appContainer
  .use(settingsTokens.settingsService)
  .from(settingsModule);
