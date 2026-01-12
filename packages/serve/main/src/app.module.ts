import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './interceptor/trace.interceptor';
import { LoggerAdapter } from '@booking/serve-core';
import { LogHttpInterceptor } from './interceptor/log-http.interceptor';

@Module({
  providers: [
    {
      provide: 'LoggerAdapter',
      useFactory: () => new LoggerAdapter(LoggerAdapter.TERMINAL_LOGGER),
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
export class AppModule {}
