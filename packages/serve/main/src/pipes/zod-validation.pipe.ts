import { CommonDTO } from '@booking/serve-core';
import { PipeTransform, Injectable } from '@nestjs/common';
import z from 'zod';

/**
 * ZodValidationPipe - NestJS pipe for validating and transforming request data using Zod schemas
 * 
 * This pipe integrates with CommonDTO to provide:
 * - Automatic schema validation using Zod
 * - Type-safe transformation from DTO to use case input
 * - Consistent error formatting via ValidationError
 * 
 * @template T - The target type after transformation
 * 
 * @example
 * ```typescript
 * @Post()
 * async createUser(
 *   @Body(new ZodValidationPipe(CreateUserValidate)) 
 *   request: ICreateUserInput
 * ) {
 *   // request is already validated and transformed
 *   return this.useCase.execute(request);
 * }
 * ```
 */
@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
    constructor(private readonly commonDto: CommonDTO<T>) { }

    /**
     * Validates and transforms the input value
     * @param value - Raw input from request body
     * @returns Validated and transformed value of type T
     * @throws {ValidationError} When validation fails
     */
    transform(value: z.infer<typeof this.commonDto.schema>): T {
        try {
            const validated = this.commonDto.validate(value);
            return this.commonDto.fromUseCase(validated);
        } catch (error) {
            if (error instanceof z.ZodError) {
                this.commonDto.throwValidationError(error);
            }
            throw error;
        }
    }
}
