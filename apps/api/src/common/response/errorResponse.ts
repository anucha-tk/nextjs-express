export default class ErrorResponse extends Error {
  message: string;
  code: number | string;
  constructor(message: string, code: number | string) {
    super(message);
    this.message = message; // throw array
    this.code = code;
  }
}
