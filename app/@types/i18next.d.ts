import ConstructorRU from "../shared/constructor/locales/ru.json";
import IndexRU from "../routes/home/locales/ru.json";
import RootErrorBoundryRU from "../routes/rootErrorBoundry/locales/ru.json";

import RegistrationStep1RU from "../routes/registration/step1/locales/ru.json";
import RegistrationStep2RU from "../routes/registration/step2/locales/ru.json";
import RegistrationStep3RU from "../routes/registration/step3/locales/ru.json";
import RegistrationStep4RU from "../routes/registration/step4/locales/ru.json";
import RegistrationStep5RU from "../routes/registration/step5/locales/ru.json";
import RegistrationStep6RU from "../routes/registration/step6/locales/ru.json";
import RegistrationStep7RU from "../routes/registration/step7/locales/ru.json";

import PhoneRU from "../routes/signin/phone/locales/ru.json";
import SmsRU from "../routes/signin/sms/locales/ru.json";
import PinRU from "../routes/signin/pin/locales/ru.json";
import CreatePinRU from "../routes/signin/createPin/locales/ru.json";
import ProfileRU from "../routes/profile/locales/ru.json";
import MyProfileRU from "../routes/my-profile/locales/ru.json";

import StyledPhotoCheckboxRU from "../shared/ui/StyledPhotoCheckbox/locales/ru.json";
import StyledFileInputRU from "../shared/ui/StyledFileInput/locales/ru.json";
import StyledPhotoInputRU from "../shared/ui/StyledPhotoInput/locales/ru.json";
import StyledAutocompleteRU from "../shared/ui/StyledAutocomplete/locales/ru.json";

import "i18next";
declare module "i18next" {
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translation: {
        //meta
        Constructor: typeof ConstructorRU;
        RootErrorBoundry: typeof RootErrorBoundryRU;
        //meta

        //auth
        Phone: typeof PhoneRU;
        Sms: typeof SmsRU;
        Pin: typeof PinRU;
        CreatePin: typeof CreatePinRU;
        //auth

        //reg
        RegistrationStep1: typeof RegistrationStep1RU;
        RegistrationStep2: typeof RegistrationStep2RU;
        RegistrationStep3: typeof RegistrationStep3RU;
        RegistrationStep4: typeof RegistrationStep4RU;
        RegistrationStep5: typeof RegistrationStep5RU;
        RegistrationStep6: typeof RegistrationStep6RU;
        RegistrationStep7: typeof RegistrationStep7RU;
        //reg

        //internal
        Index: typeof IndexRU;
        Profile: typeof ProfileRU;
        MyProfile: typeof MyProfileRU;

        //components
        StyledPhotoCheckbox: typeof StyledPhotoCheckboxRU;
        StyledFileInput: typeof StyledFileInputRU;
        StyledPhotoInput: typeof StyledPhotoInputRU;
        StyledAutocomplete: typeof StyledAutocompleteRU;
      };
    };
  }
}
