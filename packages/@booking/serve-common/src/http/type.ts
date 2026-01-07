export type HttpValidateError = {
    field: string
    message: string
}

export type HttpResponseMetaType = {
    page?: number;
    limit?: number;
    requestId?: string;
    errors?: HttpValidateError[]
};

export type HttpResponseType<T> = {
    code: string;
    error?: Error | unknown
    message: string;
    data: T;
    meta?: HttpResponseMetaType;
};

