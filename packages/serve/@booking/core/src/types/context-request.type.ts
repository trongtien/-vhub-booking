export type RequestContextMeta = {
    requestId: string
    traceId: string
    tenantId: string
    version: string
    userId?: string
}