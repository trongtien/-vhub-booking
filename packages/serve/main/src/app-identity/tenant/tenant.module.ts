import { Module } from "@nestjs/common";
import { TenantCreateUseCaseModule, TenantGetByIdUseCaseModule } from "./tenant-use-case.module";
import { TenantInfraRepoModule } from "./tenant-infra-repo.module";
import { TenantController } from "./tenant.controller";

@Module({
    imports: [
        TenantInfraRepoModule,
        TenantCreateUseCaseModule,
        TenantGetByIdUseCaseModule
    ],
    controllers: [TenantController],
})
export class TenantModule { }