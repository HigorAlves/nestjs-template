import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Dotenv from 'dotenv';

const dotenv = Dotenv.config().parsed;

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  entities: ['dist/**/*.entity.js'],
  useNewUrlParser: true,
  ssl: true,
  useUnifiedTopology: true,
  authSource: dotenv.TYPEORM_AUTHSOURCE,
  url: dotenv.TYPEORM_DATABASE_URL,
  database: dotenv.TYPEORM_DATABASE,
  synchronize: Boolean(dotenv.TYPEORM_SYNCRONIZE),
  logging: Boolean(dotenv.TYPEORM_LOGGING),
};
