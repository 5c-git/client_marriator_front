import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type {
  FetchUserRequests,
  SaveSelectedRequests,
} from "./requests.private-tokens";

import { requestsPrivateTokens } from "./requests.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";
import { RequestsMapper } from "./requsets.mapper";

export class RequestsService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchRequests: FetchUserRequests,
    private readonly saveRequests: SaveSelectedRequests,
  ) {}

  async getUserCompanies() {
    const token = this.appService.getToken();

    const data = await this.fetchRequests(token);

    return RequestsMapper.mapCompaniesToOptions(data);
  }

  async saveSelectedCompanies(value: number[]) {
    return await this.saveRequests(this.appService.getToken(), value);
  }
}

injected(
  RequestsService,
  appTokens.appService,
  requestsPrivateTokens.fetchUserRequests,
  requestsPrivateTokens.saveSelectedRequests,
);
