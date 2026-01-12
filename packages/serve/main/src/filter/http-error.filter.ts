import { ArgumentsHost, ExceptionFilter, Catch } from '@nestjs/common';
import { ServeError } from '@booking/serve-core';

@Catch()
export class HttpFilterError implements ExceptionFilter {
  catch(error: Record<string, string | number>, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse();
    if (error instanceof ServeError) {
      return reply.status(error.httpStatus).send({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          traceId: error.traceId,
        },
      });
    }

    return reply.status(500).send({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal.error',
      },
    });
  }
}
