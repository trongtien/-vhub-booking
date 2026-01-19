import type { EntityCommon } from "@booking/serve-core";

export interface ITenantEntityConfig extends EntityCommon {
    businessName: string;
    taxCode: string;
    subscriptionPlan: string;
    dbSchemaName: string;
    status: string;
}

export class TenantEntity {
    #props: ITenantEntityConfig;

    private constructor(private readonly props: ITenantEntityConfig) {
        this.#props = props;
    }

    static create(config: ITenantEntityConfig): TenantEntity {
        return new TenantEntity(config);
    }

    get id(): string | undefined {
        return this.props.id;
    }

    withId(value: string) {
        this.#props.id = value;
        return this
    }

    get snapshot(): ITenantEntityConfig {
        return { ...this.#props };
    }
}
