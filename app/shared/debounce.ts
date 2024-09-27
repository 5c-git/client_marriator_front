/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
export function debounce<T extends Function>(
  func: T,
  delay: number
): (...args: unknown[]) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
