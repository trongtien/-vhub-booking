import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpFilterError } from './filter/http-error.filter';
import { FastifyConfigApp } from './utils/fastify-config';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyConfigApp(),
    );

    const config = app.get(ConfigService)
    const appPort = config.get<number>('app.port') || 3001
    const appHost = config.get<string>('app.host') || '0.0.0.0'

    app.enableShutdownHooks();
    app.enableCors();
    app.useGlobalFilters(new HttpFilterError());

    await app.listen(appPort, appHost);
}

bootstrap();
