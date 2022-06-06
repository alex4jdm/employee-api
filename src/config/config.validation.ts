import * as Joi from 'joi';
import { EConfigEnvironment, EDbType } from 'src/common/enums';

export const configSchemaValidation: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(EConfigEnvironment))
    .required(),
  PORT: Joi.number().required(),
  API_DOC_PATH: Joi.string().required(),

  DB_TYPE: Joi.string()
    .valid(...Object.values(EDbType))
    .required(),
  DB_AUTO_SYNC: Joi.alternatives().try(Joi.boolean(), Joi.number().min(0).max(1)).required(),
  DB_CONNECTION_STRING: Joi.string().min(1).max(1024).required(),

  SECURITY_ACCESS_JWT_SECRET: Joi.string().min(1).max(1024).required(),
  SECURITY_REFRESH_JWT_SECRET: Joi.string().min(1).max(1024).required(),
  SECURITY_ACCESS_TOKEN_EXPIRED: Joi.string().min(1).max(10).required(),
  SECURITY_REFRESH_TOKEN_EXPIRED: Joi.string().min(1).max(10).required(),
  SECURITY_RESET_PASSWORD_TOKEN_EXPIRED: Joi.string().min(1).max(10).required(),
  SECURITY_ACTIVATION_TOKEN_EXPIRED: Joi.string().min(1).max(10).required(),
  SECURITY_PASSWORD_SALT_ROUND: Joi.number().required(),
});
