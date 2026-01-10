export type ResponseMeta = {
    requestId: string;
    traceId?: string;
    tenantId?: string;
    version: string;
    timestamp: string;
};