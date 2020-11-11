import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '~/api/auth/auth.module'
import { UserModule } from '~/api/user/user.module'
import { typeormConfig } from '~/config/typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
