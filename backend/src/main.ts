import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(path.join(process.cwd(),'uploads'), {
      index: false,
      prefix: '/uploads',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

