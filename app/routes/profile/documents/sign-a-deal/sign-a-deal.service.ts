import { injected } from "brandi";

import type {
  GetDocumentConclude,
  PostSetConclude,
} from "./sign-a-deal.private-tokens";
import { signADealPrivateTokens } from "./sign-a-deal.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

export class SignADealService {
  constructor(
    private readonly appService: AppService,
    private readonly getDocumentConclude: GetDocumentConclude,
    private readonly postSetConclude: PostSetConclude,
  ) {}

  async loadOrganizations() {
    const accessToken = this.appService.getToken();
    const data = await this.getDocumentConclude(accessToken);
    return data.result.organization;
  }

  async submitSelection(selected: string[]) {
    const accessToken = this.appService.getToken();
    return await this.postSetConclude(accessToken, selected);
  }
}

injected(
  SignADealService,
  appTokens.appService,
  signADealPrivateTokens.getDocumentConclude,
  signADealPrivateTokens.postSetConclude,
);

