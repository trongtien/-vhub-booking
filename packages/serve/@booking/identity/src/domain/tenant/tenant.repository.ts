import { TenantEntity } from "./tenant.entity";
import { ITenantEntityConfig } from "./tenant.entity";

export interface ITenantRepository {
    save(tenant: TenantEntity): Promise<string>;
    update(id: string, data: Partial<ITenantEntityConfig>): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<ITenantEntityConfig | null>;
    findMany(): Promise<TenantEntity[]>
}
