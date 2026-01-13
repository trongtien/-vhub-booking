import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './interceptor/trace.interceptor';
import { LoggerAdapter, registerConnectionKnex, schemaConfig, getCwdRoot } from '@booking/serve-core';
import { LogHttpInterceptor } from './interceptor/log-http.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_DATABASE_CONNECTION } from './utils/symbol-provider';
import { appConfig, databaseConfig } from './utils/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: ['../../../.env.local', '.env.local'],
            expandVariables: true,
            ignoreEnvFile: false,
            load: [appConfig, databaseConfig],
        }),
    ],
    providers: [
        {
            provide: LoggerAdapter,
            useFactory: () => new LoggerAdapter(LoggerAdapter.TERMINAL_LOGGER),
        },
        {
            provide: APP_DATABASE_CONNECTION,
            inject: [ConfigService, LoggerAdapter],
            useFactory: (config: ConfigService, logger: LoggerAdapter) => registerConnectionKnex({
                database: config.get<string>('databaseConfig.database'),
                host: config.get<string>('databaseConfig.host'),
                port: config.get<number>('databaseConfig.port'),
                user: config.get<string>('databaseConfig.user'),
                password: config.get<string>('databaseConfig.password'),
            }, logger),
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TraceInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LogHttpInterceptor,
        },
    ],
})
export class AppModule { }
