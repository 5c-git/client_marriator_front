import { injected } from "brandi";

import type {
  GetUserByHash,
  SendPhone,
  SetUserPhone,
  SetUserRole,
} from "./phone.private-tokens";

import { phonePrivateTokens } from "./phone.private-tokens";
import { PhoneMapper } from "./phone.mapper";

const AUTH_HASH_TOKEN = "authHash";

export type PhoneLoaderData = {
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
  ) {}

  async loadPhone(hash: string): Promise<PhoneLoaderData> {
    const userData = await this.getUserByHash(AUTH_HASH_TOKEN, hash);

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

    if (data.result.code.status !== "errorSend") {
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
);
