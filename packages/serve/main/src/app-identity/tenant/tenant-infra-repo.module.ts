import { Module } from "@nestjs/common";
import { TenantRepositoryImpl } from '@booking/serve-identity'
import { DatabaseModule } from "../../database.module";
import { APP_DATABASE_CONNECTION, TENANT_REPOSITORY } from "../../utils/symbol-provider";

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: TENANT_REPOSITORY,
            inject: [APP_DATABASE_CONNECTION],
            useFactory: (connection) => new TenantRepositoryImpl(connection),
        },
    ],
    exports: [TENANT_REPOSITORY],
})
export class TenantInfraRepoModule { }