import { Container } from "brandi";

import { getDocumentArchive } from "~/api/_personal/_documents/getDocumentArchive/getDocumentArchive";
import { getSignedDocument } from "~/api/_personal/getSignedDocument/getSignedDocument";

import { ArchiveService } from "./archive.service";
import { archivePrivateTokens } from "./archive.private-tokens";
import { archiveTokens } from "./archive.tokens";

import { appContainer } from "~/shared/container/container";

export const archiveContainer = new Container().extend(appContainer);


archiveContainer
  .bind(archivePrivateTokens.getDocumentArchive)
  .toConstant(getDocumentArchive);
archiveContainer
  .bind(archivePrivateTokens.getSignedDocument)
  .toConstant(getSignedDocument);

archiveContainer
  .bind(archiveTokens.archiveService)
  .toInstance(ArchiveService)
  .inSingletonScope();

