import { v4 as uuid } from "uuid";
import { AsyncLocalStorage } from "node:async_hooks";
import type { RequestContextMeta } from "../types/context-request.type";

export function generateRequestId(): string {
  return uuid();
}

export class RequestContext {
  private static store = new AsyncLocalStorage<RequestContextMeta>();

  static run<T>(ctx: RequestContextMeta, fn: () => T): T {
    return this.store.run(ctx, fn);
  }

  static current(): RequestContextMeta {
    const ctx = this.store.getStore();
    if (!ctx) {
      throw new Error("Request context not installed");
    }
    return ctx;
  }

  static middleware(req: any, _res: any, next: any) {
    const requestId = req.headers["x-request-id"] ?? generateRequestId();
    const traceId = req.headers["x-trace-id"] ?? generateRequestId();
    const tenantId = req.headers["x-tenant-id"];
    const version = req.headers["x-api-version"] || "1.0";

    _res.header("x-trace-id", traceId);
    _res.header("x-request-id", requestId);

    RequestContext.run(
      {
        requestId: requestId,
        traceId: traceId,
        tenantId: tenantId,
        version: version,
        userId: req.user?.id,
      },
      () => next(),
    );
  }
}
