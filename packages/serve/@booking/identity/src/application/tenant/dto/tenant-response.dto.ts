import { TenantEntity } from "@/domain/tenant";

export class TenantResponse {
    static from(tenant: TenantEntity) {
        return tenant.snapshot
    }
}
