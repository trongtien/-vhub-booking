import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerAdapter } from '@booking/serve-core';

@Injectable()
export class LogHttpInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerAdapter) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.info('==> HTTP_REQUEST', {
          context: 'HTTP',
          data: {
            method: req.method,
            url: req.url,
            durationMs: Date.now() - start,
          },
        });
      }),
    );
  }
}
