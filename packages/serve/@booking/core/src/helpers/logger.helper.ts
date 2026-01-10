import winston from "winston";
import { Logger } from "../types/logger.type";
import { RequestContext } from "./context-request.helper";

export class LoggerAdapter implements Logger {
    static TERMINAL_LOGGER = winston.createLogger({
        level: process.env.LOG_LEVEL ?? "info",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            process.env.NODE_ENV === "production"
                ? winston.format.json()
                : winston.format.printf(({ level, message, timestamp, ...meta }) => {
                    return `[${timestamp}] ${level.toUpperCase()} ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""
                        }`;
                }),
        ),
        transports: [new winston.transports.Console()],
    });

    constructor(private readonly logger: any) { }

    static enrichMeta(meta?: any) {
        const ctx = RequestContext.current();
        return { ...ctx, ...meta };
    }

    info(msg: string, meta?: any) {
        this.logger.info(msg, meta);
    }

    error(msg: string, meta?: any) {
        this.logger.error(msg, meta);
    }

    debug(msg: string, meta?: any) {
        this.logger.debug(msg, meta);
    }

    warn(msg: string, meta?: any) {
        this.logger.warn(msg, meta);
    }

    trace(msg: string, meta?: any) {
        this.logger.verbose(msg, meta);
    }

    fatal(msg: string, meta?: any) {
        this.logger.error(msg, { ...meta, fatal: true });
        process.exit(1);
    }
}
