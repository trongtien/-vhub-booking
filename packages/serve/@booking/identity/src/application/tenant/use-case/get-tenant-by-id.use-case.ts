import { TenantNotFoundError } from "@/domain/tenant/errors/tenant-not-found.error";
import { ITenantRepository } from "@/domain/tenant/tenant.repository";
import { TenantResponse } from "../dto/tenant-response.dto";
import { TenantEntity } from "@/domain/tenant/tenant.entity";

export class GetTenantByIdUseCase {
    constructor(private readonly repo: ITenantRepository) { }

    async execute(id: string)  {
        const tenantData = await this.repo.findById(id);

        if(tenantData === null) {
            throw new TenantNotFoundError(id)
        }

        const tenant = TenantEntity.create(tenantData);
        return TenantResponse.from(tenant);
    }
}
