import { ArgumentsHost, ExceptionFilter, Catch } from '@nestjs/common';
import { ServeError } from '@booking/serve-core';

@Catch()
export class HttpFilterError implements ExceptionFilter {
  catch(error: Error | ServeError, host: ArgumentsHost) {
    console.error('==> HttpFilterError caught:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      isServeError: error instanceof ServeError,
    });
    
    const reply = host.switchToHttp().getResponse();
    if (error instanceof ServeError) {
      return reply.status(error.httpStatus).send({
        success: false,
        error: {
          code: error.code,
          message: error.publicMessage || error.message,
          internalMessage: error.internalMessage,
          name: error.name,
        },
      });
    }

    return reply.status(500).send({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'internal.error',
        name: error.name || 'Error',
      },
    });
  }
}
