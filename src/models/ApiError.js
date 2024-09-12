export class ApiError extends Error {
  constructor(code, status, category, message, section) {
    super(message);
    this.code = code;
    this.status = status;
    this.category = category;
    this.section = section;
    Error.captureStackTrace(this, this.constructor);
  }
}
