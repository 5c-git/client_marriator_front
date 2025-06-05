//meta
import constructorFields from "../../public/locales/ru/constructorFields.json";
import rootErrorBoundry from "../../public/locales/ru/rootErrorBoundry.json";
import offline from "../../public/locales/ru/offline.json";
//meta

//auth
import phone from "../../public/locales/ru/phone.json";
import sms from "../../public/locales/ru/sms.json";
import pin from "../../public/locales/ru/pin.json";
import createPin from "../../public/locales/ru/createPin.json";
import confirmRestorePin from "../../public/locales/ru/confirmRestorePin.json";

import signin_client_phone from "../../public/locales/ru/clientPhone.json";
import signin_client_meta from "../../public/locales/ru/signin_client_meta.json";
import signin_client_location from "../../public/locales/ru/signin_client_location.json";
import signin_client_recruiter from "../../public/locales/ru/signin_client_recruiter.json";
import signin_client_registration_complete from "../../public/locales/ru/signin_client_registration_complete.json";
//auth

//registration
import confirmEmail from "../../public/locales/ru/confirmEmail.json";
import registrationStep1 from "../../public/locales/ru/registrationStep1.json";
import registrationStep2 from "../../public/locales/ru/registrationStep2.json";
import registrationStep3 from "../../public/locales/ru/registrationStep3.json";
import registrationStep4 from "../../public/locales/ru/registrationStep4.json";
import registrationStep5 from "../../public/locales/ru/registrationStep5.json";
import registrationStep6 from "../../public/locales/ru/registrationStep6.json";
import registrationStep7 from "../../public/locales/ru/registrationStep7.json";
import registrationComplete from "../../public/locales/ru/registrationComplete.json";
//registration

//internal
import home from "../../public/locales/ru/home.json";
import profile from "../../public/locales/ru/profile.json";
import myProfile from "../../public/locales/ru/myProfile.json";
import profileEdit from "../../public/locales/ru/profileEdit.json";
import profileMeta from "../../public/locales/ru/profileMeta.json";
import userActivities from "../../public/locales/ru/userActivities.json";
import workRadius from "../../public/locales/ru/workRadius.json";
import confirmPersonalPhone from "../../public/locales/ru/confirmPersonalPhone.json";
import confirmPersonalEmail from "../../public/locales/ru/confirmPersonalEmail.json";
import billing from "../../public/locales/ru/billing.json";
import billingAdd from "../../public/locales/ru/billingAdd.json";
import billingEdit from "../../public/locales/ru/billingEdit.json";
import documents from "../../public/locales/ru/documents.json";
import sign from "../../public/locales/ru/sign.json";
import signADeal from "../../public/locales/ru/signADeal.json";
import terminateADeal from "../../public/locales/ru/terminateADeal.json";
import documentsArchive from "../../public/locales/ru/documentsArchive.json";
import certificates from "../../public/locales/ru/certificates.json";
//internal

//components
import styledPhotoCheckbox from "../../public/locales/ru/styledPhotoCheckbox.json";
import styledFileInput from "../../public/locales/ru/styledFileInput.json";
import styledPhotoInput from "../../public/locales/ru/styledPhotoInput.json";
import styledAutocomplete from "../../public/locales/ru/styledAutocomplete.json";

//dev
import moderationLayout from "../../public/locales/ru/moderationLayout.json";
//dev

import "i18next";
declare module "i18next" {
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      //meta
      constructorFields: typeof constructorFields;
      rootErrorBoundry: typeof rootErrorBoundry;
      offline: typeof offline;
      //meta

      //auth
      phone: typeof phone;
      sms: typeof sms;
      pin: typeof pin;
      createPin: typeof createPin;
      confirmRestorePin: typeof confirmRestorePin;

      signin_client_phone: typeof signin_client_phone;
      signin_client_meta: typeof signin_client_meta;
      signin_client_location: typeof signin_client_location;
      signin_client_recruiter: typeof signin_client_recruiter;
      signin_client_registration_complete: typeof signin_client_registration_complete;
      //auth

      //registration
      confirmEmail: typeof confirmEmail;
      registrationStep1: typeof registrationStep1;
      registrationStep2: typeof registrationStep2;
      registrationStep3: typeof registrationStep3;
      registrationStep4: typeof registrationStep4;
      registrationStep5: typeof registrationStep5;
      registrationStep6: typeof registrationStep6;
      registrationStep7: typeof registrationStep7;
      registrationComplete: typeof registrationComplete;
      //registration

      //internal
      home: typeof home;
      profile: typeof profile;
      myProfile: typeof myProfile;
      profileEdit: typeof profileEdit;
      profileMeta: typeof profileMeta;
      userActivities: typeof userActivities;
      workRadius: typeof workRadius;
      confirmPersonalPhone: typeof confirmPersonalPhone;
      confirmPersonalEmail: typeof confirmPersonalEmail;
      billing: typeof billing;
      billingAdd: typeof billingAdd;
      billingEdit: typeof billingEdit;
      documents: typeof documents;
      sign: typeof sign;
      signADeal: typeof signADeal;
      terminateADeal: typeof terminateADeal;
      documentsArchive: typeof documentsArchive;
      certificates: typeof certificates;
      //internal

      //components
      styledPhotoCheckbox: typeof styledPhotoCheckbox;
      styledFileInput: typeof styledFileInput;
      styledPhotoInput: typeof styledPhotoInput;
      styledAutocomplete: typeof styledAutocomplete;

      //dev
      moderationLayout: typeof moderationLayout;
      //dev
    };
  }
}
