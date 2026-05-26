import { token } from "brandi";

import type { getDocumentConclude } from "~/api/_personal/_documents/getDocumentConclude/getDocumentConclude";
import type { postSetConclude } from "~/api/_personal/_documents/postSetConclude/postSetConclude";

export type GetDocumentConclude = typeof getDocumentConclude;
export type PostSetConclude = typeof postSetConclude;

export const signADealPrivateTokens = {
  getDocumentConclude: token<GetDocumentConclude>(
    "documents-sign-a-deal-private:getDocumentConclude",
  ),
  postSetConclude: token<PostSetConclude>(
    "documents-sign-a-deal-private:postSetConclude",
  ),
};

