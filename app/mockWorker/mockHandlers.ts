import { getRegStep1MockResponse } from "~/requests/getRegStep1/getRegStep1";
import { postRegStep1MockResponse } from "~/requests/postRegStep1/postRegStep1";

import { getRegStep2MockResponse } from "~/requests/getRegStep2/getRegStep2";
import { postRegStep2MockResponse } from "~/requests/postRegStep2/postRegStep2";

export const handlers = [
  getRegStep1MockResponse,
  postRegStep1MockResponse,
  getRegStep2MockResponse,
  postRegStep2MockResponse,
];
