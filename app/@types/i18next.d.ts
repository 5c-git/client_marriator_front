import IndexRU from "../routes/_index/locales/ru.json";
import RootErrorBoundryRU from "../routes/rootErrorBoundry/locales/ru.json";

import PhoneRU from "../routes/signin/phone/locales/ru.json";
import SmsRU from "../routes/signin/sms/locales/ru.json";
import PinRU from "../routes/signin/pin/locales/ru.json";
import CreatePinRU from "../routes/signin/createPin/locales/ru.json";

import "i18next";
declare module "i18next" {
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translation: {
        Index: typeof IndexRU;
        RootErrorBoundry: typeof RootErrorBoundryRU;
        Phone: typeof PhoneRU;
        Sms: typeof SmsRU;
        Pin: typeof PinRU;
        CreatePin: typeof CreatePinRU;
      };
    };
  }
}
