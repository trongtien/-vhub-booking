import { BaseRepository } from "@booking/serve-core";
import { ProvinceEntity } from "@/domain/province/province.entity";
import { IProvinceRepository } from "@/domain/province/province.repository";

export class ProvinceRepositoryImpl extends BaseRepository<ProvinceEntity> implements IProvinceRepository {
    protected tableName: string = "provinces";

    async save(province: ProvinceEntity): Promise<void> {
        await this.insert(province.snapshot);
        return
    }

    async findMany(): Promise<ProvinceEntity[]> {
        return this.findMany()
    }
}