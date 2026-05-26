import { injected } from "brandi";

import type {
  GetDocumentArchive,
  GetSignedDocument,
} from "./archive.private-tokens";
import { archivePrivateTokens } from "./archive.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { AppService } from "~/shared/container/container.service";

export class ArchiveService {
  constructor(
    private readonly appService: AppService,
    private readonly getDocumentArchive: GetDocumentArchive,
    private readonly getSignedDocument: GetSignedDocument,
  ) {}


  async loadArchive() {
    const accessToken = this.appService.getToken();
    const data = await this.getDocumentArchive(accessToken);
    return data.data;
  }

  async getSignedFilePath(documentId: string) {
    const accessToken = this.appService.getToken();
    const signedDocData = await this.getSignedDocument(accessToken, documentId);

    if ("data" in signedDocData) {
      return signedDocData.data.file_path_signed ?? null;
    }

    return null;
  }
}

injected(
  ArchiveService,
  appTokens.appService,
  archivePrivateTokens.getDocumentArchive,
  archivePrivateTokens.getSignedDocument,
);

