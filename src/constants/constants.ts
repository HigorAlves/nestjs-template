import * as Dotenv from 'dotenv';

const dotenv = Dotenv.config().parsed;

export const TYPEORM = {
  authSource: dotenv.TYPEORM_AUTHSOURCE
    ? dotenv.TYPEORM_AUTHSOURCE
    : process.env.TYPEORM_AUTHSOURCE,
  url: dotenv.TYPEORM_DATABASE_URL
    ? dotenv.TYPEORM_DATABASE_URL
    : process.env.TYPEORM_DATABASE_URL,
  database: dotenv.TYPEORM_DATABASE
    ? dotenv.TYPEORM_DATABASE
    : process.env.TYPEORM_DATABASE,
  synchronize: Boolean(
    dotenv.TYPEORM_SYNCRONIZE
      ? dotenv.TYPEORM_SYNCRONIZE
      : process.env.TYPEORM_SYNCRONIZE,
  ),
  logging: Boolean(
    dotenv.TYPEORM_LOGGING
      ? dotenv.TYPEORM_SYNCRONIZE
      : process.env.TYPEORM_LOGGING,
  ),
};

export const JWT = {
  secret: dotenv.JWT_SECRET ? dotenv.JWT_SECRET : process.env.JWT_SECRET,
};
