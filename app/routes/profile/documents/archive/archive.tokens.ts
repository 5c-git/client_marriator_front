import { token } from "brandi";

import { ArchiveService } from "./archive.service";

export const archiveTokens = {
  archiveService: token<ArchiveService>("documents:ArchiveService"),
};

