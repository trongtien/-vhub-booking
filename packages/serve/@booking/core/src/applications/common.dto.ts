import z from "zod";
import type { TErrorResponse } from "../types";
import { HttpResponse, ServeError } from "../helpers";

export abstract class CommonDTO<T> {
    abstract schema: z.ZodTypeAny;

    validate(value: z.infer<typeof this.schema>) {
        const result = this.schema.parse(value)
        return result
    }

    throwValidationError(zodError: z.ZodError) {
        const errors = zodError.issues.map((err: z.ZodIssue) => {
            const field = err.path.join('.') || 'root';
            return {
                field,
                message: err.message
            };
        });

        return HttpResponse.error({
            code: 'VALIDATION_ERROR',
            publicMessage: 'Validation error',
            details: errors,
            httpStatus: 400,
            category: 'VALIDATION',
        })
    }

    abstract fromUseCase(value: z.infer<typeof this.schema>): T
}
