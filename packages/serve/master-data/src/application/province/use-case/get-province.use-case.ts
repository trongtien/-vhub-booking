import { IProvinceRepository } from "../../../domain/province/province.repository";


export class GetProvinceUseCase {
    constructor(private readonly repo: IProvinceRepository) { }

    async execute() {
        const provinces = await this.repo.findMany();

        return provinces.map(province => ({
            id: province.id,
            code: province.snapshot.code,
            name: province.snapshot.name,
        }));
    }
}