import { token } from "brandi";

import type { DayReviewService } from "./day-review.service";

export const dayReviewTokens = {
  dayReviewService: token<DayReviewService>("DayReviewService"),
};
