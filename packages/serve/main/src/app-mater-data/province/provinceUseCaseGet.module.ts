import { Module } from "@nestjs/common";
import { PROVINCE_REPOSITORY } from "../../utils/symbol-provider";
import { GetProvinceUseCase } from '@booking/serve-master-data';
import { ProvinceInfraRepoModule } from "./provinceInfraRepo.module";


@Module({
    imports: [ProvinceInfraRepoModule],
    providers: [
        {
            provide: GetProvinceUseCase,
            inject: [PROVINCE_REPOSITORY],
            useFactory: (provinceRepo) => new GetProvinceUseCase(provinceRepo),
        }
    ],
    exports: [GetProvinceUseCase],
})
export class ProvinceUseCaseGetModule { }