import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM } from '@/constants';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  entities: ['dist/**/*.entity.js'],
  useNewUrlParser: true,
  ssl: true,
  useUnifiedTopology: true,
  authSource: TYPEORM.authSource,
  url: TYPEORM.url,
  database: TYPEORM.database,
  synchronize: TYPEORM.synchronize,
  logging: TYPEORM.logging,
};
