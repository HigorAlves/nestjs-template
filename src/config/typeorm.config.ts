import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:
    'mongodb://admin:02051996@cluster-shard-00-00.l9dc2.mongodb.net:27017,cluster-shard-00-01.l9dc2.mongodb.net:27017,cluster-shard-00-02.l9dc2.mongodb.net:27017/test?ssl=true&replicaSet=atlas-phehkm-shard-0&authSource=admin&retryWrites=true&w=majority',
  database: 'test',
  authSource: 'admin',
  entities: ['dist/**/*.entity.js'],
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  ssl: true,
  useUnifiedTopology: true,
};
