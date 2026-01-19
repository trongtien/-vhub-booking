import z from "zod";
import type { TErrorResponse } from "../types";
import { ValidationError } from "../helpers";

export abstract class CommonDTO<T> {
    abstract schema: z.ZodTypeAny;

    validate(value: z.infer<typeof this.schema>) {
        const result = this.schema.parse(value);
        return result;
    }

    throwValidationError(zodError: z.ZodError): never {
        const errors = zodError.issues.map((i: z.ZodIssue) => {
            return {
                field: i.path.join("."),
                code: i.code,
                message: i.message,
            };
        });

        throw new ValidationError("error.validation_failed", errors);
    }

    abstract fromUseCase(value: z.infer<typeof this.schema>): T;
}
