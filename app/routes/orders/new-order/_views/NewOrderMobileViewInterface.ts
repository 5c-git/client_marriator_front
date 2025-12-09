export type NewOrderMobileViewInterface = {
  order: {
    id: string;
    place: {
      id: string;
      name: string;
      region: string;
    };
    selfEmployed: boolean;
    isNewOrder: boolean;
    orderServices: {
      id: number;
      count: number;
      name: string;
    }[];
  };
  options: { value: string; label: string; disabled: boolean }[];
  headerBackAction: () => void;
  submitAction: (placeId: string, selfEmployed: boolean) => void;
  cancelAction: () => void;
  saveAction: () => void;
  deleteAction: (serviceId: number) => void;
};
