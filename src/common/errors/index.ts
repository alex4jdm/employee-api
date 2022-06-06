import AccessForbiddenError from './AccessForbidden.error';
import BadInputDataError from './BadInputData.error';
import ConflictError from './Conflict.error';
import { EServiceErrorStatus } from './enums';
import NotFoundError from './NotFound.error';
import { TServiceErrorGroup } from './types';
import UnknownError from './Unknown.error';
import UnprocessableEntityError from './UnprocessableEntity.error';

export const serviceErrorGroup: TServiceErrorGroup = {
  [EServiceErrorStatus.ERR_NOT_FOUND]: NotFoundError,
  [EServiceErrorStatus.ERR_CONFLICT]: ConflictError,
  [EServiceErrorStatus.ERR_UNPROCESSABLE_ENTITY]: UnprocessableEntityError,
  [EServiceErrorStatus.ERR_BAD_INPUT_DATA]: BadInputDataError,
  [EServiceErrorStatus.ERR_ACCESS_FORBIDDEN]: AccessForbiddenError,
  [EServiceErrorStatus.ERR_UNKNOWN]: UnknownError
};
