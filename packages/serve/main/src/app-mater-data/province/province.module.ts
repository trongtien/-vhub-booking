import { Module } from "@nestjs/common";
import { ProvinceInfraRepoModule } from "./provinceInfraRepo.module";
import { ProvinceUseCaseGetModule } from "./provinceUseCaseGet.module";
@Module({
    imports: [ProvinceInfraRepoModule, ProvinceUseCaseGetModule],
})
export class ProvinceModule { }