import { ERROR_CATEGORY, ServeError } from "@booking/serve-core";

export class ProvinceNotFoundError extends ServeError {
    code: string = "PROVINCE_NOT_FOUND";
    category: ERROR_CATEGORY = ERROR_CATEGORY.DOMAIN;
    httpStatus: number = 400;
    publicMessage: string = "The requested province was not found.";
    internalMessage: string = "Province entity could not be found in the system.";

    constructor(id: string) {
        super(`Province with id ${id} not found`);
    }
}
