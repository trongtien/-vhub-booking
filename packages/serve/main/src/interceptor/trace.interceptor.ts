import { RequestContext } from '@booking/serve-core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return new Observable((subscriber) => {
      RequestContext.middleware(req, res, async () => {
        next.handle().subscribe(subscriber);
      });
    });
  }
}
