import { ERROR_CATEGORY, ServeError } from "@booking/serve-core";

export class RoleTenantNotFoundError extends ServeError {
    code: string = "ROLE_TENANT_NOT_FOUND";
    category: ERROR_CATEGORY = ERROR_CATEGORY.DOMAIN;
    httpStatus: number = 400;
    publicMessage: string = "The requested role was not found.";
    internalMessage: string = "Role entity could not be found in the system.";

    constructor(tenantId: string) {
        super(`Role with tenant id ${tenantId} not found`);
    }
}
