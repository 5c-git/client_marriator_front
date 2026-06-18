export type CheckboxItem = { uuid: string; name: string };

export class TerminateADealMapper {
  static generateDefaultValues(items: CheckboxItem[]) {
    const defaultValues: { [key: string]: boolean } = {};
    items.forEach((item) => {
      defaultValues[item.uuid] = false;
    });
    return defaultValues;
  }
}
