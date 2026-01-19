import { ERROR_CATEGORY, ServeError } from "@booking/serve-core";

export class RoleNotFoundError extends ServeError {
    code: string = "ROLE_NOT_FOUND";
    category: ERROR_CATEGORY = ERROR_CATEGORY.DOMAIN;
    httpStatus: number = 400;
    publicMessage: string = "The requested role was not found.";
    internalMessage: string = "Province entity could not be found in the system.";

    constructor(id: string) {
        super(`Role with id ${id} not found`);
    }
}
