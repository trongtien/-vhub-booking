import { ERROR_CATEGORY, ServeError } from "@booking/serve-core";

export class TenantNotFoundError extends ServeError {
    code: string = "TENANT_NOT_FOUND";
    category: ERROR_CATEGORY = ERROR_CATEGORY.DOMAIN;
    httpStatus: number = 400;
    publicMessage: string = "The requested tenant was not found.";
    internalMessage: string = "Tenant entity could not be found in the system.";

    constructor(id: string) {
        super(`Tenant with id ${id} not found`);
    }
}
