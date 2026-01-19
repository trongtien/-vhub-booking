import { ITenantRepository } from "@/domain/tenant/tenant.repository";
import { ICreateTenantUseCase } from "../dto/create-tenant-request.dto";
import { TenantEntity } from "@/domain/tenant/tenant.entity";
import { v4 as uuid } from "uuid";
import { TenantResponse } from "../dto/tenant-response.dto";
import { LoggerAdapter } from "@booking/serve-core";
import z from "zod";

export class CreateTenantUseCase {
    constructor(private readonly logger: LoggerAdapter, private readonly repo: ITenantRepository) { }

    async execute(value: ICreateTenantUseCase): Promise<any> {
        this.logger.trace('==> CreateTenantUseCase execute', { value });

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
