import { ERROR_CATEGORY } from "../enums/error.enum";
import { ServeError } from "./error.helper";

/**
 * ValidationError - Thrown when request input validation fails
 * 
 * This error is automatically thrown by CommonDTO.throwValidationError()
 * when Zod schema validation fails. It provides structured validation
 * error details with field-level messages.
 * 
 * @example
 * ```typescript
 * throw new ValidationError('Validation failed', [
 *   { field: 'email', message: 'Invalid email format' },
 *   { field: 'age', message: 'Must be greater than 0' }
 * ]);
 * ```
 * 
 * HTTP Response: 400 Bad Request
 */
export class ValidationError extends ServeError {
  readonly code: string = "VALIDATION_ERROR";
  readonly category: ERROR_CATEGORY = ERROR_CATEGORY.VALIDATION;
  readonly httpStatus: number = 400;
  readonly publicMessage: string;
  readonly internalMessage: string;

  constructor(message: string = "error.validation_failed", details?: unknown) {
    super(details);
    this.publicMessage = message;
    this.internalMessage = "Request validation failed";
    this.name = "ValidationError";
  }
}
