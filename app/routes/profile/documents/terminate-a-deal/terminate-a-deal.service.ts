import { injected } from "brandi";

import type {
  GetDocumentTerminate,
  PostSetTerminate,
} from "./terminate-a-deal.private-tokens";
import { terminateADealPrivateTokens } from "./terminate-a-deal.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

export class TerminateADealService {
  constructor(
    private readonly appService: AppService,
    private readonly getDocumentTerminate: GetDocumentTerminate,
    private readonly postSetTerminate: PostSetTerminate,
  ) {}

  async loadOrganizations() {
    const accessToken = this.appService.getToken();
    const data = await this.getDocumentTerminate(accessToken);
    return data.result.organization;
  }

  async submitSelection(selected: string[]) {
    const accessToken = this.appService.getToken();
    return await this.postSetTerminate(accessToken, selected);
  }
}

injected(
  TerminateADealService,
  appTokens.appService,
  terminateADealPrivateTokens.getDocumentTerminate,
  terminateADealPrivateTokens.postSetTerminate,
);

