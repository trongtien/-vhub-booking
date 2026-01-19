import { ITenantRepository } from "@/domain/tenant/tenant.repository";
import { CreateTenantRequest } from "../dto/create-tenant-request.dto";
import { TenantEntity } from "@/domain/tenant/tenant.entity";
import { v4 as uuid } from "uuid";
import { TenantResponse } from "../dto/tenant-response.dto";

export class CreateTenantUseCase {
    constructor(private readonly repo: ITenantRepository) { }

    async execute(value: CreateTenantRequest) {
        const { businessName, dbSchemaName, status, taxCode, subscriptionPlan } =
            value;

        const newTenant = TenantEntity.create({
            id: uuid(),
            businessName,
            dbSchemaName,
            taxCode,
            subscriptionPlan,
            status,
        });

        const newId = await this.repo.save(newTenant);
        newTenant.withId(newId);

        return TenantResponse.from(newTenant);
    }
}
