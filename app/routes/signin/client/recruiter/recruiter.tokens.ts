import { token } from "brandi";

import type { RecruiterService } from "./recruiter.service";

export const recruiterTokens = {
  recruiterService: token<RecruiterService>("recruiter:RecruiterService"),
};
