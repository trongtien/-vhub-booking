export interface LogMeta {
    requestId?: string;
    traceId?: string;
    tenantId?: string;
    userId?: string;
    errorCode?: string;
    [key: string]: unknown;
}

export interface Logger {
    trace(message: string, meta?: LogMeta): void;
    debug(message: string, meta?: LogMeta): void;
    info(message: string, meta?: LogMeta): void;
    warn(message: string, meta?: LogMeta): void;
    error(message: string, meta?: LogMeta): void;
    fatal(message: string, meta?: LogMeta): void;
}
