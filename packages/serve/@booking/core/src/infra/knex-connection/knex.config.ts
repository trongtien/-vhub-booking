import { Knex } from "knex";
import { ConnectionConfig } from "../../types";

export function createKnexConfig(config: Partial<ConnectionConfig>): Knex.Config {
    const {
        host,
        port,
        database,
        user,
        password,
        ssl,
        minPool = 2,
        maxPool = 10,
        tableNameMigration = "knex_migrations"
    } = config;
    return {
        client: "pg",
        connection: {
            host: host,
            port: Number(port),
            database: database,
            user: user,
            password: password,
            ssl: ssl === "true" ? { rejectUnauthorized: false } : false,
        },
        pool: {
            min: Number(minPool ?? 2),
            max: Number(maxPool ?? 10),
            afterCreate: (conn: any, done: any) => {
                conn.query('SET timezone="UTC";', done);
            },
        },
        migrations: {
            tableName: tableNameMigration,
        },
    };
}
