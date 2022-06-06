import { EXPOSED_HEADERS } from './main.contants';

export const helmetConfig = {
  referrerPolicy: { policy: 'no-referrer' },
};

export const corsConfig = {
  exposedHeaders: EXPOSED_HEADERS
};

export const filesPath = `${__dirname.replace('dist', '')}files/`

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Business cards API',
    description: 'Business cards API',
    version: '1.0',
  },
};
