# Error Handling Architecture

## Overview
This project implements a standardized error handling system using custom `ServeError` classes and a global exception filter.

## Architecture Components

### 1. Base Error Classes

#### `ServeError` (Abstract Base Class)
Located in `@booking/serve-core/helpers/error.helper.ts`

```typescript
abstract class ServeError extends Error {
  abstract code: string;
  abstract category: ERROR_CATEGORY;
  abstract httpStatus: number;
  abstract publicMessage: string;
  abstract internalMessage: string;
  readonly details?: unknown;
}
```

#### `ValidationError` (Validation Errors)
Located in `@booking/serve-core/helpers/validation.error.ts`

```typescript
class ValidationError extends ServeError {
  code: "VALIDATION_ERROR";
  category: ERROR_CATEGORY.VALIDATION;
  httpStatus: 400;
  publicMessage: string;
  internalMessage: string;
}
```

### 2. Error Categories

```typescript
enum ERROR_CATEGORY {
  DOMAIN = "DOMAIN",           // Business logic errors
  VALIDATION = "VALIDATION",   // Input validation errors
  AUTH = "AUTH",              // Authentication errors
  PERMISSION = "PERMISSION",   // Authorization errors
  CONFLICT = "CONFLICT",       // Resource conflicts
  NOT_FOUND = "NOT_FOUND",    // Resource not found
  INFRA = "INFRA",            // Infrastructure errors (DB, cache, etc.)
  DEPENDENCY = "DEPENDENCY",   // External service errors
  RATE_LIMIT = "RATE_LIMIT",  // Rate limiting
  UNKNOWN = "UNKNOWN"          // Unknown errors
}
```

### 3. Global Exception Filter

`HttpFilterError` in `src/filter/http-error.filter.ts` catches all errors and formats them consistently:

```typescript
@Catch()
export class HttpFilterError implements ExceptionFilter {
  catch(error: Error | ServeError | HttpException, host: ArgumentsHost) {
    // 1. Handle custom ServeError
    if (error instanceof ServeError) {
      const mapped = HttpResponse.errorMapper(error);
      return reply.status(mapped.status).send(mapped.body);
    }
    
    // 2. Handle NestJS HttpException
    if (error instanceof HttpException) {
      // ... format and send
    }
    
    // 3. Handle unknown errors
    // ... log and send 500
  }
}
```

### 4. Response Format

All errors return a consistent format:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "businessName",
        "message": "Required"
      }
    ]
  },
  "meta": {
    "requestId": "uuid",
    "traceId": "trace-id",
    "tenantId": "tenant-id",
    "version": "1.0.0",
    "timestamp": "2026-01-19T10:00:00.000Z"
  }
}
```

## Usage Patterns

### 1. Creating Custom Errors

```typescript
// In your domain/errors folder
export class TenantNotFoundError extends ServeError {
  readonly code: string = "TENANT_NOT_FOUND";
  readonly category: ERROR_CATEGORY = ERROR_CATEGORY.NOT_FOUND;
  readonly httpStatus: number = 404;
  readonly publicMessage: string = "Tenant not found";
  readonly internalMessage: string = "Tenant with given ID does not exist";

  constructor(tenantId: string) {
    super({ tenantId });
    this.name = "TenantNotFoundError";
  }
}
```

### 2. Throwing Errors in Use Cases

```typescript
export class GetTenantByIdUseCase {
  async execute(tenantId: string) {
    const tenant = await this.repository.findById(tenantId);
    
    if (!tenant) {
      throw new TenantNotFoundError(tenantId);
    }
    
    return tenant;
  }
}
```

### 3. Validation with Zod

```typescript
// In DTO
export class CreateTenantDTO extends CommonDTO<ICreateTenantUseCase> {
  schema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    taxCode: z.string().min(1, "Tax code is required"),
  });

  fromUseCase(value: z.infer<typeof this.schema>) {
    return {
      businessName: value.businessName,
      taxCode: value.taxCode,
    };
  }
}

// In Controller
@Post()
async createTenant(
  @Body(new ZodValidationPipe(CreateTenantValidate))
  request: ICreateTenantUseCase
) {
  // request is already validated and transformed
  return await this.createTenantUseCase.execute(request);
}
```

### 4. Validation Pipe Flow

1. `ZodValidationPipe` receives raw request body
2. Calls `commonDto.validate(value)` which runs `schema.parse()`
3. If validation fails, Zod throws `ZodError`
4. Pipe catches `ZodError` and calls `commonDto.throwValidationError()`
5. `throwValidationError()` throws `ValidationError` with formatted details
6. `HttpFilterError` catches `ValidationError` and formats response

## Best Practices

### ✅ DO

1. **Always extend ServeError** for domain errors
2. **Use specific error codes** (e.g., `TENANT_NOT_FOUND`, not `NOT_FOUND`)
3. **Provide meaningful publicMessage** for clients
4. **Include context in details** (e.g., IDs, failed constraints)
5. **Use appropriate ERROR_CATEGORY** for error classification
6. **Document error responses** in Swagger decorators

```typescript
@ApiResponse({ status: 404, description: 'Tenant not found' })
@ApiResponse({ status: 400, description: 'Validation error' })
```

### ❌ DON'T

1. **Don't throw generic Error** - use ServeError subclasses
2. **Don't expose sensitive info** in publicMessage
3. **Don't use plain status codes** without error objects
4. **Don't catch errors without rethrowing** unless handled
5. **Don't return errors directly** - always throw them

## Error Flow Diagram

```
Request → Controller → Pipe → Use Case → Repository
   ↓          ↓         ↓         ↓           ↓
Error ← ValidationError ← BusinessError ← DatabaseError
   ↓
HttpFilterError (Global Filter)
   ↓
Format with HttpResponse.errorMapper()
   ↓
Send Standardized JSON Response
```

## Testing Errors

```typescript
describe('CreateTenantUseCase', () => {
  it('should throw ValidationError for invalid input', async () => {
    await expect(
      useCase.execute({ businessName: '' })
    ).rejects.toThrow(ValidationError);
  });

  it('should throw TenantNotFoundError when tenant does not exist', async () => {
    await expect(
      useCase.execute('non-existent-id')
    ).rejects.toThrow(TenantNotFoundError);
  });
});
```

## Configuration

The global filter is registered in `app.module.ts`:

```typescript
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpFilterError,
    },
  ],
})
export class AppModule {}
```

## Monitoring & Logging

All errors are automatically logged with context:
- Request ID
- Trace ID
- Tenant ID (if available)
- Error stack trace (in development)
- Error details

Use this information for:
- Debugging production issues
- Error rate monitoring
- Alert configuration
- Performance analysis
