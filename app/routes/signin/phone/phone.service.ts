import { injected } from "brandi";

import type { SendPhone, RememberPhone } from "./phone.private-tokens";

import { phonePrivateTokens } from "./phone.private-tokens";

export class PhoneService {
    constructor(
        private readonly sendPhone: SendPhone,
        private readonly rememberPhone: RememberPhone,
    ) {}

    async authPhone(phone: string) {
        return await this.sendPhone(phone)
    }

    saveUserPhoneToStore(phone: string) {
        this.rememberPhone(phone)
    }
}

injected(
    PhoneService,
    phonePrivateTokens.sendPhone,
    phonePrivateTokens.rememberPhone
)