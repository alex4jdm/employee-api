import { EServiceErrorStatus } from './enums';
import ServiceError from './ServiceError.error';

export default class BadInputDataError extends ServiceError {
  constructor(message: string = EServiceErrorStatus.ERR_BAD_INPUT_DATA) {
    super(message, EServiceErrorStatus.ERR_BAD_INPUT_DATA);
  }
}
