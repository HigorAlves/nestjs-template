import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/api/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.enableCors();
  Logger.log(`🚀 Server running on http://localhost:3000`, 'Bootstrap');
}

bootstrap();
