import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/api/app.module';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SENTRY } from '@/constants';

async function bootstrap() {
  Sentry.init({ dsn: SENTRY.dsn });
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8080);
  app.enableCors();
  Logger.log(`🚀 Server running on http://localhost:5000`, 'BOOTSTRAP');
}

bootstrap();
