import { CommonDTO } from '@booking/serve-core';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import z from 'zod';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
    constructor(private commonDto: CommonDTO<T>) { }

    transform(value: z.infer<typeof this.commonDto.schema>) {
        try {
            this.commonDto.validate(value);

            const transformValue = this.commonDto.fromUseCase(value);
            return transformValue;
        } catch (error) {
            return this.commonDto.throwValidationError(error as z.ZodError);
        }
    }
}
