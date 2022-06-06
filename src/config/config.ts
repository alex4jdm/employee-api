// tslint:disable-next-line:typedef
export const config = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10),
  GLOBAL_API_PREFIX: process.env.GLOBAL_API_PREFIX,
  API_DOC: {
    PATH: process.env.API_DOC_PATH,
  },
  FILE: {
    INTERNAL: process.env.INTERNAL_UPLOAD_ROOT,
    EXTERNAL: process.env.EXTERNAL_UPLOAD_ROOT,
    SETTINGS: process.env.SETTINGS_FOLDER,
    DEFAULTS: process.env.DEFAULTS_FOLDER,
  },
  DB: {
    CONNECTION_STRING: process.env.DB_CONNECTION_STRING,

    AUTO_SYNC: !!parseInt(process.env.DB_AUTO_SYNC, 10) || false,
    TYPE: process.env.DB_TYPE,
  },
  MAIL: {
    SERVER: {
      TRANSPORT: process.env.MAIL_SERVER_TRANSPORT,
    },
    FROM: process.env.MAIL_FROM,
    CLIENT_ID: process.env.MAIL_CLIENT_ID,
    CLIENT_SECRET: process.env.MAIL_CLIENT_SECRET,
    REFRESH_TOKEN: process.env.MAIL_REFRESH_TOKEN,
    USER: process.env.MAIL_USER,
  },
  STRIPE:{
    SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  SECURITY: {
    JWT_ACCESS_SECRET: process.env.SECURITY_ACCESS_JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.SECURITY_REFRESH_JWT_SECRET,
    PASSWORD_SALT_ROUND: process.env.SECURITY_PASSWORD_SALT_ROUND,
    ACTIVATION_TOKEN_EXPIRED: process.env.SECURITY_ACTIVATION_TOKEN_EXPIRED, // like '15h', '30d' etc...
    ACCESS_TOKEN_EXPIRED: process.env.SECURITY_ACCESS_TOKEN_EXPIRED, // like '15h', '30d' etc...
    REFRESH_TOKEN_EXPIRED: process.env.SECURITY_REFRESH_TOKEN_EXPIRED, // like '15h', '30d' etc...
    RESET_PASSWORD_TOKEN_EXPIRED: process.env.SECURITY_RESET_PASSWORD_TOKEN_EXPIRED, // like '15h', '30d' etc...
  },
  USER: {
    RESET_PASSWORD_CALLBACK: process.env.USER_RESET_PASSWORD_CALLBACK,
    ACTIVATE_ACCOUNT_CALLBACK: process.env.USER_ACTIVATE_ACCOUNT_CALLBACK,
  },
  ZIP_CODE: {
    API_KEY: process.env.ZIP_CODE_API_KEY,
  }
});
