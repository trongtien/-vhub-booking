import { Knex } from 'knex';

export function createKnexConfig(): Knex.Config {
  return {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl:
        process.env.DB_SSL === 'true'
          ? { rejectUnauthorized: false }
          : false,
    },
    pool: {
      min: Number(process.env.DB_POOL_MIN ?? 2),
      max: Number(process.env.DB_POOL_MAX ?? 10),
      afterCreate: (conn: any, done: any) => {
        conn.query('SET timezone="UTC";', done);
      },
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  };
}