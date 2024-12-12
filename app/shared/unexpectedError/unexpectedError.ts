export class UnxpectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnxpectedError";
  }
}
