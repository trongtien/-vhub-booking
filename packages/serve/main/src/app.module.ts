import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './interceptor/trace.interceptor';
import { LogHttpInterceptor } from './interceptor/log-http.interceptor';
import { AppMasterDataModule } from './app-mater-data/app-master-data.module';
import { DatabaseModule } from './database.module';
import { LoggerModule } from './logger.module';
import { ConfigEnvModule } from './config.module';

@Module({
    imports: [
        ConfigEnvModule,
        LoggerModule,
        DatabaseModule,
        AppMasterDataModule
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
