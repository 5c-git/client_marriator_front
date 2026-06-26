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
import m_registration_step1 from "../../public/locales/ru/m_registration_step1.json";
import m_registration_step2 from "../../public/locales/ru/m_registration_step2.json";
import m_registration_step3 from "../../public/locales/ru/m_registration_step3.json";
import m_registration_step4 from "../../public/locales/ru/m_registration_step4.json";
import m_registration_step5 from "../../public/locales/ru/m_registration_step5.json";
import m_registration_step6 from "../../public/locales/ru/m_registration_step6.json";
import m_registration_confirmEmail from "../../public/locales/ru/m_registration_confirmEmail.json";
import m_registration_registrationComplete from "../../public/locales/ru/m_registration_registrationComplete.json";
//registration

//profile
import m_profile from "../../public/locales/ru/m_profile.json";
import m_profile_myProfile from "../../public/locales/ru/m_profile_myProfile.json";
import m_profile_myProfile_billing from "../../public/locales/ru/m_profile_myProfile_billing.json";
import m_profile_myProfile_billing_billingAdd from "../../public/locales/ru/m_profile_myProfile_billing_billingAdd.json";
import m_profile_myProfile_billing_billingEdit from "../../public/locales/ru/m_profile_myProfile_billing_billingEdit.json";
import m_profile_myProfile_profileEdit from "../../public/locales/ru/m_profile_myProfile_profileEdit.json";
import m_profile_myProfile_profileMeta_confirmPersonalEmail from "../../public/locales/ru/m_profile_myProfile_profileMeta_confirmPersonalEmail.json";
import m_profile_myProfile_profileMeta_confirmPersonalPhone from "../../public/locales/ru/m_profile_myProfile_profileMeta_confirmPersonalPhone.json";
import m_profile_myProfile_userActivities from "../../public/locales/ru/m_profile_myProfile_userActivities.json";
import m_profile_myProfile_workRadius from "../../public/locales/ru/m_profile_myProfile_workRadius.json";
import m_profile_settings from "../../public/locales/ru/m_profile_settings.json";
import m_profile_requests from "../../public/locales/ru/m_profile_requests.json";
import m_profile_documents from "../../public/locales/ru/m_profile_documents.json";
import m_profile_documents_archive from "../../public/locales/ru/m_profile_documents_archive.json";
import m_profile_documents_certificates from "../../public/locales/ru/m_profile_documents_certificates.json";
import m_profile_documents_sign from "../../public/locales/ru/m_profile_documents_sign.json";
import m_profile_documents_signAdeal from "../../public/locales/ru/m_profile_documents_signAdeal.json";
import m_profile_documents_terminateADeal from "../../public/locales/ru/m_profile_documents_terminateADeal.json";
import m_profile_myProfile_profileMeta from "../../public/locales/ru/m_profile_myProfile_profileMeta.json";
//profile

//users
import m_users_selectProjects from "../../public/locales/ru/m_users_selectProjects.json";
import m_users_selectLocations from "../../public/locales/ru/m_users_selectLocations.json";
import m_layout_users from "../../public/locales/ru/m_layout_users.json";
import m_users_client from "../../public/locales/ru/m_users_client.json";
import m_users_manager from "../../public/locales/ru/m_users_manager.json";
import m_users_supervisor from "../../public/locales/ru/m_users_supervisor.json";
//users

import HomeLayout from "../../public/locales/ru/HomeLayout.json";

import job from "../../public/locales/ru/job.json";

import BidLayout from "../../public/locales/ru/BidLayout.json";
import bids from "../../public/locales/ru/bids.json";

import m_tasks from "../../public/locales/ru/m_tasks.json";
import m_tasks_task from "../../public/locales/ru/m_tasks_task.json";
import m_tasks_newTask from "../../public/locales/ru/m_tasks_newTask.json";

import order from "../../public/locales/ru/order.json";
import orders from "../../public/locales/ru/orders.json";

//views

import JobMobileView from "../../public/locales/ru/JobMobileView.json";
import DayReviewMobileView from "../../public/locales/ru/DayReviewMobileView.json";
import SpecialistMobileView from "../../public/locales/ru/SpecialistMobileView.json";
import SpecialistsMobileView from "../../public/locales/ru/SpecialistsMobileView.json";
import ActivityMobileView from "../../public/locales/ru/ActivityMobileView.json";
import BidMobileView from "../../public/locales/ru/BidMobileView.json";

