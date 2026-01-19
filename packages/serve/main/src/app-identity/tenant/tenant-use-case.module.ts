import { Module } from "@nestjs/common";
import { TENANT_REPOSITORY } from "../../utils/symbol-provider";
import { TenantInfraRepoModule } from "./tenant-infra-repo.module";

import { CreateTenantUseCase, GetTenantByIdUseCase } from '@booking/serve-identity'
import { LoggerAdapter } from "@booking/serve-core";
import { LoggerModule } from "../../logger.module";


@Module({
    imports: [TenantInfraRepoModule, LoggerModule],
    providers: [
        {
            provide: CreateTenantUseCase,
            inject: [LoggerAdapter, TENANT_REPOSITORY],
            useFactory: (logger, provinceRepo) => new CreateTenantUseCase(logger, provinceRepo),
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