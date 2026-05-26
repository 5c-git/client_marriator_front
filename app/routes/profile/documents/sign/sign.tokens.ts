import { token } from "brandi";

import { SignService } from "./sign.service";

export const signTokens = {
  signService: token<SignService>("documents:SignService"),
};

