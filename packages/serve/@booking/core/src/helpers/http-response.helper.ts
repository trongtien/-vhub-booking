import { RequestContext } from "./context-request.helper";
import { ServeError } from "./error.helper";

import type { ResponseMeta } from "../types/http-response.type";

class HttpResponseCommon<T> {
  constructor(
    readonly success: boolean,
    readonly http_status: number,
    readonly data: T | null,
    readonly error: null | {
      code: string;
      message: string;
      details?: unknown;
    },
    readonly meta: ResponseMeta,
  ) {}
}

export class HttpResponse {
  static success<T>(data: T | null): HttpResponseCommon<T> {
    return new HttpResponseCommon(true, 200, data, null, HttpResponse.getCtxMeta());
  }

  static error(error: ServeError | {
    code: string;
    publicMessage: string;
    details?: unknown;
    httpStatus?: number;
  }): HttpResponseCommon<null> {
    const httpStatus = ('httpStatus' in error && error.httpStatus) ? error.httpStatus : 500;
    return new HttpResponseCommon(
      false,
      httpStatus,
      null,
      {
        code: error.code,
        message: error.publicMessage,
        details: error.details,
      },
      HttpResponse.getCtxMeta(),
    );
  }

  static errorMapper(error: ServeError) {
    return {
      status: error.httpStatus,
      body: HttpResponse.error(error),
    };
  }

  private static getCtxMeta(): ResponseMeta {
    try {
      const ctx = RequestContext.current();
      return {
        ...ctx,
        timestamp: new Date().toISOString(),
      };
    } catch {
      // Fallback when context is not available (e.g., during early bootstrap errors)
      return {
        requestId: 'unknown',
        apiVersion: 'v1',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
