import { token } from "brandi";

import type { getDocumentTerminate } from "~/api/_personal/_documents/getDocumentTerminate/getDocumentTerminate";
import type { postSetTerminate } from "~/api/_personal/_documents/postSetTerminate/postSetTerminate";

export type GetDocumentTerminate = typeof getDocumentTerminate;
export type PostSetTerminate = typeof postSetTerminate;

export const terminateADealPrivateTokens = {
  getDocumentTerminate: token<GetDocumentTerminate>(
    "documents-terminate-a-deal-private:getDocumentTerminate",
  ),
  postSetTerminate: token<PostSetTerminate>(
    "documents-terminate-a-deal-private:postSetTerminate",
  ),
};

