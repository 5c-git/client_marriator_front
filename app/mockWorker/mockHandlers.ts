import { getFormMockResponse } from "~/requests/getForm/getForm";
import { postSaveFormMockResponse } from "~/requests/postSaveForm/postSaveForm";

import { postSendPhoneMockResponse } from "~/requests/postSendPhone/postSendPhone";
import { mockPostCheckCodeMockResponse } from "~/requests/postCheckCode/postCheckCode";
import { mockPostSetUserPinMockResponse } from "~/requests/postSetUserPin/postSetUserPin";

import { postFinishRegisterResponse } from "~/requests/postFinishRegister/postFinishRegister";
import { postCheckPinResponse } from "~/requests/postCheckPin/postCheckPin";

import { getUserInfoMockResponse } from "~/requests/_personal/getUserInfo/getUserInfo";
import { getUserPersonalMenuMockResponse } from "~/requests/_personal/getUserPersonalMenu/getUserPersonalMenu";

import { getUserFieldsMockResponse } from "~/requests/_personal/getUserFields/getUserFields";
import { getStaticUserInfoMockResponse } from "~/requests/getStaticUserInfo/getStaticUserInfo";
import { mockPostSetUserEmailMockResponse } from "~/requests/_personal/postSetUserEmail/postSetUserEmail";
import { postCheckEmailCodeMockResponse } from "~/requests/postCheckEmailCode/postCheckEmailCode";
import { postStartRestorePinMockResponse } from "~/requests/postStartRestorePin/postStartRestorePin";
import { postCheckCodeRestoreMockResponse } from "~/requests/postCheckCodeRestore/postCheckCodeRestore";
import { postPersonalSetUserEmailMockResponse } from "~/requests/postPersonalSetUserEmail/postPersonalSetUserEmail";
import { postChangeUserPhoneMockResponse } from "~/requests/_personal/postChangeUserPhone/postChangeUserPhone";
import { postPersonalCheckEmailCodeMockResponse } from "~/requests/_personal/postPersonalCheckEmailCode/postPersonalCheckEmailCode";
import { postConfirmChangeUserPhoneMockResponse } from "~/requests/_personal/postConfirmChangeUserPhone/postConfirmChangeUserPhone";
import { getFormActivitiesMockResponse } from "~/requests/_personal/getFormActivities/getFormActivities";
import { postSaveUserFieldsActivitiesMockResponse } from "~/requests/_personal/postSaveUserFieldsActivities/postSaveUserFieldsActivities";
import { getRequisitesDataMockResponse } from "~/requests/_personal/getRequisitesData/getRequisitesData";
import { postSaveRequisitesDataMockResponse } from "~/requests/_personal/postSaveRequisitesData/postSaveRequisitesData";
import { getBikMockResponse } from "~/requests/_personal/getBik/getBik";
import { postDeleteRequisiteMockResponse } from "~/requests/_personal/postDeleteRequisite/postDeleteRequisite";
import { getGeoDataMockResponse } from "~/requests/getGeoData/getGeoData";
import { getMapFieldMockResponse } from "~/requests/_personal/getMapField/getMapField";
import { postSetMapFieldMockResponse } from "~/requests/_personal/postSetMapField/postSetMapField";
import { getSettingsFromKeyMockResponse } from "~/requests/_settings/getSettingsFromKey/getSettingsFromKey";
import { getDocumentSignedMockResponse } from "~/requests/_personal/_documents/getDocumentSigned/getDocumentSigned";
import { getDocumentConcludeMockResponse } from "~/requests/_personal/_documents/getDocumentConclude/getDocumentConclude";
import { getDocumentTerminateMockResponse } from "~/requests/_personal/_documents/getDocumentTerminate/getDocumentTerminate";
import { postSetConcludeMockResponse } from "~/requests/_personal/_documents/postSetConclude/postSetConclude";
import { postSetTerminateMockResponse } from "~/requests/_personal/_documents/postSetTerminate/postSetTerminate";
import { getDocumentArchiveMockResponse } from "~/requests/_personal/_documents/getDocumentArchive/getDocumentArchive";
import { getDocumentInquiriesMockResponse } from "~/requests/_personal/_documents/getDocumentInquiries/getDocumentInquiries";
import { getCompanyAndCertificatesInquiriesMockResponse } from "~/requests/_personal/_documents/getCompanyAndCertificatesInquiries/getCompanyAndCertificatesInquiries";
import { getModerationClientMockResponse } from "~/requests/_personal/_moderation/getModerationClient/getModerationClient";
import { getUserByHashMockResponse } from "~/requests/getUserByHash/getUserByHash";
import { postConfirmUserRegisterMockResponse } from "~/requests/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegister";
import { getBrandMockResponse } from "~/requests/getBrand/getBrand";
import { postSetBrandImgMockResponse } from "~/requests/postSetBrandImg/postSetBrandImg";
import { getPlaceMockResponse } from "~/requests/getPlace/getPlace";
import { postSetPlaceMockResponse } from "~/requests/postSetPlace/postSetPlace";
import { postDelPlaceMockResponse } from "~/requests/postDelPlace/postDelPlace";
import { postSetUserDataMockResponse } from "~/requests/postSetUserData/postSetUserData";
import { getProjectMockResponse } from "~/requests/_personal/_moderation/getProject/getProject";
import { getPlaceModerationMockResponse } from "~/requests/_personal/_moderation/getPlaceModeration/getPlaceModeration";
import { getModerationSingleClientMockResponse } from "~/requests/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";
import { postDelProjectMockResponse } from "~/requests/_personal/_moderation/delProject/delProject";
import { postSetUserImgMockResponse } from "~/requests/_personal/_moderation/postSetUserImg/postSetUserImg";
import { postSetProjectMockResponse } from "~/requests/_personal/_moderation/postSetProject/postSetProject";
import { postSetPlaceModerationMockResponse } from "~/requests/_personal/_moderation/postSetPlaceModeration/postSetPlaceModeration";
import { getOrderMockResponse } from "~/requests/_personal/getOrder/getOrder";
import { getPlaceForOrderMockResponse } from "~/requests/_personal/getPlaceForOrder/getPlaceForOrder";
import { postCreateOrderMockResponse } from "~/requests/_personal/postCreateOrder/postCreateOrder";
import { postUpdateOrderMockResponse } from "~/requests/_personal/postUpdateOrder/postUpdateOrder";
import { postDeleteOrderActivityMockResponse } from "~/requests/_personal/postDeleteOrderActivity/postDeleteOrderActivity";
import { postCancelOrderMockResponse } from "~/requests/_personal/postCancelOrder/postCancelOrder";
import { postSendOrderMockResponse } from "~/requests/_personal/postSendOrder/postSendOrder";
import { getViewActivitiesForOrderMockResponse } from "~/requests/_personal/getViewActivitiesForOrder/getViewActivitiesForOrder";
import { postCreateOrderActivityMockResponse } from "~/requests/_personal/postCreateOrderActivity/postCreateOrderActivity";
import { getOrdersMockResponse } from "~/requests/_personal/getOrders/getOrders";
import { getTasksMockResponse } from "~/requests/_personal/getTasks/getTasks";
import { getTaskMockResponse } from "~/requests/_personal/getTask/getTask";
import { postCreateTaskMockResponse } from "~/requests/_personal/postCreateTask/postCreateTask";
import { postUpdateTaskMockResponse } from "~/requests/_personal/postUpdateTask/postUpdateTask";
import { postDeleteTaskActivityMockResponse } from "~/requests/_personal/postDeleteTaskActivity/postDeleteTaskActivity";
import { postCancelTaskMockResponse } from "~/requests/_personal/postCancelTask/postCancelTask";
import { getPlaceForTaskMockResponse } from "~/requests/_personal/getPlaceForTask/getPlaceForTask";
import { getProjectsForTaskMockResponse } from "~/requests/_personal/getProjectsForTask/getProjectsForTask";
import { getSupervisorsForTaskMockResponse } from "~/requests/_personal/getSupervisorsForTask/getSupervisorsForTask";
import { postInvoiceTaskMockResponse } from "~/requests/_personal/postInvoiceTask/postInvoiceTask";
import { postInstructTaskMockResponse } from "~/requests/_personal/postInstructTask/postInstructTask";
import { getViewActivitiesForTaskMockResponse } from "~/requests/_personal/getViewActivitiesForTask/getViewActivitiesForTask";
import { postCreateTaskActivityMockResponse } from "~/requests/_personal/postCreateTaskActivity/postCreateTaskActivity";
import { getSupervisorsMockResponse } from "~/requests/_personal/_moderation/getSupervisors/getSupervisors";
import { postSetSupervisorsMockResponse } from "~/requests/_personal/_moderation/postSetSupervisors/postSetSupervisors";
import { postDelSupervisorMockResponse } from "~/requests/_personal/_moderation/postDelSupervisor/postDelSupervisor";
import { getBidsMockResponse } from "~/requests/_personal/getBids/getBids";
import { getBidMockResponse } from "~/requests/_personal/getBid/getBid";
import { postRepeatOrderMockResponse } from "~/requests/_personal/postRepeatOrder/postRepeatOrder";
import { postRepeatTaskMockResponse } from "~/requests/_personal/postRepeatTask/postRepeatTask";
import { postUpdateOrderActivityMockResponse } from "~/requests/_personal/postUpdateOrderActivity/postUpdateOrderActivity";
import { postUpdateTaskActivityMockResponse } from "~/requests/_personal/postUpdateTaskActivity/postUpdateTaskActivity";
import { getPlaceForBidMockResponse } from "~/requests/_personal/getPlaceForBid/getPlaceForBid";
import { postUpdateBidMockResponse } from "~/requests/_personal/postUpdateBid/postUpdateBid";
import { getSpecialistForBidMockResponse } from "~/requests/_personal/getSpecialistForBid/getSpecialistForBid";
import { postInvoiceBidMockResponse } from "~/requests/_personal/postInvoiceBid/postInvoiceBid";

