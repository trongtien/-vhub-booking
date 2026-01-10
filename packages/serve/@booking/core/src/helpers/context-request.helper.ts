import { v4 as uuid } from "uuid";
import { AsyncLocalStorage } from "node:async_hooks"
import type { RequestContextMeta } from "../types/context-request.type";

export class RequestContext {
    private static store = new AsyncLocalStorage<RequestContextMeta>()

    static run<T>(ctx: RequestContextMeta, fn: () => T): T {
        return this.store.run(ctx, fn)
    }

    static current(): RequestContextMeta {
        const ctx = this.store.getStore()
        if (!ctx) {
            throw new Error("Request context not installed")
        }
        return ctx
    }

    static middleware(req: any, _res: any, next: any) {
        RequestContext.run(
            {
                requestId: req.headers["x-request-id"] ?? uuid(),
                traceId: req.headers["x-trace-id"] ?? uuid(),
                tenantId: req.headers["x-tenant-id"],
                version: req.headers["x-api-version"] || "1.0",
                userId: req.user?.id,
            },
            () => next(),
        );
    }
}
