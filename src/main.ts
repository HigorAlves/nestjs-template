import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as Sentry from '@sentry/node'
import * as csurf from 'csurf'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

import { join } from 'path'

import { AppModule } from '~/api/app.module'
import { SENTRY, PORT } from '~/constants'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setViewEngine('hbs')
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.use(helmet())
  app.use(csurf())
  app.enableCors()
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  )

  await app.listen(PORT)
  Sentry.init({ dsn: SENTRY.dsn })
  Logger.log(`🚀 Server running on ${await app.getUrl()}`, 'BOOTSTRAP')
}

bootstrap()
