export const statusCodeMap = {
  1: { value: "new", color: "var(--mui-palette-Corp_1)" },
  2: { value: "accepted", color: "var(--mui-palette-Blue)" },
  3: { value: "notAccepted", color: "var(--mui-palette-Grey_1)" },
  4: { value: "canceled", color: "var(--mui-palette-Red)" },
  5: { value: "archive", color: "var(--mui-palette-Grey_2)" },
} as const;

export const statusValueMap = {
  [statusCodeMap[1].value]: 1,
  [statusCodeMap[2].value]: 2,
  [statusCodeMap[3].value]: 3,
  [statusCodeMap[4].value]: 4,
  [statusCodeMap[5].value]: 5,
};