export const handlers = [
  getFormMockResponse,
  postSaveFormMockResponse,
  postSendPhoneMockResponse,
  mockPostCheckCodeMockResponse,
  mockPostSetUserPinMockResponse,
  postFinishRegisterResponse,
  postCheckPinResponse,
  getUserInfoMockResponse,
  getUserPersonalMenuMockResponse,
  getUserFieldsMockResponse,
  getStaticUserInfoMockResponse,
  mockPostSetUserEmailMockResponse,
  postCheckEmailCodeMockResponse,
  postStartRestorePinMockResponse,
  postCheckCodeRestoreMockResponse,
  postPersonalSetUserEmailMockResponse,
  postChangeUserPhoneMockResponse,
  postPersonalCheckEmailCodeMockResponse,
  postConfirmChangeUserPhoneMockResponse,
  getFormActivitiesMockResponse,
  postSaveUserFieldsActivitiesMockResponse,
  getRequisitesDataMockResponse,
  postSaveRequisitesDataMockResponse,
  getBikMockResponse,
  postDeleteRequisiteMockResponse,
  getGeoDataMockResponse,
  getMapFieldMockResponse,
  postSetMapFieldMockResponse,
  getSettingsFromKeyMockResponse,
  getDocumentSignedMockResponse,
  getDocumentConcludeMockResponse,
  getDocumentTerminateMockResponse,
  postSetConcludeMockResponse,
  postSetTerminateMockResponse,
  getDocumentArchiveMockResponse,
  getDocumentInquiriesMockResponse,
  getCompanyAndCertificatesInquiriesMockResponse,
  getModerationClientMockResponse,
  getUserByHashMockResponse,
  postConfirmUserRegisterMockResponse,
  getBrandMockResponse,
  postSetBrandImgMockResponse,
  getPlaceMockResponse,
  postSetPlaceMockResponse,
  postDelPlaceMockResponse,
  postSetUserDataMockResponse,
  getProjectMockResponse,
  getPlaceModerationMockResponse,
  getModerationSingleClientMockResponse,
  postDelProjectMockResponse,
  postSetUserImgMockResponse,
  postSetProjectMockResponse,
  postSetPlaceModerationMockResponse,
  getOrderMockResponse,
  getPlaceForOrderMockResponse,
  postCreateOrderMockResponse,
  postUpdateOrderMockResponse,
  postDeleteOrderActivityMockResponse,
  postCancelOrderMockResponse,
  postSendOrderMockResponse,
  getViewActivitiesForOrderMockResponse,
  postCreateOrderActivityMockResponse,
  getOrdersMockResponse,
  getTasksMockResponse,
  getTaskMockResponse,
  postCreateTaskMockResponse,
  postUpdateTaskMockResponse,
  postDeleteTaskActivityMockResponse,
  postCancelTaskMockResponse,
  getPlaceForTaskMockResponse,
  getProjectsForTaskMockResponse,
  getSupervisorsForTaskMockResponse,
  postInvoiceTaskMockResponse,
  postInstructTaskMockResponse,
  getViewActivitiesForTaskMockResponse,
  postCreateTaskActivityMockResponse,
  getSupervisorsMockResponse,
  postSetSupervisorsMockResponse,
  postDelSupervisorMockResponse,
  getBidsMockResponse,
  getBidMockResponse,
  postRepeatOrderMockResponse,
  postRepeatTaskMockResponse,
  postUpdateOrderActivityMockResponse,
  postUpdateTaskActivityMockResponse,
  getPlaceForBidMockResponse,
  postUpdateBidMockResponse,
  getSpecialistForBidMockResponse,
  postInvoiceBidMockResponse,
];
