import { injected } from "brandi";

import type {
  GetUserByHash,
  SendPhone,
  SetUserPhone,
  SetUserRole,
} from "./phone.private-tokens";

import { phonePrivateTokens } from "./phone.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";
import type { AppService } from "~/shared/container/container.service";

import { PhoneMapper } from "./phone.mapper";

export type PhoneData = {
  userPhone: string;
};

export type SubmitPhoneResult =
  | { type: "moderation" }
  | { type: "sms"; ttl: number; smsType: string }
  | { type: "error" };

export class PhoneService {
  constructor(
    private readonly getUserByHash: GetUserByHash,
    private readonly sendPhone: SendPhone,
    private readonly setUserPhone: SetUserPhone,
    private readonly setUserRole: SetUserRole,
    private readonly appService: AppService,
  ) {}

  async loadPhone(hash: string): Promise<PhoneData> {
    // const userData = await this.getUserByHash(this.appService.getToken(), hash);
    const userData = await this.getUserByHash("token", hash);

    if ("error" in userData) {
      throw new Error(userData.error);
    }

    this.setUserRole(userData.result.role);

    return {
      userPhone: PhoneMapper.mapUserPhone(userData),
    };
  }

  async submitPhone(phone: string): Promise<SubmitPhoneResult> {
    this.setUserPhone(phone);

    const data = await this.sendPhone(phone);

    if (data.result.type === "moderation") {
      return { type: "moderation" };
    }

    if (data.status === "error") {
      return {
        type: "sms",
        ttl: data.result.code.ttl,
        smsType: data.result.type,
      };
    }

    if (data.result.code.status === "success") {
      return {
        type: "sms",
        ttl: data.result.code.ttl,
        smsType: data.result.type,
      };
    }

    return { type: "error" };
  }
}

injected(
  PhoneService,
  phonePrivateTokens.getUserByHash,
  phonePrivateTokens.sendPhone,
  phonePrivateTokens.setUserPhone,
  phonePrivateTokens.setUserRole,
  appTokens.appService,
);
