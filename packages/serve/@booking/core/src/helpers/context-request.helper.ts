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

  /**
   * Get current context or return undefined if not available
   * Use this for optional context access
   */
  static currentOrUndefined(): RequestContextMeta | undefined {
    return this.store.getStore();
  }

  /**
   * Express/Connect middleware for setting up request context
   */
  static middleware(req: any, res: any, next: any) {
    const requestId = req.headers["x-request-id"] ?? req.id ?? generateRequestId();
    const traceId = req.headers["x-trace-id"] ?? generateRequestId();
    const tenantId = req.headers["x-tenant-id"];
    const apiVersion = req.headers["x-api-version"] || "v1";

    // Set response headers
    if (res.header) {
      res.header("x-trace-id", traceId);
      res.header("x-request-id", requestId);
    } else if (res.setHeader) {
      res.setHeader("x-trace-id", traceId);
      res.setHeader("x-request-id", requestId);
    }

    RequestContext.run(
      {
        requestId: requestId,
        traceId: traceId,
        tenantId: tenantId,
        apiVersion: apiVersion,
        userId: req.user?.id,
      },
      () => next(),
    );
  }

  /**
   * Fastify hook for setting up request context
   */
  static fastifyHook(req: any, reply: any, done: any) {
    const requestId = req.headers["x-request-id"] ?? req.id ?? generateRequestId();
    const traceId = req.headers["x-trace-id"] ?? generateRequestId();
    const tenantId = req.headers["x-tenant-id"];
    const apiVersion = req.headers["x-api-version"] || "v1";

    // Set response headers
    reply.header("x-trace-id", traceId);
    reply.header("x-request-id", requestId);

    RequestContext.run(
      {
        requestId: requestId,
        traceId: traceId,
        tenantId: tenantId,
        apiVersion: apiVersion,
        userId: req.user?.id,
      },
      () => done(),
    );
  }
}
