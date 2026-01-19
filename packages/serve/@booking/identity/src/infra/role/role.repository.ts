import { RoleEntity } from "@/domain/role/role.entity";
import { IRoleRepository } from "@/domain/role/role.repository";
import { BaseRepository } from "@booking/serve-core";

export class RoleRepositoryImpl
    extends BaseRepository<RoleEntity>
    implements IRoleRepository {
    protected tableName: string = "role";

    async save(role: RoleEntity): Promise<void> {
        await this.insert(role.snapshot);
        return;
    }

    async findManyByTenant(tenantId: string): Promise<RoleEntity[]> {
        return [];
    }
}
