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

import signin_client_phone from "../../public/locales/ru/signin_client_phone.json";
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
import HomeLayout from "../../public/locales/ru/HomeLayout.json";
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
import users_clients from "../../public/locales/ru/users_clients.json";
import users_client from "../../public/locales/ru/users_client.json";
import users_manager from "../../public/locales/ru/users_manager.json";
import users_supervisor from "../../public/locales/ru/users_supervisor.json";
import users_recruiter from "../../public/locales/ru/users_recruiter.json";
import users_select_projects from "../../public/locales/ru/users_select_projects.json";
import users_select_locations from "../../public/locales/ru/users_select_locations.json";

import missions from "../../public/locales/ru/missions.json";
import mission from "../../public/locales/ru/mission.json";
import request_specialists_specialistRequest_dayReview from "../../public/locales/ru/request_specialists_specialistRequest_dayReview.json";
//internal

//routes
import BidLayout from "../../public/locales/ru/BidLayout.json";
import bids from "../../public/locales/ru/bids.json";

import task from "../../public/locales/ru/task.json";
import tasks from "../../public/locales/ru/tasks.json";

import order from "../../public/locales/ru/order.json";
import orders from "../../public/locales/ru/orders.json";
//routes

//views
import SpecialistMobileView from "../../public/locales/ru/SpecialistMobileView.json";
import ServiceMobileView from "../../public/locales/ru/ServiceFormMobileView.json";
import BidMobileView from "../../public/locales/ru/BidMobileView.json";
import TaskMobileView from "../../public/locales/ru/TaskMobileView.json";
import OrderMobileView from "../../public/locales/ru/OrderMobileView.json";
import EntityMobileView from "../../public/locales/ru/EntityMobileView.json";
import EntitiesListView from "../../public/locales/ru/EntitiesListView.json";

//components
import styledPhotoCheckbox from "../../public/locales/ru/styledPhotoCheckbox.json";
import styledFileInput from "../../public/locales/ru/styledFileInput.json";
import styledPhotoInput from "../../public/locales/ru/styledPhotoInput.json";
import styledAutocomplete from "../../public/locales/ru/styledAutocomplete.json";
import RadioSearchableDrawer from "../../public/locales/ru/RadioSearchableDrawer.json";
import CheckboxSearchableDrawer from "../../public/locales/ru/CheckboxSearchableDrawer.json";

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
      users_clients: typeof users_clients;
      users_client: typeof users_client;
      users_manager: typeof users_manager;
      users_supervisor: typeof users_supervisor;
      users_recruiter: typeof users_recruiter;
      users_select_projects: typeof users_select_projects;
      users_select_locations: typeof users_select_locations;

      missions: typeof missions;
      mission: typeof mission;

      request_specialists_specialistRequest_dayReview: typeof request_specialists_specialistRequest_dayReview;
      //internal

      BidLayout: typeof BidLayout;
      bids: typeof bids;

      task: typeof task;
      tasks: typeof tasks;

      order: typeof order;
      orders: typeof orders;

      HomeLayout: typeof HomeLayout;
      //routes

      //views
      SpecialistMobileView: typeof SpecialistMobileView;
      BidMobileView: typeof BidMobileView;
      TaskMobileView: typeof TaskMobileView;
      OrderMobileView: typeof OrderMobileView;
      EntityMobileView: typeof EntityMobileView;
      EntitiesListView: typeof EntitiesListView;
      ServiceMobileView: typeof ServiceFormMobileView;

      //components
      styledPhotoCheckbox: typeof styledPhotoCheckbox;
      styledFileInput: typeof styledFileInput;
      styledPhotoInput: typeof styledPhotoInput;
      styledAutocomplete: typeof styledAutocomplete;
      RadioSearchableDrawer: typeof RadioSearchableDrawer;
      CheckboxSearchableDrawer: typeof CheckboxSearchableDrawer;
    };
  }
}
