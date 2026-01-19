import { UserEntity } from "./user.entity";

export interface IUserRepository {
    findById(id: string): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<void>;
    update(id: string, user: UserEntity): Promise<void>;
    delete(id: string): Promise<void>;
    findManyByTenant(tenantId: string): Promise<UserEntity[]>
}
