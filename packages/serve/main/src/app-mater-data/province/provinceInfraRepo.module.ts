import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database.module";
import { APP_DATABASE_CONNECTION, PROVINCE_REPOSITORY } from "../../utils/symbol-provider";
import { ProvinceRepositoryImpl } from "@booking/serve-master-data";

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: PROVINCE_REPOSITORY,
            inject: [APP_DATABASE_CONNECTION],
            useFactory: (connection) => new ProvinceRepositoryImpl(connection),
        },
    ],
    exports: [PROVINCE_REPOSITORY],
})
export class ProvinceInfraRepoModule {

}