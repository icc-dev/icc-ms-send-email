import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('icc/ms/services/mail');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(8080);
}
bootstrap();
