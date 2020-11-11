import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'

import { AppModule } from '~/api/app.module'
import { SENTRY } from '~/constants'

async function bootstrap() {
  Sentry.init({ dsn: SENTRY.dsn })
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT || 8080)
  app.enableCors()
  Logger.log(`🚀 Server running on http://localhost:5000`, 'BOOTSTRAP')
}

bootstrap()
