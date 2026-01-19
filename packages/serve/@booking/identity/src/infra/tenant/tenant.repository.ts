import { TenantEntity, ITenantEntityConfig } from "@/domain/tenant/tenant.entity";
import { ITenantRepository } from "@/domain/tenant/tenant.repository";
import { BaseRepository } from "@booking/serve-core";

export class TenantRepositoryImpl extends BaseRepository<ITenantEntityConfig> implements ITenantRepository {
    protected tableName: string = "tenant";

    async save(tenant: TenantEntity): Promise<string> {
        const newId = await this.insert(tenant.snapshot);
        return newId
    }

    async findMany(): Promise<TenantEntity[]> {
        const results = await this.knex<ITenantEntityConfig>(this.tableName).select('*');
        return results.map(row => TenantEntity.create(row));
    }
}
