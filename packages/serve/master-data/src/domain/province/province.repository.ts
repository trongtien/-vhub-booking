import { ProvinceEntity } from "./province.entity";


export interface IProvinceRepository {
    findById(id: string): Promise<ProvinceEntity | null>;
    save(province: ProvinceEntity): Promise<void>;
    update(id: string, province: ProvinceEntity): Promise<void>;
    delete(id: string): Promise<void>;
    findMany(): Promise<ProvinceEntity[]>;
}