import ConstructorRU from "../shared/constructor/locales/ru.json";
import ConstructorEN from "../shared/constructor/locales/en.json";

import RootErrorBoundryRU from "../routes/rootErrorBoundry/locales/ru.json";
import RootErrorBoundryEN from "../routes/rootErrorBoundry/locales/en.json";

import IndexRU from "../routes/home/locales/ru.json";
import IndexEN from "../routes/home/locales/en.json";

import RegistrationStep1RU from "../routes/registration/step1/locales/ru.json";
import RegistrationStep1EN from "../routes/registration/step1/locales/en.json";

import RegistrationStep2RU from "../routes/registration/step2/locales/ru.json";
import RegistrationStep2EN from "../routes/registration/step2/locales/en.json";

import RegistrationStep3RU from "../routes/registration/step3/locales/ru.json";
import RegistrationStep3EN from "../routes/registration/step3/locales/en.json";

import RegistrationStep4RU from "../routes/registration/step4/locales/ru.json";
import RegistrationStep4EN from "../routes/registration/step4/locales/en.json";

import RegistrationStep5RU from "../routes/registration/step5/locales/ru.json";
import RegistrationStep5EN from "../routes/registration/step5/locales/en.json";

import RegistrationStep6RU from "../routes/registration/step6/locales/ru.json";
import RegistrationStep6EN from "../routes/registration/step6/locales/en.json";

import RegistrationStep7RU from "../routes/registration/step7/locales/ru.json";
import RegistrationStep7EN from "../routes/registration/step7/locales/en.json";

import RegistrationCompleteRU from "../routes/registration-complete/locales/ru.json";
import RegistrationCompleteEN from "../routes/registration-complete/locales/en.json";

import PhoneRU from "../routes/signin/phone/locales/ru.json";
import PhoneEN from "../routes/signin/phone/locales/en.json";

import SmsRU from "../routes/signin/sms/locales/ru.json";
import SmsEN from "../routes/signin/sms/locales/en.json";

import CreatePinRU from "../routes/signin/createPin/locales/ru.json";
import CreatePinEN from "../routes/signin/createPin/locales/en.json";

import PinRU from "../routes/signin/pin/locales/ru.json";
import PinEN from "../routes/signin/pin/locales/en.json";

import ProfileRU from "../routes/profile/locales/ru.json";
import ProfileEN from "../routes/profile/locales/en.json";

import MyProfileRU from "../routes/my-profile/locales/ru.json";
import MyProfileEN from "../routes/my-profile/locales/en.json";

import StyledPhotoCheckboxRU from "../shared/ui/StyledPhotoCheckbox/locales/ru.json";
import StyledPhotoCheckboxEN from "../shared/ui/StyledPhotoCheckbox/locales/en.json";
import StyledFileInputRU from "../shared/ui/StyledFileInput/locales/ru.json";
import StyledFileInputEN from "../shared/ui/StyledFileInput/locales/en.json";
import StyledPhotoInputRU from "../shared/ui/StyledPhotoInput/locales/ru.json";
import StyledPhotoInputEN from "../shared/ui/StyledPhotoInput/locales/en.json";

import StyledAutocompleteRU from "../shared/ui/StyledAutocomplete/locales/ru.json";
import StyledAutocompleteEN from "../shared/ui/StyledAutocomplete/locales/en.json";

// This is the list of languages your application supports
export const supportedLngs = ["ru", "en"];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = "ru";

export const resources = {
  ru: {
    translation: {
      //meta
      Constructor: ConstructorRU,
      RootErrorBoundry: RootErrorBoundryRU,
      //meta

      //auth
      Phone: PhoneRU,
      Sms: SmsRU,
      Pin: PinRU,
      CreatePin: CreatePinRU,
      //auth

      //reg
      RegistrationStep1: RegistrationStep1RU,
      RegistrationStep2: RegistrationStep2RU,
      RegistrationStep3: RegistrationStep3RU,
      RegistrationStep4: RegistrationStep4RU,
      RegistrationStep5: RegistrationStep5RU,
      RegistrationStep6: RegistrationStep6RU,
      RegistrationStep7: RegistrationStep7RU,
      RegistrationComplete: RegistrationCompleteRU,
      //reg

      //internal
      Index: IndexRU,
      Profile: ProfileRU,
      MyProfile: MyProfileRU,

      //components
      StyledPhotoCheckbox: StyledPhotoCheckboxRU,
      StyledFileInput: StyledFileInputRU,
      StyledPhotoInput: StyledPhotoInputRU,
      StyledAutocomplete: StyledAutocompleteRU,
    },
  },
  en: {
    translation: {
      //meta
      Constructor: ConstructorEN,
      RootErrorBoundry: RootErrorBoundryEN,
      //meta

      //auth
      Phone: PhoneEN,
      Sms: SmsEN,
      Pin: PinEN,
      CreatePin: CreatePinEN,
      //auth

      //reg
      RegistrationStep1: RegistrationStep1EN,
      RegistrationStep2: RegistrationStep2EN,
      RegistrationStep3: RegistrationStep3EN,
      RegistrationStep4: RegistrationStep4EN,
      RegistrationStep5: RegistrationStep5EN,
      RegistrationStep6: RegistrationStep6EN,
      RegistrationStep7: RegistrationStep7EN,
      RegistrationComplete: RegistrationCompleteEN,
      //reg

      //internal
      Index: IndexEN,
      Profile: ProfileEN,
      MyProfile: MyProfileEN,

      //components
      StyledPhotoCheckbox: StyledPhotoCheckboxEN,
      StyledFileInput: StyledFileInputEN,
      StyledPhotoInput: StyledPhotoInputEN,
      StyledAutocomplete: StyledAutocompleteEN,
    },
  },
};
