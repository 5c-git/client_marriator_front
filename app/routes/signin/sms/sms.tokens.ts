import { token } from "brandi";

import {SmsService} from "./sms.service";

export const smsTokens = {
  smsService: token<SmsService>("sms:SmsService"),
};
