import { ERROR_CATEGORY, ServeError } from "@booking/serve-core";

export class UsertNotFoundError extends ServeError {
    code: string = "USER_NOT_FOUND";
    category: ERROR_CATEGORY = ERROR_CATEGORY.DOMAIN;
    httpStatus: number = 400;
    publicMessage: string = "The requested user was not found.";
    internalMessage: string = "User entity could not be found in the system.";

    constructor(id: string) {
        super(`User with id ${id} not found`);
    }
}
