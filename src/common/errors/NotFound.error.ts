import { EServiceErrorStatus } from './enums';
import ServiceError from './ServiceError.error';

export default class NotFoundError extends ServiceError {
  constructor(message: string = EServiceErrorStatus.ERR_NOT_FOUND) {
    super(message, EServiceErrorStatus.ERR_NOT_FOUND);
  }
}
