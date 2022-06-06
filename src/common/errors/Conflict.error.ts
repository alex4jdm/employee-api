import { EServiceErrorStatus } from './enums';
import ServiceError from './ServiceError.error';

export default class ConflictError extends ServiceError {
  constructor(message: string = EServiceErrorStatus.ERR_CONFLICT) {
    super(message, EServiceErrorStatus.ERR_CONFLICT);
  }
}
