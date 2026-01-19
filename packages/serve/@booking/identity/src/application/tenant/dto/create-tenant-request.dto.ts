import { CommonDTO } from '@booking/serve-core';
import { z } from 'zod'

export interface ICreateTenantUseCase {
    businessName: string;
    taxCode: string;
    subscriptionPlan: string;
    dbSchemaName: string;
    status: string;
}


class CreateTenantDTO extends CommonDTO<ICreateTenantUseCase> {
    schema = z.object({
        businessName: z.string().min(1),
        taxCode: z.string().min(1),
        subscriptionPlan: z.string().min(1),
        dbSchemaName: z.string().min(1),
        status: z.string().min(1),
    });


    fromUseCase(value: z.infer<typeof this.schema>) {
        return {
            businessName: value.businessName,
            taxCode: value.taxCode,
            subscriptionPlan: value.subscriptionPlan,
            dbSchemaName: value.dbSchemaName,
            status: value.status,
        }
    }
}

export const CreateTenantValidate = new CreateTenantDTO()


