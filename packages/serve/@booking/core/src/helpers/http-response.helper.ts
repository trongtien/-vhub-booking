import { RequestContext } from "./context-request.helper";
import { ServeError } from "./error.helper";

import type { ResponseMeta } from "../types/http-response.type";

class HttpResponseCommon<T> {
  constructor(
    readonly success: boolean,
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
    return new HttpResponseCommon(true, data, null, HttpResponse.getCtxMeta());
  }

  static error(error: ServeError): HttpResponseCommon<null> {
    return new HttpResponseCommon(
      false,
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
    const ctx = RequestContext.current();
    return {
      ...ctx,
      timestamp: new Date().toISOString(),
    };
  }
}
