import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '@booking/serve-core';

@Injectable()
export class LogHttpInterceptor implements NestInterceptor {
  constructor(@Inject('LoggerAdapter') private readonly logger: Logger) {}

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
