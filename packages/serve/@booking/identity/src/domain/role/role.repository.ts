import { RoleEntity } from "./role.entity";

export interface IRoleRepository {
    findById(id: string): Promise<RoleEntity | null>;
    save(role: RoleEntity): Promise<void>;
    update(id: string, role: RoleEntity): Promise<void>;
    delete(id: string): Promise<void>;
    findManyByTenant(tenantId: string): Promise<RoleEntity[]>
}
