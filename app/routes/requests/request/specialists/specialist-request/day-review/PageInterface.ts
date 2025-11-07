export type PageInterface = {
  days: {
    id: number;
    date: string;
    photos?: string[];
    unitPrice: string;
    unitAmount: string;
    criteria: {
      count: number;
      amount: number;
      value: string;
    }[];
  }[];
  criteria: {
    amount: number;
    label: string;
    value: string;
  }[];
};
