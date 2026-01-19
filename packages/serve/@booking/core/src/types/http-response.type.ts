export type ResponseMeta = {
    requestId: string;
    traceId?: string;
    tenantId?: string;
    version: string;
    timestamp: string;
};


export type TErrorResponse = {
    field: string;
    message: string;
};