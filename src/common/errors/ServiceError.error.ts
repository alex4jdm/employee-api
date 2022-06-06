import { EServiceErrorStatus } from './enums';

export default class ServiceError extends Error {
  private status: EServiceErrorStatus;

  constructor(message?: string, status?: EServiceErrorStatus) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
  }
}
