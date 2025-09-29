export const statusCodeMap = {
  1: { value: "notAccepted", color: "var(--mui-palette-Grey_1)" },
  2: { value: "accepted", color: "var(--mui-palette-Blue)" },
  3: { value: "declined", color: "var(--mui-palette-Grey_2)" },
  4: { value: "consideration", color: "var(--mui-palette-Corp_1)" },
  5: { value: "work", color: "var(--mui-palette-Green)" },
  6: { value: "canceled", color: "var(--mui-palette-Red)" },
} as const;

export const statusValueMap = {
  [statusCodeMap[1].value]: 1,
  [statusCodeMap[2].value]: 2,
  [statusCodeMap[3].value]: 3,
  [statusCodeMap[4].value]: 4,
  [statusCodeMap[5].value]: 5,
  [statusCodeMap[6].value]: 6,
};
