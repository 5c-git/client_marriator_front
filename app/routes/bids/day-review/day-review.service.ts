import { injected } from "brandi";
import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import {
  GetJob,
  GetReasons,
  AcceptReport,
  UpdateReport,
  AcceptAllReports,
} from "./day-review.private-tokens";
import { dayReviewPrivateTokens } from "./day-review.private-tokens";
import { DayReviewMapper } from "./day-review.mapper";

export class DayReviewService {
  constructor(
    private readonly appSerivice: AppService,
    private readonly _getJob: GetJob,
    private readonly _getReasons: GetReasons,
    private readonly _acceptReport: AcceptReport,
    private readonly _updateReport: UpdateReport,
    private readonly _acceptAllReports: AcceptAllReports,
  ) {}

  async getJob(specialistId: string, bidId: string, reportId?: string) {
    const token = this.appSerivice.getToken();

    const data = await this._getJob(token, specialistId, bidId);

    return DayReviewMapper.mapDataToDays(data, reportId);
  }

  async getReasons() {
    const token = this.appSerivice.getToken();
    const data = await this._getReasons(token);
    return DayReviewMapper.mapReasonsToOptions(data);
  }

  async acceptAllReports(payload: {
    bidId: number;
    specialistId: number;
    reports: {
      reportId: number;
      hours: number;
      reasons: {
        reasonId: number;
        count: number;
        amount: number;
      }[];
    }[];
  }) {
    const token = this.appSerivice.getToken();

    return this._acceptAllReports(token, payload);
  }

  async acceptReport(payload: {
    reportId: number;
    hours: number;
    reasons: {
      reasonId: number;
      count: number;
      amount: number;
    }[];
  }) {
    const token = this.appSerivice.getToken();

    return this._acceptReport(token, payload);
  }

  async updateReport(payload: {
    reportId: number;
    hours: number;
    reasons: {
      reasonId: number;
      count: number;
    }[];
  }) {
    const token = this.appSerivice.getToken();

    return this._updateReport(token, payload);
  }
}

injected(
  DayReviewService,
  appTokens.appService,
  dayReviewPrivateTokens.getJob,
  dayReviewPrivateTokens.getReasons,
  dayReviewPrivateTokens.acceptReport,
  dayReviewPrivateTokens.updateReport,
  dayReviewPrivateTokens.acceptAllReports,
);
