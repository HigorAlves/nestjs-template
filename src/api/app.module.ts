import { typeormConfig } from '@/config/typeorm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from 'src/api/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './services/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UserModule,
    ServiceModule,
  ],
})
export class AppModule {}
