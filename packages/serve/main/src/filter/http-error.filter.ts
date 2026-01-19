import { ArgumentsHost, ExceptionFilter, Catch, HttpException } from '@nestjs/common';
import { ServeError, HttpResponse } from '@booking/serve-core';

/**
 * HttpFilterError - Global exception filter for standardized error handling
 * 
 * This filter catches all exceptions and formats them into a consistent
 * response structure with proper HTTP status codes and error details.
 * 
 * Handles three types of errors:
 * 1. ServeError - Custom business/domain errors with predefined status codes
 * 2. HttpException - NestJS built-in exceptions (e.g., NotFoundException)
 * 3. Unknown errors - Any other unhandled exceptions
 * 
 * All responses include:
 * - success: false
 * - data: null
 * - error: { code, message, details }
 * - meta: { requestId, traceId, tenantId, version, timestamp }
 * 
 * @example Response format:
 * ```json
 * {
 *   "success": false,
 *   "data": null,
 *   "error": {
 *     "code": "VALIDATION_ERROR",
 *     "message": "Validation failed",
 *     "details": [{ "field": "email", "message": "Invalid format" }]
 *   },
 *   "meta": {
 *     "requestId": "uuid",
 *     "timestamp": "2026-01-19T10:00:00.000Z"
 *   }
 * }
 * ```
 */
@Catch()
export class HttpFilterError implements ExceptionFilter {
  /**
   * Catches and handles all exceptions
   * @param error - The caught exception
   * @param host - ArgumentsHost for accessing request/response
   */
  catch(error: Error | ServeError | HttpException, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse();

    // Handle ServeError (custom business errors)
    if (error instanceof ServeError) {
      const mapped = HttpResponse.errorMapper(error);
      return reply.status(mapped.status).send(mapped.body);
    }

    // Handle NestJS HttpException (validation, not found, etc.)
    if (error instanceof HttpException) {
      const status = error.getStatus();
      const response = error.getResponse() as any;
      
      return reply.status(status).send(
        HttpResponse.error({
          code: response.error || 'HTTP_EXCEPTION',
          publicMessage: response.message || error.message,
          details: response.details || undefined,
        })
      );
    }

    // Handle unknown errors
    console.error('Unhandled error:', error);
    return reply.status(500).send(
      HttpResponse.error({
        code: 'INTERNAL_SERVER_ERROR',
        publicMessage: 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      })
    );
  }
}
