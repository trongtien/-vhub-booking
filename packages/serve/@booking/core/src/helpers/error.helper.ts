import { ERROR_CATEGORY } from "../enums/error.enum";

export abstract class ServeError extends Error {
    abstract code: string;
    abstract category: ERROR_CATEGORY;
    abstract httpStatus: number;

    abstract publicMessage: string;
    abstract internalMessage: string;

    readonly details?: unknown;

    protected constructor(details?: unknown) {
        super()
        this.details = details;
        this.stack = details as string
    }
}

export const ErrorCataLog = {
    DB_CONNECT_TIME_OUT: {
        category: ERROR_CATEGORY.NOT_FOUND,
        httpStatus: 404,
        retryable: false,
        severity: "LOW",
        owner: "identity-team",
    },
} as const;
