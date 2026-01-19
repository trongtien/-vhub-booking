import type { EntityCommon } from "@booking/serve-core";

export interface IUserEntityConfig extends EntityCommon {
    tenantId: string;
    email: string;
    passwordHash: string;
    fullName: string;
    roleId: string;
    status: string
}

export class UserEntity {
    private constructor(private readonly props: IUserEntityConfig) { }

    static create(config: IUserEntityConfig): UserEntity {
        return new UserEntity(config);
    }

    get id(): string {
        return this.props.id;
    }

    get snapshot(): IUserEntityConfig {
        return { ...this.props };
    }
}