import OrderMobileView from "../../public/locales/ru/OrderMobileView.json";
import EntityMobileView from "../../public/locales/ru/EntityMobileView.json";
import EntitiesListView from "../../public/locales/ru/EntitiesListView.json";
import RequestSearchDrawer from "../../public/locales/ru/RequestSearchDrawer.json";

//shared
import m_shared_usersView from "../../public/locales/ru/m_shared_usersView.json";

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

      m_registration_step1: typeof m_registration_step1;
      m_registration_step2: typeof m_registration_step2;
      m_registration_step3: typeof m_registration_step3;
      m_registration_step4: typeof m_registration_step4;
      m_registration_step5: typeof m_registration_step5;
      m_registration_step6: typeof m_registration_step6;
      m_registration_confirmEmail: typeof m_registration_confirmEmail;
      m_registration_registrationComplete: typeof m_registration_registrationComplete;
      //registration

      //profile
      m_profile: typeof m_profile;
      m_profile_myProfile: typeof m_profile_myProfile;
      m_profile_myProfile_billing: typeof m_profile_myProfile_billing;
      m_profile_myProfile_billing_billingAdd: typeof m_profile_myProfile_billing_billingAdd;
      m_profile_myProfile_billing_billingEdit: typeof m_profile_myProfile_billing_billingEdit;
      m_profile_myProfile_profileEdit: typeof m_profile_myProfile_profileEdit;
      m_profile_myProfile_profileMeta: typeof m_profile_myProfile_profileMeta;
      m_profile_myProfile_profileMeta_confirmPersonalEmail: typeof m_profile_myProfile_profileMeta_confirmPersonalEmail;
      m_profile_myProfile_profileMeta_confirmPersonalPhone: typeof m_profile_myProfile_profileMeta_confirmPersonalPhone;
      m_profile_myProfile_userActivities: typeof m_profile_myProfile_userActivities;
      m_profile_myProfile_workRadius: typeof m_profile_myProfile_workRadius;
      m_profile_settings: typeof m_profile_settings;
      m_profile_requests: typeof m_profile_requests;
      m_profile_documents: typeof m_profile_documents;
      m_profile_documents_archive: typeof m_profile_documents_archive;
      m_profile_documents_certificates: typeof m_profile_documents_certificates;
      m_profile_documents_sign: typeof m_profile_documents_sign;
      m_profile_documents_signAdeal: typeof m_profile_documents_signAdeal;
      m_profile_documents_terminateADeal: typeof m_profile_documents_terminateADeal;
      //profile

      //users
      m_users_selectProjects: typeof m_users_selectProjects;
      m_users_selectLocations: typeof m_users_selectLocations;
      m_users_client: typeof m_users_client;
      m_users_manager: typeof m_users_manager;
      m_users_supervisor: typeof m_users_supervisor;
      m_layout_users: typeof m_layout_users;

      //users

      job: typeof job;
      BidLayout: typeof BidLayout;
      bids: typeof bids;

      m_tasks: typeof m_tasks;
      m_tasks_task: typeof m_tasks_task;
      m_tasks_newTask: typeof m_tasks_newTask;

      order: typeof order;
      orders: typeof orders;
      HomeLayout: typeof HomeLayout;
      sms: typeof sms;

      //views
      ProfileView: typeof ProfileView;
      JobMobileView: typeof JobMobileView;
      DayReviewMobileView: typeof DayReviewMobileView;
      SpecialistMobileView: typeof SpecialistMobileView;
      SpecialistsMobileView: typeof SpecialistsMobileView;
      BidMobileView: typeof BidMobileView;

      OrderMobileView: typeof OrderMobileView;
      EntityMobileView: typeof EntityMobileView;
      EntitiesListView: typeof EntitiesListView;
      ActivityMobileView: typeof ActivityMobileView;
      RequestSearchDrawer: typeof RequestSearchDrawer;

      //shared
      m_shared_usersView: typeof m_shared_usersView;

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
