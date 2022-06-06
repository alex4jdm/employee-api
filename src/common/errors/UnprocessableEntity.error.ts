import { EServiceErrorStatus } from './enums';
import ServiceError from './ServiceError.error';

export default class UnprocessableEntityError extends ServiceError {
  constructor(message: string = EServiceErrorStatus.ERR_UNPROCESSABLE_ENTITY) {
    super(message, EServiceErrorStatus.ERR_UNPROCESSABLE_ENTITY);
  }
}
