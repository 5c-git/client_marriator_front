import { injected } from "brandi";

import {
  GetJob,
  AcceptSpecialist,
  EndSpecialistJob,
  PayReportForManager,
} from "./specialist.private-tokens";
import { specialistPrivateTokens } from "./specialist.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";
import { SpecialistMapper } from "./specialist.mapper";

export class SpecialistService {
  constructor(
    private readonly appService: AppService,
    private readonly _getJob: GetJob,
    private readonly _acceptSpecialist: AcceptSpecialist,
    private readonly _endSpecialistJob: EndSpecialistJob,
    private readonly _payReportForManager: PayReportForManager,
  ) {}

  async getData(specialistId: string, bidId: string) {
    const token = this.appService.getToken();

    const data = await this._getJob(token, specialistId, bidId);

    return SpecialistMapper.mapDataToSpecialistEntity(data);
  }

  async acceptSpecialist(bidId: string, specialistId: string) {
    const token = this.appService.getToken();

    return this._acceptSpecialist(token, bidId, specialistId);
  }

  async endSpecialistJob(bidId: string, specialistId: string) {
    const token = this.appService.getToken();

    return this._endSpecialistJob(token, bidId, specialistId);
  }

  async payReportForManager(reportId: string) {
    const token = this.appService.getToken();

    return this._payReportForManager(token, reportId);
  }
}

injected(
  SpecialistService,
  appTokens.appService,
  specialistPrivateTokens.getJob,
  specialistPrivateTokens.acceptSpecialist,
  specialistPrivateTokens.endSpecialistJob,
  specialistPrivateTokens.payReportForManager,
);
