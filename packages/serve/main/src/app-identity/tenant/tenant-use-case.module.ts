import { Module } from "@nestjs/common";
import { TENANT_REPOSITORY } from "../../utils/symbol-provider";
import { TenantInfraRepoModule } from "./tenant-infra-repo.module";

import { CreateTenantUseCase, GetTenantByIdUseCase } from '@booking/serve-identity'


@Module({
    imports: [TenantInfraRepoModule],
    providers: [
        {
            provide: CreateTenantUseCase,
            inject: [TENANT_REPOSITORY],
            useFactory: (provinceRepo) => new CreateTenantUseCase(provinceRepo),
        }
    ],
    exports: [CreateTenantUseCase],
})
export class TenantCreateUseCaseModule { }


@Module({
    imports: [TenantInfraRepoModule],
    providers: [
        {
            provide: GetTenantByIdUseCase,
            inject: [TENANT_REPOSITORY],
            useFactory: (provinceRepo) => new GetTenantByIdUseCase(provinceRepo),
        }
    ],
    exports: [GetTenantByIdUseCase],
})
export class TenantGetByIdUseCaseModule { }