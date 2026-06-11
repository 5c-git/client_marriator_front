//meta DONE
import constructorFields from "../../public/locales/ru/constructorFields.json";
import rootErrorBoundry from "../../public/locales/ru/rootErrorBoundry.json";
//meta

//auth
import m_signin_phone from "../../public/locales/ru/m_signin_phone.json";
import m_signin_sms from "../../public/locales/ru/m_signin_sms.json";
import m_signin_pin from "../../public/locales/ru/pin.json";
import m_signin_createPin from "../../public/locales/ru/m_signin_createPin.json";
import m_signin_confirmRestorePin from "../../public/locales/ru/m_signin_confirmRestorePin.json";
import m_signin_jobs from "../../public/locales/ru/m_signin_jobs.json";
import m_signin_client_phone from "../../public/locales/ru/m_signin_client_phone.json";
import m_signin_client_location from "../../public/locales/ru/m_signin_client_location.json";
import m_signin_client_meta from "../../public/locales/ru/m_signin_client_meta.json";
import m_signin_client_recruiter from "../../public/locales/ru/m_signin_client_recruiter.json";
import m_signin_client_registrationComplete from "../../public/locales/ru/m_signin_client_registrationComplete.json";
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
import MyProfileView from "../../public/locales/ru/MyProfileView.json";
import profileEdit from "../../public/locales/ru/profileEdit.json";

import terminateADeal from "../../public/locales/ru/terminateADeal.json";

import users_client from "../../public/locales/ru/users_client.json";
import users_manager from "../../public/locales/ru/users_manager.json";
import users_supervisor from "../../public/locales/ru/users_supervisor.json";
import users_recruiter from "../../public/locales/ru/users_recruiter.json";
import users_select_projects from "../../public/locales/ru/users_select_projects.json";
import users_select_locations from "../../public/locales/ru/users_select_locations.json";

//internal

//routes
import job from "../../public/locales/ru/job.json";

import BidLayout from "../../public/locales/ru/BidLayout.json";
import bids from "../../public/locales/ru/bids.json";

import task from "../../public/locales/ru/task.json";
import tasks from "../../public/locales/ru/tasks.json";

import order from "../../public/locales/ru/order.json";
import orders from "../../public/locales/ru/orders.json";

import settings from "../../public/locales/ru/settings.json";

import confirmPersonalPhone from "../../public/locales/ru/confirmPersonalPhone.json";
import confirmPersonalEmail from "../../public/locales/ru/confirmPersonalEmail.json";
//routes

//views
import DocumentsView from "../../public/locales/ru/DocumentsView.json";
import UsersLayoutView from "../../public/locales/ru/UsersLayoutView.json";
import SignADealView from "../../public/locales/ru/SignADealView.json";
import SignView from "../../public/locales/ru/SignView.json";
import CertificatesView from "../../public/locales/ru/CertificatesView.json";
import ArchiveView from "../../public/locales/ru/ArchiveView.json";
import WorkRadiusView from "../../public/locales/ru/WorkRadiusView.json";
import ProfileMetaView from "../../public/locales/ru/ProfileMetaView.json";
import BillingEditView from "../../public/locales/ru/BillingEditView.json";
import BillingAddView from "../../public/locales/ru/BillingAddView.json";
import BillingView from "../../public/locales/ru/BillingView.json";
import UserActivitiesView from "../../public/locales/ru/UserActivitiesView.json";

import SettingsView from "../../public/locales/ru/SettingsView.json";
import ProfileView from "../../public/locales/ru/ProfileView.json";
import UsersMobileView from "../../public/locales/ru/UsersMobileView.json";
import JobMobileView from "../../public/locales/ru/JobMobileView.json";
import DayReviewMobileView from "../../public/locales/ru/DayReviewMobileView.json";
import SpecialistMobileView from "../../public/locales/ru/SpecialistMobileView.json";
import SpecialistsMobileView from "../../public/locales/ru/SpecialistsMobileView.json";
import ServiceMobileView from "../../public/locales/ru/ServiceMobileView.json";
import BidMobileView from "../../public/locales/ru/BidMobileView.json";
import TaskMobileView from "../../public/locales/ru/TaskMobileView.json";
import OrderMobileView from "../../public/locales/ru/OrderMobileView.json";
import EntityMobileView from "../../public/locales/ru/EntityMobileView.json";
import EntitiesListView from "../../public/locales/ru/EntitiesListView.json";
import RequestSearchDrawer from "../../public/locales/ru/RequestSearchDrawer.json";

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
      //meta

      //auth
      m_signin_phone: typeof m_signin_phone;
      m_signin_sms: typeof m_signin_sms;
      m_signin_pin: typeof m_signin_pin;
      m_signin_createPin: typeof m_signin_createPin;
      m_signin_confirmRestorePin: typeof m_signin_confirmRestorePin;
      m_signin_jobs: typeof m_signin_jobs;
      m_signin_client_phone: typeof m_signin_client_phone;
      m_signin_client_location: typeof m_signin_client_location;
      m_signin_client_meta: typeof m_signin_client_meta;
      m_signin_client_recruiter: typeof m_signin_client_recruiter;
      m_signin_client_registrationComplete: typeof m_signin_client_registrationComplete;
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

      profileEdit: typeof profileEdit;

      confirmPersonalPhone: typeof confirmPersonalPhone;
      confirmPersonalEmail: typeof confirmPersonalEmail;

      terminateADeal: typeof terminateADeal;
      documentsArchive: typeof documentsArchive;

      users_clients: typeof users_clients;
      users_client: typeof users_client;
      users_manager: typeof users_manager;
      users_supervisor: typeof users_supervisor;
      users_recruiter: typeof users_recruiter;
      users_select_projects: typeof users_select_projects;
      users_select_locations: typeof users_select_locations;
      //internal

      //routes
      job: typeof job;

      BidLayout: typeof BidLayout;
      bids: typeof bids;

      task: typeof task;
      tasks: typeof tasks;

      order: typeof order;
      orders: typeof orders;

      settings: typeof settings;

      HomeLayout: typeof HomeLayout;

      sms: typeof sms;

      //views
      DocumentsView: typeof DocumentsView;
      UsersLayoutView: typeof UsersLayoutView;
      SignADealView: typeof SignADealView;
      SignView: typeof SignView;
      CertificatesView: typeof CertificatesView;
      ArchiveView: typeof ArchiveView;
      WorkRadiusView: typeof WorkRadiusView;
      ProfileMetaView: typeof ProfileMetaView;
      BillingView: typeof BillingView;
      BillingAddView: typeof BillingAddView;
      BillingEditView: typeof BillingEditView;
      MyProfileView: typeof MyProfileView;
      UserActivitiesView: typeof UserActivitiesView;

      SettingsView: typeof SettingsView;
      ProfileView: typeof ProfileView;
      UsersMobileView: typeof UsersMobileView;
      JobMobileView: typeof JobMobileView;
      DayReviewMobileView: typeof DayReviewMobileView;
      SpecialistMobileView: typeof SpecialistMobileView;
      SpecialistsMobileView: typeof SpecialistsMobileView;
      BidMobileView: typeof BidMobileView;
      TaskMobileView: typeof TaskMobileView;
      OrderMobileView: typeof OrderMobileView;
      EntityMobileView: typeof EntityMobileView;
      EntitiesListView: typeof EntitiesListView;
      ServiceMobileView: typeof ServiceMobileView;
      RequestSearchDrawer: typeof RequestSearchDrawer;

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
