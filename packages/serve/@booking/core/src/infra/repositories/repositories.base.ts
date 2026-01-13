import type { Knex } from "@booking/serve-knex-cli";
import { ExecuteErrorMapper } from "./execute-error-mapper";
import { DatabaseError } from "./database-error";

export abstract class BaseRepository<
  TEntity extends { id: string },
> extends ExecuteErrorMapper {
  protected abstract readonly tableName: string;
  protected readonly knex: Knex;

  constructor(knex: Knex) {
    super();
    this.knex = knex;
  }

  async findById(id: string): Promise<TEntity | null> {
    return this.execute<TEntity | null>(async () => {
      const result = await this.knex<TEntity>(this.tableName)
        .where({ id } as Partial<TEntity>)
        .first();

      return (result ?? null) as TEntity | null;
    });
  }

  async insert(data: Partial<TEntity>): Promise<string> {
    return this.execute<string>(async () => {
      const [result] = (await this.knex(this.tableName)
        .insert(data)
        .returning("id")) as { id: string }[];

      if (!result?.id) {
        throw new DatabaseError("Result insert error can not returning id");
      }

      return result.id;
    });
  }

  async update(id: string, data: Partial<TEntity>): Promise<void> {
    return this.execute<void>(async () => {
      await this.knex(this.tableName).where({ id }).update(data);
    });
  }

  async delete(id: string): Promise<void> {
    return this.execute<void>(async () => {
      await this.knex(this.tableName).where({ id }).delete();
    });
  }

  async transaction<T>(fn: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
      return this.knex.transaction(fn)
  }
}
