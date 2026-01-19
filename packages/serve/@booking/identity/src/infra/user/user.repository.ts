import {  UserEntity } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";
import { BaseRepository } from "@booking/serve-core";

export class UserRepositoryImpl extends BaseRepository<UserEntity> implements IUserRepository {
    protected tableName: string = "user";

    async save(user: UserEntity): Promise<void> {
        await this.insert(user.snapshot);
        return
    }


    async findManyByTenant(tenantId: string): Promise<UserEntity[]> {
        return []
    }
}
