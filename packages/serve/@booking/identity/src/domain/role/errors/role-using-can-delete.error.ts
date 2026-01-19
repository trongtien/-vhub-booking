import { ERROR_CATEGORY, ServeError } from "@booking/serve-core";

export class RoleTenantUsingCanDeleteError extends ServeError {
    code: string = "ROLE_TENANT_USING_CAN_DELETE";
    category: ERROR_CATEGORY = ERROR_CATEGORY.DOMAIN;
    httpStatus: number = 400;
    publicMessage: string = "Role is using.";
    internalMessage: string = "Role entity using can not delete.";

    constructor(id: string) {
        super(`Role is using id ${id} can not delete`);
    }
}
