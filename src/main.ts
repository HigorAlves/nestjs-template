import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'

import { AppModule } from '~/api/app.module'
import { SENTRY } from '~/constants'

async function bootstrap() {
  const PORT = process.env.PORT || 8080
  const app = await NestFactory.create(AppModule)

  await app.listen(PORT)

  Sentry.init({ dsn: SENTRY.dsn })
  app.enableCors()
  Logger.log(`🚀 Server running on http://localhost:${PORT}`, 'BOOTSTRAP')
}

bootstrap()
