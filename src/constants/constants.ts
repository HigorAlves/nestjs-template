import * as Dotenv from 'dotenv';
Dotenv.config();

export const TYPEORM = {
  authSource: process.env.TYPEORM_AUTHSOURCE,
  url: process.env.TYPEORM_DATABASE_URL,
  database: process.env.TYPEORM_DATABASE,
  synchronize: Boolean(process.env.TYPEORM_SYNCRONIZE),
  logging: Boolean(process.env.TYPEORM_LOGGING),
};

export const JWT = {
  secret: process.env.JWT_SECRET,
};
