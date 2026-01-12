import { Module } from "@nestjs/common";

class ProvinceRepo {

}

class ProvinceService {
    // Province service implementation
    constructor(private readonly provinceRepo: ProvinceRepo) {}
}


@Module({
    providers: [
        {
            useClass: ProvinceRepo,
            provide: 'ProvinceRepo',
        },
        {
            useClass: ProvinceService,
            provide: 'ProvinceService',
        }
    ]
})
export class ProvinceModule { }