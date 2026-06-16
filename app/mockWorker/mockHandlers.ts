import { getFormMockResponse } from "~/api/getForm/getForm";
import { postSaveFormMockResponse } from "~/api/postSaveForm/postSaveForm";
import { postSendPhoneMockResponse } from "~/api/postSendPhone/postSendPhone";
import { mockPostCheckCodeMockResponse } from "~/api/postCheckCode/postCheckCode";
import { mockPostSetUserPinMockResponse } from "~/api/postSetUserPin/postSetUserPin";
import { postFinishRegisterResponse } from "~/api/postFinishRegister/postFinishRegister";
import { postCheckPinResponse } from "~/api/postCheckPin/postCheckPin";
import { getUserInfoMockResponse } from "~/api/_personal/getUserInfo/getUserInfo";
import { getUserPersonalMenuMockResponse } from "~/api/_personal/getUserPersonalMenu/getUserPersonalMenu";
import { getUserFieldsMockResponse } from "~/api/_personal/getUserFields/getUserFields";
import { getStaticUserInfoMockResponse } from "~/api/getStaticUserInfo/getStaticUserInfo";
import { mockPostSetUserEmailMockResponse } from "~/api/_personal/postSetUserEmail/postSetUserEmail";
import { postCheckEmailCodeMockResponse } from "~/api/postCheckEmailCode/postCheckEmailCode";
import { postStartRestorePinMockResponse } from "~/api/postStartRestorePin/postStartRestorePin";
import { postCheckCodeRestoreMockResponse } from "~/api/postCheckCodeRestore/postCheckCodeRestore";
import { postPersonalSetUserEmailMockResponse } from "~/api/postPersonalSetUserEmail/postPersonalSetUserEmail";
import { postChangeUserPhoneMockResponse } from "~/api/_personal/postChangeUserPhone/postChangeUserPhone";
import { postPersonalCheckEmailCodeMockResponse } from "~/api/_personal/postPersonalCheckEmailCode/postPersonalCheckEmailCode";
import { postConfirmChangeUserPhoneMockResponse } from "~/api/_personal/postConfirmChangeUserPhone/postConfirmChangeUserPhone";
import { getFormActivitiesMockResponse } from "~/api/_personal/getFormActivities/getFormActivities";
import { postSaveUserFieldsActivitiesMockResponse } from "~/api/_personal/postSaveUserFieldsActivities/postSaveUserFieldsActivities";
import { getRequisitesDataMockResponse } from "~/api/_personal/getRequisitesData/getRequisitesData";
import { postSaveRequisitesDataMockResponse } from "~/api/_personal/postSaveRequisitesData/postSaveRequisitesData";
import { getBikMockResponse } from "~/api/_personal/getBik/getBik";
import { postDeleteRequisiteMockResponse } from "~/api/_personal/postDeleteRequisite/postDeleteRequisite";
import { getGeoDataMockResponse } from "~/api/getGeoData/getGeoData";
import { getMapFieldMockResponse } from "~/api/_personal/getMapField/getMapField";
import { postSetMapFieldMockResponse } from "~/api/_personal/postSetMapField/postSetMapField";
import { getSettingsFromKeyMockResponse } from "~/api/_settings/getSettingsFromKey/getSettingsFromKey";
import { getDocumentSignedMockResponse } from "~/api/_personal/_documents/getDocumentSigned/getDocumentSigned";
import { getDocumentConcludeMockResponse } from "~/api/_personal/_documents/getDocumentConclude/getDocumentConclude";
import { getDocumentTerminateMockResponse } from "~/api/_personal/_documents/getDocumentTerminate/getDocumentTerminate";
import { postSetConcludeMockResponse } from "~/api/_personal/_documents/postSetConclude/postSetConclude";
import { postSetTerminateMockResponse } from "~/api/_personal/_documents/postSetTerminate/postSetTerminate";
import { getDocumentArchiveMockResponse } from "~/api/_personal/_documents/getDocumentArchive/getDocumentArchive";
import { getDocumentInquiriesMockResponse } from "~/api/_personal/_documents/getDocumentInquiries/getDocumentInquiries";
import { getCompanyAndCertificatesInquiriesMockResponse } from "~/api/_personal/_documents/getCompanyAndCertificatesInquiries/getCompanyAndCertificatesInquiries";
import { getModerationClientMockResponse } from "~/api/_personal/_moderation/getModerationClient/getModerationClient";
import { getUserByHashMockResponse } from "~/api/getUserByHash/getUserByHash";
import { postConfirmUserRegisterMockResponse } from "~/api/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegister";
import { getBrandMockResponse } from "~/api/getBrand/getBrand";
import { postSetBrandImgMockResponse } from "~/api/postSetBrandImg/postSetBrandImg";
import { getPlaceMockResponse } from "~/api/getPlace/getPlace";
import { postSetPlaceMockResponse } from "~/api/postSetPlace/postSetPlace";
import { postDelPlaceMockResponse } from "~/api/postDelPlace/postDelPlace";
import { postSetUserDataMockResponse } from "~/api/postSetUserData/postSetUserData";
import { getProjectMockResponse } from "~/api/_personal/_moderation/getProject/getProject";
import { getPlaceModerationMockResponse } from "~/api/_personal/_moderation/getPlaceModeration/getPlaceModeration";
import { getModerationSingleClientMockResponse } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";
import { postDelProjectMockResponse } from "~/api/_personal/_moderation/delProject/delProject";
import { postSetUserImgMockResponse } from "~/api/_personal/_moderation/postSetUserImg/postSetUserImg";
import { postSetProjectMockResponse } from "~/api/_personal/_moderation/postSetProject/postSetProject";
import { postSetPlaceModerationMockResponse } from "~/api/_personal/_moderation/postSetPlaceModeration/postSetPlaceModeration";
import { getOrderMockResponse } from "~/api/_personal/getOrder/getOrder";
import { getPlaceForOrderMockResponse } from "~/api/_personal/getPlaceForOrder/getPlaceForOrder";
import { postCreateOrderMockResponse } from "~/api/_personal/postCreateOrder/postCreateOrder";
import { postUpdateOrderMockResponse } from "~/api/_personal/postUpdateOrder/postUpdateOrder";
import { postDeleteOrderActivityMockResponse } from "~/api/_personal/postDeleteOrderActivity/postDeleteOrderActivity";
import { postCancelOrderMockResponse } from "~/api/_personal/postCancelOrder/postCancelOrder";
import { postSendOrderMockResponse } from "~/api/_personal/postSendOrder/postSendOrder";
import { getViewActivitiesForOrderMockResponse } from "~/api/_personal/getViewActivitiesForOrder/getViewActivitiesForOrder";
import { postCreateOrderActivityMockResponse } from "~/api/_personal/postCreateOrderActivity/postCreateOrderActivity";
import { getOrdersMockResponse } from "~/api/_personal/getOrders/getOrders";
import { getTasksMockResponse } from "~/api/_personal/getTasks/getTasks";
import { getTaskMockResponse } from "~/api/_personal/getTask/getTask";
import { postCreateTaskMockResponse } from "~/api/_personal/postCreateTask/postCreateTask";
import { postUpdateTaskMockResponse } from "~/api/_personal/postUpdateTask/postUpdateTask";
import { postDeleteTaskActivityMockResponse } from "~/api/_personal/postDeleteTaskActivity/postDeleteTaskActivity";
import { postCancelTaskMockResponse } from "~/api/_personal/postCancelTask/postCancelTask";
import { getPlaceForTaskMockResponse } from "~/api/_personal/getPlaceForTask/getPlaceForTask";
import { getProjectsForTaskMockResponse } from "~/api/_personal/getProjectsForTask/getProjectsForTask";
import { getSupervisorsForTaskMockResponse } from "~/api/_personal/getSupervisorsForTask/getSupervisorsForTask";
import { postInvoiceTaskMockResponse } from "~/api/_personal/postInvoiceTask/postInvoiceTask";
import { postInstructTaskMockResponse } from "~/api/_personal/postInstructTask/postInstructTask";
import { getViewActivitiesForTaskMockResponse } from "~/api/_personal/getViewActivitiesForTask/getViewActivitiesForTask";
import { postCreateTaskActivityMockResponse } from "~/api/_personal/postCreateTaskActivity/postCreateTaskActivity";
import { getSupervisorsMockResponse } from "~/api/_personal/_moderation/getSupervisors/getSupervisors";
import { postSetSupervisorsMockResponse } from "~/api/_personal/_moderation/postSetSupervisors/postSetSupervisors";
import { postDelSupervisorMockResponse } from "~/api/_personal/_moderation/postDelSupervisor/postDelSupervisor";
import { getBidsMockResponse } from "~/api/_personal/getBids/getBids";
import { getBidMockResponse } from "~/api/_personal/getBid/getBid";
import { postRepeatOrderMockResponse } from "~/api/_personal/postRepeatOrder/postRepeatOrder";
import { postRepeatTaskMockResponse } from "~/api/_personal/postRepeatTask/postRepeatTask";
import { postUpdateOrderActivityMockResponse } from "~/api/_personal/postUpdateOrderActivity/postUpdateOrderActivity";
import { postUpdateTaskActivityMockResponse } from "~/api/_personal/postUpdateTaskActivity/postUpdateTaskActivity";
import { getPlaceForBidMockResponse } from "~/api/_personal/getPlaceForBid/getPlaceForBid";
import { postUpdateBidMockResponse } from "~/api/_personal/postUpdateBid/postUpdateBid";
import { getSpecialistForBidMockResponse } from "~/api/_personal/getSpecialistForBid/getSpecialistForBid";
import { postInvoiceBidMockResponse } from "~/api/_personal/postInvoiceBid/postInvoiceBid";
import { getManagerMockResponse } from "~/api/_personal/getManager/getManager";
import { postDelManagerMockResponse } from "~/api/_personal/postDelManager/postDelManager";
import { postSetManagersMockResponse } from "~/api/_personal/postSetManagers/postSetManagers";
import { postCreateBidFromTaskMockResponse } from "~/api/_personal/postCreateBidFromTask/postCreateBidFromTask";
import { postConvertTaskMockResponse } from "~/api/_personal/postConvertTask/postConvertTask";
import { getJobsMockResponse } from "~/api/_personal/getJobs/getJobs";
import { getJobMockResponse } from "~/api/_personal/getJob/getJob";
import { postRejectBidMockResponse } from "~/api/_personal/postRejectBid/postRejectBid";
import { postAcceptBidMockResponse } from "~/api/_personal/postAcceptBid/postAcceptBid";
import { postStartDayMockResponse } from "~/api/_personal/postStartDay/postStartDay";
import { postEndJobMockResponse } from "~/api/_personal/postEndJob/postEndJob";
import { postAcceptOrderMockResponse } from "~/api/_personal/postAcceptOrder/postAcceptOrder";
import { postAcceptSpecialistMockResponse } from "~/api/_personal/postAcceptSpecialist/postAcceptSpecialist";
import { postEndDayMockResponse } from "~/api/_personal/postEndDay/postEndDay";
import { postEndSpecialistJobMockResponse } from "~/api/_personal/postEndSpecialistJob/postEndSpecialistJob";
import { postPayReportMockResponse } from "~/api/_personal/postPayReport/postPayReport";
import { postAcceptAllReportJobMockResponse } from "~/api/_personal/postAcceptAllReportJob/postAcceptAllReportJob";
import { postAcceptReportMockResponse } from "~/api/_personal/postAcceptReport/postAcceptReport";
import { postPayReportForManagerMockResponse } from "~/api/_personal/postPayReportForManager/postPayReportForManager";
import { getReasonsMockResponse } from "~/api/_personal/getReasons/getReasons";
import { postUpdateReportMockResponse } from "~/api/_personal/postUpdateReport/postUpdateReport";
import { postCreateBidFromOrderMockResponse } from "~/api/_personal/postCreateBidFromOrder/postCreateBidFromOrder";
import { postAcceptTaskMockResponse } from "~/api/_personal/postAcceptTask/postAcceptTask";
import { postSignedDocumentMockResponse } from "~/api/_personal/_documents/postSignedDocument/postSignedDocument";
import { postRetriesSmsMockResponse } from "~/api/_personal/postRetriesSms/postRetriesSms";
import { postSendCodeMockResponse } from "~/api/_personal/postSendCode/postSendCode";
import { getSignedDocumentMockResponse } from "~/api/_personal/getSignedDocument/getSignedDocument";
import { postCancelBidMockResponse } from "~/api/_personal/postCancelBid/postCancelBid";
import { getCounterpartyMockResponse } from "~/api/_personal/_moderation/getCounterparty/getCounterparty";
import { postSetCounterpartyMockResponse } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterparty";
import { postDeleteCounterpartyMockResponse } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterparty";
import { getDataMockResponse } from "~/api/_personal/getData/getData";
import { postCreateSearchFromTaskMockResponse } from "~/api/_personal/postCreateSearchFromTask/postCreateSearchFromTask";
import { postCreateSearchFromOrderMockResponse } from "~/api/_personal/postCreateSearchFromOrder/postCreateSearchFromOrder";
import { postUpdateSearchMockResponse } from "~/api/_personal/postUpdateSearch/postUpdateSearch";
import { getUserSettingsMockResponse } from "~/api/_personal/getUserSettings/getUserSettings";
import { postSetUserSettingsMockResponse } from "~/api/_personal/postSetUserSettings/postSetUserSettings";
import { getSigninJobsMockResponse } from "~/api/getSigninJobs/getSigninJobs";
import { getProjectsForOrderMockResponse } from "~/api/_personal/getProjectsForOrder/getProjectsForOrder";
import { getCounterpartyForOrderMockResponse } from "~/api/_personal/getCounterpartyForOrder/getCounterpartyForOrder";

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
  getManagerMockResponse,
  postDelManagerMockResponse,
  postSetManagersMockResponse,
  postCreateBidFromTaskMockResponse,
  postConvertTaskMockResponse,
  getJobsMockResponse,
  getJobMockResponse,
  postRejectBidMockResponse,
  postAcceptBidMockResponse,
  postStartDayMockResponse,
  postEndJobMockResponse,
  postAcceptOrderMockResponse,
  postAcceptSpecialistMockResponse,
  postEndDayMockResponse,
  postEndSpecialistJobMockResponse,
  postPayReportMockResponse,
  postAcceptAllReportJobMockResponse,
  postAcceptReportMockResponse,
  postPayReportForManagerMockResponse,
  getReasonsMockResponse,
  postUpdateReportMockResponse,
  postCreateBidFromOrderMockResponse,
  postAcceptTaskMockResponse,
  postSignedDocumentMockResponse,
  postRetriesSmsMockResponse,
  postSendCodeMockResponse,
  getSignedDocumentMockResponse,
  postCancelBidMockResponse,
  getCounterpartyMockResponse,
  postSetCounterpartyMockResponse,
  postDeleteCounterpartyMockResponse,
  getDataMockResponse,
  postCreateSearchFromTaskMockResponse,
  postCreateSearchFromOrderMockResponse,
  postUpdateSearchMockResponse,
  getUserSettingsMockResponse,
  postSetUserSettingsMockResponse,
  getSigninJobsMockResponse,
  getProjectsForOrderMockResponse,
  getCounterpartyForOrderMockResponse,
];
