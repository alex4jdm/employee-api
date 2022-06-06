import { EServiceErrorStatus } from './enums';
import ServiceError from './ServiceError.error';

export default class UnknownError extends ServiceError {
  constructor(message: string = EServiceErrorStatus.ERR_UNKNOWN) {
    super(message, EServiceErrorStatus.ERR_UNKNOWN);
  }
}
