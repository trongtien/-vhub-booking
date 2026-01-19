import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpFilterError } from './filter/http-error.filter';
import { FastifyConfigApp } from './utils/fastify-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyConfigApp(),
    );

    const config = app.get(ConfigService)
    const appPort = config.get<number>('app.port') || 3001
    const appHost = config.get<string>('app.host') || '0.0.0.0'

    // Swagger configuration
    const swaggerConfig = new DocumentBuilder()
        .setTitle('VHub Booking API')
        .setDescription('The VHub Booking API documentation')
        .setVersion('1.0')
        .addTag('tenants')
        .addTag('users')
        .addTag('roles')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs/api', app, document);

    app.enableShutdownHooks();
    app.enableCors();
    app.useGlobalFilters(new HttpFilterError());

    await app.listen(appPort, appHost);
}

bootstrap();
