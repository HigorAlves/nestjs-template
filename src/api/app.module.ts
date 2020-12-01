import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from '~/api/auth/auth.module'
import { UserModule } from '~/api/user/user.module'
import ENV_CONFIG from '~/config/configuration'
import { MONGO_DB_CONFIG } from '~/config/mongoose.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.production.env', '.env'],
      load: [ENV_CONFIG],
      isGlobal: true
    }),
    MongooseModule.forRoot(MONGO_DB_CONFIG.url, {
      useNewUrlParser: true,
      useCreateIndex: true
    }),
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
