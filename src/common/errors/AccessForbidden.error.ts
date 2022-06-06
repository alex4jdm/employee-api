import { EServiceErrorStatus } from './enums';
import ServiceError from './ServiceError.error';

export default class AccessForbiddenError extends ServiceError {
  constructor(message: string = EServiceErrorStatus.ERR_ACCESS_FORBIDDEN) {
    super(message, EServiceErrorStatus.ERR_ACCESS_FORBIDDEN);
  }
}
