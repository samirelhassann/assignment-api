export class TaskException extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = statusCode;
  }

  getStatusCode() {
    return this.status;
  }

  formatErrorMessage() {
    return JSON.stringify({ error: this.message });
  }
}
