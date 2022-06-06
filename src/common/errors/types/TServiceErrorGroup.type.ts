import { EServiceErrorStatus } from '../enums';
import ServiceError from '../ServiceError.error';

export type TServiceErrorGroup = {
  [key in EServiceErrorStatus]: typeof ServiceError;
};
