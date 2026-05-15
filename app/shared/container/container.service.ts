import { injected } from "brandi";

import type { GetAccessToken } from "./container.private-tokens";
import { appPrivateTokens } from "./container.private-tokens";

export class AppService {
    constructor(        
        private readonly getAccessToken: GetAccessToken
    ) {}

    getToken(): string {
        const token = this.getAccessToken();
        if (!token) {
            throw new Error("Токен авторизации не обнаружен!");
        }
        return token;
    };
}

injected(
    AppService,
    appPrivateTokens.getAccessToken
)