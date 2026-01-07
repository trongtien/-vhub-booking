import { HttpCode, HttpMessage } from './contants';
import type {
    HttpResponseType,
    HttpResponseMetaType,
    HttpValidateError,
} from './type';

export class Response {
    private code: string = 'unknown';
    private message: string = 'unknown';
    private data: unknown | null;
    private error?: Error | unknown
    private meta?: HttpResponseMetaType | null;

    setData<T>(data: T) {
        this.data = data
        return this
    }

    setCode(code: string) {
        this.code = code
        return this
    }

    setMessage(message: string) {
        this.message = message
        return this
    }

    setError(error?: Error  | unknown) {
        this.error = error
        return this
    }

    setMeta(meta?: HttpResponseMetaType | null) {
        this.meta = meta
        return this
    }

    private initContructor(config?: HttpResponseType<unknown>) {
        if (!config) return;

        const { message, code, data, meta } = config;
        this.message = message ?? '';
        this.code = code ?? '';
        this.data = data ?? null;
        this.meta = meta ?? null;
    }

    toSuccess<T>(data: T, meta?: HttpResponseMetaType) {
        this.message = HttpMessage.SUCCESS;
        this.code = HttpCode.SUCCESS;
        this.data = data;
        this.meta = meta;

        return this.toJSON();
    }

    toBadRequest(errors: HttpValidateError[]) {
        this.message = HttpMessage.BAD_REQUEST;
        this.code = HttpCode.BAD_REQUEST;
        this.data = null;
        this.meta = {
            errors: errors,
        };

        return this.toJSON();
    }

    toServiceInternal(error: Error | unknown, requestId?: string) {
        if (requestId) {
            const metaResult: HttpResponseMetaType = {
                requestId: requestId,
            };

            this.meta = metaResult;
        }

        this.message = HttpMessage.SUCCESS;
        this.code = HttpCode.SUCCESS;
        this.data = null;
        this.meta = this.meta;
        this.error = error

        return this.toJSON();
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message,
            data: this.data,
            meta: this.meta,
            error: this.error
        };
    }
}
