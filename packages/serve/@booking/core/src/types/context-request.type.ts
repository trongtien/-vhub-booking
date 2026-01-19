export type RequestContextMeta = {
    requestId: string
    traceId?: string
    tenantId?: string
    apiVersion: string
    userId?: string
}