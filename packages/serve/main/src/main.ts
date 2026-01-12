import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpFilterError } from './filter/http-error.filter';
import { FastifyConfigApp } from './fastify-config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyConfigApp(),
  );

  app.enableShutdownHooks();
  app.enableCors();
  app.useGlobalFilters(new HttpFilterError());

  await app.listen(3001, '0.0.0.0');
}

bootstrap();
