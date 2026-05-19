import { token } from "brandi";

import type { MetaService } from "./meta.service";

export const metaTokens = {
  metaService: token<MetaService>("meta:MetaService"),
};
