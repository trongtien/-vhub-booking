import { Module } from "@nestjs/common";
import { ProvinceModule } from "./province/province.module";
import { } from '@booking/serve-master-data';

@Module({
    imports: [ProvinceModule],
})
export class AppMasterDataModule {
}