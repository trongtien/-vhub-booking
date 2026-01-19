import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './interceptor/trace.interceptor';
import { LogHttpInterceptor } from './interceptor/log-http.interceptor';
import { DatabaseModule } from './database.module';
import { LoggerModule } from './logger.module';
import { ConfigEnvModule } from './config.module';
import { AppIdentityModule } from './app-identity/app-identity.module'
@Module({
    imports: [
        ConfigEnvModule,
        LoggerModule,
        DatabaseModule,
        AppIdentityModule
    ],
    providers: [
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
