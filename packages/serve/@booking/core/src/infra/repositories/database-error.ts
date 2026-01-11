import { ERROR_CATEGORY } from "../../enums";
import { ServeError } from "../../helpers";

export class DatabaseError extends ServeError {
  readonly code: string = "DB_ERROR";
  readonly category: ERROR_CATEGORY = ERROR_CATEGORY.INFRA;
  readonly httpStatus: number = 500;
  readonly publicMessage: string = "Server internal error";
  readonly internalMessage: string = "Query data base error";

  constructor(detail?: unknown) {
    super(detail);
  }
}

export class DatabaseConstraintError extends ServeError {
  readonly code: string = "UNIQUE_CONSTRAIN_ERROR";
  readonly category: ERROR_CATEGORY = ERROR_CATEGORY.INFRA;
  readonly httpStatus: number = 500;
  readonly publicMessage: string = "Server internal error";
  readonly internalMessage: string = "Query data base  unique constrain error";

  constructor(detail?: unknown) {
    super(detail);
  }
}
