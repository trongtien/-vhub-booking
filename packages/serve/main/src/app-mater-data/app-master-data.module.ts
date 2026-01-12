import { Module } from "@nestjs/common";
import { ProvinceModule } from "./province/province.module";


@Module({
    imports: [ProvinceModule],
})
export class AppMasterDataModule {}