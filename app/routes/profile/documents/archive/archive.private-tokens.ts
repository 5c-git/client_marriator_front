import { token } from "brandi";

import type { getDocumentArchive } from "~/api/_personal/_documents/getDocumentArchive/getDocumentArchive";
import type { getSignedDocument } from "~/api/_personal/getSignedDocument/getSignedDocument";

export type GetDocumentArchive = typeof getDocumentArchive;
export type GetSignedDocument = typeof getSignedDocument;

export const archivePrivateTokens = {
  getDocumentArchive: token<GetDocumentArchive>(
    "documents-archive-private:getDocumentArchive",
  ),
  getSignedDocument: token<GetSignedDocument>(
    "documents-archive-private:getSignedDocument",
  ),
};

