export type NewOrderMobileViewInterface = {
  order: {
    id: string;
    projectId: null | string;
    place: {
      id: string;
      name: string;
      region: string;
    } | null;
    selfEmployed: boolean;
    orderServices: {
      id: number;
      count: number;
      name: string;
    }[];
  };
  options: { value: string; label: string; disabled: boolean }[];
  projectOptions: { value: string; label: string; disabled: boolean }[];
  headerBackAction: () => void;
  submitAction: (
    placeId: string,
    projectId: string,
    selfEmployed: boolean,
  ) => void;
  cancelAction: () => void;
  saveAction: () => void;
  deleteAction: (serviceId: number) => void;
};
