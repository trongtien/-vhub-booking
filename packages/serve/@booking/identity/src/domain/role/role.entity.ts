import type { EntityCommon } from "@booking/serve-core";

export interface IRoleEntityConfig extends EntityCommon {
    tenandId: string
    roleName: string
}

export class RoleEntity {
    private constructor(private readonly props: IRoleEntityConfig) { }

    static create(config: IRoleEntityConfig): RoleEntity {
        return new RoleEntity(config);
    }

    get id(): string {
        return this.props.id;
    }

    get snapshot(): IRoleEntityConfig {
        return { ...this.props };
    }
}
