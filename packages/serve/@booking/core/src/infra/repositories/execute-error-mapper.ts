import { DatabaseConstraintError, DatabaseError } from "./database-error";

export class ExecuteErrorMapper {
  constructor() {}

  protected async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      this.errorMapper(error);
      throw error;
    }
  }

  private errorMapper(err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as any).code === "23505"
    ) {
      return new DatabaseConstraintError(err);
    }

    return new DatabaseError(err);
  }
}
